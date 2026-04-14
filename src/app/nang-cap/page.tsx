import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";
import { UpgradeCheckoutButton } from "./checkout-button";

export const metadata: Metadata = {
  title: "Nâng cấp Pro",
  description:
    "Mở khoá toàn bộ templates, AI không giới hạn và nhiều tính năng cao cấp khác với CareerFlow Pro.",
};

export const dynamic = "force-dynamic";

const benefits = [
  "Tất cả templates cao cấp",
  "Export PDF không watermark",
  "AI viết thư xin việc, gợi ý lương không giới hạn",
  "Ưu tiên hiển thị với nhà tuyển dụng",
  "Hỗ trợ ưu tiên qua email",
  "Phân tích và đề xuất cải thiện CV",
];

export default async function UpgradePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isPro = false;
  let expiresAt: string | null = null;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_tier, subscription_expires_at")
      .eq("id", user.id)
      .single();

    isPro = profile?.subscription_tier === "pro";
    expiresAt = profile?.subscription_expires_at ?? null;
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f8f9fb] pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <h1
              className="text-4xl md:text-5xl font-extrabold text-[#191c1e] tracking-tight"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Nâng cấp lên CareerFlow Pro
            </h1>
            <p className="text-[#434654] text-lg max-w-2xl mx-auto">
              Đầu tư cho sự nghiệp với chỉ 99,000đ/tháng. Huỷ bất cứ lúc nào.
            </p>
          </div>

          <div className="bg-[#003d9b] rounded-[40px] p-10 md:p-12 shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-6 right-6 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
              Phổ biến
            </div>

            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Pro Monthly
            </h2>
            <div className="mb-8">
              <span
                className="text-5xl font-extrabold"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                99,000đ
              </span>
              <span className="text-blue-200 ml-2">/tháng</span>
            </div>

            <ul className="space-y-3 mb-10">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-white mt-0.5 shrink-0"
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
                  <span className="text-blue-100 text-sm">{b}</span>
                </li>
              ))}
            </ul>

            {isPro ? (
              <div className="bg-white/10 rounded-2xl p-5 text-center">
                <p className="font-bold mb-1">
                  Bạn đang dùng gói Pro
                </p>
                {expiresAt && (
                  <p className="text-sm text-blue-100">
                    Hết hạn:{" "}
                    {new Date(expiresAt).toLocaleDateString("vi-VN")}
                  </p>
                )}
              </div>
            ) : !user ? (
              <Link
                href="/dang-nhap?next=/nang-cap"
                className="block text-center py-4 px-8 rounded-xl font-bold text-sm bg-white text-[#003d9b] hover:opacity-90 transition-all"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Đăng nhập để nâng cấp
              </Link>
            ) : (
              <UpgradeCheckoutButton />
            )}

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-blue-200">
                VNPay/MoMo đang được cấu hình (sắp có)
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-[#6b7280] mt-6">
            Thanh toán an toàn qua Stripe. Huỷ bất cứ lúc nào trong dashboard.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
