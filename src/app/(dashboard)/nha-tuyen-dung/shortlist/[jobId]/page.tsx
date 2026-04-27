import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Filter, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ jobId: string }> };

interface Application {
  id: string;
  status: string;
  created_at: string;
  candidate_id: string;
  candidate?: {
    full_name?: string | null;
    headline?: string | null;
    avatar_url?: string | null;
    industry?: string | null;
    experience_level?: string | null;
    location?: string | null;
    skills?: string[] | null;
    salary_expectation_min?: number | null;
    salary_expectation_max?: number | null;
    slug?: string | null;
  } | null;
}

interface JobLite {
  id: string;
  title: string;
  industry?: string | null;
  experience_level?: string | null;
  location?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  skills?: string[] | null;
}

function scoreCandidate(job: JobLite, c: NonNullable<Application["candidate"]>) {
  let score = 40; // baseline
  let matchedSkills: string[] = [];
  let missingSkills: string[] = [];

  // Industry match: 20pt
  if (job.industry && c.industry === job.industry) score += 20;

  // Experience level alignment: 15pt
  const order = ["intern", "junior", "mid", "senior", "lead", "manager"];
  const ji = order.indexOf((job.experience_level || "").toLowerCase());
  const ci = order.indexOf((c.experience_level || "").toLowerCase());
  if (ji >= 0 && ci >= 0) {
    const diff = Math.abs(ji - ci);
    if (diff === 0) score += 15;
    else if (diff === 1) score += 8;
  }

  // Skill overlap: up to 20pt
  const reqSkills = (job.skills ?? []).map((s) => s.toLowerCase());
  const candSkills = (c.skills ?? []).map((s) => s.toLowerCase());
  if (reqSkills.length > 0) {
    matchedSkills = reqSkills.filter((s) => candSkills.includes(s));
    missingSkills = reqSkills.filter((s) => !candSkills.includes(s));
    score += Math.round((matchedSkills.length / reqSkills.length) * 20);
  }

  // Location match: 5pt
  if (job.location && c.location === job.location) score += 5;

  // Salary fit: 0pt if expectation > job max; clamp
  if (
    job.salary_max &&
    c.salary_expectation_min &&
    c.salary_expectation_min > job.salary_max / 1_000_000
  ) {
    score -= 10;
  }

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    matchedSkills,
    missingSkills,
  };
}

function reasonText(score: number) {
  if (score >= 85) return "Cực kỳ phù hợp — kinh nghiệm, ngành, kỹ năng đều khớp";
  if (score >= 70) return "Phù hợp tốt — match nhiều tiêu chí";
  if (score >= 55) return "Có tiềm năng — kinh nghiệm hơi junior hoặc thiếu vài skill";
  return "Thiếu nhiều tiêu chí — xem xét kỹ trước khi shortlist";
}

