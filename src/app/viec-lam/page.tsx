import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Việc làm",
  description:
    "Khám phá hàng ngàn cơ hội việc làm từ các công ty hàng đầu Việt Nam. Tìm kiếm việc làm phù hợp với kỹ năng và kinh nghiệm của bạn.",
};

const jobs = [
  {
    id: 1,
    title: "Senior Content Strategist",
    company: "VNG Corporation",
    salary: "35 - 50 triệu",
    location: "TP. Hồ Chí Minh",
    type: "Full-time",
    tags: ["Content", "Strategy", "SEO"],
  },
  {
    id: 2,
    title: "Editorial Manager",
    company: "FPT Software",
    salary: "40 - 60 triệu",
    location: "Hà Nội",
    type: "Full-time",
    tags: ["Editorial", "Management", "Brand"],
  },
  {
    id: 3,
    title: "UX Writer & Content Designer",
    company: "Tiki",
    salary: "25 - 40 triệu",
    location: "TP. Hồ Chí Minh",
    type: "Remote",
    tags: ["UX Writing", "Design", "Product"],
  },
];

const industries = [
  "Công nghệ",
  "Truyền thông",
  "Marketing",
  "Giáo dục",
  "Tài chính",
];

const jobTypes = ["Full-time", "Part-time", "Remote", "Freelance"];

export default function ViecLamPage() {
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
              Kiến tạo sự nghiệp{" "}
              <span className="italic text-[#003d9b]">Editorial</span> của bạn.
            </h1>
            <p className="text-lg text-[#434654] max-w-2xl mx-auto">
              Khám phá hàng ngàn cơ hội việc làm từ các công ty hàng đầu Việt Nam
            </p>

            {/* Search Bar */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-4 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Vị trí, từ khóa..."
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
              {/* Industry */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-5">
                <h3
                  className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Ngành nghề
                </h3>
                <div className="space-y-3">
                  {industries.map((ind) => (
                    <label
                      key={ind}
                      className="flex items-center gap-3 text-sm text-[#434654] cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded-lg bg-[#f3f4f6] flex items-center justify-center shrink-0">
                        <span className="w-2.5 h-2.5 rounded-sm bg-transparent" />
                      </span>
                      {ind}
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-5">
                <h3
                  className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Mức lương
                </h3>
                <div className="space-y-2">
                  <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "60%",
                        background:
                          "linear-gradient(135deg, #003d9b 0%, #0052cc 100%)",
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-[#434654]">
                    <span>5 triệu</span>
                    <span>100 triệu+</span>
                  </div>
                </div>
              </div>

              {/* Job Type Chips */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-5">
                <h3
                  className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Hình thức
                </h3>
                <div className="flex flex-wrap gap-2">
                  {jobTypes.map((jt) => (
                    <span
                      key={jt}
                      className="px-4 py-2 text-xs font-semibold text-[#003d9b] bg-[#f3f4f6] rounded-2xl cursor-pointer hover:bg-[#003d9b]/10 transition-colors"
                    >
                      {jt}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

            {/* Job Cards */}
            <div className="flex-1 space-y-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-lg transition-shadow"
                >
                  {/* Logo Placeholder */}
                  <div className="w-16 h-16 rounded-2xl bg-[#f3f4f6] flex items-center justify-center shrink-0">
                    <span className="text-2xl font-black text-[#003d9b]/30">
                      {job.company.charAt(0)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-2">
                    <h2
                      className="text-xl font-extrabold text-[#191c1e]"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {job.title}
                    </h2>
                    <p className="text-sm text-[#434654]">{job.company}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-3 py-1 text-xs font-medium bg-[#f3f4f6] text-[#434654] rounded-xl">
                        {job.location}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-[#f3f4f6] text-[#434654] rounded-xl">
                        {job.type}
                      </span>
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-[#003d9b]/5 text-[#003d9b] rounded-xl"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Salary + CTA */}
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <span
                      className="text-lg font-black text-[#003d9b]"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {job.salary}
                    </span>
                    <Link
                      href={`/viec-lam/${job.id}`}
                      className="kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md hover:opacity-90 transition-all"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      Ứng tuyển 1-click
                    </Link>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-3 pt-8">
                <button className="w-10 h-10 rounded-xl bg-[#f3f4f6] text-sm font-semibold text-[#434654] hover:bg-[#003d9b]/10 transition-colors">
                  1
                </button>
                <button className="w-10 h-10 rounded-xl bg-[#003d9b] text-sm font-bold text-white">
                  2
                </button>
                <button className="w-10 h-10 rounded-xl bg-[#f3f4f6] text-sm font-semibold text-[#434654] hover:bg-[#003d9b]/10 transition-colors">
                  3
                </button>
                <span className="text-[#434654] text-sm">...</span>
                <button className="w-10 h-10 rounded-xl bg-[#f3f4f6] text-sm font-semibold text-[#434654] hover:bg-[#003d9b]/10 transition-colors">
                  12
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
