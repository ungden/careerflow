import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  CloudUpload,
  FileText,
  Gauge,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const stats = [
  ["12.500+", "CV đã tạo"],
  ["1.800+", "doanh nghiệp"],
  ["87%", "CV cải thiện sau lần đầu"],
];

const actions = [
  {
    title: "Tạo CV từ mẫu",
    body: "Chọn template, dùng CV mẫu theo ngành và chỉnh thông tin trong editor.",
    href: "/cv/moi",
    cta: "Chọn mẫu CV",
    icon: FileText,
  },
  {
    title: "Tối ưu cho việc làm",
    body: "Tìm job phù hợp, chuẩn bị CV theo JD và theo dõi ứng tuyển.",
    href: "/viec-lam",
    cta: "Xem việc làm",
    icon: Target,
  },
  {
    title: "AI career tools",
    body: "Đánh giá CV, viết thư xin việc, luyện phỏng vấn và tham khảo lương.",
    href: "/cong-cu",
    cta: "Mở công cụ",
    icon: WandSparkles,
  },
];

const templateRows = [
  ["Modern", "Công nghệ, Data, Product", "Free"],
  ["Classic", "Tài chính, Sales, ATS", "Free"],
  ["Milano", "Marketing, Design, Brand", "Pro"],
  ["Seoul", "Startup, Tech, Analytics", "Pro"],
];

const featureCards = [
  {
    title: "CV chuẩn ATS",
    body: "Bố cục A4 rõ ràng, tiêu đề và section nhất quán để nhà tuyển dụng đọc nhanh.",
    icon: Gauge,
  },
  {
    title: "Gợi ý theo ngành",
    body: "Mẫu nội dung đã có kinh nghiệm, kỹ năng, dự án và chứng chỉ phù hợp từng role.",
    icon: BadgeCheck,
  },
  {
    title: "Kết nối việc làm",
    body: "Dùng CV đã tạo để ứng tuyển, lưu việc và quản lý hồ sơ trong một tài khoản.",
    icon: Building2,
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-[#f8fbff] pt-16 text-[#07122f]">
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-sm font-bold text-[#1557ff]">
              <Sparkles size={16} /> AI CV Builder + Career Platform
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              Tạo CV chuyên nghiệp đủ mạnh để được gọi phỏng vấn.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              YourCV giúp bạn bắt đầu từ mẫu CV đã viết sẵn theo ngành, chọn template chuẩn A4, chỉnh nội dung và xuất PDF gọn gàng trong vài phút.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/cv/moi" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#1557ff] px-6 text-base font-bold text-white shadow-lg shadow-blue-500/25">
                <CloudUpload size={19} /> Tạo CV miễn phí
              </Link>
              <Link href="/viec-lam" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#1557ff] bg-white px-6 text-base font-bold text-[#1557ff]">
                <BriefcaseBusiness size={19} /> Khám phá việc làm
              </Link>
            </div>

            <div className="mt-7 rounded-lg border border-dashed border-blue-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#1557ff]">
                  <FileText size={22} />
                </span>
                <div>
                  <p className="text-sm font-black text-[#07122f]">Bắt đầu nhanh với CV mẫu theo ngành</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    IT, Marketing, Sales, Finance, HR, Design, Data và Operations đã có nội dung mẫu để bạn sửa trực tiếp.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid max-w-xl gap-3 sm:grid-cols-3">
              {stats.map(([value, label]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xl font-black text-[#1557ff]">{value}</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-slate-500">{label}</p>
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
              className="h-full min-h-[420px] w-full rounded-md object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-lg border border-white/70 bg-white/92 p-4 shadow-lg backdrop-blur md:grid-cols-3">
              {[
                ["CV Score", "78/100", "Khá tốt"],
                ["ATS Match", "84%", "Vượt qua lọc hồ sơ"],
                ["JD Match", "72%", "12 gợi ý cải thiện"],
              ].map(([title, value, note]) => (
                <div key={title}>
                  <p className="text-xs font-black uppercase text-slate-500">{title}</p>
                  <p className="mt-1 text-2xl font-black text-[#07122f]">{value}</p>
                  <p className="mt-1 text-xs font-bold text-emerald-700">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} href={action.href} className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#1557ff] group-hover:bg-[#1557ff] group-hover:text-white">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-black">{action.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{action.body}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#1557ff]">
                        {action.cta} <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#20b26b]">Template library</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">
                Mẫu CV không còn là khung trắng.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Mỗi template đi cùng dữ liệu mẫu theo ngành để user nhìn được CV thành phẩm ngay từ màn chọn. Nội dung được viết theo bullet có kết quả, số liệu và từ khoá tuyển dụng.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-[#f8fbff] shadow-sm">
              {templateRows.map(([name, audience, tier], index) => (
                <div key={name} className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-slate-200 px-5 py-4 last:border-b-0 sm:grid-cols-[140px_1fr_auto]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-sm font-black text-[#1557ff] shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="font-black text-[#07122f]">{name}</p>
                  </div>
                  <p className="hidden text-sm font-semibold text-slate-500 sm:block">{audience}</p>
                  <span className="rounded-md bg-white px-3 py-1 text-xs font-black text-[#20b26b] shadow-sm">{tier}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          {featureCards.map(({ title, body, icon: Icon }) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-emerald-50 text-[#20b26b]">
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-black text-[#07122f]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">{body}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-lg border border-blue-100 bg-[#1557ff] text-white shadow-2xl shadow-blue-200/70 lg:grid-cols-[1fr_auto]">
            <div className="p-7 sm:p-10">
              <p className="text-sm font-black uppercase tracking-wide text-white/70">Ready to export</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                Tạo CV đầu tiên bằng template đẹp và dữ liệu mẫu chuyên nghiệp.
              </h2>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/cv/moi" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-base font-black text-[#1557ff]">
                  Bắt đầu ngay <ArrowRight size={18} />
                </Link>
                <Link href="/cong-cu/danh-gia-cv" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/40 px-6 text-base font-black text-white">
                  Đánh giá CV
                </Link>
              </div>
            </div>
            <div className="hidden w-72 items-center justify-center bg-[#0f45cc] p-8 lg:flex">
              <div className="space-y-3">
                {["Chọn mẫu", "Điền thông tin", "Export PDF"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-md bg-white/10 px-4 py-3 text-sm font-black">
                    <Check size={17} /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
