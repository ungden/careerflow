import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Briefcase,
  AlertTriangle,
  Sparkles,
  Check,
  StickyNote,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ job?: string }>;
};

export default async function HrCandidateDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { job: jobId } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/dang-nhap?next=/nha-tuyen-dung/ung-vien/${id}`);

  // Verify HR has at least 1 application from this candidate to one of their jobs
  const { data: company } = await supabase
    .from("companies")
    .select("id, name")
    .eq("owner_id", user.id)
    .maybeSingle();
  if (!company) notFound();

  const { data: candidate } = await supabase
    .from("profiles")
    .select(
      "id, full_name, headline, avatar_url, industry, experience_level, location, skills, salary_expectation_min, salary_expectation_max, slug, email, preferred_locations, availability"
    )
    .eq("id", id)
    .maybeSingle();
  if (!candidate) notFound();

  // Pull primary CV
  const { data: cv } = await supabase
    .from("cvs")
    .select("personal_info, experiences, education, skills, languages, certifications, projects")
    .eq("user_id", id)
    .eq("is_primary", true)
    .maybeSingle();

  // Pull this candidate's applications to THIS company's jobs
  const { data: jobIdsRow } = await supabase
    .from("jobs")
    .select("id")
    .eq("company_id", company.id);
  const jobIds = (jobIdsRow ?? []).map((j) => j.id);
  const { data: apps } = jobIds.length
    ? await supabase
        .from("applications")
        .select("id, status, created_at, cover_letter, job:jobs(id, slug, title)")
        .eq("candidate_id", id)
        .in("job_id", jobIds)
        .order("created_at", { ascending: false })
    : { data: [] };

  // Pull HR notes for this candidate's applications
  const appIds = (apps ?? []).map((a) => a.id);
  const { data: notes } = appIds.length
    ? await supabase
        .from("application_notes")
        .select("id, body, created_at, application_id")
        .in("application_id", appIds)
        .order("created_at", { ascending: false })
    : { data: [] };

  if ((apps ?? []).length === 0) {
    return (
      <main className="bg-[#f8fbff]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-3xl font-black">Ứng viên chưa apply công ty bạn</h1>
          <p className="mt-3 text-slate-600">
            Chỉ HR có ứng viên đã apply mới xem được chi tiết này.
          </p>
          <Link
            href="/nha-tuyen-dung/pipeline"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[#1557ff] px-5 text-sm font-bold text-white shadow-lg shadow-blue-500/25"
          >
            Về Pipeline
          </Link>
        </div>
      </main>
    );
  }

  const expCount = Array.isArray(cv?.experiences) ? cv!.experiences.length : 0;
  const skillsArr = Array.isArray(cv?.skills) ? (cv!.skills as Array<{ name?: string }>) : [];
  const totalSkills = skillsArr.length;

  // Simple AI summary heuristic (would ideally call /api/ai/review for richer)
  const aiSummary =
    `Ứng viên có ${expCount} mục kinh nghiệm, ${totalSkills} kỹ năng được liệt kê. ` +
    `${candidate.experience_level ? `Cấp bậc ${candidate.experience_level}.` : ""} ` +
    `${candidate.industry ? `Ngành: ${candidate.industry}.` : ""}`;

  const redFlags: string[] = [];
  if (expCount === 0) redFlags.push("CV chưa có mục kinh nghiệm");
  if (totalSkills < 3) redFlags.push("Liệt kê quá ít kỹ năng (<3)");
  if (!candidate.headline) redFlags.push("Chưa có headline tóm tắt");

  const interviewQuestions = [
    `Hãy mô tả 1 dự án ${candidate.industry ?? "gần đây"} mà bạn tự hào nhất, kèm số liệu kết quả?`,
    `Bạn xử lý xung đột trong team thế nào? Cho ví dụ cụ thể.`,
    `Tại sao bạn ứng tuyển vào công ty chúng tôi (${company.name}) — bạn biết gì về sản phẩm/đội ngũ?`,
    `Trong 2 năm tới bạn muốn phát triển kỹ năng gì? Roadmap cá nhân ra sao?`,
    `Mức lương kỳ vọng và lý do?`,
  ];

  return (
    <main className="bg-[#f8fbff] text-[#07122f]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={jobId ? `/nha-tuyen-dung/shortlist/${jobId}` : "/nha-tuyen-dung/pipeline"}
          className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[#1557ff]"
        >
          <ArrowLeft size={16} /> {jobId ? "Shortlist" : "Pipeline"}
        </Link>

        {/* Hero card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                candidate.avatar_url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.full_name ?? "?")}&background=1557ff&color=fff&size=200`
              }
              alt={candidate.full_name ?? "Ứng viên"}
              className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-blue-50"
            />
            <div className="flex-1">
              <h1
                className="text-2xl font-black"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {candidate.full_name}
              </h1>
              {candidate.headline && (
                <p className="mt-1 text-base font-bold text-[#1557ff]">{candidate.headline}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
                {candidate.email && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1">
                    <Mail size={12} /> {candidate.email}
                  </span>
                )}
                {candidate.location && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1">
                    <MapPin size={12} /> {candidate.location}
                  </span>
                )}
                {candidate.experience_level && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 capitalize">
                    <Briefcase size={12} /> {candidate.experience_level}
                  </span>
                )}
                {candidate.availability === "open" && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                    Sẵn sàng nhận việc
                  </span>
                )}
              </div>
              {candidate.salary_expectation_min && (
                <p className="mt-3 text-sm font-bold text-slate-700">
                  Lương kỳ vọng:{" "}
                  <span className="text-[#1557ff]">
                    {candidate.salary_expectation_min} - {candidate.salary_expectation_max ?? "?"} triệu
                  </span>
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              {candidate.slug && (
                <Link
                  href={`/cv/p/${candidate.slug}`}
                  target="_blank"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:border-[#1557ff] hover:text-[#1557ff]"
                >
                  Xem CV public
                </Link>
              )}
              <Link
                href={`/cong-cu/jd-match`}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#1557ff] px-4 text-sm font-bold text-white shadow-md shadow-blue-500/25"
              >
                <Sparkles size={14} /> AI JD Match
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: AI summary + experience + interview kit */}
          <div className="space-y-5">
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/40 via-white to-emerald-50/30 p-6 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#1557ff]">
                <Sparkles size={14} /> AI Summary
              </p>
              <p className="mt-3 text-base leading-7 text-slate-800">{aiSummary}</p>
            </div>

            {Array.isArray(cv?.experiences) && cv!.experiences.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-black uppercase tracking-wider text-slate-700">
                  Kinh nghiệm
                </p>
                <div className="mt-4 space-y-4">
                  {(cv!.experiences as Array<{
                    company?: string;
                    position?: string;
                    start_date?: string;
                    end_date?: string;
                    is_current?: boolean;
                    description?: string;
                  }>).map((exp, i) => (
                    <div key={i} className="border-l-2 border-blue-100 pl-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-sm font-black">{exp.position}</h3>
                        <span className="text-xs text-slate-400">
                          {exp.start_date} — {exp.is_current ? "Hiện tại" : exp.end_date}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#1557ff]">{exp.company}</p>
                      {exp.description && (
                        <p className="mt-2 whitespace-pre-line text-xs leading-6 text-slate-600">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-black uppercase tracking-wider text-slate-700">
                Bộ câu hỏi phỏng vấn AI đề xuất
              </p>
              <ol className="mt-4 space-y-3">
                {interviewQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-2xl bg-slate-50/60 p-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1557ff] text-xs font-black text-white">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-700">{q}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: applications + skills + red flags + notes */}
          <aside className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-black uppercase tracking-wider text-slate-700">
                Ứng tuyển vào
              </p>
              <ul className="mt-3 space-y-2">
                {(apps ?? []).map((a) => {
                  const job = a.job as unknown as { id: string; slug: string; title: string } | null;
                  if (!job) return null;
                  return (
                    <li
                      key={a.id}
                      className="flex items-center justify-between gap-2 rounded-2xl border border-slate-100 px-3 py-2.5"
                    >
                      <Link
                        href={`/viec-lam/${job.slug}`}
                        className="text-sm font-bold hover:text-[#1557ff]"
                      >
                        {job.title}
                      </Link>
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-black uppercase text-[#1557ff]">
                        {a.status}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {Array.isArray(candidate.skills) && candidate.skills.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-black uppercase tracking-wider text-slate-700">
                  Kỹ năng
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(candidate.skills as string[]).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#1557ff]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {redFlags.length > 0 && (
              <div className="rounded-3xl border border-amber-200 bg-amber-50/40 p-6">
                <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-amber-700">
                  <AlertTriangle size={14} /> Red flags
                </p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {redFlags.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-amber-900">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-700">
                <StickyNote size={14} /> Ghi chú HR
              </p>
              {(notes ?? []).length === 0 ? (
                <p className="mt-3 text-sm text-slate-500">Chưa có ghi chú.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {(notes ?? []).map((n) => (
                    <li key={n.id} className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-sm text-slate-700">{n.body}</p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        {new Date(n.created_at).toLocaleString("vi-VN")}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-emerald-700">
                <Check size={14} /> Quick actions
              </p>
              <div className="mt-3 grid gap-2">
                <button className="rounded-full border border-emerald-300 bg-white px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-50">
                  Mời phỏng vấn
                </button>
                <button className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
                  Shortlist
                </button>
                <button className="rounded-full border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50">
                  Từ chối
                </button>
              </div>
              <p className="mt-2 text-[10px] text-slate-500">
                Tip: dùng Pipeline Kanban để chuyển stage chính thức (sẽ ghi DB).
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
