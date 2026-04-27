import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Sparkles,
  Plus,
  ShieldCheck,
  Brain,
  Users,
  TrendingUp,
  Filter,
  ClipboardList,
  Workflow,
  Check,
  Building2,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Dành cho công ty / HR — YourCV",
  description:
    "Đăng job, nhận CV, để AI xếp hạng ứng viên phù hợp nhất. AI Shortlist, Pipeline Kanban, Interview Kit và quản lý tuyển dụng đầy đủ.",
};

const features = [
  {
    icon: Plus,
    title: "Đăng job nhanh",
    body: "Form đăng tin có AI viết JD, AI làm chuyên nghiệp hơn, AI tách required skills.",
  },
  {
    icon: Brain,
    title: "AI phân tích JD",
    body: "AI phát hiện skill bắt buộc, mức lương phù hợp, dự đoán độ hấp dẫn của job post.",
  },
  {
    icon: Sparkles,
    title: "AI chấm CV",
    body: "Tự động cho điểm match từng ứng viên theo ngành, kinh nghiệm, kỹ năng và lương.",
  },
  {
    icon: TrendingUp,
    title: "Tự động shortlist",
    body: "AI xếp hạng 100 CV chỉ trong vài giây, lọc theo match >= 80%, có kinh nghiệm ngành.",
  },
  {
    icon: Filter,
    title: "So sánh ứng viên",
    body: "Side-by-side comparison, keyword match, red flags, câu hỏi phỏng vấn đề xuất.",
  },
  {
    icon: Workflow,
    title: "Quản lý pipeline",
    body: "Kanban board: New → Shortlist → Interview → Offer → Hired. Click chuyển stage.",
  },
];

