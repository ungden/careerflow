import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  BadgeCheck,
  CalendarClock,
  Building2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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

const LEVEL_LABELS: Record<string, string> = {
  intern: "Thực tập",
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
  lead: "Lead",
  manager: "Manager",
};

function formatSalary(min?: number | null, max?: number | null) {
  const m = (v: number) => Math.round(v / 1_000_000);
  const minM = min && min >= 1_000_000 ? m(min) : 0;
  const maxM = max && max >= 1_000_000 ? m(max) : 0;
  if (minM && maxM) return `${minM} – ${maxM} triệu`;
  if (minM) return `Từ ${minM} triệu`;
  if (maxM) return `Đến ${maxM} triệu`;
  return "Thỏa thuận";
}

// Database may contain literal "\n" sequences (escaped) instead of real newlines.
// Convert them so whitespace-pre-line renders proper line breaks.
function normalizeMultiline(text?: string | null): string {
  if (!text) return "";
  return text.replace(/\\n/g, "\n").replace(/\\r/g, "");
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
  return {
    title: `${job.title} — ${companyName}`,
    description: `Ứng tuyển ${job.title} tại ${companyName} trên YourCV`,
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase
    .from("jobs")
    .select("*, company:companies(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  if (!job) notFound();
  const company = job.company as
    | {
        name?: string;
        description?: string;
        website?: string;
        logo_url?: string;
        industry?: string;
        company_size?: string;
      }
    | null;

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

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yourcv.net";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.created_at,
    validThrough: job.expires_at ?? undefined,
    employmentType: (job.job_type || "").toUpperCase().replace("-", "_"),
    hiringOrganization: company
      ? {
          "@type": "Organization",
          name: company.name,
          sameAs: company.website || undefined,
          logo: company.logo_url || undefined,
        }
      : undefined,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "VN",
      },
    },
    baseSalary:
      job.salary_min || job.salary_max
        ? {
            "@type": "MonetaryAmount",
            currency: "VND",
            value: {
              "@type": "QuantitativeValue",
              minValue: job.salary_min ?? undefined,
              maxValue: job.salary_max ?? undefined,
              unitText: "MONTH",
            },
          }
        : undefined,
    industry: job.industry,
    url: `${baseUrl}/viec-lam/${job.slug}`,
  };

  const hasSalary =
    (job.salary_min && job.salary_min >= 1_000_000) ||
    (job.salary_max && job.salary_max >= 1_000_000);

  const description = normalizeMultiline(job.description);
  const requirements = normalizeMultiline(job.requirements);
  const benefits = normalizeMultiline(job.benefits);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="bg-[#f8fbff] text-[#07122f]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/viec-lam"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#1557ff] transition-colors hover:text-[#0e3fd5]"
          >
            <ArrowLeft size={16} /> Tất cả việc làm
          </Link>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* Main column */}
            <div className="space-y-6">
              {/* Hero card */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                {/* gradient accent */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1.5"
                  style={{
                    background:
                      "linear-gradient(90deg, #1557ff 0%, #3b6dff 60%, #20b26b 100%)",
                  }}
                />
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 text-3xl font-black text-[#1557ff] ring-1 ring-blue-100">
                    {company?.name?.[0] ?? "C"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black uppercase tracking-wider text-[#1557ff]">
                      {company?.name ?? "Công ty"}
                    </p>
                    <h1
                      className="mt-1.5 text-3xl font-black leading-tight text-[#07122f] sm:text-[34px]"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {job.title}
                    </h1>
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold">
                      {job.location && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
                          <MapPin size={12} />
                          {job.location}
                        </span>
                      )}
                      {job.job_type && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-[#1557ff]">
                          <Briefcase size={12} />
                          {JOB_TYPE_LABELS[job.job_type] ?? job.job_type}
                        </span>
                      )}
                      {job.experience_level && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">
                          <BadgeCheck size={12} />
                          {LEVEL_LABELS[job.experience_level] ??
                            job.experience_level}
                        </span>
                      )}
                      {job.industry && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1.5 text-violet-700">
                          {job.industry}
                        </span>
                      )}
                      {job.expires_at && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-amber-700">
                          <CalendarClock size={12} />
                          Hạn:{" "}
                          {new Date(job.expires_at).toLocaleDateString("vi-VN")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-xs font-black uppercase tracking-[0.18em] text-[#1557ff]">
                  Mô tả công việc
                </h2>
                <div className="mt-3 whitespace-pre-line text-[15px] leading-7 text-slate-700">
                  {description || "Chưa có mô tả chi tiết."}
                </div>
              </article>

              {/* Requirements */}
              {requirements && (
                <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="text-xs font-black uppercase tracking-[0.18em] text-[#1557ff]">
                    Yêu cầu ứng viên
                  </h2>
                  <div className="mt-3 whitespace-pre-line text-[15px] leading-7 text-slate-700">
                    {requirements}
                  </div>
                </article>
              )}

              {/* Benefits */}
              {benefits && (
                <article className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/40 to-white p-7 shadow-sm">
                  <h2 className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                    Quyền lợi
                  </h2>
                  <div className="mt-3 whitespace-pre-line text-[15px] leading-7 text-slate-700">
                    {benefits}
                  </div>
                </article>
              )}

              {/* Skills */}
              {Array.isArray(job.skills) && job.skills.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="text-xs font-black uppercase tracking-[0.18em] text-[#1557ff]">
                    Kỹ năng yêu cầu
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.skills.map((s: string) => (
                      <span
                        key={s}
                        className="rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-[#1557ff]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              {/* Salary + Apply */}
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div
                  className="px-6 py-5 text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #1557ff 0%, #3b6dff 60%, #20b26b 100%)",
                  }}
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80">
                    Mức lương
                  </p>
                  <p className="mt-1.5 text-2xl font-black leading-tight">
                    {formatSalary(job.salary_min, job.salary_max)}
                  </p>
                  {!hasSalary && (
                    <p className="mt-1 text-xs font-bold text-white/80">
                      Trao đổi trực tiếp với nhà tuyển dụng
                    </p>
                  )}
                </div>
                <div className="space-y-3 p-5">
                  {!viewer ? (
                    <Link
                      href={`/dang-nhap?next=/viec-lam/${job.slug}`}
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1557ff] text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-[#0e3fd5]"
                    >
                      Đăng nhập để ứng tuyển
                    </Link>
                  ) : !primaryCvId ? (
                    <Link
                      href="/cv/moi"
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#1557ff] bg-white text-base font-bold text-[#1557ff] hover:bg-blue-50"
                    >
                      Tạo CV để ứng tuyển
                    </Link>
                  ) : (
                    <OneClickApplyButton
                      jobId={job.id}
                      cvId={primaryCvId}
                      alreadyApplied={alreadyApplied}
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1557ff] text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-[#0e3fd5] disabled:opacity-60"
                    />
                  )}
                  <Link
                    href={`/cong-cu/jd-match?job=${job.id}`}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-[#1557ff] hover:text-[#1557ff]"
                  >
                    <Sparkles size={14} /> Xem CV match cho job này
                  </Link>
                </div>
              </div>

              {/* Company */}
              {company && (
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Về công ty
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-emerald-50 text-lg font-black text-[#1557ff]">
                      {company.name?.[0] ?? "C"}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-base font-black text-[#07122f]">
                        {company.name}
                      </p>
                      {company.industry && (
                        <p className="truncate text-xs font-bold text-slate-500">
                          {company.industry}
                        </p>
                      )}
                    </div>
                  </div>
                  {company.description && (
                    <p className="mt-3 line-clamp-6 text-[13px] leading-6 text-slate-600">
                      {company.description}
                    </p>
                  )}
                  {company.company_size && (
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      <Building2 size={12} /> {company.company_size}
                    </p>
                  )}
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#1557ff] hover:underline"
                    >
                      {company.website.replace(/^https?:\/\//, "")}
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
