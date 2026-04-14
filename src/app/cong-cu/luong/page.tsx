import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "So sánh lương",
  description:
    "So sánh mức lương theo ngành nghề, vị trí và kinh nghiệm. Tìm hiểu mức lương phù hợp với bạn trên thị trường lao động Việt Nam.",
};

export default function SoSanhLuongPage() {
  const industries = [
    "Công nghệ thông tin",
    "Truyền thông & Marketing",
    "Tài chính & Ngân hàng",
    "Giáo dục & Đào tạo",
    "Sản xuất & Chế tạo",
  ];

  const positions = [
    "Nhân viên",
    "Chuyên viên",
    "Trưởng nhóm",
    "Quản lý",
    "Giám đốc",
  ];

  const experienceLevels = [
    "Dưới 1 năm",
    "1 - 3 năm",
    "3 - 5 năm",
    "5 - 10 năm",
    "Trên 10 năm",
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
            <span className="text-[#191c1e] font-medium">So sánh lương</span>
          </nav>

          {/* Hero */}
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 bg-[#dae2ff] text-[#001848] px-4 py-2 rounded-full">
              <span className="text-xs font-bold uppercase tracking-widest">Dữ liệu thị trường</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              So sánh lương
            </h1>
            <p className="text-lg text-[#434654] max-w-2xl mx-auto leading-relaxed">
              Tìm hiểu mức lương phù hợp với vị trí và kinh nghiệm của bạn.
              Dữ liệu được tổng hợp từ hàng ngàn tin tuyển dụng trên thị trường.
            </p>
          </div>

          {/* Filter Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-8">
            <h2
              className="text-xl font-extrabold text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Chọn tiêu chí so sánh
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Ngành nghề */}
              <div className="space-y-3">
                <label
                  className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Ngành nghề
                </label>
                <div className="bg-[#f3f4f6] rounded-2xl px-5 py-3.5 text-sm text-[#434654]">
                  <select className="w-full bg-transparent outline-none cursor-pointer">
                    <option value="">Chọn ngành nghề</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vị trí */}
              <div className="space-y-3">
                <label
                  className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Cấp bậc
                </label>
                <div className="bg-[#f3f4f6] rounded-2xl px-5 py-3.5 text-sm text-[#434654]">
                  <select className="w-full bg-transparent outline-none cursor-pointer">
                    <option value="">Chọn cấp bậc</option>
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Kinh nghiệm */}
              <div className="space-y-3">
                <label
                  className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Kinh nghiệm
                </label>
                <div className="bg-[#f3f4f6] rounded-2xl px-5 py-3.5 text-sm text-[#434654]">
                  <select className="w-full bg-transparent outline-none cursor-pointer">
                    <option value="">Chọn kinh nghiệm</option>
                    {experienceLevels.map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-2">
              <button
                className="kinetic-gradient text-white font-extrabold text-base px-10 py-4 rounded-2xl shadow-lg hover:opacity-90 hover:scale-[1.02] transition-all"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Xem kết quả
              </button>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="mt-10 bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-6">
            <h2
              className="text-xl font-extrabold text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Biểu đồ mức lương
            </h2>
            <div className="bg-[#f3f4f6] rounded-3xl p-12 space-y-6">
              {/* Bar chart placeholder */}
              <div className="flex items-end gap-4 justify-center h-48">
                {[40, 65, 80, 55, 90, 70, 45].map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className="w-10 rounded-t-xl transition-all"
                      style={{
                        height: `${h}%`,
                        background:
                          i === 4
                            ? "linear-gradient(135deg, #003d9b 0%, #0052cc 100%)"
                            : "#003d9b20",
                      }}
                    />
                    <span className="text-xs text-[#434654]">
                      {["P10", "P25", "P50", "P60", "P75", "P90", "P95"][i]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-[#434654]/60">
                Chọn tiêu chí phía trên để xem biểu đồ so sánh lương chi tiết
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Lương trung bình", value: "18.5 triệu", sub: "VND / tháng" },
              { label: "Lương cao nhất", value: "65 triệu", sub: "VND / tháng" },
              { label: "Số mẫu khảo sát", value: "12,450", sub: "tin tuyển dụng" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 text-center space-y-2"
              >
                <p className="text-sm text-[#434654] font-medium">{stat.label}</p>
                <p
                  className="text-3xl font-black text-[#003d9b]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-[#434654]/60">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
