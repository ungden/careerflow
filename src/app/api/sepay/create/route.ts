import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  SEPAY_PLANS,
  buildQrUrl,
  generateRefCode,
  type SepayPlan,
} from "@/lib/sepay";
import { env } from "@/lib/env";

const schema = z.object({
  plan: z.enum(["pro_monthly", "pro_yearly", "featured_basic", "featured_pro"]),
  job_id: z.string().uuid().optional(),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Vui lòng đăng nhập." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dữ liệu không hợp lệ", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (!env.SEPAY_BANK_ACCOUNT || !env.SEPAY_ACCOUNT_NAME) {
    return NextResponse.json(
      { error: "Sepay chưa được cấu hình." },
      { status: 503 }
    );
  }

  const plan = parsed.data.plan as SepayPlan;
  const meta = SEPAY_PLANS[plan];
  const refCode = generateRefCode(plan);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // QR valid 30m

  const { data: tx, error } = await supabase
    .from("transactions")
    .insert({
      user_id: user.id,
      provider: "sepay",
      amount: meta.amount,
      currency: "VND",
      status: "pending",
      plan,
      transfer_content: refCode,
      expires_at: expiresAt.toISOString(),
      metadata: parsed.data.job_id ? { job_id: parsed.data.job_id } : null,
    })
    .select("id")
    .single();

  if (error || !tx) {
    console.error("Sepay create transaction error:", error);
    return NextResponse.json(
      { error: "Không thể tạo giao dịch. Vui lòng thử lại." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    transaction_id: tx.id,
    ref_code: refCode,
    amount: meta.amount,
    bank_account: env.SEPAY_BANK_ACCOUNT,
    bank_brand: env.SEPAY_BANK_BRAND,
    account_name: env.SEPAY_ACCOUNT_NAME,
    qr_url: buildQrUrl({ amount: meta.amount, refCode }),
    expires_at: expiresAt.toISOString(),
    label: meta.label,
  });
}
