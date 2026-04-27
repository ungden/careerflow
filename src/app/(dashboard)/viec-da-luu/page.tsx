import Link from "next/link";
import { redirect } from "next/navigation";
import { Bookmark, MapPin, Briefcase } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const JOB_TYPE_LABELS: Record<string, string> = {
  "full-time": "Toàn thời gian",
  "part-time": "Bán thời gian",
  contract: "Hợp đồng",
  internship: "Thực tập",
  remote: "Remote",
};

function formatSalary(min?: number | null, max?: number | null) {
  if (min && max) return `${(min / 1_000_000).toFixed(0)} - ${(max / 1_000_000).toFixed(0)} triệu`;
  if (min) return `Từ ${(min / 1_000_000).toFixed(0)} triệu`;
  if (max) return `Đến ${(max / 1_000_000).toFixed(0)} triệu`;
  return "Thỏa thuận";
}

export default async function SavedJobsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap?next=/viec-da-luu");

  const { data: rows } = await supabase
    .from("saved_jobs")
    .select("id, created_at, job:jobs(id, slug, title, location, job_type, salary_min, salary_max, is_active, company:companies(name))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <>
      <main className="bg-[#f8fbff] text-[#07122f]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              Saved jobs
            </p>
            <h1
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Việc đã lưu
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
              {rows?.length ?? 0} vị trí. Click để xem chi tiết hoặc apply.
            </p>
          </header>

          {(!rows || rows.length === 0) ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
              <Bookmark size={36} className="mx-auto text-slate-300" />
              <p className="mt-4 text-base font-bold text-slate-700">
                Bạn chưa lưu việc nào.
              </p>
              <Link
                href="/viec-lam"
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-[#1557ff] px-4 text-sm font-bold text-white shadow-sm shadow-blue-500/25 hover:bg-[#0e3fd5]"
              >
                Khám phá việc làm
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {rows.map((row) => {
                const job = row.job as unknown as {
                  id: string;
                  slug: string;
                  title: string;
                  location?: string;
                  job_type?: string;
                  salary_min?: number | null;
                  salary_max?: number | null;
                  is_active?: boolean;
                  company?: { name?: string } | null;
                } | null;
                if (!job) return null;
                return (
                  <Link
                    key={row.id}
                    href={`/viec-lam/${job.slug}`}
                    className="group flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md sm:flex-row sm:items-center"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-blue-50 text-xl font-black text-[#1557ff]">
                      {job.company?.name?.[0] ?? "C"}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-[#07122f] group-hover:text-[#1557ff]">
                        {job.title}
                      </h3>
                      <p className="text-sm font-bold text-slate-600">
                        {job.company?.name}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
                        {job.location && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
                            <MapPin size={12} /> {job.location}
                          </span>
                        )}
                        {job.job_type && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
                            <Briefcase size={12} />
                            {JOB_TYPE_LABELS[job.job_type] ?? job.job_type}
                          </span>
                        )}
                        {!job.is_active && (
                          <span className="rounded-md bg-amber-50 px-2 py-1 text-amber-700">
                            Đã đóng
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-black text-[#1557ff]">
                        {formatSalary(job.salary_min, job.salary_max)}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Lưu {new Date(row.created_at).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
