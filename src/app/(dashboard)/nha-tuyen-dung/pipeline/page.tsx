import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PipelineBoard } from "@/components/employer/pipeline-board";

export const dynamic = "force-dynamic";

export default async function CompanyPipelinePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap?next=/nha-tuyen-dung/pipeline");

  const { data: company } = await supabase
    .from("companies")
    .select("id, name")
    .eq("owner_id", user.id)
    .maybeSingle();
  if (!company) {
    return (
      <main className="bg-[#f8fbff]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black">Chưa có hồ sơ công ty</h1>
          <p className="mt-3 text-slate-600">Tạo hồ sơ công ty trước khi quản lý ứng viên.</p>
          <Link
            href="/nha-tuyen-dung/cong-ty"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[#1557ff] px-5 text-sm font-bold text-white shadow-sm shadow-blue-500/25"
          >
            Tạo hồ sơ công ty
          </Link>
        </div>
      </main>
    );
  }

  const { data: jobIdsRow } = await supabase
    .from("jobs")
    .select("id")
    .eq("company_id", company.id);
  const jobIds = (jobIdsRow ?? []).map((j) => j.id);

  const { data: apps } = jobIds.length
    ? await supabase
        .from("applications")
        .select(
          "id, status, created_at, cover_letter, job:jobs(title, slug), candidate:profiles(full_name, avatar_url, slug)"
        )
        .in("job_id", jobIds)
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <>
      <main className="bg-[#f8fbff] text-[#07122f]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              Recruitment Pipeline · {company.name}
            </p>
            <h1
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Kanban tuyển dụng
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
              Tổng {(apps ?? []).length} ứng viên qua mọi tin tuyển dụng. Click button trong card để chuyển stage — cập nhật ngay vào DB.
            </p>
          </header>

          {(!apps || apps.length === 0) ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-base font-bold text-slate-700">
                Chưa có ai ứng tuyển vào tin của bạn.
              </p>
              <Link
                href="/nha-tuyen-dung/tin-tuyen"
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-[#1557ff] px-4 text-sm font-bold text-white"
              >
                Quản lý tin tuyển dụng
              </Link>
            </div>
          ) : (
            <PipelineBoard
              items={(apps ?? []).map((a) => ({
                id: a.id,
                status: a.status,
                created_at: a.created_at,
                cover_letter: a.cover_letter,
                job: a.job as { title?: string | null; slug?: string | null } | null,
                candidate: a.candidate as {
                  full_name?: string | null;
                  avatar_url?: string | null;
                  slug?: string | null;
                } | null,
              }))}
            />
          )}
        </div>
      </main>
    </>
  );
}