export default function ChoCongTyPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f8fbff] text-[#07122f]">
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:px-8 lg:pt-20 lg:pb-20">
          <div>
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-sm font-bold text-emerald-700">
              <Building2 size={16} /> For Recruiters
            </div>
            <h1
              className="text-[40px] font-black leading-[1.1] tracking-tight text-[#0b1740] sm:text-5xl lg:text-[52px]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Đăng job, nhận CV,
              <br />
              <span className="text-[#1557ff]">để AI xếp hạng</span> ứng viên
              phù hợp nhất.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              YourCV cho HR công cụ AI shortlist, Kanban pipeline, AI interview
              kit. Tiết kiệm 70% thời gian sàng lọc và tập trung vào những
              ứng viên thực sự phù hợp.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/nha-tuyen-dung/cong-ty"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1557ff] px-7 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-[#0e3fd5]"
              >
                <Plus size={16} /> Đăng job ngay
              </Link>
              <Link
                href="/dang-ky"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 text-sm font-bold text-slate-700 hover:border-[#1557ff] hover:text-[#1557ff]"
              >
                Tạo tài khoản công ty <ArrowRight size={16} />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                ["1.800+", "Công ty đã dùng"],
                ["12.500+", "CV được AI phân tích"],
                ["70%", "Tiết kiệm thời gian"],
              ].map(([v, l]) => (
                <div
                  key={l}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                >
                  <p className="text-xl font-black text-[#1557ff]">{v}</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-slate-500">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mock pipeline preview */}
          <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_24px_60px_-24px_rgba(21,87,255,0.35)]">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recruitment Pipeline
            </p>
            <h3 className="mt-1 text-lg font-black">Performance Marketing Executive</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {[
                { label: "AI Shortlist", count: 12, tone: "bg-blue-50 border-blue-200 text-[#1557ff]" },
                { label: "Interview", count: 4, tone: "bg-amber-50 border-amber-200 text-amber-700" },
                { label: "Offer", count: 1, tone: "bg-emerald-50 border-emerald-200 text-emerald-700" },
                { label: "Total", count: 248, tone: "bg-slate-50 border-slate-200 text-slate-700" },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`rounded-2xl border ${s.tone} p-4`}
                >
                  <p className="text-xs font-black uppercase opacity-80">
                    {s.label}
                  </p>
                  <p className="mt-1 text-2xl font-black">{s.count}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2.5">
              {[
                ["Nguyễn Minh Anh", "Marketing Executive", 92, "Kinh nghiệm sát JD, có số liệu"],
                ["Trần Quang Huy", "Digital Analyst", 87, "Mạnh performance, thiếu ecommerce"],
                ["Lê Thảo Vy", "Content Specialist", 81, "Có tiềm năng, hơi junior"],
              ].map(([name, role, score, reason]) => (
                <div
                  key={name as string}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/40 p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1557ff] text-xs font-black text-white">
                    {(name as string)[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black">{name}</p>
                    <p className="truncate text-[11px] text-slate-500">{role}</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">{reason}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">
                    {score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wider text-emerald-600">
              For HR teams
            </p>
            <h2
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Bộ công cụ tuyển dụng AI cho công ty
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Mọi thứ bạn cần để rút ngắn quy trình từ 7-14 ngày xuống còn 3 ngày.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#1557ff]">
                    <Icon size={22} />
                  </div>
                  <h3
                    className="mt-5 text-lg font-black"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{f.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              Quy trình
            </p>
            <h2
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              4 bước để tuyển dụng nhanh hơn
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            {[
              { n: "01", title: "Tạo hồ sơ công ty", body: "Logo, giới thiệu, văn hóa, phúc lợi — sẽ hiển thị ở mọi job." },
              { n: "02", title: "Đăng tin tuyển dụng", body: "AI viết JD chuyên nghiệp, tách skill bắt buộc, sinh screening question." },
              { n: "03", title: "AI shortlist ứng viên", body: "100 CV → top 10 phù hợp nhất, lý do match, red flags rõ ràng." },
              { n: "04", title: "Pipeline Kanban", body: "Chuyển stage drag-drop, gửi email tự động, lưu note HR." },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p
                  className="text-3xl font-black text-[#1557ff]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {s.n}
                </p>
                <h3 className="mt-3 text-base font-black">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6 sm:grid-cols-3 sm:p-8">
            {[
              { icon: ShieldCheck, label: "Dữ liệu CV ứng viên được bảo mật theo chuẩn Việt Nam" },
              { icon: Users, label: "Nhiều thành viên HR cùng quản lý 1 pipeline" },
              { icon: ClipboardList, label: "Export báo cáo tuyển dụng chi tiết theo job/quarter" },
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

        {/* Pricing teaser */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              Pricing
            </p>
            <h2
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Gói dành cho công ty
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "499K",
                period: "/tháng",
                features: ["3 job đang mở", "100 CV AI phân tích", "1 thành viên HR", "Email hỗ trợ"],
                highlight: false,
              },
              {
                name: "Growth",
                price: "1.990K",
                period: "/tháng",
                features: ["15 job đang mở", "1.000 CV AI phân tích", "5 thành viên HR", "AI Interview Kit", "Hỗ trợ ưu tiên"],
                highlight: true,
              },
              {
                name: "Business",
                price: "Liên hệ",
                period: "Custom",
                features: ["Job không giới hạn", "AI Shortlist không giới hạn", "API & SSO", "Dedicated Success Manager"],
                highlight: false,
              },
            ].map((t) => (
              <div
                key={t.name}
                className={`relative rounded-3xl border p-7 shadow-sm ${t.highlight ? "border-[#1557ff] bg-gradient-to-br from-blue-50 via-white to-emerald-50 ring-2 ring-[#1557ff]/20" : "border-slate-200 bg-white"}`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-7 rounded-full bg-[#1557ff] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-lg shadow-blue-500/30">
                    Phổ biến nhất
                  </span>
                )}
                <p className="text-sm font-black uppercase tracking-wider text-slate-500">
                  {t.name}
                </p>
                <p className="mt-3">
                  <span
                    className={`text-4xl font-black ${t.highlight ? "text-[#1557ff]" : "text-slate-900"}`}
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {t.price}
                  </span>
                  <span className="ml-1 text-sm font-bold text-slate-500">
                    {t.period}
                  </span>
                </p>
                <ul className="mt-5 space-y-2.5">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <Check className="mt-1 shrink-0 text-emerald-600" size={14} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dang-ky"
                  className={`mt-6 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-bold ${t.highlight ? "bg-[#1557ff] text-white shadow-lg shadow-blue-500/25 hover:bg-[#0e3fd5]" : "border border-slate-200 bg-white text-slate-700 hover:border-[#1557ff] hover:text-[#1557ff]"}`}
                >
                  {t.highlight ? "Dùng thử 14 ngày" : "Liên hệ tư vấn"}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1557ff] via-[#3b6dff] to-emerald-500 p-10 text-white shadow-[0_24px_60px_-24px_rgba(21,87,255,0.5)] sm:p-14">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2
                  className="text-3xl font-black leading-tight sm:text-4xl"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Sẵn sàng tuyển dụng nhanh hơn 70%?
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-white/90">
                  Tạo tài khoản công ty miễn phí, đăng job đầu tiên trong 5 phút.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dang-ky"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-black text-[#1557ff] shadow-lg hover:opacity-90"
                >
                  Tạo tài khoản công ty <ArrowRight size={16} />
                </Link>
                <Link
                  href="/lien-he"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-7 text-sm font-bold text-white hover:bg-white/10"
                >
                  Liên hệ tư vấn
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
