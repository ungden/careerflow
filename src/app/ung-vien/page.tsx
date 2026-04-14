import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";

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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("");
}

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
              Tìm kiếm <span className="italic text-[#003d9b]">Nhân tài</span>.
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
                      className="px-4 py-2 text-xs font-semibold text-[#003d9b] bg-[#f3f4f6] rounded-2xl cursor-pointer hover:bg-[#003d9b]/10 transition-colors"
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
                candidates.map((c) => (
                  <div
                    key={c.id}
                    className="relative bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-5 hover:shadow-lg transition-shadow"
                  >
                    {/* Featured Badge */}
                    {c.subscription_tier === "pro" && (
                      <span
                        className="absolute top-6 right-6 px-4 py-1.5 text-xs font-bold text-white rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, #003d9b 0%, #0052cc 100%)",
                        }}
                      >
                        Nổi bật
                      </span>
                    )}

                    {/* Photo or Initials */}
                    <div className="w-20 h-20 rounded-full bg-[#f3f4f6] flex items-center justify-center overflow-hidden">
                      {c.photo_url ? (
                        <Image
                          src={c.photo_url}
                          alt={c.full_name ?? "Ứng viên"}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-black text-[#003d9b]/30">
                          {getInitials(c.full_name ?? "UV")}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="space-y-1">
                      <h2
                        className="text-xl font-extrabold text-[#191c1e]"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {c.full_name}
                      </h2>
                      {c.headline && (
                        <p className="text-sm text-[#434654]">{c.headline}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#434654]/70">
                        {c.location && <span>{c.location}</span>}
                        {c.location && c.experience_level && (
                          <span>&middot;</span>
                        )}
                        {c.experience_level && <span>{c.experience_level}</span>}
                      </div>
                      {c.industry && (
                        <span className="inline-block mt-1 px-3 py-1 text-xs font-medium bg-[#003d9b]/5 text-[#003d9b] rounded-xl">
                          {c.industry}
                        </span>
                      )}
                    </div>

                    {/* Skills */}
                    {c.skills && Array.isArray(c.skills) && c.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {(c.skills as string[]).map((skill: string) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 text-xs font-medium bg-[#003d9b]/5 text-[#003d9b] rounded-xl"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <Link
                        href={`/ung-vien/${c.slug}`}
                        className="flex-1 text-center px-5 py-3 text-sm font-bold text-[#003d9b] bg-[#f3f4f6] rounded-2xl hover:bg-[#003d9b]/10 transition-colors"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        Xem Profile
                      </Link>
                      <button
                        className="flex-1 text-center kinetic-gradient text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-md hover:opacity-90 transition-all"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        Liên hệ
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
