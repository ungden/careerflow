import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Việc làm",
  description:
    "Khám phá hàng ngàn cơ hội việc làm từ các công ty hàng đầu Việt Nam. Tìm kiếm việc làm phù hợp với kỹ năng và kinh nghiệm của bạn.",
};

const industries = [
  "Công nghệ",
  "Truyền thông",
  "Marketing",
  "Giáo dục",
  "Tài chính",
];

const jobTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "remote", label: "Remote" },
  { value: "contract", label: "Freelance" },
];

export default async function ViecLamPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; industry?: string; type?: string; location?: string }>;
}) {
  const params = await searchParams;
  const { q, industry, type, location } = params;

  const supabase = await createClient();
  let query = supabase
    .from("jobs")
    .select("*, company:companies(*)")
    .eq("is_active", true);

  if (q) {
    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
  }
  if (industry) {
    query = query.eq("industry", industry);
  }
  if (type) {
    query = query.eq("job_type", type);
  }
  if (location) {
    query = query.eq("location", location);
  }

  const { data: jobs } = await query.order("created_at", { ascending: false });

  const jobCount = jobs?.length ?? 0;
  const hasFilters = q || industry || type || location;

  function formatSalary(salaryMin?: number | null, salaryMax?: number | null) {
    if (salaryMin && salaryMax) {
      return `${salaryMin / 1000} - ${salaryMax / 1000} triệu`;
    }
    if (salaryMin) {
      return `Từ ${salaryMin / 1000} triệu`;
    }
    if (salaryMax) {
      return `Đến ${salaryMax / 1000} triệu`;
    }
    return "Thỏa thuận";
  }

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
            <form
              method="GET"
              action="/viec-lam"
              className="bg-white/60 backdrop-blur-2xl rounded-2xl p-4 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto"
            >
              <input
                type="text"
                name="q"
                defaultValue={q || ""}
                placeholder="Vị trí, từ khóa..."
                className="flex-1 bg-[#f3f4f6] rounded-xl px-5 py-3.5 text-sm text-[#191c1e] placeholder:text-[#434654]/60 outline-none"
              />
              <input
                type="text"
                name="location"
                defaultValue={location || ""}
                placeholder="Địa điểm"
                className="md:w-48 bg-[#f3f4f6] rounded-xl px-5 py-3.5 text-sm text-[#191c1e] placeholder:text-[#434654]/60 outline-none"
              />
              {/* Preserve existing filters */}
              {industry && <input type="hidden" name="industry" value={industry} />}
              {type && <input type="hidden" name="type" value={type} />}
              <button
                type="submit"
                className="kinetic-gradient text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Tìm kiếm
              </button>
            </form>
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
                  {industries.map((ind) => {
                    const isActive = industry === ind;
                    const href = isActive
                      ? buildFilterUrl(params, { industry: undefined })
                      : buildFilterUrl(params, { industry: ind });

                    return (
                      <Link
                        key={ind}
                        href={href}
                        className="flex items-center gap-3 text-sm text-[#434654] cursor-pointer hover:text-[#003d9b] transition-colors"
                      >
                        <span
                          className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive ? "bg-[#003d9b]" : "bg-[#f3f4f6]"
                          }`}
                        >
                          <span
                            className={`w-2.5 h-2.5 rounded-sm ${
                              isActive ? "bg-white" : "bg-transparent"
                            }`}
                          />
                        </span>
                        <span className={isActive ? "font-semibold text-[#003d9b]" : ""}>
                          {ind}
                        </span>
                      </Link>
                    );
                  })}
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
                  {jobTypes.map((jt) => {
                    const isActive = type === jt.value;
                    const href = isActive
                      ? buildFilterUrl(params, { type: undefined })
                      : buildFilterUrl(params, { type: jt.value });

                    return (
                      <Link
                        key={jt.value}
                        href={href}
                        className={`px-4 py-2 text-xs font-semibold rounded-2xl transition-colors ${
                          isActive
                            ? "bg-[#003d9b] text-white"
                            : "text-[#003d9b] bg-[#f3f4f6] hover:bg-[#003d9b]/10"
                        }`}
                      >
                        {jt.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Clear filters */}
              {hasFilters && (
                <Link
                  href="/viec-lam"
                  className="block text-center text-sm text-[#003d9b] font-semibold hover:underline"
                >
                  Xoá bộ lọc
                </Link>
              )}
            </aside>

            {/* Job Cards */}
            <div className="flex-1 space-y-6">
              {/* Result count */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#434654]">
                  <span className="font-bold text-[#1a1a1a]">{jobCount}</span> việc làm
                  {hasFilters ? " phù hợp" : ""}
                </p>
              </div>

              {(!jobs || jobs.length === 0) ? (
                <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-12 text-center space-y-4">
                  <p
                    className="text-xl font-extrabold text-[#191c1e]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {hasFilters ? "Không tìm thấy việc làm phù hợp" : "Chưa có việc làm nào"}
                  </p>
                  <p className="text-sm text-[#434654]">
                    {hasFilters
                      ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm."
                      : "Hiện tại chưa có vị trí nào đang tuyển dụng. Hãy quay lại sau nhé!"}
                  </p>
                  {hasFilters && (
                    <Link
                      href="/viec-lam"
                      className="inline-block kinetic-gradient text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg hover:opacity-90 transition-all mt-2"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      Xem tất cả việc làm
                    </Link>
                  )}
                </div>
              ) : (
                jobs.map((job) => {
                  const companyName = job.company?.name ?? "Công ty";
                  const companyInitial = companyName.charAt(0);

                  return (
                    <Link
                      key={job.id}
                      href={`/viec-lam/${job.slug}`}
                      className="block bg-white/80 backdrop-blur-xl rounded-[40px] p-8 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-lg hover:bg-white transition-all"
                    >
                      {/* Logo Placeholder */}
                      <div className="w-16 h-16 rounded-2xl bg-[#f3f4f6] flex items-center justify-center shrink-0">
                        <span className="text-2xl font-black text-[#003d9b]/30">
                          {companyInitial}
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
                        <p className="text-sm text-[#434654]">{companyName}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {job.location && (
                            <span className="px-3 py-1 text-xs font-medium bg-[#f3f4f6] text-[#434654] rounded-xl">
                              {job.location}
                            </span>
                          )}
                          {job.job_type && (
                            <span className="px-3 py-1 text-xs font-medium bg-[#f3f4f6] text-[#434654] rounded-xl">
                              {job.job_type}
                            </span>
                          )}
                          {job.industry && (
                            <span className="px-3 py-1 text-xs font-medium bg-[#003d9b]/5 text-[#003d9b] rounded-xl">
                              {job.industry}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Salary + CTA */}
                      <div className="flex flex-col items-end gap-3 shrink-0">
                        <span
                          className="text-lg font-black text-[#003d9b]"
                          style={{ fontFamily: "var(--font-headline)" }}
                        >
                          {formatSalary(job.salary_min, job.salary_max)}
                        </span>
                        <span
                          className="kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition-all"
                          style={{ fontFamily: "var(--font-headline)" }}
                        >
                          Xem chi tiết
                        </span>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function buildFilterUrl(
  current: { q?: string; industry?: string; type?: string; location?: string },
  overrides: Partial<{ q?: string; industry?: string; type?: string; location?: string }>
) {
  const merged = { ...current, ...overrides };
  const params = new URLSearchParams();
  if (merged.q) params.set("q", merged.q);
  if (merged.industry) params.set("industry", merged.industry);
  if (merged.type) params.set("type", merged.type);
  if (merged.location) params.set("location", merged.location);
  const qs = params.toString();
  return qs ? `/viec-lam?${qs}` : "/viec-lam";
}
