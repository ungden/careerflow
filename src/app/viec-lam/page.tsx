import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";
import { JobCardRow } from "@/components/jobs/job-card-row";

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

  // Pre-load viewer's primary CV + already-applied set so each card can
  // render a real 1-click apply button instead of a generic CTA.
  const {
    data: { user: viewer },
  } = await supabase.auth.getUser();

  let primaryCvId: string | null = null;
  let appliedSet = new Set<string>();
  if (viewer) {
    const { data: pcv } = await supabase
      .from("cvs")
      .select("id")
      .eq("user_id", viewer.id)
      .eq("is_primary", true)
      .maybeSingle();
    primaryCvId = pcv?.id ?? null;

    const jobIds = (jobs ?? []).map((j) => j.id);
    if (jobIds.length > 0) {
      const { data: applied } = await supabase
        .from("applications")
        .select("job_id")
        .eq("candidate_id", viewer.id)
        .in("job_id", jobIds);
      appliedSet = new Set((applied ?? []).map((a) => a.job_id));
    }
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
                jobs.map((job) => (
                  <JobCardRow
                    key={job.id}
                    job={job}
                    showApply={Boolean(viewer)}
                    primaryCvId={primaryCvId}
                    alreadyApplied={appliedSet.has(job.id)}
                  />
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
