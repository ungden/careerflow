import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText, Plus, Star, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function CvLibraryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap?next=/cv");

  const { data: cvs } = await supabase
    .from("cvs")
    .select("id, title, template_id, is_primary, created_at, updated_at")
    .eq("user_id", user.id)
    .order("is_primary", { ascending: false })
    .order("updated_at", { ascending: false });

  const { data: profile } = await supabase
    .from("profiles")
    .select("slug, is_published")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <>
      <main className="bg-[#f8fbff] text-[#07122f]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
                CV Library
              </p>
              <h1
                className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Kho CV của bạn
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
                Quản lý nhiều CV, đặt 1 cái làm primary để tự ứng tuyển 1-click.
              </p>
            </div>
            <Link
              href="/cv/moi"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-[#1557ff] px-5 text-sm font-bold text-white shadow-sm shadow-blue-500/25 hover:bg-[#0e3fd5]"
            >
              <Plus size={18} /> Tạo CV mới
            </Link>
          </div>

          {(!cvs || cvs.length === 0) ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
              <FileText size={36} className="mx-auto text-slate-300" />
              <p className="mt-4 text-base font-bold text-slate-700">
                Bạn chưa có CV nào.
              </p>
              <Link
                href="/cv/moi"
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-[#1557ff] px-4 text-sm font-bold text-white"
              >
                <Plus size={16} /> Bắt đầu CV đầu tiên
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cvs.map((cv) => (
                <div
                  key={cv.id}
                  className="group flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-[#1557ff]">
                      <FileText size={20} />
                    </div>
                    {cv.is_primary && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">
                        <Star size={12} fill="currentColor" /> Primary
                      </span>
                    )}
                  </div>
                  <h3
                    className="mt-4 text-lg font-black text-[#07122f] group-hover:text-[#1557ff]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {cv.title || "CV chưa đặt tên"}
                  </h3>
                  <p className="mt-1 text-xs font-bold uppercase text-slate-500">
                    Template {cv.template_id}
                  </p>
                  <p className="mt-3 text-xs text-slate-400">
                    Cập nhật {new Date(cv.updated_at).toLocaleDateString("vi-VN")}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      href={`/cv/${cv.id}`}
                      className="inline-flex h-9 items-center gap-1 rounded-md bg-[#1557ff] px-3 text-xs font-bold text-white"
                    >
                      <Pencil size={12} /> Chỉnh sửa
                    </Link>
                    {cv.is_primary && profile?.is_published && profile.slug && (
                      <Link
                        href={`/cv/p/${profile.slug}`}
                        className="inline-flex h-9 items-center gap-1 rounded-md border border-slate-200 px-3 text-xs font-bold text-slate-700 hover:border-[#1557ff] hover:text-[#1557ff]"
                      >
                        Public link
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
