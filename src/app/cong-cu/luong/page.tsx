"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface SalaryResult {
  salary_min: number;
  salary_median: number;
  salary_max: number;
  insights: string;
}

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

  const locations = [
    "TP. Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Cần Thơ",
    "Hải Phòng",
    "Khác",
  ];

  const [industry, setIndustry] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [error, setError] = useState("");

  async function handleEstimate() {
    if (!industry || !position) {
      setError("Vui lòng chọn ngành nghề và cấp bậc.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ai/salary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, position, experience, location }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Đã xảy ra lỗi.");
        return;
      }

      setResult(data);
    } catch {
      setError("Không thể kết nối đến server. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  const maxSalary = result ? result.salary_max * 1.1 : 100;

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
              <span className="text-xs font-bold uppercase tracking-widest">AI-Powered</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              So sánh lương
            </h1>
            <p className="text-lg text-[#434654] max-w-2xl mx-auto leading-relaxed">
              Tìm hiểu mức lương phù hợp với vị trí và kinh nghiệm của bạn.
              AI sẽ ước tính dựa trên dữ liệu thị trường lao động Việt Nam.
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ngành nghề */}
              <div className="space-y-3">
                <label
                  className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Ngành nghề
                </label>
                <div className="bg-[#f3f4f6] rounded-2xl px-5 py-3.5 text-sm text-[#434654]">
                  <select
                    className="w-full bg-transparent outline-none cursor-pointer"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
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
                  <select
                    className="w-full bg-transparent outline-none cursor-pointer"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
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
                  <select
                    className="w-full bg-transparent outline-none cursor-pointer"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <option value="">Chọn kinh nghiệm</option>
                    {experienceLevels.map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Khu vực */}
              <div className="space-y-3">
                <label
                  className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Khu vực
                </label>
                <div className="bg-[#f3f4f6] rounded-2xl px-5 py-3.5 text-sm text-[#434654]">
                  <select
                    className="w-full bg-transparent outline-none cursor-pointer"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Chọn khu vực</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-700 rounded-2xl px-5 py-4 text-sm">
                {error}
              </div>
            )}

            {/* CTA */}
            <div className="text-center pt-2">
              <button
                onClick={handleEstimate}
                disabled={loading}
                className="kinetic-gradient text-white font-extrabold text-base px-10 py-4 rounded-2xl shadow-lg hover:opacity-90 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang phân tích...
                  </span>
                ) : (
                  "Xem kết quả"
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <>
              {/* Salary Range Visual */}
              <div className="mt-10 bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-8">
                <h2
                  className="text-xl font-extrabold text-[#191c1e]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Kết quả ước tính lương
                </h2>

                {/* Visual salary bar */}
                <div className="space-y-6">
                  <div className="relative h-16 bg-[#f3f4f6] rounded-2xl overflow-hidden">
                    {/* Min to Max range */}
                    <div
                      className="absolute top-0 h-full rounded-2xl"
                      style={{
                        left: `${(result.salary_min / maxSalary) * 100}%`,
                        width: `${((result.salary_max - result.salary_min) / maxSalary) * 100}%`,
                        background: "linear-gradient(135deg, #003d9b20 0%, #003d9b40 100%)",
                      }}
                    />
                    {/* Median marker */}
                    <div
                      className="absolute top-0 h-full w-1 bg-[#003d9b]"
                      style={{
                        left: `${(result.salary_median / maxSalary) * 100}%`,
                      }}
                    />
                    {/* Median label */}
                    <div
                      className="absolute -top-1 transform -translate-x-1/2"
                      style={{
                        left: `${(result.salary_median / maxSalary) * 100}%`,
                      }}
                    >
                      <div className="bg-[#003d9b] text-white text-xs font-bold px-2 py-1 rounded-lg">
                        {result.salary_median}tr
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="flex justify-between text-sm">
                    <div className="text-center">
                      <p className="text-[#434654] text-xs">Thấp nhất</p>
                      <p className="font-bold text-[#191c1e]">{result.salary_min} triệu</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#003d9b] text-xs font-semibold">Trung bình</p>
                      <p className="font-bold text-[#003d9b] text-lg">{result.salary_median} triệu</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#434654] text-xs">Cao nhất</p>
                      <p className="font-bold text-[#191c1e]">{result.salary_max} triệu</p>
                    </div>
                  </div>
                </div>

                {/* Insights */}
                <div className="bg-[#f0f9ff] rounded-3xl p-6 space-y-3">
                  <h3
                    className="text-sm font-extrabold text-[#003d9b] uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Phân tích chi tiết
                  </h3>
                  <p className="text-sm text-[#434654] leading-relaxed whitespace-pre-wrap">
                    {result.insights}
                  </p>
                </div>
              </div>

              {/* Stats cards */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    label: "Lương thấp nhất",
                    value: `${result.salary_min} triệu`,
                    sub: "VND / tháng",
                  },
                  {
                    label: "Lương trung bình",
                    value: `${result.salary_median} triệu`,
                    sub: "VND / tháng",
                    highlight: true,
                  },
                  {
                    label: "Lương cao nhất",
                    value: `${result.salary_max} triệu`,
                    sub: "VND / tháng",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`backdrop-blur-xl rounded-[40px] p-8 text-center space-y-2 ${
                      stat.highlight
                        ? "bg-[#003d9b] text-white"
                        : "bg-white/80"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        stat.highlight ? "text-white/80" : "text-[#434654]"
                      }`}
                    >
                      {stat.label}
                    </p>
                    <p
                      className={`text-3xl font-black ${
                        stat.highlight ? "text-white" : "text-[#003d9b]"
                      }`}
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className={`text-xs ${
                        stat.highlight ? "text-white/60" : "text-[#434654]/60"
                      }`}
                    >
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Placeholder when no results */}
          {!result && !loading && (
            <div className="mt-10 bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-6">
              <h2
                className="text-xl font-extrabold text-[#191c1e]"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Biểu đồ mức lương
              </h2>
              <div className="bg-[#f3f4f6] rounded-3xl p-12 space-y-6">
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
                  Chọn tiêu chí phía trên để xem ước tính lương chi tiết
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
