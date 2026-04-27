import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Briefcase,
  ClipboardCheck,
  FileText,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Shell } from "@/components/cvai/cvai-app";
import { createClient } from "@/lib/supabase/server";
import { isPro as isProTier } from "@/lib/subscription";

export default async function V2CandidateDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap?next=/v2/candidate/dashboard");

  const [{ data: profile }, { data: cvs }, { data: apps }, { count: savedCount }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, slug, is_published, subscription_tier, subscription_expires_at")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("cvs")
      .select("id, title, is_primary, updated_at")
      .eq("user_id", user.id)
      .order("is_primary", { ascending: false })
      .order("updated_at", { ascending: false }),
    supabase
      .from("applications")
      .select("id, status, created_at")
      .eq("candidate_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("saved_jobs")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
  ]);

  const totalApps = apps?.length ?? 0;
  const shortlisted = (apps ?? []).filter((a) => a.status === "shortlisted" || a.status === "hired").length;
  const isPro = isProTier(profile);

  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">Dashboard</p>
          <h1 className="mt-2 text-3xl font-black tracking-normal sm:text-4xl">
            Xin chào, {profile?.full_name ?? "bạn"}
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            Theo dõi tiến độ ứng tuyển, sửa CV bằng AI, tìm việc phù hợp ngay đây.
          </p>
        </header>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "CV đã tạo", value: cvs?.length ?? 0, icon: FileText, href: "/v2/candidate/cv-library" },
            { label: "Đơn ứng tuyển", value: totalApps, icon: ClipboardCheck, href: "/v2/candidate/applications" },
            { label: "Vào shortlist", value: shortlisted, icon: Target, href: "/v2/candidate/applications" },
            { label: "Job đã lưu", value: savedCount ?? 0, icon: Briefcase, href: "/viec-da-luu" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.label}
                href={s.href}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <Icon className="text-[#1557ff]" size={20} />
                  <ArrowRight className="text-slate-300 group-hover:text-[#1557ff]" size={16} />
                </div>
                <p className="mt-3 text-3xl font-black">{s.value}</p>
                <p className="mt-1 text-xs font-bold uppercase text-slate-500">{s.label}</p>
              </Link>
            );
          })}
        </div>

        {/* Subscription card */}
        <div className="mb-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-5 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase text-[#1557ff]">
                  {isPro ? "YourCV Pro" : "Free tier"}
                </p>
                <p className="mt-1 text-lg font-black">
                  {isPro
                    ? `Pro đến ${profile?.subscription_expires_at ? new Date(profile.subscription_expires_at).toLocaleDateString("vi-VN") : ""}`
                    : "Nâng cấp Pro để mở khoá AI không giới hạn"}
                </p>
              </div>
              {!isPro && (
                <Link
                  href="/nang-cap"
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-[#1557ff] px-5 text-sm font-bold text-white shadow-sm shadow-blue-500/25"
                >
                  Nâng cấp Pro <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase text-slate-500">Hồ sơ public</p>
            {profile?.is_published && profile?.slug ? (
              <>
                <p className="mt-1 text-base font-black">Đã publish</p>
                <Link
                  href={`/ung-vien/${profile.slug}`}
                  className="mt-3 inline-flex text-xs font-bold text-[#1557ff] hover:underline"
                >
                  /ung-vien/{profile.slug}
                </Link>
              </>
            ) : (
              <>
                <p className="mt-1 text-base font-black">Chưa publish</p>
                <Link
                  href="/ho-so"
                  className="mt-3 inline-flex h-9 items-center gap-1 rounded-md border border-slate-200 px-3 text-xs font-bold text-slate-700"
                >
                  Bật publish
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: "Đánh giá CV bằng AI",
              body: "Cho điểm tổng + ATS + gợi ý cải thiện cụ thể.",
              href: "/cong-cu/danh-gia-cv",
              cta: "Chấm CV ngay",
            },
            {
              icon: Target,
              title: "JD Match",
              body: "Đo độ phù hợp CV vs 1 mô tả công việc cụ thể.",
              href: "/v2/candidate/jd-match",
              cta: "Tính match %",
            },
            {
              icon: Users,
              title: "Tạo CV mới",
              body: "10 templates: Classic, Modern, Tokyo, Berlin, Dubai...",
              href: "/cv/moi",
              cta: "Bắt đầu",
            },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.title}
                href={a.href}
                className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[#1557ff]">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-base font-black text-[#07122f] group-hover:text-[#1557ff]">
                  {a.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{a.body}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#1557ff]">
                  {a.cta} <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </Shell>
  );
}
