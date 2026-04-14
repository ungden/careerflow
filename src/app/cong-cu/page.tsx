import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Công cụ AI",
  description:
    "Bộ công cụ AI thông minh giúp bạn nổi bật hơn: đánh giá CV, so sánh lương, tạo cover letter và luyện phỏng vấn.",
};

const stats = [
  { value: "94%", label: "Hài lòng" },
  { value: "12K+", label: "CV được quét" },
  { value: "3X", label: "Cơ hội việc làm" },
  { value: "24/7", label: "Hỗ trợ AI" },
];

export default function CongCuPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f9fb]">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1
              className="text-5xl font-extrabold tracking-tighter text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Nâng tầm sự nghiệp với{" "}
              <span className="font-black text-[#003d9b]">Bộ công cụ AI</span>
            </h1>
            <p className="text-lg text-[#434654] max-w-2xl mx-auto">
              Công cụ thông minh giúp bạn nổi bật hơn trong mắt nhà tuyển dụng
            </p>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-12 gap-6">
            {/* Card 1: AI Review CV */}
            <div className="col-span-12 md:col-span-6 bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#003d9b]/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#003d9b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-[#191c1e]" style={{ fontFamily: "var(--font-headline)" }}>
                AI Review CV
              </h2>
              <p className="text-sm text-[#434654] leading-relaxed">
                AI phân tích chi tiết CV của bạn, đưa ra gợi ý cải thiện về nội dung, định dạng và từ khóa để tăng cơ hội được nhà tuyển dụng chú ý.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/cong-cu/danh-gia-cv"
                  className="kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md hover:opacity-90 transition-all"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Dùng thử ngay
                </Link>
                <span className="px-5 py-3 text-sm font-bold text-[#003d9b] bg-[#f3f4f6] rounded-2xl">
                  Phổ biến nhất
                </span>
              </div>
            </div>

            {/* Card 2: So sánh lương */}
            <div className="col-span-12 md:col-span-6 bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#004e32]/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#004e32]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-[#191c1e]" style={{ fontFamily: "var(--font-headline)" }}>
                So sánh lương
              </h2>
              <p className="text-sm text-[#434654] leading-relaxed">
                So sánh mức lương của bạn với thị trường. Dữ liệu cập nhật từ hàng ngàn báo cáo lương thực tế.
              </p>
              <Link
                href="/cong-cu/luong"
                className="inline-block kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md hover:opacity-90 transition-all"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Khám phá
              </Link>
            </div>

            {/* Card 3: Tạo Cover Letter */}
            <div className="col-span-12 md:col-span-6 bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#003d9b]/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#003d9b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-[#191c1e]" style={{ fontFamily: "var(--font-headline)" }}>
                Tạo Cover Letter
              </h2>
              <p className="text-sm text-[#434654] leading-relaxed">
                AI tự động tạo thư xin việc chuyên nghiệp dựa trên CV và mô tả công việc bạn muốn ứng tuyển.
              </p>
              <Link
                href="/cong-cu/thu-xin-viec"
                className="inline-block kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md hover:opacity-90 transition-all"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Bắt đầu tạo
              </Link>
            </div>

            {/* Card 4: Luyện phỏng vấn AI */}
            <div className="col-span-12 md:col-span-6 relative bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-6 hover:shadow-lg transition-shadow">
              <span
                className="absolute top-6 right-6 px-4 py-1.5 text-xs font-bold text-white rounded-2xl"
                style={{ background: "linear-gradient(135deg, #004e32 0%, #006b45 100%)" }}
              >
                Tính năng mới
              </span>

              <div className="w-14 h-14 rounded-2xl bg-[#004e32]/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#004e32]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-[#191c1e]" style={{ fontFamily: "var(--font-headline)" }}>
                Luyện phỏng vấn AI
              </h2>
              <p className="text-sm text-[#434654] leading-relaxed">
                Luyện tập phỏng vấn với AI, nhận phản hồi chi tiết về cách trả lời, ngôn ngữ cơ thể và sự tự tin của bạn.
              </p>

              <div className="w-full h-32 rounded-2xl bg-[#f3f4f6] flex items-center justify-center">
                <span className="text-sm text-[#434654]/40 font-medium">
                  Preview phỏng vấn AI
                </span>
              </div>

              <Link
                href="/cong-cu/phong-van"
                className="inline-block kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md hover:opacity-90 transition-all"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Thử ngay
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 text-center space-y-2"
              >
                <div className="text-4xl font-black text-[#003d9b]" style={{ fontFamily: "var(--font-headline)" }}>
                  {stat.value}
                </div>
                <div className="text-sm text-[#434654] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-6 mb-16">
          <div className="max-w-5xl mx-auto bg-[#191c1e] rounded-[40px] p-12 md:p-16 text-center space-y-8">
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Gia nhập cùng 50.000+ ứng viên thành công
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Nâng cấp tài khoản để mở khóa toàn bộ sức mạnh của bộ công cụ AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/bang-gia"
                className="kinetic-gradient text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Nâng cấp Pro
              </Link>
              <Link
                href="/bang-gia"
                className="px-8 py-4 text-sm font-bold text-white bg-white/10 rounded-2xl hover:bg-white/20 transition-colors"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Xem bảng giá
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
