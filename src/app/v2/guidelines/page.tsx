import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";

const guidelineImages = [
  {
    title: "Design System Guideline",
    description: "Màu sắc, card, button, score ring, job card, HR card và component density.",
    src: "/assets/guidelines/01-design-system-guideline.png",
  },
  {
    title: "Homepage / Public Website",
    description: "Trang chủ hấp dẫn, dễ hiểu, có upload CV, JD paste, trust metrics và CTA rõ.",
    src: "/assets/guidelines/02-homepage-public-guideline.png",
  },
  {
    title: "Candidate Dashboard / CV Report",
    description: "Dashboard ứng viên, CV score, ATS, keyword, achievement và suggested fixes.",
    src: "/assets/guidelines/03-candidate-dashboard-report-guideline.png",
  },
  {
    title: "AI CV Rewrite Studio",
    description: "Studio 2 cột CV gốc và bản AI rewrite với quick actions tối ưu CV.",
    src: "/assets/guidelines/04-cv-rewrite-studio-guideline.png",
  },
  {
    title: "Job Board / Job Detail",
    description: "Danh sách job, filter, match percentage, chi tiết JD và missing skills.",
    src: "/assets/guidelines/05-job-board-detail-guideline.png",
  },
  {
    title: "HR Dashboard / Pipeline",
    description: "Dashboard tuyển dụng, thống kê, kanban pipeline và card ứng viên.",
    src: "/assets/guidelines/06-hr-dashboard-pipeline-guideline.png",
  },
  {
    title: "AI Shortlist / Candidate Detail",
    description: "Bảng ranking CV, lý do match, risk warning và chi tiết ứng viên cho HR.",
    src: "/assets/guidelines/07-ai-shortlist-candidate-detail-guideline.png",
  },
  {
    title: "Interview Kit",
    description: "Bộ câu hỏi phỏng vấn, scorecard, notes và recommendation cho HR.",
    src: "/assets/guidelines/08-interview-kit-guideline.png",
  },
  {
    title: "Pricing / Billing / Settings",
    description: "Pricing candidate/company, billing usage, invoice history và account settings.",
    src: "/assets/guidelines/09-pricing-billing-settings-guideline.png",
  },
];

export default function GuidelinesPage() {
  return (
    <main className="min-h-screen bg-[#f8fbff] px-4 py-8 text-[#07122f] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <Link href="/v2" className="inline-flex items-center gap-2 text-sm font-black text-[#1557ff]">
          <ArrowLeft size={18} /> Về trang chủ
        </Link>
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-black text-[#1557ff]">
                <ImageIcon size={16} /> CVAI Visual Guidelines
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-5xl">
                Bộ ảnh guideline trước khi triển khai UI chi tiết
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                Các ảnh này là visual direction cho những khu vực cần hình ảnh: public website, candidate app, HR app, shortlist, interview kit, pricing và account.
              </p>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 px-5 py-4">
              <p className="text-3xl font-black text-[#1557ff]">{guidelineImages.length}</p>
              <p className="text-sm font-bold text-slate-600">guideline images</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          {guidelineImages.map((image, index) => (
            <article key={image.src} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-5 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-black text-[#1557ff]">#{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-1 text-2xl font-black">{image.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{image.description}</p>
                </div>
                <Link href={image.src} className="inline-flex h-10 items-center justify-center rounded-md border border-[#1557ff] px-4 text-sm font-black text-[#1557ff]">
                  Mở ảnh
                </Link>
              </div>
              <div className="bg-slate-50 p-3">
                <Image
                  src={image.src}
                  alt={image.title}
                  width={1600}
                  height={900}
                  className="h-auto w-full rounded-md border border-slate-200 bg-white"
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
