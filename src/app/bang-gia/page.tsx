import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Bảng giá",
  description:
    "So sánh các gói dịch vụ CareerFlow. Bắt đầu miễn phí hoặc nâng cấp Pro để sử dụng toàn bộ tính năng.",
};

const freeTier = [
  "1 template cơ bản",
  "Export PDF có watermark",
  "Publish profile",
  "1 AI review",
];

const proTier = [
  "Tất cả templates",
  "Không watermark",
  "AI không giới hạn",
  "Ưu tiên hiển thị",
];

export default function PricingPage() {
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
                      className="w-5 h-5 text-[#003d9b] mt-0.5 shrink-0"
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
              <Link
                href="/dang-ky"
                className="block text-center py-4 px-8 rounded-xl font-bold text-sm text-[#003d9b] bg-[#d4e0f8] hover:opacity-90 transition-all"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Bắt đầu miễn phí
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-[#003d9b] rounded-[40px] p-10 shadow-xl flex flex-col relative overflow-hidden">
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
              <Link
                href="/dang-ky?plan=pro"
                className="block text-center py-4 px-8 rounded-xl font-bold text-sm kinetic-gradient text-white shadow-lg hover:opacity-90 transition-all"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Nâng cấp Pro
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
