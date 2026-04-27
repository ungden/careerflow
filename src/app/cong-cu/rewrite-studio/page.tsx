import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RewriteStudio } from "@/components/cong-cu/rewrite-studio";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "AI CV Rewrite Studio",
  description:
    "Studio 2 cột — AI viết lại summary, kinh nghiệm, thêm số liệu, tối ưu ATS, dịch sang tiếng Anh.",
};

export const dynamic = "force-dynamic";

export default async function RewriteStudioPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap?next=/cong-cu/rewrite-studio");

  return (
    <>
      <Header />
      <main className="bg-[#f8fbff] text-[#07122f]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              AI Rewrite Studio
            </p>
            <h1
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Viết lại từng phần CV bằng AI — thấy thay đổi tức thì
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
              Dán đoạn CV cần cải thiện, chọn tác vụ — AI viết lại theo công thức
              chuẩn ngành (Action + Metric + Impact, tối ưu ATS, dịch tiếng Anh…).
            </p>
          </header>
          <RewriteStudio />
        </div>
      </main>
      <Footer />
    </>
  );
}
