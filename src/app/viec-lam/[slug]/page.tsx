import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";
import { MapPin, Building2, Clock, Briefcase, DollarSign } from "lucide-react";
import { ApplyDialog } from "@/components/jobs/apply-dialog";
import { SaveJobButton } from "@/components/jobs/save-job-button";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase
    .from("jobs")
    .select("title, company:companies(name)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!job) return { title: "Việc làm không tồn tại" };
  const companyName = (job.company as any)?.name || "";
  return {
    title: `${job.title} - ${companyName}`,
    description: `Ứng tuyển vị trí ${job.title} tại ${companyName} trên YourCV`,
  };
}

function formatSalary(min?: number | null, max?: number | null) {
  if (min && max) return `${Math.round(min / 1000)} - ${Math.round(max / 1000)} triệu`;
  if (min) return `Từ ${Math.round(min / 1000)} triệu`;
  if (max) return `Đến ${Math.round(max / 1000)} triệu`;
  return "Thỏa thuận";
}

const JOB_TYPE_LABELS: Record<string, string> = {
  "full-time": "Toàn thời gian",
  "part-time": "Bán thời gian",
  contract: "Hợp đồng",
  internship: "Thực tập",
  remote: "Từ xa",
};

const EXP_LABELS: Record<string, string> = {
  intern: "Thực tập sinh",
  junior: "Junior (0-2 năm)",
  mid: "Mid-level (2-5 năm)",
  senior: "Senior (5+ năm)",
  lead: "Lead (8+ năm)",
  manager: "Quản lý",
};

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

  const company = job.company as any;

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://yourcv.net";
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-[#f8f9fb]">
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#999] mb-6">
            <Link href="/viec-lam" className="hover:text-[#003d9b]">Việc làm</Link>
            <span>/</span>
            <span className="text-[#555]">{job.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header card */}
              <div className="bg-white rounded-[24px] p-8 shadow-sm">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#f3f4f6] flex items-center justify-center text-2xl font-black text-[#003d9b]/30 shrink-0">
                    {company?.name?.charAt(0) || "C"}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-[24px] font-extrabold text-[#1a1a1a] tracking-tight" style={{ fontFamily: "var(--font-headline)" }}>
                      {job.title}
                    </h1>
                    <p className="text-[15px] text-[#003d9b] font-semibold mt-1">{company?.name}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-3 py-1 bg-[#f3f4f6] text-[#555] rounded-full text-[12px] font-medium flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{job.location}
                      </span>
                      <span className="px-3 py-1 bg-[#f3f4f6] text-[#555] rounded-full text-[12px] font-medium">
                        {JOB_TYPE_LABELS[job.job_type] || job.job_type}
                      </span>
                      <span className="px-3 py-1 bg-[#e8f0fe] text-[#003d9b] rounded-full text-[12px] font-semibold">
                        {job.industry}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-[24px] p-8 shadow-sm">
                <h2 className="text-[14px] font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: "var(--font-headline)" }}>
                  Mô tả công việc
                </h2>
                <p className="text-[13px] text-[#555] leading-[1.8] whitespace-pre-line">{job.description}</p>
              </div>

              {/* Requirements */}
              {job.requirements && (
                <div className="bg-white rounded-[24px] p-8 shadow-sm">
                  <h2 className="text-[14px] font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: "var(--font-headline)" }}>
                    Yêu cầu ứng viên
                  </h2>
                  <div className="text-[13px] text-[#555] leading-[1.8] whitespace-pre-line">{job.requirements}</div>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && (
                <div className="bg-white rounded-[24px] p-8 shadow-sm">
                  <h2 className="text-[14px] font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: "var(--font-headline)" }}>
                    Quyền lợi
                  </h2>
                  <div className="text-[13px] text-[#555] leading-[1.8] whitespace-pre-line">{job.benefits}</div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply card */}
              <div className="bg-white rounded-[24px] p-8 shadow-sm space-y-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#999] mb-1">Mức lương</p>
                  <p className="text-[24px] font-extrabold text-[#003d9b]" style={{ fontFamily: "var(--font-headline)" }}>
                    {formatSalary(job.salary_min, job.salary_max)}
                  </p>
                </div>

                <div className="space-y-3 text-[13px]">
                  {job.experience_level && (
                    <div className="flex justify-between">
                      <span className="text-[#999]">Kinh nghiệm</span>
                      <span className="font-semibold text-[#333]">{EXP_LABELS[job.experience_level] || job.experience_level}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#999]">Hình thức</span>
                    <span className="font-semibold text-[#333]">{JOB_TYPE_LABELS[job.job_type] || job.job_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#999]">Địa điểm</span>
                    <span className="font-semibold text-[#333]">{job.location}</span>
                  </div>
                </div>

                <ApplyDialog jobId={job.id} />
                <SaveJobButton jobId={job.id} />
              </div>

              {/* Company info */}
              {company && (
                <div className="bg-white rounded-[24px] p-8 shadow-sm">
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#003d9b] mb-4">Về công ty</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#f3f4f6] flex items-center justify-center text-lg font-bold text-[#003d9b]/30">
                      {company.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[13px] text-[#1a1a1a]">{company.name}</p>
                      {company.industry && <p className="text-[11px] text-[#999]">{company.industry}</p>}
                    </div>
                  </div>
                  {company.description && (
                    <p className="text-[12px] text-[#555] leading-[1.7]">{company.description}</p>
                  )}
                  {company.company_size && (
                    <p className="text-[11px] text-[#999] mt-3">Quy mô: {company.company_size} nhân viên</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
