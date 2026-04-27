import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  Users,
  Sparkles,
  ClipboardCheck,
  Eye,
  Plus,
  Building2,
  TrendingUp,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const STAGE_LABELS: Record<string, string> = {
  pending: "Mới",
  viewed: "Đã xem",
  shortlisted: "Shortlist",
  hired: "Trúng tuyển",
  rejected: "Từ chối",
};

export default async function CompanyDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap?next=/nha-tuyen-dung/dashboard");

  const { data: company } = await supabase
    .from("companies")
    .select("id, name, logo_url, slug")
    .eq("owner_id", user.id)
    .maybeSingle();
  if (!company) {
    return (
      <main className="bg-[#f8fbff]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <Building2 className="mx-auto text-slate-300" size={48} />
          <h1 className="mt-4 text-3xl font-black">Tạo hồ sơ công ty trước</h1>
          <p className="mt-3 text-slate-600">
            Bạn cần tạo profile công ty để bắt đầu nhận CV và quản lý tuyển dụng.
          </p>
          <Link
            href="/nha-tuyen-dung/cong-ty"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[#1557ff] px-5 text-sm font-bold text-white shadow-lg shadow-blue-500/25"
          >
            <Plus size={16} /> Tạo hồ sơ công ty
          </Link>
        </div>
      </main>
    );
  }

  const [{ data: jobs }, { count: totalJobs }] = await Promise.all([
    supabase
      .from("jobs")
      .select("id, slug, title, is_active, applications_count, views_count, created_at")
      .eq("company_id", company.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("jobs")
      .select("id", { count: "exact", head: true })
      .eq("company_id", company.id),
  ]);

  const activeJobs = (jobs ?? []).filter((j) => j.is_active).length;
  const totalApplications = (jobs ?? []).reduce(
    (s, j) => s + (j.applications_count ?? 0),
    0
  );
  const totalViews = (jobs ?? []).reduce((s, j) => s + (j.views_count ?? 0), 0);

  // Pull all applications across this company's jobs to compute stage distribution + top jobs
  const jobIds = (jobs ?? []).map((j) => j.id);
  const { data: apps } = jobIds.length
    ? await supabase
        .from("applications")
        .select("id, status, job_id")
        .in("job_id", jobIds)
    : { data: [] };

  const stageCounts = (apps ?? []).reduce<Record<string, number>>((acc, a) => {
    acc[a.status] = (acc[a.status] ?? 0) + 1;
    return acc;
  }, {});

  // Compute apps per job
  const appsPerJob = (apps ?? []).reduce<Record<string, number>>((acc, a) => {
    acc[a.job_id] = (acc[a.job_id] ?? 0) + 1;
    return acc;
  }, {});

  const ranked = (jobs ?? [])
    .map((j) => ({ ...j, app_count: appsPerJob[j.id] ?? 0 }))
    .sort((a, b) => b.app_count - a.app_count);
  const topJobs = ranked.slice(0, 3);
  const lowJobs = ranked.filter((j) => j.is_active && j.app_count < 3).slice(0, 3);

  return (
    <main className="bg-[#f8fbff] text-[#07122f]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              Company · {company.name}
            </p>
            <h1
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Tổng quan tuyển dụng
            </h1>
          </div>
          <Link
            href="/nha-tuyen-dung/dang-tin"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1557ff] px-5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-[#0e3fd5]"
          >
            <Plus size={16} /> Đăng tin mới
          </Link>
        </header>

        {/* Top stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Tin đang tuyển", value: activeJobs, total: totalJobs ?? 0, icon: BriefcaseBusiness, href: "/nha-tuyen-dung/tin-tuyen" },
            { label: "Tổng đơn ứng tuyển", value: totalApplications, icon: ClipboardCheck, href: "/nha-tuyen-dung/pipeline" },
            { label: "Tổng lượt xem", value: totalViews, icon: Eye, href: "/nha-tuyen-dung/tin-tuyen" },
            { label: "Vào shortlist", value: stageCounts["shortlisted"] ?? 0, icon: Sparkles, href: "/nha-tuyen-dung/pipeline" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.label}
                href={s.href}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <Icon className="text-[#1557ff]" size={20} />
                  <ArrowRight className="text-slate-300" size={16} />
                </div>
                <p className="mt-3 text-3xl font-black">{s.value}</p>
                <p className="mt-1 text-xs font-bold uppercase text-slate-500">
                  {s.label}
                  {s.total !== undefined && ` / ${s.total} tổng`}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Stage distribution */}
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-wider text-slate-700">
            Phân bổ ứng viên theo stage
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-5">
            {(["pending", "viewed", "shortlisted", "hired", "rejected"] as const).map((s) => {
              const count = stageCounts[s] ?? 0;
              const pct = totalApplications > 0 ? Math.round((count / totalApplications) * 100) : 0;
              return (
                <div key={s} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                  <p className="text-xs font-black uppercase text-slate-500">
                    {STAGE_LABELS[s]}
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#1557ff]">{count}</p>
                  <p className="text-[11px] font-bold text-slate-400">{pct}%</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top performing jobs */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-emerald-700">
              <TrendingUp size={14} /> Job nhiều ứng viên nhất
            </p>
            {topJobs.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">Chưa có dữ liệu.</p>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {topJobs.map((j) => (
                  <li
                    key={j.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 px-3 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/nha-tuyen-dung/shortlist/${j.id}`}
                        className="block truncate text-sm font-black hover:text-[#1557ff]"
                      >
                        {j.title}
                      </Link>
                      <p className="mt-0.5 text-[11px] font-bold text-slate-400">
                        {j.views_count ?? 0} lượt xem
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-[#1557ff]">
                        {j.app_count}
                      </p>
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Ứng viên
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Jobs needing attention */}
          <div className="rounded-3xl border border-amber-200 bg-amber-50/30 p-6 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-amber-700">
              <Users size={14} /> Job đang thiếu ứng viên
            </p>
            {lowJobs.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">Tất cả job đều có ≥ 3 ứng viên 🎉</p>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {lowJobs.map((j) => (
                  <li
                    key={j.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-amber-100 bg-white px-3 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/viec-lam/${j.slug}`}
                        className="block truncate text-sm font-black hover:text-[#1557ff]"
                      >
                        {j.title}
                      </Link>
                      <p className="mt-0.5 text-[11px] font-bold text-amber-700">
                        Chỉ {j.app_count} đơn — cân nhắc đẩy lên Featured
                      </p>
                    </div>
                    <Link
                      href={`/nang-cap`}
                      className="inline-flex h-9 items-center gap-1 rounded-full border border-amber-300 bg-white px-3 text-xs font-bold text-amber-700 hover:bg-amber-50"
                    >
                      Featured
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent jobs list */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-black uppercase tracking-wider text-slate-700">
              Tin tuyển dụng gần đây
            </p>
            <Link
              href="/nha-tuyen-dung/tin-tuyen"
              className="text-xs font-bold text-[#1557ff] hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>
          {(jobs ?? []).slice(0, 5).map((j) => (
            <div
              key={j.id}
              className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-slate-100 px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{j.title}</p>
                <p className="mt-0.5 text-[11px] font-bold text-slate-400">
                  {new Date(j.created_at).toLocaleDateString("vi-VN")} ·{" "}
                  {j.is_active ? "Đang tuyển" : "Đã đóng"}
                </p>
              </div>
              <Link
                href={`/nha-tuyen-dung/shortlist/${j.id}`}
                className="inline-flex h-9 items-center gap-1 rounded-full bg-blue-50 px-3 text-xs font-bold text-[#1557ff]"
              >
                <Sparkles size={12} /> Shortlist <ArrowRight size={12} />
              </Link>
            </div>
          ))}
          {(jobs ?? []).length === 0 && (
            <p className="mt-3 text-center text-sm text-slate-500">
              Chưa có tin nào. <Link href="/nha-tuyen-dung/dang-tin" className="font-bold text-[#1557ff] hover:underline">Đăng tin đầu tiên</Link>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
