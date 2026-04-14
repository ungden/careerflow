import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "AI Review CV",
  description:
    "Đánh giá CV của bạn bằng trí tuệ nhân tạo. Nhận phản hồi chi tiết và gợi ý cải thiện để CV của bạn nổi bật hơn.",
};

export default function DanhGiaCVPage() {
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
            <span className="text-[#191c1e] font-medium">AI Review CV</span>
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
              AI Review CV
            </h1>
            <p className="text-lg text-[#434654] max-w-2xl mx-auto leading-relaxed">
              Tải lên CV của bạn và nhận phân tích chi tiết từ AI. Chúng tôi sẽ đánh giá
              nội dung, bố cục, từ khóa và đưa ra gợi ý cải thiện cụ thể để tăng cơ hội
              được mời phỏng vấn.
            </p>
          </div>

          {/* Upload Area */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-8">
            <h2
              className="text-xl font-extrabold text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Chọn CV của bạn
            </h2>

            {/* Drop zone placeholder */}
            <div className="border-2 border-dashed border-[#003d9b]/20 rounded-3xl p-12 text-center space-y-4 hover:border-[#003d9b]/40 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-[#003d9b]/5 flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-[#003d9b]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <p className="text-[#434654] font-medium">
                Kéo thả file CV vào đây hoặc nhấn để chọn file
              </p>
              <p className="text-sm text-[#434654]/60">
                Hỗ trợ định dạng PDF, DOC, DOCX (tối đa 10MB)
              </p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <h3
                className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Tùy chọn đánh giá
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Phân tích từ khóa ATS",
                  "Đánh giá bố cục & thiết kế",
                  "Kiểm tra ngữ pháp & chính tả",
                  "So sánh với tiêu chuẩn ngành",
                ].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 bg-[#f3f4f6] rounded-2xl px-5 py-3.5 text-sm text-[#434654] cursor-pointer hover:bg-[#003d9b]/5 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-lg border-2 border-[#003d9b]/20 flex items-center justify-center shrink-0">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#003d9b]" />
                    </span>
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-4">
              <button
                className="kinetic-gradient text-white font-extrabold text-lg px-12 py-5 rounded-2xl shadow-2xl hover:opacity-90 hover:scale-[1.02] transition-all"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Bắt đầu đánh giá
              </button>
            </div>
          </div>

          {/* How it works */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Tải lên CV",
                description: "Chọn file CV định dạng PDF hoặc Word của bạn.",
              },
              {
                step: "02",
                title: "AI phân tích",
                description: "Hệ thống AI sẽ phân tích toàn diện nội dung và hình thức CV.",
              },
              {
                step: "03",
                title: "Nhận kết quả",
                description: "Xem báo cáo chi tiết với điểm số và gợi ý cải thiện cụ thể.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-4"
              >
                <span
                  className="text-4xl font-black text-[#003d9b]/10"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {item.step}
                </span>
                <h3
                  className="text-lg font-extrabold text-[#191c1e]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#434654] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
