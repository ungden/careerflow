import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Luyện phỏng vấn AI",
  description:
    "Luyện tập phỏng vấn với AI. Chọn ngành nghề và vị trí, nhận câu hỏi phỏng vấn và phản hồi chi tiết.",
};

export default function PhongVanPage() {
  const industries = [
    "Công nghệ thông tin",
    "Truyền thông & Marketing",
    "Tài chính & Ngân hàng",
    "Giáo dục & Đào tạo",
    "Thiết kế & Sáng tạo",
    "Bán hàng & Kinh doanh",
  ];

  const positions = [
    "Intern / Thực tập sinh",
    "Junior / Nhân viên mới",
    "Mid-level / Chuyên viên",
    "Senior / Chuyên gia",
    "Lead / Trưởng nhóm",
    "Manager / Quản lý",
  ];

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
            <span className="text-[#191c1e] font-medium">Luyện phỏng vấn AI</span>
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
              Luyện phỏng vấn AI
            </h1>
            <p className="text-lg text-[#434654] max-w-2xl mx-auto leading-relaxed">
              Chuẩn bị cho buổi phỏng vấn tiếp theo với AI. Chọn ngành nghề và vị trí,
              sau đó luyện tập trả lời các câu hỏi phỏng vấn thực tế.
            </p>
          </div>

          {/* Setup Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-8">
            <h2
              className="text-xl font-extrabold text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Thiết lập buổi luyện tập
            </h2>

            {/* Ngành nghề */}
            <div className="space-y-3">
              <label
                className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Ngành nghề
              </label>
              <div className="flex flex-wrap gap-3">
                {industries.map((ind) => (
                  <span
                    key={ind}
                    className="px-5 py-2.5 text-sm font-semibold text-[#003d9b] bg-[#f3f4f6] rounded-2xl cursor-pointer hover:bg-[#003d9b]/10 transition-colors"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Vị trí */}
            <div className="space-y-3">
              <label
                className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Cấp bậc ứng tuyển
              </label>
              <div className="flex flex-wrap gap-3">
                {positions.map((pos) => (
                  <span
                    key={pos}
                    className="px-5 py-2.5 text-sm font-semibold text-[#003d9b] bg-[#f3f4f6] rounded-2xl cursor-pointer hover:bg-[#003d9b]/10 transition-colors"
                  >
                    {pos}
                  </span>
                ))}
              </div>
            </div>

            {/* Loại phỏng vấn */}
            <div className="space-y-3">
              <label
                className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Loại phỏng vấn
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    title: "Hành vi (Behavioral)",
                    desc: "Câu hỏi về kinh nghiệm và cách xử lý tình huống",
                  },
                  {
                    title: "Kỹ thuật (Technical)",
                    desc: "Câu hỏi chuyên môn theo ngành nghề",
                  },
                  {
                    title: "Tình huống (Situational)",
                    desc: "Câu hỏi giả định, đánh giá tư duy giải quyết vấn đề",
                  },
                  {
                    title: "Tổng hợp (Mixed)",
                    desc: "Kết hợp nhiều loại câu hỏi khác nhau",
                  },
                ].map((type) => (
                  <div
                    key={type.title}
                    className="bg-[#f3f4f6] rounded-2xl p-5 cursor-pointer hover:bg-[#003d9b]/5 transition-colors space-y-1"
                  >
                    <p className="text-sm font-bold text-[#191c1e]">{type.title}</p>
                    <p className="text-xs text-[#434654]">{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-4">
              <button
                className="kinetic-gradient text-white font-extrabold text-lg px-12 py-5 rounded-2xl shadow-2xl hover:opacity-90 hover:scale-[1.02] transition-all"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Bắt đầu luyện tập
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Câu hỏi thực tế",
                description:
                  "Câu hỏi được tổng hợp từ các buổi phỏng vấn thực tế tại các công ty hàng đầu.",
              },
              {
                title: "Phản hồi chi tiết",
                description:
                  "AI đánh giá câu trả lời và đưa ra gợi ý cải thiện cụ thể cho bạn.",
              },
              {
                title: "Luyện tập không giới hạn",
                description:
                  "Thực hành bao nhiêu lần tùy thích cho đến khi bạn tự tin hoàn toàn.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-4"
              >
                <h3
                  className="text-lg font-extrabold text-[#191c1e]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-[#434654] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
