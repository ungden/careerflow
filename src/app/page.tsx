import Link from "next/link";
import {
  Sparkles,
  CloudUpload,
  FileText,
  Target,
  WandSparkles,
  Gauge,
  BriefcaseBusiness,
  Building2,
  ArrowRight,
  Check,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-20">
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
              YourCV phân tích CV bằng AI, chấm điểm độ phù hợp với JD, chỉ ra
              lỗi yếu và đề xuất cách sửa cụ thể để tăng cơ hội được mời phỏng
              vấn.
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
                <Target size={19} /> Đo match với JD
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
            <div className="grid gap-3 p-6">
              <div className="flex items-center justify-between rounded-md bg-gradient-to-br from-blue-600 to-emerald-500 p-5 text-white shadow-md">
                <div>
                  <p className="text-xs font-black uppercase opacity-80">
                    CV Score
                  </p>
                  <p className="mt-1 text-4xl font-black">
                    82<span className="text-2xl opacity-70">/100</span>
                  </p>
                  <p className="mt-1 text-xs font-bold opacity-90">
                    Khá tốt — còn 12 gợi ý
                  </p>
                </div>
                <Gauge size={56} className="opacity-30" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-slate-200 p-4">
                  <p className="text-xs font-black uppercase text-slate-500">
                    ATS Match
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#1557ff]">84%</p>
                  <p className="mt-1 text-xs font-bold text-emerald-600">
                    Vượt qua lọc hồ sơ
                  </p>
                </div>
                <div className="rounded-md border border-slate-200 p-4">
                  <p className="text-xs font-black uppercase text-slate-500">
                    JD Match
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#1557ff]">72%</p>
                  <p className="mt-1 text-xs font-bold text-amber-600">
                    12 từ khoá thiếu
                  </p>
                </div>
              </div>
              <div className="rounded-md border border-slate-200 p-4">
                <p className="text-xs font-black uppercase text-slate-500">
                  Top suggestion
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Thêm số liệu cụ thể vào bullet kinh nghiệm — ví dụ:
                  <span className="font-bold">
                    {" "}
                    &ldquo;Tăng conversion +24% sau 3 tháng&rdquo;
                  </span>
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {["Node.js", "PostgreSQL", "AWS"].map((kw) => (
                  <span
                    key={kw}
                    className="rounded-md bg-emerald-50 px-2 py-1 text-center text-xs font-black text-emerald-700"
                  >
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: CloudUpload,
                title: "Ứng viên upload CV",
                body: "Tải CV lên, nhận điểm ATS, từ khoá thiếu và gợi ý sửa cụ thể trong 1 dashboard.",
                href: "/cong-cu/danh-gia-cv",
                cta: "Review CV miễn phí",
              },
              {
                icon: Target,
                title: "Tìm việc match với CV",
                body: "Xem job phù hợp với CV, biết match bao nhiêu % và tối ưu CV trước khi apply.",
                href: "/viec-lam",
                cta: "Khám phá việc làm",
              },
              {
                icon: Building2,
                title: "Công ty lọc CV bằng AI",
                body: "Đăng job, nhận CV, để AI xếp hạng và gợi ý shortlist ứng viên phù hợp nhất.",
                href: "/nha-tuyen-dung/cong-ty",
                cta: "Dành cho HR",
              },
            ].map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.title}
                  href={a.href}
                  className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[#1557ff]">
                    <Icon size={22} />
                  </div>
                  <h3
                    className="mt-4 text-lg font-black text-[#07122f] group-hover:text-[#1557ff]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {a.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-[#1557ff]">
                    {a.cta} <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Feature grid */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              AI Toolkit
            </p>
            <h2
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Mọi thứ ứng viên Việt cần để chiến thắng phỏng vấn
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Gauge,
                title: "AI CV Review",
                body: "Chấm CV theo 6 trục: thành tích, kinh nghiệm, ATS, keyword, format và độ rõ ràng.",
                href: "/cong-cu/danh-gia-cv",
              },
              {
                icon: Target,
                title: "JD Match",
                body: "So khớp CV với JD cụ thể, tính match % và liệt kê từ khoá thiếu cần thêm.",
                href: "/cong-cu/jd-match",
              },
              {
                icon: WandSparkles,
                title: "AI Cover Letter",
                body: "Sinh thư xin việc cá nhân hoá theo JD, giọng văn chuyên nghiệp/thân thiện/tự tin.",
                href: "/cong-cu/thu-xin-viec",
              },
              {
                icon: Lightbulb,
                title: "AI Phỏng vấn",
                body: "10 câu hỏi phỏng vấn thực tế cho vị trí của bạn + gợi ý cách trả lời hay.",
                href: "/cong-cu/phong-van",
              },
              {
                icon: BriefcaseBusiness,
                title: "AI Lương thị trường",
                body: "Ước tính mức lương phù hợp theo ngành, vị trí, kinh nghiệm và khu vực Việt Nam.",
                href: "/cong-cu/luong",
              },
              {
                icon: FileText,
                title: "10 CV Templates",
                body: "Classic, Modern, Tokyo, Berlin, Dubai, Seoul... Editor real-time, không watermark khi Pro.",
                href: "/cv/moi",
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.title}
                  href={f.href}
                  className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[#1557ff]">
                    <Icon size={20} />
                  </div>
                  <h3
                    className="mt-4 text-base font-black text-[#07122f] group-hover:text-[#1557ff]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {f.body}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wider text-emerald-600">
              How it works
            </p>
            <h2
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              3 bước để có việc làm phù hợp
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                n: "01",
                title: "Tạo CV / Tải CV cũ lên",
                body: "Editor real-time, 10 templates, parse từ LinkedIn URL hoặc PDF.",
              },
              {
                n: "02",
                title: "Để AI review + match",
                body: "Chấm điểm tổng thể, ATS score, JD match — chỉ ra lỗi và sửa.",
              },
              {
                n: "03",
                title: "Apply 1-click vào job phù hợp",
                body: "Sàng lọc job theo match %, ứng tuyển không cần upload lại.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p
                  className="text-3xl font-black text-[#1557ff]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {s.n}
                </p>
                <h3 className="mt-3 text-lg font-black">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust */}
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
      </main>
      <Footer />
    </>
  );
}
