import Link from "next/link";
import type { Metadata } from "next";
import {
  Gauge,
  Target,
  WandSparkles,
  Lightbulb,
  BriefcaseBusiness,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "AI Tools — YourCV",
  description: "Bộ công cụ AI hỗ trợ ứng viên Việt: chấm CV, JD match, viết thư xin việc, tạo câu hỏi phỏng vấn, ước tính lương.",
};

const tools = [
  {
    icon: Gauge,
    title: "AI Đánh giá CV",
    body: "Chấm CV theo 6 trục: thành tích, kinh nghiệm, ATS, keyword, format, độ rõ ràng — kèm gợi ý cải thiện cụ thể.",
    href: "/cong-cu/danh-gia-cv",
    free: "1 lần / tháng",
    pro: "Không giới hạn",
  },
  {
    icon: Target,
    title: "JD Match",
    body: "Đo độ phù hợp giữa CV và một mô tả công việc cụ thể. Nhận match %, ATS %, từ khoá thiếu và bullet rewrite.",
    href: "/cong-cu/jd-match",
    badge: "Mới",
    free: "3 lần / tháng",
    pro: "Không giới hạn",
  },
  {
    icon: WandSparkles,
    title: "AI Thư xin việc",
    body: "Sinh thư xin việc cá nhân hoá theo JD và CV của bạn. Chọn giọng văn chuyên nghiệp / thân thiện / tự tin.",
    href: "/cong-cu/thu-xin-viec",
    free: "3 lần / tháng",
    pro: "Không giới hạn",
  },
  {
    icon: Lightbulb,
    title: "AI Câu hỏi phỏng vấn",
    body: "10 câu hỏi phỏng vấn thực tế cho vị trí cụ thể + gợi ý cách trả lời tốt — chuẩn bị trước buổi phỏng vấn.",
    href: "/cong-cu/phong-van",
    free: "5 lần / tháng",
    pro: "Không giới hạn",
  },
  {
    icon: BriefcaseBusiness,
    title: "AI Ước tính lương",
    body: "Mức lương phù hợp cho vị trí của bạn theo dữ liệu thị trường lao động Việt Nam, theo ngành & khu vực.",
    href: "/cong-cu/luong",
    free: "5 lần / tháng",
    pro: "Không giới hạn",
  },
];

export default function CongCuHubPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f8fbff] text-[#07122f]">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-sm font-bold text-[#1557ff]">
              <Sparkles size={14} /> AI Toolkit
            </div>
            <h1
              className="mt-5 text-4xl font-black tracking-normal sm:text-5xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              5 công cụ AI để ứng viên Việt thắng phỏng vấn
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Tất cả miễn phí dùng thử. Free tier 3-5 lượt mỗi công cụ / tháng. Pro 99K/tháng dùng không giới hạn.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.title}
                  href={t.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#1557ff]">
                      <Icon size={22} />
                    </div>
                    {t.badge && (
                      <span className="rounded-xl bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">
                        {t.badge}
                      </span>
                    )}
                  </div>
                  <h3
                    className="mt-5 text-lg font-black text-[#07122f] group-hover:text-[#1557ff]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {t.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{t.body}</p>
                  <dl className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 text-xs">
                    <div>
                      <dt className="font-black uppercase text-slate-400">Free</dt>
                      <dd className="mt-0.5 font-bold text-slate-700">{t.free}</dd>
                    </div>
                    <div>
                      <dt className="font-black uppercase text-emerald-600">Pro</dt>
                      <dd className="mt-0.5 font-bold text-slate-700">{t.pro}</dd>
                    </div>
                  </dl>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-[#1557ff]">
                    Dùng ngay <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
            {/* Pro upsell card */}
            <div className="flex h-full flex-col rounded-2xl border border-emerald-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <Sparkles size={22} />
              </div>
              <h3
                className="mt-5 text-lg font-black"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                YourCV Pro — 99K / tháng
              </h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">
                Mở khoá tất cả templates Premium, AI không giới hạn cho cả 5 công cụ, không watermark khi export PDF, ưu tiên hỗ trợ.
              </p>
              <Link
                href="/nang-cap"
                className="mt-4 inline-flex h-11 w-fit items-center gap-2 rounded-xl bg-[#1557ff] px-5 text-sm font-bold text-white shadow-sm shadow-blue-500/25 hover:bg-[#0e3fd5]"
              >
                Nâng cấp Pro <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
