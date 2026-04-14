import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Tạo thư xin việc",
  description:
    "Tạo thư xin việc chuyên nghiệp bằng AI. Nhập mô tả công việc và nhận thư xin việc được cá nhân hóa.",
};

export default function ThuXinViecPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f9fb] pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#434654] mb-8">
            <Link href="/cong-cu" className="hover:text-[#003d9b] transition-colors">
              Công cụ
            </Link>
            <span>/</span>
            <span className="text-[#191c1e] font-medium">Tạo thư xin việc</span>
          </nav>

          {/* Hero */}
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 bg-[#dae2ff] text-[#001848] px-4 py-2 rounded-full">
              <span className="text-xs font-bold uppercase tracking-widest">AI-Powered</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Tạo thư xin việc
            </h1>
            <p className="text-lg text-[#434654] max-w-2xl mx-auto leading-relaxed">
              Nhập mô tả công việc bạn muốn ứng tuyển, AI sẽ tạo thư xin việc
              chuyên nghiệp và cá nhân hóa phù hợp với vị trí đó.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-8">
            {/* Mô tả công việc */}
            <div className="space-y-3">
              <label
                className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Mô tả công việc
              </label>
              <p className="text-sm text-[#434654]">
                Dán mô tả công việc từ tin tuyển dụng vào đây
              </p>
              <textarea
                rows={6}
                placeholder="Ví dụ: Chúng tôi đang tìm kiếm một Content Strategist với 3+ năm kinh nghiệm..."
                className="w-full bg-[#f3f4f6] rounded-2xl px-5 py-4 text-sm text-[#191c1e] placeholder:text-[#434654]/40 outline-none resize-none focus:ring-2 focus:ring-[#003d9b]/20 transition-all"
              />
            </div>

            {/* Thông tin thêm */}
            <div className="space-y-3">
              <label
                className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Thông tin bổ sung (tùy chọn)
              </label>
              <p className="text-sm text-[#434654]">
                Thêm điểm mạnh, kinh nghiệm nổi bật hoặc lý do bạn phù hợp với vị trí này
              </p>
              <textarea
                rows={4}
                placeholder="Ví dụ: Tôi có 5 năm kinh nghiệm trong lĩnh vực content marketing, từng quản lý đội ngũ 10 người..."
                className="w-full bg-[#f3f4f6] rounded-2xl px-5 py-4 text-sm text-[#191c1e] placeholder:text-[#434654]/40 outline-none resize-none focus:ring-2 focus:ring-[#003d9b]/20 transition-all"
              />
            </div>

            {/* Giọng văn */}
            <div className="space-y-3">
              <label
                className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Giọng văn
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  "Chuyên nghiệp",
                  "Nhiệt huyết",
                  "Sáng tạo",
                  "Trang trọng",
                ].map((tone) => (
                  <span
                    key={tone}
                    className="px-5 py-2.5 text-sm font-semibold text-[#003d9b] bg-[#f3f4f6] rounded-2xl cursor-pointer hover:bg-[#003d9b]/10 transition-colors"
                  >
                    {tone}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-4">
              <button
                className="kinetic-gradient text-white font-extrabold text-lg px-12 py-5 rounded-2xl shadow-2xl hover:opacity-90 hover:scale-[1.02] transition-all"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Tạo thư xin việc
              </button>
            </div>
          </div>

          {/* Result Placeholder */}
          <div className="mt-10 bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-6">
            <h2
              className="text-xl font-extrabold text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Kết quả
            </h2>
            <div className="bg-[#f3f4f6] rounded-3xl p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#003d9b]/5 flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-[#003d9b]/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-sm text-[#434654]/60">
                Thư xin việc sẽ hiển thị tại đây sau khi bạn nhấn &quot;Tạo thư xin việc&quot;
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
