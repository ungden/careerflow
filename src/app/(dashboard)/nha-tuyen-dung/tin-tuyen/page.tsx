import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Plus,
  Eye,
  Users,
  Sparkles,
  Pencil,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { JobActiveToggle } from "./job-active-toggle";

export const dynamic = "force-dynamic";

export default async function TinTuyenPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap?next=/nha-tuyen-dung/tin-tuyen");

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*, applications_count")
    .eq("posted_by", user.id)
    .order("created_at", { ascending: false });

  const activeCount = (jobs ?? []).filter((j) => j.is_active).length;
  const featuredCount = (jobs ?? []).filter((j) => j.is_featured).length;
  const totalApps = (jobs ?? []).reduce(
    (s, j) => s + (j.applications_count ?? 0),
    0
  );

  return (
    <main className="bg-[#f8fbff] text-[#07122f]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              Job Management
            </p>
            <h1
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Quản lý tin tuyển dụng
            </h1>
          </div>
          <Link
            href="/nha-tuyen-dung/dang-tin"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1557ff] px-5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-[#0e3fd5]"
          >
            <Plus size={16} /> Đăng tin mới
          </Link>
        </header>

        {jobs && jobs.length > 0 && (
          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            <Stat label="Đang tuyển" value={activeCount} />
            <Stat label="Đang Featured" value={featuredCount} tone="emerald" />
            <Stat label="Tổng đơn ứng tuyển" value={totalApps} tone="blue" />
          </div>
        )}

        {!jobs || jobs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Megaphone size={36} className="mx-auto text-slate-300" />
            <p className="mt-4 text-base font-bold text-slate-700">
              Bạn chưa đăng tin nào.
            </p>
            <Link
              href="/nha-tuyen-dung/dang-tin"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-[#1557ff] px-4 text-sm font-bold text-white"
            >
              <Plus size={14} /> Đăng tin đầu tiên
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {jobs.map((j) => (
              <li
                key={j.id}
                className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/viec-lam/${j.slug}`}
                      target="_blank"
                      className="text-base font-black hover:text-[#1557ff]"
                    >
                      {j.title}
                    </Link>
                    {j.is_featured && (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-black text-emerald-700">
                        Featured
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-black ${j.is_active ? "bg-blue-50 text-[#1557ff]" : "bg-slate-100 text-slate-500"}`}
                    >
                      {j.is_active ? "Đang tuyển" : "Đã đóng"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    {j.location} · {j.job_type} · Đăng{" "}
                    {new Date(j.created_at).toLocaleDateString("vi-VN")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:items-center">
                  <Cell icon={Eye} label="Lượt xem" value={j.views_count ?? 0} />
                  <Cell
                    icon={Users}
                    label="Đơn ứng tuyển"
                    value={j.applications_count ?? 0}
                    tone="blue"
                  />
                  <div className="col-span-2 flex items-center justify-between sm:col-span-1 sm:justify-end">
                    <JobActiveToggle jobId={j.id} initialActive={!!j.is_active} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:flex-col">
                  <Link
                    href={`/nha-tuyen-dung/shortlist/${j.id}`}
                    className="inline-flex h-9 items-center gap-1 rounded-full bg-[#1557ff] px-3 text-xs font-bold text-white shadow-md shadow-blue-500/25"
                  >
                    <Sparkles size={12} /> Shortlist
                  </Link>
                  <Link
                    href={`/nha-tuyen-dung/tin-tuyen/${j.id}/ung-tuyen`}
                    className="inline-flex h-9 items-center gap-1 rounded-full border border-slate-200 px-3 text-xs font-bold text-slate-700 hover:border-[#1557ff] hover:text-[#1557ff]"
                  >
                    <Users size={12} /> Ứng viên
                  </Link>
                  <Link
                    href={`/nha-tuyen-dung/tin-tuyen/${j.id}/chinh-sua`}
                    className="inline-flex h-9 items-center gap-1 rounded-full border border-slate-200 px-3 text-xs font-bold text-slate-700 hover:border-[#1557ff] hover:text-[#1557ff]"
                  >
                    <Pencil size={12} /> Sửa <ArrowRight size={10} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: number;
  tone?: "default" | "blue" | "emerald";
}) {
  const palette =
    tone === "blue"
      ? "border-blue-200 bg-blue-50/40 text-[#1557ff]"
      : tone === "emerald"
        ? "border-emerald-200 bg-emerald-50/40 text-emerald-700"
        : "border-slate-200 bg-white text-slate-700";
  return (
    <div className={`rounded-3xl border p-5 shadow-sm ${palette}`}>
      <p className="text-xs font-black uppercase">{label}</p>
      <p className="mt-1 text-3xl font-black">{value}</p>
    </div>
  );
}

function Cell({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
  tone?: "default" | "blue";
}) {
  return (
    <div>
      <p className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-400">
        <Icon size={10} /> {label}
      </p>
      <p
        className={`mt-0.5 text-base font-black ${tone === "blue" ? "text-[#1557ff]" : "text-slate-900"}`}
      >
        {value}
      </p>
    </div>
  );
}
