import Link from "next/link";
import { Search, MapPin, Briefcase, Filter } from "lucide-react";
import { Shell } from "@/components/cvai/cvai-app";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Việc làm — YourCV",
};

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

export default async function V2JobsBoardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; industry?: string; location?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("jobs")
    .select("id, slug, title, location, job_type, industry, salary_min, salary_max, is_featured, created_at, company:companies(name, logo_url)")
    .eq("is_active", true);
  if (params.q) query = query.ilike("title", `%${params.q}%`);
  if (params.industry) query = query.eq("industry", params.industry);
  if (params.location) query = query.eq("location", params.location);

  const { data: jobs } = await query
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">Job Board</p>
          <h1 className="mt-2 text-3xl font-black tracking-normal sm:text-4xl">
            Tìm việc phù hợp với CV của bạn
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            {jobs?.length ?? 0} vị trí đang tuyển. Lọc theo địa điểm, ngành, mức lương — và xem AI đánh giá độ phù hợp.
          </p>
        </header>

        {/* Filter bar */}
        <form
          action="/v2/jobs"
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
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1557ff] px-6 text-sm font-bold text-white shadow-sm shadow-blue-500/25"
          >
            <Filter size={16} /> Lọc
          </button>
        </form>

        <div className="grid gap-4">
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
                  href={`/v2/jobs/${job.slug}`}
                  className="group flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md sm:flex-row sm:items-center"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-blue-50 text-xl font-black text-[#1557ff]">
                    {company.name?.[0] ?? "C"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black text-[#07122f] group-hover:text-[#1557ff]">
                          {job.title}
                        </h3>
                        <p className="text-sm font-bold text-slate-600">{company.name ?? "Công ty"}</p>
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
                  <div className="text-right">
                    <p className="text-base font-black text-[#1557ff]">
                      {formatSalary(job.salary_min, job.salary_max)}
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-400">
                      {new Date(job.created_at).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </main>
    </Shell>
  );
}
