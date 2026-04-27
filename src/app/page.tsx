import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  CloudUpload,
  FileText,
  Target,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  HomeQuickActions,
  LogoStrip,
  FeatureGrid,
  HowItWorks,
  HomeReport,
  JobsPreview,
  CompanyPreview,
} from "@/components/cvai/sections";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = await createClient();
  const [{ count: jobsCount }, { count: cvCount }, { count: companiesCount }] =
    await Promise.all([
      supabase
        .from("jobs")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true),
      supabase.from("cvs").select("id", { count: "exact", head: true }),
      supabase.from("companies").select("id", { count: "exact", head: true }),
    ]);
  return {
    jobs: jobsCount ?? 0,
    cvs: cvCount ?? 0,
    companies: companiesCount ?? 0,
  };
}

export default async function HomePage() {
  const stats = await getStats();

  return (
    <>
      <Header />
      <main className="bg-[#f8fbff] text-[#07122f]">
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-sm font-bold text-[#1557ff]">
              <Sparkles size={16} /> AI CV Review + AI Recruiting
            </div>
            <h1
              className="max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              CV của bạn đã đủ mạnh để được gọi phỏng vấn chưa?
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              YourCV phân tích CV bằng AI, chấm điểm độ phù hợp với vị trí ứng
              tuyển, chỉ ra lỗi yếu và đề xuất cách sửa cụ thể để tăng cơ hội
              được mời phỏng vấn.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cv/moi"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#1557ff] px-6 text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-[#0e3fd5]"
              >
                <CloudUpload size={19} /> Tạo CV miễn phí
              </Link>
              <Link
                href="/cong-cu/jd-match"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#1557ff] bg-white px-6 text-base font-bold text-[#1557ff] hover:bg-blue-50"
              >
                <FileText size={19} /> Dán Job Description
              </Link>
            </div>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                [stats.jobs.toLocaleString("vi-VN") + "+", "Việc đang tuyển"],
                [stats.cvs.toLocaleString("vi-VN") + "+", "CV đã tạo"],
                [stats.companies.toLocaleString("vi-VN") + "+", "Công ty"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm"
                >
                  <p className="text-xl font-black text-[#1557ff]">{value}</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-blue-100 bg-white p-2 shadow-2xl shadow-blue-200/60">
            <Image
              src="/assets/cvai-product-visual.png"
              alt="YourCV dashboard visual"
              width={1400}
              height={788}
              priority
              className="h-full w-full rounded-md object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-lg border border-white/70 bg-white/92 p-4 shadow-lg backdrop-blur md:grid-cols-3">
              {[
                ["CV Score", "78/100", "Khá tốt"],
                ["ATS Match", "84%", "Vượt qua lọc hồ sơ"],
                ["JD Match", "72%", "12 gợi ý cải thiện"],
              ].map(([title, value, note]) => (
                <div key={title}>
                  <p className="text-xs font-black uppercase text-slate-500">
                    {title}
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#07122f]">{value}</p>
                  <p className="mt-1 text-xs font-bold text-emerald-700">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick actions: candidate / candidate / company */}
        <HomeQuickActions />

        {/* Logo strip — companies that hire here */}
        <LogoStrip />

        {/* Feature grid — 6 AI tools */}
        <FeatureGrid />

        {/* How it works */}
        <HowItWorks />

        {/* Rich AI review report visualization */}
        <HomeReport />

        {/* Real-data jobs preview (hand-curated chips, sample cards) */}
        <JobsPreview />

        {/* Company-side preview with pipeline */}
        <CompanyPreview />

        {/* Trust strip */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-lg border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6 sm:grid-cols-3 sm:p-8">
            {[
              { icon: ShieldCheck, label: "Bảo mật dữ liệu CV theo chuẩn Việt Nam" },
              { icon: Check, label: "Free 1 lượt review/tháng — không cần thẻ" },
              { icon: Sparkles, label: "Pro chỉ 99K/tháng, AI không giới hạn" },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 shrink-0 text-emerald-600" size={20} />
                  <p className="text-sm font-bold leading-6 text-slate-700">
                    {t.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 p-8 text-white shadow-2xl shadow-blue-200/60 sm:p-12">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2
                  className="text-3xl font-black leading-tight sm:text-4xl"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Sẵn sàng để CV của bạn được gọi phỏng vấn?
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-white/90">
                  Tạo CV miễn phí trong 5 phút, để AI chấm điểm và sửa giúp bạn.
                  Không cần thẻ tín dụng.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/cv/moi"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-base font-black text-[#1557ff] shadow-lg hover:opacity-90"
                >
                  Tạo CV miễn phí <ArrowRight size={18} />
                </Link>
                <Link
                  href="/bang-gia"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/40 px-6 text-base font-bold text-white hover:bg-white/10"
                >
                  Xem bảng giá
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
