import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Bảng giá",
  description:
    "So sánh các gói dịch vụ YourCV. Bắt đầu miễn phí hoặc nâng cấp Pro để sử dụng toàn bộ tính năng.",
};

const freeTier = [
  "2 template cơ bản (Classic, Modern)",
  "Export PDF có watermark",
  "1 AI CV Review/tháng",
  "3 AI Cover Letter/tháng",
  "5 AI Interview/tháng",
  "5 AI Salary/tháng",
];

const proTier = [
  "Tất cả 10 templates",
  "Không watermark",
  "AI không giới hạn",
  "Ưu tiên hỗ trợ",
];

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let currentTier: "free" | "pro" | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_tier")
      .eq("id", user.id)
      .single();
    currentTier = (profile?.subscription_tier as "free" | "pro") ?? "free";
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f8f9fb] pt-32 pb-20 px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h1
              className="text-4xl md:text-5xl font-extrabold text-[#191c1e] tracking-tight"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Chọn gói phù hợp với bạn
            </h1>
            <p className="text-[#434654] text-lg max-w-2xl mx-auto">
              Bắt đầu miễn phí, nâng cấp khi bạn cần nhiều hơn.
            </p>
            {currentTier && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-[#434654]">
                <span>Gói hiện tại của bạn:</span>
                <span
                  className={`font-bold ${
                    currentTier === "pro" ? "text-[#1557ff]" : "text-[#434654]"
                  }`}
                >
                  {currentTier === "pro" ? "Pro" : "Free"}
                </span>
              </div>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 flex flex-col">
              <h2
                className="text-2xl font-bold text-[#191c1e] mb-2"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Free
              </h2>
              <p className="text-[#434654] text-sm mb-6">
                Hoàn hảo để bắt đầu
              </p>
              <div className="mb-8">
                <span
                  className="text-4xl font-extrabold text-[#191c1e]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  0đ
                </span>
                <span className="text-[#434654] text-sm ml-1">/tháng</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {freeTier.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#434654]">
                    <svg
                      className="w-5 h-5 text-[#1557ff] mt-0.5 shrink-0"
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
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              {currentTier === "free" ? (
                <div
                  className="block text-center py-4 px-8 rounded-xl font-bold text-sm text-[#434654] bg-slate-100"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Đang sử dụng
                </div>
              ) : (
                <Link
                  href={user ? "/cong-cu" : "/dang-ky"}
                  className="block text-center py-4 px-8 rounded-xl font-bold text-sm text-[#1557ff] bg-[#d4e0f8] hover:opacity-90 transition-all"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Bắt đầu miễn phí
                </Link>
              )}
            </div>

            {/* Pro Tier */}
            <div className="bg-[#1557ff] rounded-[40px] p-10 shadow-xl flex flex-col relative overflow-hidden">
              <div className="absolute top-6 right-6 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                Phổ biến
              </div>
              <h2
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Pro
              </h2>
              <p className="text-blue-200 text-sm mb-6">
                Cho người nghiêm túc với sự nghiệp
              </p>
              <div className="mb-8">
                <span
                  className="text-4xl font-extrabold text-white"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  99,000đ
                </span>
                <span className="text-blue-200 text-sm ml-1">/tháng</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {proTier.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-blue-100">
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
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              {currentTier === "pro" ? (
                <div
                  className="block text-center py-4 px-8 rounded-xl font-bold text-sm text-white bg-white/20"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Đang sử dụng
                </div>
              ) : (
                <Link
                  href="/nang-cap"
                  className="block text-center py-4 px-8 rounded-xl font-bold text-sm kinetic-gradient text-white shadow-lg hover:opacity-90 transition-all"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Nâng cấp Pro
                </Link>
              )}
              <p className="text-blue-200/80 text-xs text-center mt-3">
                Thanh toán bằng chuyển khoản ngân hàng (Sepay)
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
