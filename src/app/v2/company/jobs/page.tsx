import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Plus, Users } from "lucide-react";
import { Shell } from "@/components/cvai/cvai-app";
import { createClient } from "@/lib/supabase/server";

const STATUS_TONE: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700",
  paused: "bg-amber-50 text-amber-700",
  closed: "bg-slate-100 text-slate-500",
};

export default async function V2CompanyJobsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap?next=/v2/company/jobs");

  // Find this user's company (1 user → 1 company in current schema).
  const { data: company } = await supabase
    .from("companies")
    .select("id, name, slug, logo_url")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (!company) {
    return (
      <Shell>
        <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black">Tạo hồ sơ công ty trước</h1>
          <p className="mt-3 text-base text-slate-600">
            Bạn cần tạo hồ sơ công ty trước khi đăng tin tuyển dụng.
          </p>
          <Link
            href="/nha-tuyen-dung/cong-ty"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-[#1557ff] px-5 text-sm font-bold text-white shadow-sm shadow-blue-500/25"
          >
            <Plus size={16} /> Tạo hồ sơ công ty
          </Link>
        </main>
      </Shell>
    );
  }

  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, slug, title, location, job_type, is_active, is_featured, applications_count, views_count, created_at, expires_at")
    .eq("company_id", company.id)
    .order("created_at", { ascending: false });

  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">Job Management · {company.name}</p>
            <h1 className="mt-2 text-3xl font-black tracking-normal sm:text-4xl">
              Quản lý tin tuyển dụng
            </h1>
          </div>
          <Link
            href="/nha-tuyen-dung/dang-tin"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-[#1557ff] px-5 text-sm font-bold text-white shadow-sm shadow-blue-500/25"
          >
            <Plus size={16} /> Đăng tin mới
          </Link>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          {(!jobs || jobs.length === 0) ? (
            <div className="p-10 text-center">
              <p className="text-base font-bold text-slate-700">Chưa có tin tuyển dụng nào.</p>
              <Link
                href="/nha-tuyen-dung/dang-tin"
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-md bg-[#1557ff] px-4 text-sm font-bold text-white"
              >
                Đăng tin đầu tiên
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {jobs.map((j) => {
                const status = j.is_active ? "active" : "closed";
                const tone = STATUS_TONE[status];
                return (
                  <li key={j.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/v2/jobs/${j.slug}`}
                          className="text-base font-black hover:text-[#1557ff]"
                        >
                          {j.title}
                        </Link>
                        <span className={`rounded-md px-2 py-0.5 text-xs font-black ${tone}`}>
                          {status === "active" ? "Đang tuyển" : "Đã đóng"}
                        </span>
                        {j.is_featured && (
                          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-black text-emerald-700">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs font-bold text-slate-500">
                        {j.location} · {j.job_type} · Đăng {new Date(j.created_at).toLocaleDateString("vi-VN")}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs font-bold uppercase text-slate-400">Lượt xem</p>
                        <p className="text-base font-black">{j.views_count ?? 0}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold uppercase text-slate-400">Đơn ứng tuyển</p>
                        <p className="text-base font-black text-[#1557ff]">{j.applications_count ?? 0}</p>
                      </div>
                      <Link
                        href={`/nha-tuyen-dung/tin-tuyen/${j.id}/ung-tuyen`}
                        className="inline-flex h-9 items-center gap-1 rounded-md bg-[#1557ff] px-3 text-xs font-bold text-white"
                      >
                        <Users size={14} /> Xem ứng viên
                      </Link>
                      <Link
                        href={`/nha-tuyen-dung/tin-tuyen/${j.id}/chinh-sua`}
                        className="inline-flex h-9 items-center gap-1 rounded-md border border-slate-200 px-3 text-xs font-bold text-slate-700"
                      >
                        Sửa <ArrowRight size={12} />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </Shell>
  );
}
