import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";
import { JdMatchTool } from "@/components/candidates/jd-match-tool";

export const metadata: Metadata = {
  title: "JD Match — AI",
  description: "AI so khớp CV với JD cụ thể. Trả về match %, ATS %, từ khoá thiếu, gợi ý sửa bullet.",
};

type Props = { searchParams: Promise<{ job?: string }> };

export const dynamic = "force-dynamic";

export default async function JdMatchPage({ searchParams }: Props) {
  const { job: jobId } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap?next=/cong-cu/jd-match");

  const { data: cvs } = await supabase
    .from("cvs")
    .select("id, title")
    .eq("user_id", user.id)
    .order("is_primary", { ascending: false })
    .order("updated_at", { ascending: false });

  let defaultJD = "";
  if (jobId) {
    const { data: job } = await supabase
      .from("jobs")
      .select("title, description, requirements")
      .eq("id", jobId)
      .maybeSingle();
    if (job) {
      defaultJD = `${job.title}\n\n${job.description}\n\n${job.requirements ?? ""}`.trim();
    }
  }

  return (
    <>
      <Header />
      <main className="bg-[#f8fbff] text-[#07122f]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">JD Match · AI</p>
            <h1
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              CV của bạn match JD bao nhiêu phần trăm?
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
              AI so khớp CV với JD cụ thể, chỉ ra từ khoá thiếu, gợi ý sửa bullet và dự đoán khả năng pass ATS.
            </p>
          </header>

          {(!cvs || cvs.length === 0) ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="text-base font-bold text-slate-700">
                Bạn chưa có CV nào để so khớp.
              </p>
              <Link
                href="/cv/moi"
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-md bg-[#1557ff] px-4 text-sm font-bold text-white"
              >
                Tạo CV ngay
              </Link>
            </div>
          ) : (
            <JdMatchTool cvs={cvs} defaultJD={defaultJD} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
