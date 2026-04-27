import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";
import { CandidateCard } from "@/components/candidates/candidate-card";

export const metadata: Metadata = {
  title: "Ứng viên",
  description:
    "Tìm kiếm và kết nối với những ứng viên xuất sắc nhất. Khám phá hồ sơ ứng viên phù hợp cho đội ngũ của bạn.",
};

const skillFilters = [
  "Content Strategy",
  "SEO",
  "UX Writing",
  "Copywriting",
  "Editorial",
  "Marketing",
];

const experienceLevels = ["1-2 năm", "3-5 năm", "5-10 năm", "10+ năm"];

const availabilityOptions = ["Sẵn sàng ngay", "2 tuần", "1 tháng", "Đang làm việc"];

export default async function UngVienPage() {
  const supabase = await createClient();
  const { data: candidates } = await supabase
    .from("profiles")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f9fb]">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1
              className="text-5xl font-extrabold tracking-tighter text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Tìm kiếm <span className="italic text-[#1557ff]">Nhân tài</span>.
              Kiến tạo Tương lai.
            </h1>
            <p className="text-lg text-[#434654] max-w-2xl mx-auto">
              Khám phá những ứng viên xuất sắc nhất cho đội ngũ của bạn
            </p>

            {/* Search Bar */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-4 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Kỹ năng, vị trí..."
                className="flex-1 bg-[#f3f4f6] rounded-xl px-5 py-3.5 text-sm text-[#191c1e] placeholder:text-[#434654]/60 outline-none"
              />
              <input
                type="text"
                placeholder="Địa điểm"
                className="md:w-48 bg-[#f3f4f6] rounded-xl px-5 py-3.5 text-sm text-[#191c1e] placeholder:text-[#434654]/60 outline-none"
              />
              <button
                className="kinetic-gradient text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-72 shrink-0 space-y-8">
              {/* Skills */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-5">
                <h3
                  className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Kỹ năng
                </h3>
                <div className="space-y-3">
                  {skillFilters.map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center gap-3 text-sm text-[#434654] cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded-lg bg-[#f3f4f6] flex items-center justify-center shrink-0">
                        <span className="w-2.5 h-2.5 rounded-sm bg-transparent" />
                      </span>
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-5">
                <h3
                  className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Kinh nghiệm
                </h3>
                <div className="space-y-3">
                  {experienceLevels.map((level) => (
                    <label
                      key={level}
                      className="flex items-center gap-3 text-sm text-[#434654] cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded-lg bg-[#f3f4f6] flex items-center justify-center shrink-0">
                        <span className="w-2.5 h-2.5 rounded-sm bg-transparent" />
                      </span>
                      {level}
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Chips */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-5">
                <h3
                  className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Khả dụng
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availabilityOptions.map((opt) => (
                    <span
                      key={opt}
                      className="px-4 py-2 text-xs font-semibold text-[#1557ff] bg-[#f3f4f6] rounded-2xl cursor-pointer hover:bg-[#1557ff]/10 transition-colors"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

            {/* Candidate Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              {(!candidates || candidates.length === 0) ? (
                <div className="md:col-span-2 bg-white/80 backdrop-blur-xl rounded-[40px] p-12 text-center space-y-4">
                  <p
                    className="text-xl font-extrabold text-[#191c1e]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Chưa có ứng viên nào publish
                  </p>
                  <p className="text-sm text-[#434654]">
                    Hãy là người đầu tiên!
                  </p>
                </div>
              ) : (
                candidates.map((c) => <CandidateCard key={c.id} c={c} />)
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