export default async function ShortlistPage({ params }: Props) {
  const { jobId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/dang-nhap?next=/nha-tuyen-dung/shortlist/${jobId}`);

  const { data: company } = await supabase
    .from("companies")
    .select("id, name")
    .eq("owner_id", user.id)
    .maybeSingle();
  if (!company) {
    return (
      <main className="bg-[#f8fbff]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-3xl font-black">Chưa có hồ sơ công ty</h1>
          <Link
            href="/nha-tuyen-dung/cong-ty"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[#1557ff] px-5 text-sm font-bold text-white shadow-lg shadow-blue-500/25"
          >
            Tạo hồ sơ công ty
          </Link>
        </div>
      </main>
    );
  }

  // Verify job belongs to this company
  const { data: job } = await supabase
    .from("jobs")
    .select(
      "id, title, slug, industry, experience_level, location, salary_min, salary_max, skills, company_id"
    )
    .eq("id", jobId)
    .single();
  if (!job || job.company_id !== company.id) notFound();

  // Fetch all applications + candidate profiles
  const { data: apps } = await supabase
    .from("applications")
    .select(
      "id, status, created_at, candidate_id, candidate:profiles(full_name, headline, avatar_url, industry, experience_level, location, skills, salary_expectation_min, salary_expectation_max, slug)"
    )
    .eq("job_id", jobId)
    .order("created_at", { ascending: false });

  const ranked = (apps ?? [])
    .map((a) => {
      const candidate = a.candidate as Application["candidate"];
      if (!candidate) return null;
      const scored = scoreCandidate(job as JobLite, candidate);
      return { app: a as Application, candidate, ...scored };
    })
    .filter(Boolean)
    .sort((a, b) => (b!.score - a!.score));

  const overall80 = ranked.filter((r) => r!.score >= 80).length;
  const overall60 = ranked.filter((r) => r!.score >= 60 && r!.score < 80).length;

  return (
    <main className="bg-[#f8fbff] text-[#07122f]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/nha-tuyen-dung/pipeline"
          className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[#1557ff]"
        >
          <ArrowLeft size={16} /> Pipeline
        </Link>

        <header className="mb-8">
          <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
            AI Shortlist · {company.name}
          </p>
          <h1
            className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Xếp hạng ứng viên — {job.title}
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            Tổng {ranked.length} ứng viên. Match score chấm theo: ngành, kinh
            nghiệm, kỹ năng bắt buộc, địa điểm, mức lương.
          </p>
        </header>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase text-slate-500">Tổng ứng viên</p>
            <p className="mt-1 text-3xl font-black">{ranked.length}</p>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-sm">
            <p className="text-xs font-black uppercase text-emerald-700">
              Match ≥ 80%
            </p>
            <p className="mt-1 text-3xl font-black text-emerald-700">{overall80}</p>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-amber-50/40 p-5 shadow-sm">
            <p className="text-xs font-black uppercase text-amber-700">
              Match 60-79%
            </p>
            <p className="mt-1 text-3xl font-black text-amber-700">{overall60}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <p className="text-sm font-black uppercase tracking-wider text-slate-700">
              Bảng xếp hạng
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
              <Filter size={12} /> Đã sort theo match desc
            </span>
          </div>
          {ranked.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              Chưa có ai ứng tuyển vào job này.
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {ranked.map((r, idx) => (
                <li
                  key={r!.app.id}
                  className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-3 sm:w-12">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${
                        idx === 0
                          ? "bg-amber-400 text-white"
                          : idx === 1
                            ? "bg-slate-300 text-slate-700"
                            : idx === 2
                              ? "bg-orange-300 text-white"
                              : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        r!.candidate.avatar_url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(r!.candidate.full_name ?? "?")}&background=003d9b&color=fff`
                      }
                      alt={r!.candidate.full_name ?? "Ứng viên"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <Link
                        href={`/nha-tuyen-dung/ung-vien/${r!.app.candidate_id}?job=${jobId}`}
                        className="block truncate text-sm font-black hover:text-[#1557ff]"
                      >
                        {r!.candidate.full_name ?? "Ứng viên"}
                      </Link>
                      <p className="truncate text-xs font-bold text-slate-500">
                        {r!.candidate.headline ?? r!.candidate.experience_level ?? "—"}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {reasonText(r!.score)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:max-w-[280px]">
                    {r!.matchedSkills.slice(0, 4).map((s) => (
                      <span
                        key={"m-" + s}
                        className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700"
                      >
                        ✓ {s}
                      </span>
                    ))}
                    {r!.missingSkills.slice(0, 2).map((s) => (
                      <span
                        key={"x-" + s}
                        className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600"
                      >
                        — {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 sm:w-44 sm:justify-end">
                    <div className="text-right">
                      <p className="text-2xl font-black text-[#1557ff]">
                        {r!.score}
                      </p>
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Match
                      </p>
                    </div>
                    <Link
                      href={`/nha-tuyen-dung/ung-vien/${r!.app.candidate_id}?job=${jobId}`}
                      className="inline-flex h-9 items-center gap-1 rounded-full bg-[#1557ff] px-3 text-xs font-bold text-white shadow-md shadow-blue-500/25"
                    >
                      <Star size={12} /> Chi tiết <ArrowRight size={12} />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
