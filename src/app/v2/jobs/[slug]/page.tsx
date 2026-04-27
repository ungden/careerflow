import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Briefcase, BadgeCheck, CalendarClock } from "lucide-react";
import { Shell } from "@/components/cvai/cvai-app";
import { createClient } from "@/lib/supabase/server";
import { OneClickApplyButton } from "@/components/jobs/one-click-apply-button";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase
    .from("jobs")
    .select("title, company:companies(name)")
    .eq("slug", slug)
    .single();
  if (!job) return { title: "Việc làm" };
  const companyName = (job.company as { name?: string } | null)?.name ?? "";
  return { title: `${job.title} — ${companyName}`, description: `Ứng tuyển ${job.title} tại ${companyName}` };
}

export default async function V2JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase
    .from("jobs")
    .select("*, company:companies(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  if (!job) notFound();
  const company = job.company as { name?: string; description?: string; website?: string; logo_url?: string; industry?: string; company_size?: string } | null;

  // Pre-load viewer's primary CV + already-applied state for 1-click apply
  const {
    data: { user: viewer },
  } = await supabase.auth.getUser();
  let primaryCvId: string | null = null;
  let alreadyApplied = false;
  if (viewer) {
    const [{ data: pcv }, { data: app }] = await Promise.all([
      supabase
        .from("cvs")
        .select("id")
        .eq("user_id", viewer.id)
        .eq("is_primary", true)
        .maybeSingle(),
      supabase
        .from("applications")
        .select("id")
        .eq("candidate_id", viewer.id)
        .eq("job_id", job.id)
        .maybeSingle(),
    ]);
    primaryCvId = pcv?.id ?? null;
    alreadyApplied = Boolean(app);
  }

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/v2/jobs"
          className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[#1557ff]"
        >
          <ArrowLeft size={16} /> Tất cả việc làm
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main */}
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-blue-50 text-2xl font-black text-[#1557ff]">
                  {company?.name?.[0] ?? "C"}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-black text-[#07122f]">{job.title}</h1>
                  <p className="mt-1 text-base font-bold text-[#1557ff]">{company?.name}</p>
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
                    {job.experience_level && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 capitalize">
                        <BadgeCheck size={12} />
                        {job.experience_level}
                      </span>
                    )}
                    {job.expires_at && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-amber-700">
                        <CalendarClock size={12} />
                        Hạn: {new Date(job.expires_at).toLocaleDateString("vi-VN")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#1557ff]">Mô tả công việc</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                {job.description}
              </p>
            </article>

            {job.requirements && (
              <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-black uppercase tracking-wider text-[#1557ff]">Yêu cầu</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                  {job.requirements}
                </p>
              </article>
            )}

            {job.benefits && (
              <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-black uppercase tracking-wider text-emerald-600">Quyền lợi</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                  {job.benefits}
                </p>
              </article>
            )}

            {Array.isArray(job.skills) && job.skills.length > 0 && (
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-black uppercase tracking-wider text-[#1557ff]">Kỹ năng</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.skills.map((s: string) => (
                    <span
                      key={s}
                      className="rounded-md bg-blue-50 px-3 py-1 text-xs font-bold text-[#1557ff]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wider text-slate-500">Mức lương</p>
              <p className="mt-1 text-2xl font-black text-[#1557ff]">
                {formatSalary(job.salary_min, job.salary_max)}
              </p>
              <div className="mt-5">
                {!viewer ? (
                  <Link
                    href={`/dang-nhap?next=/v2/jobs/${job.slug}`}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#1557ff] text-base font-bold text-white shadow-sm shadow-blue-500/25"
                  >
                    Đăng nhập để ứng tuyển
                  </Link>
                ) : !primaryCvId ? (
                  <Link
                    href="/cv/moi"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-[#1557ff] bg-white text-base font-bold text-[#1557ff]"
                  >
                    Tạo CV để ứng tuyển
                  </Link>
                ) : (
                  <OneClickApplyButton
                    jobId={job.id}
                    cvId={primaryCvId}
                    alreadyApplied={alreadyApplied}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#1557ff] text-base font-bold text-white shadow-sm shadow-blue-500/25 disabled:opacity-60"
                  />
                )}
              </div>
              <Link
                href={`/v2/candidate/jd-match?job=${job.id}`}
                className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white text-sm font-bold text-slate-700"
              >
                Xem CV match cho job này
              </Link>
            </div>

            {company && (
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">Về công ty</p>
                <p className="mt-2 text-base font-black">{company.name}</p>
                {company.industry && (
                  <p className="mt-1 text-xs font-bold text-slate-500">{company.industry}</p>
                )}
                {company.description && (
                  <p className="mt-3 text-xs leading-6 text-slate-600 line-clamp-6">
                    {company.description}
                  </p>
                )}
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-xs font-bold text-[#1557ff] hover:underline"
                  >
                    {company.website.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>
      </main>
    </Shell>
  );
}
