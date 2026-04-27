import Link from "next/link";
import {
  Sparkles,
  CloudUpload,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroScoreCard } from "@/components/home/hero-score-card";
import {
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
  await getStats();

  return (
    <>
      <Header />
      <main className="bg-[#f8fbff] text-[#07122f]">
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-8 lg:pt-20 lg:pb-24">
          <div className="flex flex-col">
            <h1
              className="text-[44px] font-black uppercase leading-[1.05] tracking-tight text-[#0b1740] sm:text-5xl lg:text-[56px]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              CV của bạn đã đủ mạnh
              <br />
              để được gọi phỏng vấn chưa?
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-[15px]">
              AI phân tích CV, chấm điểm mức độ phù hợp với vị trí ứng tuyển,
              chỉ ra lỗi yếu, từ khóa thiếu và gợi ý viết lại từng phần.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cv/moi"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1557ff] px-7 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-[#0e3fd5]"
              >
                <CloudUpload size={18} /> Tải CV lên ngay
              </Link>
              <Link
                href="/cong-cu/jd-match"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 text-sm font-bold text-slate-700 hover:border-[#1557ff] hover:text-[#1557ff]"
              >
                <FileText size={18} /> Dán Job Description
              </Link>
            </div>

            {/* Drop zone */}
            <Link
              href="/cv/moi"
              className="group mt-8 flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-blue-200 bg-white/60 px-6 py-7 text-center transition hover:border-[#1557ff] hover:bg-white"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#1557ff]">
                <CloudUpload size={22} />
              </span>
              <p className="text-sm font-bold text-slate-700">
                Kéo &amp; thả CV của bạn
              </p>
              <p className="text-xs text-slate-500">
                hoặc chọn tệp từ thiết bị
              </p>
              <div className="mt-1 flex flex-wrap justify-center gap-2">
                {["PDF", "DOCX", "PNG"].map((ext) => (
                  <span
                    key={ext}
                    className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600 group-hover:bg-blue-50 group-hover:text-[#1557ff]"
                  >
                    {ext}
                  </span>
                ))}
              </div>
            </Link>
          </div>

          {/* Hero score card */}
          <HeroScoreCard />
        </section>

        {/* Logo strip */}
        <LogoStrip />

        {/* Feature grid (6 AI tools) */}
        <FeatureGrid />

        {/* How it works */}
        <HowItWorks />

        {/* Rich AI review report */}
        <HomeReport />

        {/* Jobs preview */}
        <JobsPreview />

        {/* Company preview */}
        <CompanyPreview />

        {/* Pricing teaser */}
        <PricingTeaser />

        {/* Testimonials */}
        <Testimonials />

        {/* Final gradient CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1557ff] via-[#3b6dff] to-emerald-500 p-10 text-white shadow-[0_24px_60px_-24px_rgba(21,87,255,0.5)] sm:p-14">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2
                  className="text-3xl font-black leading-tight sm:text-4xl"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Sẵn sàng để CV của bạn được gọi phỏng vấn?
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-white/90">
                  Tạo CV miễn phí trong 5 phút. AI chấm điểm và sửa giúp bạn —
                  không cần thẻ tín dụng.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/cv/moi"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-black text-[#1557ff] shadow-lg hover:opacity-90"
                >
                  Tạo CV miễn phí <ArrowRight size={16} />
                </Link>
                <Link
                  href="/bang-gia"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-7 text-sm font-bold text-white hover:bg-white/10"
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

function PricingTeaser() {
  const tiers = [
    {
      name: "Free",
      price: "0đ",
      period: "Miễn phí",
      tone: "border-slate-200 bg-white",
      cta: "Bắt đầu miễn phí",
      highlight: false,
      features: [
        "Review CV cơ bản",
        "Chấm điểm tổng thể",
        "Gợi ý cải thiện cơ bản",
        "1 báo cáo / tháng",
      ],
    },
    {
      name: "Pro",
      price: "99,000đ",
      period: "/tháng",
      tone: "border-[#1557ff] bg-gradient-to-br from-blue-50 via-white to-emerald-50 ring-2 ring-[#1557ff]/20",
      cta: "Dùng thử 7 ngày miễn phí",
      highlight: true,
      features: [
        "Tất cả tính năng Free",
        "So khớp với JD",
        "AI Rewrite Studio",
        "Tải báo cáo không giới hạn",
        "Lưu &amp; quản lý nhiều CV",
      ],
    },
    {
      name: "Business",
      price: "Liên hệ",
      period: "Giải pháp cho doanh nghiệp",
      tone: "border-slate-200 bg-white",
      cta: "Liên hệ tư vấn",
      highlight: false,
      features: [
        "Tất cả tính năng Pro",
        "Đăng job không giới hạn",
        "AI Shortlist ứng viên",
        "Quản lý &amp; pipeline tuyển dụng",
        "Báo cáo &amp; phân tích nâng cao",
        "Hỗ trợ ưu tiên",
      ],
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative flex flex-col rounded-[28px] border p-7 shadow-sm ${t.tone}`}
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
            <ul className="mt-5 flex-1 space-y-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span dangerouslySetInnerHTML={{ __html: f }} />
                </li>
              ))}
            </ul>
            <Link
              href={t.highlight ? "/nang-cap" : "/dang-ky"}
              className={`mt-6 inline-flex h-11 items-center justify-center rounded-full text-sm font-bold ${
                t.highlight
                  ? "bg-[#1557ff] text-white shadow-lg shadow-blue-500/25 hover:bg-[#0e3fd5]"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-[#1557ff] hover:text-[#1557ff]"
              }`}
            >
              {t.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "YourCV giúp mình thật sự chỉnh xác điểm yếu trong CV và cách viết lại cho hấp dẫn hơn. Sau khi chỉnh sửa theo gợi ý, mình đã nhận được 3 lời mời phỏng vấn trong 1 tuần!",
      name: "Nguyễn Hà My",
      role: "Digital Marketing Executive",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote:
        "Công cụ AI Shortlist của YourCV giúp chúng tôi lọc ứng viên nhanh và chính xác hơn rất nhiều. Tiết kiệm hơn 70% thời gian sàng lọc hồ sơ.",
      name: "Trần Quốc Hưng",
      role: "HR Manager tại FPT Telecom",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2
          className="text-3xl font-black sm:text-4xl"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Người dùng nói gì về YourCV
        </h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {items.map((t) => (
          <figure
            key={t.name}
            className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"
          >
            <blockquote className="text-base leading-7 text-slate-700">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.avatar}
                alt={t.name}
                className="h-11 w-11 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-black text-slate-900">{t.name}</p>
                <p className="text-xs font-semibold text-slate-500">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const _ = Sparkles;
