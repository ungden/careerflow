import Link from "next/link";
import { redirect } from "next/navigation";
import { Shell } from "@/components/cvai/cvai-app";
import { createClient } from "@/lib/supabase/server";

const STATUS_LABELS: Record<string, { label: string; tone: string }> = {
  pending: { label: "Đang chờ", tone: "bg-slate-100 text-slate-600" },
  viewed: { label: "Đã xem", tone: "bg-blue-50 text-[#1557ff]" },
  shortlisted: { label: "Shortlist", tone: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "Từ chối", tone: "bg-red-50 text-red-600" },
  hired: { label: "Trúng tuyển", tone: "bg-amber-50 text-amber-700" },
};

export default async function V2ApplicationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap?next=/v2/candidate/applications");

  const { data: apps } = await supabase
    .from("applications")
    .select(
      "id, status, created_at, cover_letter, job:jobs(id, slug, title, location, job_type, salary_min, salary_max, company:companies(name))"
    )
    .eq("candidate_id", user.id)
    .order("created_at", { ascending: false });

  const counts = (apps ?? []).reduce<Record<string, number>>((acc, a) => {
    acc[a.status] = (acc[a.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">My applications</p>
          <h1 className="mt-2 text-3xl font-black tracking-normal sm:text-4xl">
            Đơn ứng tuyển của bạn
          </h1>
        </header>

        <div className="mb-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {(["pending", "viewed", "shortlisted", "hired", "rejected"] as const).map((s) => (
            <div
              key={s}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-xs font-black uppercase text-slate-500">{STATUS_LABELS[s].label}</p>
              <p className="mt-1 text-2xl font-black text-[#1557ff]">{counts[s] ?? 0}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          {(!apps || apps.length === 0) ? (
            <div className="p-10 text-center">
              <p className="text-base font-bold text-slate-700">
                Bạn chưa ứng tuyển vị trí nào.
              </p>
              <Link
                href="/v2/jobs"
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-md bg-[#1557ff] px-4 text-sm font-bold text-white"
              >
                Xem việc làm
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {apps.map((a) => {
                const job = a.job as unknown as {
                  id: string;
                  slug: string;
                  title: string;
                  location?: string;
                  company?: { name?: string } | null;
                } | null;
                const meta = STATUS_LABELS[a.status] ?? STATUS_LABELS.pending;
                if (!job) return null;
                return (
                  <li key={a.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/v2/jobs/${job.slug}`}
                        className="text-base font-black hover:text-[#1557ff]"
                      >
                        {job.title}
                      </Link>
                      <p className="mt-1 text-sm font-bold text-slate-600">
                        {job.company?.name}
                        {job.location ? ` · ${job.location}` : null}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Ứng tuyển {new Date(a.created_at).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <span className={`rounded-md px-3 py-1 text-xs font-black ${meta.tone}`}>
                      {meta.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </Shell>
  );
}
