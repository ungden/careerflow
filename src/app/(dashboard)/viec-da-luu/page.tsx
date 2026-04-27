import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Bookmark, MapPin, Briefcase } from "lucide-react";
import { RemoveSavedJobButton } from "./remove-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Việc làm đã lưu",
  description: "Danh sách việc làm bạn đã lưu trên YourCV",
};

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

export default async function SavedJobsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/dang-nhap?redirect=/viec-da-luu");

  const { data: savedJobs } = await supabase
    .from("saved_jobs")
    .select("*, job:jobs(*, company:companies(name))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const validSavedJobs = (savedJobs || []).filter((s: any) => s.job);

  return (
    <div className="space-y-8">
      <div>
        <h1
          className="text-3xl font-black tracking-tight text-[#1557ff]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Việc làm đã lưu
        </h1>
        <p className="text-slate-600 mt-1">
          {validSavedJobs.length > 0
            ? `Bạn đã lưu ${validSavedJobs.length} việc làm`
            : "Lưu lại những việc làm bạn quan tâm để xem sau"}
        </p>
      </div>

      {validSavedJobs.length === 0 ? (
        <div className="bg-white rounded-[24px] p-12 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#e8f0fe] flex items-center justify-center mb-4">
            <Bookmark className="h-7 w-7 text-[#1557ff]" />
          </div>
          <h3
            className="text-lg font-bold text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Chưa có việc làm nào được lưu
          </h3>
          <p className="text-sm text-slate-500 mt-2 mb-6 max-w-md">
            Hãy khám phá hàng ngàn cơ hội việc làm và lưu lại những vị trí bạn
            quan tâm để dễ dàng xem lại.
          </p>
          <Link
            href="/viec-lam"
            className="kinetic-gradient text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Khám phá việc làm
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {validSavedJobs.map((saved: any) => {
            const job = saved.job;
            const company = job.company;
            return (
              <div
                key={saved.id}
                className="bg-white rounded-[24px] p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f3f4f6] flex items-center justify-center text-lg font-black text-[#1557ff]/30 shrink-0">
                    {company?.name?.charAt(0) || "C"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/viec-lam/${job.slug}`} className="block">
                      <h3
                        className="text-[16px] font-bold text-[#1a1a1a] hover:text-[#1557ff] transition-colors"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {job.title}
                      </h3>
                    </Link>
                    <p className="text-[13px] text-[#1557ff] font-semibold mt-0.5">
                      {company?.name}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.location && (
                        <span className="px-2.5 py-1 bg-[#f3f4f6] text-[#555] rounded-full text-[11px] font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </span>
                      )}
                      {job.job_type && (
                        <span className="px-2.5 py-1 bg-[#f3f4f6] text-[#555] rounded-full text-[11px] font-medium flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {JOB_TYPE_LABELS[job.job_type] || job.job_type}
                        </span>
                      )}
                      <span className="px-2.5 py-1 bg-[#e8f0fe] text-[#1557ff] rounded-full text-[11px] font-semibold">
                        {formatSalary(job.salary_min, job.salary_max)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#999] mt-3">
                      Đã lưu:{" "}
                      {new Date(saved.created_at).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Link
                      href={`/viec-lam/${job.slug}`}
                      className="kinetic-gradient text-white font-bold text-xs px-5 py-2 rounded-xl shadow hover:opacity-90 transition-all text-center"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      Xem chi tiết
                    </Link>
                    <RemoveSavedJobButton savedId={saved.id} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
