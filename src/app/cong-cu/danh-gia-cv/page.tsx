import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CvReviewTool } from "@/components/cong-cu/cv-review-tool";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "AI CV Review",
  description:
    "AI chấm CV theo 7 trục: Overall, ATS, Keyword, Experience, Achievement, Structure, Professionalism — kèm gợi ý sửa cụ thể.",
};

export const dynamic = "force-dynamic";

export default async function CvReviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap?next=/cong-cu/danh-gia-cv");

  const { data: cvs } = await supabase
    .from("cvs")
    .select("id, title")
    .eq("user_id", user.id)
    .order("is_primary", { ascending: false })
    .order("updated_at", { ascending: false });

  return (
    <>
      <Header />
      <main className="bg-[#f8fbff] text-[#07122f]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              AI CV Review
            </p>
            <h1
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Chấm điểm CV theo 7 trục — chỉ trong 30 giây
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
              AI phân tích CV theo 7 tiêu chí độc lập, chỉ ra điểm mạnh / điểm yếu / lỗi nghiêm trọng và đưa ra danh sách sửa ngay.
            </p>
          </header>

          {!cvs || cvs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-base font-bold text-slate-700">
                Bạn chưa có CV nào để chấm điểm.
              </p>
              <Link
                href="/cv/moi"
                className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[#1557ff] px-5 text-sm font-bold text-white shadow-lg shadow-blue-500/25"
              >
                Tạo CV ngay
              </Link>
            </div>
          ) : (
            <CvReviewTool cvs={cvs} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
