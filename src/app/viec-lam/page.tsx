import Link from "next/link";
import type { Metadata } from "next";
import { Search, MapPin, Briefcase, Filter } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";
import { OneClickApplyButton } from "@/components/jobs/one-click-apply-button";

export const metadata: Metadata = {
  title: "Việc làm",
  description:
    "Khám phá hàng ngàn cơ hội việc làm từ các công ty hàng đầu Việt Nam, lọc theo địa điểm, ngành nghề, mức lương và độ phù hợp với CV.",
};

const INDUSTRIES = [
  "Công nghệ thông tin",
  "Marketing - Truyền thông",
  "Tài chính - Ngân hàng",
  "Thiết kế - Sáng tạo",
  "Bán hàng - Kinh doanh",
  "Giáo dục - Đào tạo",
];

function formatSalary(min?: number | null, max?: number | null) {
  if (min && max) return `${(min / 1_000_000).toFixed(0)} - ${(max / 1_000_000).toFixed(0)} triệu`;
  if (min) return `Từ ${(min / 1_000_000).toFixed(0)} triệu`;
  if (max) return `Đến ${(max / 1_000_000).toFixed(0)} triệu`;
  return "Thỏa thuận";
}

const JOB_TYPE_LABELS: Record<string, string> = {
  "full-time": "Toàn thời gian",
  "part-time": "Bán thời gian",
  contract: "Hợp đồng",
  internship: "Thực tập",
  remote: "Remote",
};

function buildFilterUrl(
  current: { q?: string; industry?: string; location?: string },
  overrides: Partial<{ q?: string; industry?: string; location?: string }>
) {
  const merged = { ...current, ...overrides };
  const params = new URLSearchParams();
  if (merged.q) params.set("q", merged.q);
  if (merged.industry) params.set("industry", merged.industry);
  if (merged.location) params.set("location", merged.location);
  const qs = params.toString();
  return qs ? `/viec-lam?${qs}` : "/viec-lam";
}

export default async function ViecLamPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; industry?: string; location?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("jobs")
    .select(
      "id, slug, title, location, job_type, industry, salary_min, salary_max, is_featured, created_at, company:companies(name, logo_url)"
    )
    .eq("is_active", true);
  if (params.q) query = query.ilike("title", `%${params.q}%`);
  if (params.industry) query = query.eq("industry", params.industry);
  if (params.location) query = query.eq("location", params.location);

  const { data: jobs } = await query
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

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
      <main className="bg-[#f8fbff] text-[#07122f]">
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              Job Board
            </p>
            <h1
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Tìm việc phù hợp với CV của bạn
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              {jobs?.length ?? 0} vị trí đang tuyển. Lọc theo địa điểm, ngành,
              mức lương — và xem AI đánh giá độ phù hợp.
            </p>
          </header>

          {/* Filter bar */}
          <form
            action="/viec-lam"
            method="GET"
            className="mb-8 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm md:flex-row md:items-center"
          >
            <div className="flex flex-1 items-center gap-2 rounded-md border border-slate-200 px-3">
              <Search size={18} className="text-slate-400" />
              <input
                name="q"
                defaultValue={params.q ?? ""}
                placeholder="Vị trí, công ty, kỹ năng..."
                className="h-11 flex-1 bg-transparent text-sm font-bold outline-none placeholder:font-normal placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 rounded-md border border-slate-200 px-3 md:w-56">
              <MapPin size={18} className="text-slate-400" />
              <input
                name="location"
                defaultValue={params.location ?? ""}
                placeholder="Địa điểm"
                className="h-11 flex-1 bg-transparent text-sm font-bold outline-none placeholder:font-normal placeholder:text-slate-400"
              />
            </div>
            {params.industry && (
              <input type="hidden" name="industry" value={params.industry} />
            )}
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1557ff] px-6 text-sm font-bold text-white shadow-sm shadow-blue-500/25 hover:bg-[#0e3fd5]"
            >
              <Filter size={16} /> Lọc
            </button>
          </form>

          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <aside className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-black uppercase tracking-wider text-slate-700">
                  Ngành nghề
                </p>
                <ul className="mt-3 space-y-1.5">
                  {INDUSTRIES.map((ind) => {
                    const active = params.industry === ind;
                    const href = buildFilterUrl(params, {
                      industry: active ? undefined : ind,
                    });
                    return (
                      <li key={ind}>
                        <Link
                          href={href}
                          className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm font-bold ${
                            active
                              ? "bg-blue-50 text-[#1557ff]"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              active ? "bg-[#1557ff]" : "bg-slate-300"
                            }`}
                          />
                          {ind}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-5 shadow-sm">
                <p className="text-xs font-black uppercase text-[#1557ff]">
                  Tip
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Dán JD vào <Link href="/cong-cu/jd-match" className="font-black text-[#1557ff] hover:underline">JD Match</Link> để xem CV của bạn match bao nhiêu % trước khi apply.
                </p>
              </div>
            </aside>

            {/* List */}
            <div className="space-y-4">
              {(!jobs || jobs.length === 0) ? (
                <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-slate-500">
                  Chưa có vị trí phù hợp. Thử bỏ bớt filter.
                </div>
              ) : (
                jobs.map((job) => {
                  const company = (job.company as { name?: string; logo_url?: string } | null) || {};
                  return (
                    <Link
                      key={job.id}
                      href={`/viec-lam/${job.slug}`}
                      className="group flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md sm:flex-row sm:items-center"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-blue-50 text-xl font-black text-[#1557ff]">
                        {company.name?.[0] ?? "C"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3
                              className="text-lg font-black text-[#07122f] group-hover:text-[#1557ff]"
                              style={{ fontFamily: "var(--font-headline)" }}
                            >
                              {job.title}
                            </h3>
                            <p className="text-sm font-bold text-slate-600">
                              {company.name ?? "Công ty"}
                            </p>
                          </div>
                          {job.is_featured && (
                            <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
                          {job.location && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
                              <MapPin size={12} />
                              {job.location}
                            </span>
                          )}
                          {job.job_type && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
                              <Briefcase size={12} />
                              {JOB_TYPE_LABELS[job.job_type] ?? job.job_type}
                            </span>
                          )}
                          {job.industry && (
                            <span className="rounded-md bg-blue-50 px-2 py-1 text-[#1557ff]">
                              {job.industry}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3 text-right">
                        <div>
                          <p className="text-base font-black text-[#1557ff]">
                            {formatSalary(job.salary_min, job.salary_max)}
                          </p>
                          <p className="mt-1 text-xs font-bold text-slate-400">
                            {new Date(job.created_at).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                        {viewer && primaryCvId ? (
                          <OneClickApplyButton
                            jobId={job.id}
                            cvId={primaryCvId}
                            alreadyApplied={appliedSet.has(job.id)}
                            className="inline-flex h-9 items-center justify-center gap-1 rounded-md bg-[#1557ff] px-3 text-xs font-bold text-white shadow-sm shadow-blue-500/25"
                          />
                        ) : (
                          <span className="inline-flex h-9 items-center justify-center gap-1 rounded-md bg-[#1557ff] px-3 text-xs font-bold text-white shadow-sm shadow-blue-500/25">
                            Xem chi tiết
                          </span>
                        )}
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
