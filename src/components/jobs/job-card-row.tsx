"use client";

import { useRouter } from "next/navigation";
import { OneClickApplyButton } from "@/components/jobs/one-click-apply-button";

interface Job {
  id: string;
  slug: string;
  title: string;
  location?: string | null;
  job_type?: string | null;
  industry?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  company?: { name?: string | null } | null;
}

function formatSalary(min?: number | null, max?: number | null) {
  if (min && max) return `${min / 1000} - ${max / 1000} triệu`;
  if (min) return `Từ ${min / 1000} triệu`;
  if (max) return `Đến ${max / 1000} triệu`;
  return "Thỏa thuận";
}

export function JobCardRow({
  job,
  showApply,
  primaryCvId,
  alreadyApplied,
}: {
  job: Job;
  showApply: boolean;
  primaryCvId: string | null;
  alreadyApplied: boolean;
}) {
  const router = useRouter();
  const companyName = job.company?.name ?? "Công ty";
  const companyInitial = companyName.charAt(0);
  const href = `/viec-lam/${job.slug}`;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(href)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(href);
        }
      }}
      className="block bg-white/80 backdrop-blur-xl rounded-[40px] p-8 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-lg hover:bg-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#003d9b]/40"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#f3f4f6] flex items-center justify-center shrink-0">
        <span className="text-2xl font-black text-[#003d9b]/30">{companyInitial}</span>
      </div>

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

      <div
        className="flex flex-col items-end gap-3 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="text-lg font-black text-[#003d9b]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          {formatSalary(job.salary_min, job.salary_max)}
        </span>
        {showApply && primaryCvId ? (
          <OneClickApplyButton
            jobId={job.id}
            cvId={primaryCvId}
            alreadyApplied={alreadyApplied}
          />
        ) : (
          <span
            className="kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition-all"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Xem chi tiết
          </span>
        )}
      </div>
    </div>
  );
}
