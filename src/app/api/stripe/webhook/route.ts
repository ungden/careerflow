import { NextRequest } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe/client";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  if (!env.STRIPE_ENABLED) {
    return Response.json({ error: "Stripe is disabled" }, { status: 404 });
  }

  const stripe = getStripe();
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return Response.json(
      { error: "Webhook đang được cấu hình" },
      { status: 503 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return Response.json({ error: "Thiếu chữ ký Stripe" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return Response.json(
      { error: "Chữ ký webhook không hợp lệ" },
      { status: 400 }
    );
  }

  if (event.type !== "checkout.session.completed") {
    return Response.json({ received: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session.metadata?.user_id;

  if (!userId) {
    console.error("Webhook session missing user_id metadata");
    return Response.json({ received: true });
  }

  const supabase = await createClient();

  // Cross-check email matches user before granting Pro
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, subscription_expires_at")
    .eq("id", userId)
    .single();

  if (!profile) {
    console.error("Stripe webhook: user not found", userId);
    return Response.json({ received: true, ignored: "user_not_found" });
  }

  if (
    session.customer_email &&
    profile.email &&
    session.customer_email.toLowerCase() !== profile.email.toLowerCase()
  ) {
    console.error("Stripe webhook: email mismatch", {
      session_email: session.customer_email,
      profile_email: profile.email,
    });
    return Response.json(
      { error: "email_mismatch" },
      { status: 400 }
    );
  }

  const amount =
    typeof session.amount_total === "number" ? session.amount_total : 99000;

  // Idempotent insert: unique index on (provider, provider_transaction_id)
  // ensures a duplicate Stripe webhook (replay) won't double-credit.
  const { data: inserted, error: txError } = await supabase
    .from("transactions")
    .insert({
      user_id: userId,
      amount,
      currency: (session.currency || "vnd").toUpperCase(),
      provider: "stripe",
      provider_transaction_id: session.id,
      status: "succeeded",
      plan: "pro_monthly",
      paid_at: new Date().toISOString(),
      metadata: {
        stripe_event_id: event.id,
        description: "YourCV Pro Monthly",
      },
    })
    .select("id");

  if (txError) {
    if ((txError as { code?: string }).code === "23505") {
      return Response.json({ received: true, idempotent: true });
    }
    console.error("Lỗi ghi nhận giao dịch:", txError);
    return Response.json({ error: "tx_failed" }, { status: 500 });
  }

  if (!inserted || inserted.length === 0) {
    return Response.json({ received: true, idempotent: true });
  }

  // Extend (not reset) subscription window
  const now = Date.now();
  const currentExpires = profile.subscription_expires_at
    ? new Date(profile.subscription_expires_at).getTime()
    : 0;
  const base = currentExpires > now ? currentExpires : now;
  const newExpires = new Date(base + 31 * 24 * 60 * 60 * 1000);

  await supabase
    .from("profiles")
    .update({
      subscription_tier: "pro",
      subscription_expires_at: newExpires.toISOString(),
    })
    .eq("id", userId);

  if (profile.email) {
    await supabase.from("email_queue").insert({
      to_email: profile.email,
      to_user_id: userId,
      subject: "Chào mừng đến với YourCV Pro!",
      template: "subscription_activated",
      payload: {
        name: profile.full_name || "bạn",
        expires_at: newExpires.toISOString(),
      },
      status: "pending",
    });
  }

  return Response.json({ received: true });
}
