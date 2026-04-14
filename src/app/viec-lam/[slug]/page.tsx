import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = decodeURIComponent(slug).replace(/-/g, " ");
  return {
    title: `${title} - Việc làm`,
    description: `Chi tiết việc làm: ${title}. Ứng tuyển ngay trên CareerFlow.`,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const jobTitle = decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f9fb] pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#434654] mb-8">
            <Link href="/viec-lam" className="hover:text-[#003d9b] transition-colors">
              Việc làm
            </Link>
            <span>/</span>
            <span className="text-[#191c1e] font-medium">{jobTitle}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {/* Header Card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-[#f3f4f6] flex items-center justify-center shrink-0">
                    <span className="text-3xl font-black text-[#003d9b]/30">C</span>
                  </div>
                  <div className="space-y-2">
                    <h1
                      className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[#191c1e]"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {jobTitle}
                    </h1>
                    <p className="text-lg text-[#434654]">Công ty mẫu ABC</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-4 py-1.5 text-xs font-medium bg-[#f3f4f6] text-[#434654] rounded-xl">
                        TP. Hồ Chí Minh
                      </span>
                      <span className="px-4 py-1.5 text-xs font-medium bg-[#f3f4f6] text-[#434654] rounded-xl">
                        Full-time
                      </span>
                      <span className="px-4 py-1.5 text-xs font-medium bg-[#003d9b]/5 text-[#003d9b] rounded-xl">
                        Đăng 2 ngày trước
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mô tả công việc */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-6">
                <h2
                  className="text-xl font-extrabold text-[#191c1e]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Mô tả công việc
                </h2>
                <div className="space-y-3 text-[#434654] leading-relaxed">
                  <p>
                    Chúng tôi đang tìm kiếm ứng viên tài năng cho vị trí này.
                    Đây là trang chi tiết việc làm đang được hoàn thiện.
                  </p>
                  <div className="bg-[#f3f4f6] rounded-2xl p-6 text-center text-sm text-[#434654]/60">
                    Nội dung mô tả chi tiết sẽ được cập nhật sớm
                  </div>
                </div>
              </div>

              {/* Yêu cầu */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-6">
                <h2
                  className="text-xl font-extrabold text-[#191c1e]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Yêu cầu ứng viên
                </h2>
                <ul className="space-y-3 text-[#434654]">
                  {[
                    "Tốt nghiệp Đại học trở lên",
                    "Ít nhất 2 năm kinh nghiệm liên quan",
                    "Kỹ năng giao tiếp và làm việc nhóm tốt",
                    "Tiếng Anh giao tiếp",
                  ].map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#003d9b] mt-2 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quyền lợi */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-6">
                <h2
                  className="text-xl font-extrabold text-[#191c1e]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Quyền lợi
                </h2>
                <ul className="space-y-3 text-[#434654]">
                  {[
                    "Lương cạnh tranh, thưởng hiệu suất hấp dẫn",
                    "Bảo hiểm sức khỏe cao cấp",
                    "Cơ hội đào tạo và phát triển nghề nghiệp",
                    "Môi trường làm việc năng động, sáng tạo",
                    "Du lịch, team building hàng năm",
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#004e32] mt-2 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-80 shrink-0 space-y-8">
              {/* Salary & Apply */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-6 lg:sticky lg:top-28">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#434654] uppercase tracking-wide">
                    Mức lương
                  </p>
                  <p
                    className="text-2xl font-black text-[#003d9b]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    25 - 40 triệu
                  </p>
                </div>

                <div className="space-y-3 text-sm text-[#434654]">
                  <div className="flex justify-between">
                    <span>Kinh nghiệm</span>
                    <span className="font-semibold text-[#191c1e]">2 - 5 năm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cấp bậc</span>
                    <span className="font-semibold text-[#191c1e]">Nhân viên</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hình thức</span>
                    <span className="font-semibold text-[#191c1e]">Full-time</span>
                  </div>
                </div>

                <button
                  className="w-full kinetic-gradient text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Ứng tuyển ngay
                </button>

                <button className="w-full bg-[#f3f4f6] text-[#191c1e] font-bold text-sm px-8 py-3.5 rounded-2xl hover:bg-[#e5e7eb] transition-colors">
                  Lưu việc làm
                </button>
              </div>

              {/* Thông tin công ty */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-4">
                <h3
                  className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Về công ty
                </h3>
                <div className="space-y-3 text-sm text-[#434654]">
                  <p>Công ty mẫu ABC</p>
                  <div className="bg-[#f3f4f6] rounded-2xl p-4 text-center text-xs text-[#434654]/60">
                    Thông tin công ty sẽ được cập nhật
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
