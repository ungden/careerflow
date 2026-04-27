import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Thanh toán thành công",
  description: "Cảm ơn bạn đã nâng cấp lên YourCV Pro.",
};

export const dynamic = "force-dynamic";

function formatDate(iso: string | null) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function PaymentSuccessPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let tier: "free" | "pro" = "free";
  let expiresAt: string | null = null;
  let fullName: string | null = null;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_tier, subscription_expires_at, full_name")
      .eq("id", user.id)
      .single();

    if (profile) {
      tier = (profile.subscription_tier as "free" | "pro") || "free";
      expiresAt = profile.subscription_expires_at;
      fullName = profile.full_name;
    }
  }

  const isPro = tier === "pro";

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f8f9fb] pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-[40px] p-10 md:p-14 shadow-sm border border-slate-100 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1
            className="text-3xl md:text-4xl font-extrabold text-[#191c1e] mb-3"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            {isPro
              ? "Chúc mừng! Bạn đã là thành viên Pro"
              : "Cảm ơn bạn đã thanh toán"}
          </h1>

          <p className="text-[#434654] mb-8">
            {fullName ? `${fullName}, ` : ""}
            {isPro
              ? "Tất cả tính năng cao cấp đã được mở khoá. Hãy bắt đầu tạo CV ấn tượng nhé!"
              : "Chúng tôi đang xử lý giao dịch của bạn. Trạng thái Pro sẽ được kích hoạt trong giây lát."}
          </p>

          <div className="bg-[#f8f9fb] rounded-2xl p-6 mb-8 text-left border border-slate-100">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-[#434654]">Gói hiện tại</span>
              <span className="font-bold text-[#191c1e]">
                {isPro ? "YourCV Pro" : "Free"}
              </span>
            </div>
            {isPro && expiresAt && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#434654]">Hết hạn</span>
                <span className="font-bold text-[#191c1e]">
                  {formatDate(expiresAt)}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="block text-center py-4 px-8 rounded-xl font-bold text-sm text-white bg-[#1557ff] hover:opacity-90 transition-all"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Vào dashboard
            </Link>
            <Link
              href="/cong-cu"
              className="block text-center py-4 px-8 rounded-xl font-bold text-sm text-[#1557ff] bg-[#d4e0f8] hover:opacity-90 transition-all"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Khám phá công cụ AI
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
