import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { extractRefCode, SEPAY_PLANS, verifySepayAuth } from "@/lib/sepay";
import { env } from "@/lib/env";

// Sepay webhook payload — https://docs.sepay.vn/tich-hop-webhooks.html
interface SepayPayload {
  id: number | string;
  gateway?: string;
  transactionDate?: string;
  accountNumber?: string;
  subAccount?: string | null; // virtual-account id when present
  code?: string | null; // payment code Sepay extracted from content
  content?: string;
  transferType?: "in" | "out";
  transferAmount?: number;
  accumulated?: number;
  referenceCode?: string;
  description?: string;
}

function service() {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for webhook");
  }
  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    { cookies: { getAll: () => [], setAll: () => {} } }
  );
}

export async function POST(request: NextRequest) {
  if (!verifySepayAuth(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let payload: SepayPayload;
  try {
    payload = (await request.json()) as SepayPayload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (payload.transferType && payload.transferType !== "in") {
    return NextResponse.json({ success: true, ignored: "outgoing" });
  }

  const refCode =
    payload.code || extractRefCode(payload.content || payload.description);
  if (!refCode) {
    console.warn("Sepay webhook: no ref code in content", payload.content);
    return NextResponse.json({ success: true, ignored: "no_ref" });
  }

  const supabase = service();
  const sepayId = String(payload.id);

  // Idempotency guard: if we've already processed this Sepay tx, skip.
  const { data: existing } = await supabase
    .from("transactions")
    .select("id, status")
    .eq("provider", "sepay")
    .eq("provider_transaction_id", sepayId)
    .maybeSingle();
  if (existing) {
    return NextResponse.json({ success: true, idempotent: true });
  }

  const { data: pending } = await supabase
    .from("transactions")
    .select("id, user_id, plan, amount, status, metadata")
    .eq("provider", "sepay")
    .eq("transfer_content", refCode)
    .eq("status", "pending")
    .maybeSingle();

  if (!pending) {
    console.warn("Sepay webhook: no matching pending tx", refCode);
    return NextResponse.json({ success: true, ignored: "no_match" });
  }

  if (
    typeof payload.transferAmount === "number" &&
    payload.transferAmount < pending.amount
  ) {
    await supabase
      .from("transactions")
      .update({
        status: "failed",
        provider_transaction_id: sepayId,
        metadata: { ...(pending.metadata as object | null), reason: "underpaid", paid: payload.transferAmount },
      })
      .eq("id", pending.id);
    return NextResponse.json({ success: true, status: "underpaid" });
  }

  // Mark as succeeded; unique index on (provider, provider_transaction_id) enforces idempotency at DB level.
  const { error: updateErr } = await supabase
    .from("transactions")
    .update({
      status: "succeeded",
      provider_transaction_id: sepayId,
      paid_at: new Date().toISOString(),
    })
    .eq("id", pending.id)
    .eq("status", "pending");

  if (updateErr) {
    console.error("Sepay webhook update error:", updateErr);
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }

  // Grant entitlement based on plan.
  const plan = pending.plan as keyof typeof SEPAY_PLANS;
  const meta = SEPAY_PLANS[plan];
  if (meta && (plan === "pro_monthly" || plan === "pro_yearly")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_expires_at, email, full_name")
      .eq("id", pending.user_id)
      .single();

    const now = Date.now();
    const currentExpires = profile?.subscription_expires_at
      ? new Date(profile.subscription_expires_at).getTime()
      : 0;
    const base = currentExpires > now ? currentExpires : now;
    const newExpires = new Date(base + meta.durationDays * 24 * 60 * 60 * 1000);

    await supabase
      .from("profiles")
      .update({
        subscription_tier: "pro",
        subscription_expires_at: newExpires.toISOString(),
      })
      .eq("id", pending.user_id);

    if (profile?.email) {
      await supabase.from("email_queue").insert({
        to_email: profile.email,
        to_user_id: pending.user_id,
        subject: "Chào mừng đến với YourCV Pro!",
        template: "subscription_activated",
        payload: {
          name: profile.full_name || "bạn",
          expires_at: newExpires.toISOString(),
        },
        status: "pending",
      });
    }
  } else if (meta && (plan === "featured_basic" || plan === "featured_pro")) {
    const jobId = (pending.metadata as { job_id?: string } | null)?.job_id;
    if (jobId) {
      const featuredUntil = new Date(
        Date.now() + meta.durationDays * 24 * 60 * 60 * 1000
      );
      await supabase
        .from("jobs")
        .update({
          is_featured: true,
          featured_until: featuredUntil.toISOString(),
        })
        .eq("id", jobId)
        .eq("posted_by", pending.user_id);
    }
  }

  return NextResponse.json({ success: true });
}
