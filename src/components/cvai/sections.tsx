import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  CloudUpload,
  CreditCard,
  FileCheck2,
  FileText,
  Filter,
  Gauge,
  LayoutDashboard,
  Lightbulb,
  Lock,
  MessageSquareText,
  PencilLine,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  UsersRound,
  WandSparkles,
} from "lucide-react";

type Icon = typeof Sparkles;
type Group = "Public" | "Candidate" | "Company" | "Account";

type Page = {
  route: string;
  number: number;
  group: Group;
  title: string;
  eyebrow: string;
  description: string;
  icon: Icon;
  ctas: [string, string];
};

const pages: Page[] = [
  ["jobs", 2, "Public", "Danh sách việc làm", "Job board", "Lọc job theo vị trí, ngành, địa điểm, remote/hybrid/onsite, lương, kinh nghiệm, công ty và độ phù hợp với CV.", Search, ["Tìm việc phù hợp", "Upload CV để xem match"]],
  ["jobs/performance-marketing-executive", 3, "Public", "Performance Marketing Executive", "Chi tiết job", "Chi tiết vị trí, công ty, lương, mô tả, yêu cầu, quyền lợi, hạn ứng tuyển và CV match theo JD.", BriefcaseBusiness, ["Ứng tuyển ngay", "Tối ưu CV cho job này"]],
  ["companies", 4, "Public", "Dành cho công ty / HR", "Employer landing", "Đăng job, nhận CV, để AI xếp hạng ứng viên phù hợp nhất và quản lý pipeline tuyển dụng.", Building2, ["Đăng job", "Tạo tài khoản công ty"]],
  ["pricing", 5, "Public", "Bảng giá", "Pricing", "Gói cho ứng viên: Free, Pro CV Review, Pro Job Apply. Gói cho công ty: Starter, Growth, Business.", CircleDollarSign, ["Bắt đầu miễn phí", "Liên hệ tư vấn"]],
  ["candidate/dashboard", 6, "Candidate", "Candidate Dashboard", "Tổng quan ứng viên", "CV score, số CV đã upload, job phù hợp, job đã ứng tuyển, lỗi cần sửa và lịch sử review.", LayoutDashboard, ["Review CV mới", "Xem job phù hợp"]],
  ["candidate/upload-cv", 7, "Candidate", "Upload CV", "Tải CV lên", "Hỗ trợ PDF, DOCX, copy text, LinkedIn URL và Portfolio URL, sau đó parse dữ liệu CV.", CloudUpload, ["Tải CV lên", "Dán LinkedIn URL"]],
  ["candidate/cv-library", 8, "Candidate", "CV Library", "Kho CV", "Quản lý nhiều CV theo ngôn ngữ, mục tiêu apply, điểm score, ngày cập nhật và số lần sử dụng.", FileText, ["Tạo CV mới", "Review lại"]],
  ["candidate/cv-review-report", 9, "Candidate", "CV Review Report", "Báo cáo AI", "Dashboard điểm CV tổng thể, ATS, keyword, kinh nghiệm, thành tích, điểm mạnh/yếu và gợi ý sửa.", Gauge, ["Sửa bằng AI", "Tải report"]],
  ["candidate/jd-match", 10, "Candidate", "JD Match / Job Fit", "So khớp với JD", "Xem CV phù hợp bao nhiêu %, thiếu keyword nào, bullet nào nên viết lại và khả năng được gọi phỏng vấn.", Target, ["Tối ưu CV", "Ứng tuyển bằng CV hiện tại"]],
  ["candidate/rewrite-studio", 11, "Candidate", "AI CV Rewrite Studio", "Studio chỉnh CV", "Hai cột CV gốc và bản AI đề xuất để viết lại summary, kinh nghiệm, thêm số liệu và tối ưu ATS.", WandSparkles, ["Áp dụng bản AI", "Tạo phiên bản CV mới"]],
  ["candidate/applications", 12, "Candidate", "Job Applications", "Theo dõi ứng tuyển", "Quản lý trạng thái đã ứng tuyển, công ty đã xem, shortlist, phỏng vấn, từ chối và offer.", ClipboardCheck, ["Xem lịch phỏng vấn", "Tìm job mới"]],
  ["candidate/profile", 13, "Candidate", "Candidate Profile", "Hồ sơ ứng viên", "Thông tin cá nhân, kỹ năng, ngành quan tâm, lương kỳ vọng, khu vực, portfolio, LinkedIn và CV mặc định.", UserRound, ["Cập nhật hồ sơ", "Xem CV mặc định"]],
  ["company/dashboard", 14, "Company", "Company Dashboard", "Tổng quan tuyển dụng", "Số job đang mở, CV nhận được, ứng viên AI shortlist, phỏng vấn và chất lượng ứng viên theo job.", LayoutDashboard, ["Tạo job mới", "Xem shortlist"]],
  ["company/profile", 15, "Company", "Company Profile", "Hồ sơ công ty", "Logo, tên công ty, giới thiệu, website, lĩnh vực, quy mô, địa chỉ, văn hóa, phúc lợi và ảnh văn phòng.", Building2, ["Lưu hồ sơ", "Xem public profile"]],
  ["company/jobs", 16, "Company", "Job Management", "Quản lý job", "Danh sách job với trạng thái draft, active, paused, closed, số CV, ứng viên phù hợp cao và hạn tuyển.", BriefcaseBusiness, ["Đăng job mới", "Tạm dừng job"]],
  ["company/jobs/new", 17, "Company", "Create / Edit Job", "Tạo job", "Form tạo job có AI viết JD, làm chuyên nghiệp hơn, tách skill bắt buộc và tạo câu hỏi sàng lọc.", PencilLine, ["Xuất bản job", "AI viết JD"]],
  ["company/pipeline", 18, "Company", "Candidate Pipeline", "Kanban tuyển dụng", "Pipeline New, AI Shortlisted, HR Review, Interview, Offer, Hired, Rejected với card ứng viên.", UsersRound, ["Chuyển stage", "Thêm ghi chú"]],
  ["company/candidates/nguyen-minh-anh", 19, "Company", "Candidate Detail for HR", "Chi tiết ứng viên", "CV gốc, AI summary, match score, điểm mạnh/yếu, keyword match, red flags, câu hỏi phỏng vấn và note HR.", FileCheck2, ["Shortlist ứng viên", "Tạo interview kit"]],
  ["company/shortlist", 20, "Company", "CV Ranking / AI Shortlist", "Xếp hạng AI", "AI xếp hạng 100 CV theo match, kinh nghiệm ngành, kỹ năng bắt buộc, lương, địa điểm và portfolio.", BarChart3, ["Xuất danh sách", "Lọc match trên 80%"]],
  ["company/interview-kit", 21, "Company", "Interview Kit", "Bộ câu hỏi AI", "Tạo câu hỏi xác minh kinh nghiệm, kỹ thuật, tình huống, điểm yếu CV, scorecard và ghi chú phỏng vấn.", MessageSquareText, ["Tạo bộ câu hỏi", "In scorecard"]],
  ["login", 22, "Account", "Login / Register", "Tài khoản", "Đăng nhập hoặc đăng ký với vai trò Candidate, Company, hoặc cả hai trong cùng một tài khoản.", Lock, ["Đăng nhập", "Tạo tài khoản"]],
  ["settings", 23, "Account", "Settings", "Cài đặt", "Thông tin tài khoản, email, password, billing, notification, privacy và xóa dữ liệu CV.", Settings, ["Lưu thay đổi", "Xóa dữ liệu CV"]],
  ["billing", 24, "Account", "Billing / Subscription", "Thanh toán", "Quản lý Pro, lượt review/rewrite, số job, số CV AI phân tích, thành viên HR và lịch sử hóa đơn.", CreditCard, ["Nâng cấp Pro", "Xem hóa đơn"]],
].map(([route, number, group, title, eyebrow, description, icon, ctas]) => ({
  route,
  number,
  group,
  title,
  eyebrow,
  description,
  icon,
  ctas,
})) as Page[];

export const pageRoutes = pages.map((page) => page.route);

const jobs = [
  ["Performance Marketing Executive", "Tiki", "12 - 18 triệu", "Hồ Chí Minh", "Hybrid", 82],
  ["Business Development Executive", "VNG Corporation", "15 - 25 triệu", "Hồ Chí Minh", "Hybrid", 76],
  ["Account Manager", "Sun* Inc.", "18 - 30 triệu", "Hồ Chí Minh", "Onsite", 69],
  ["Growth Marketing Lead", "Fintech Nova", "35 - 50 triệu", "Hà Nội", "Remote", 88],
] as const;

const candidates = [
  ["Nguyễn Minh Anh", "Marketing Executive", 92, "Thiếu TikTok Ads"],
  ["Trần Quang Huy", "Digital Analyst", 87, "Lương kỳ vọng cao"],
  ["Lê Thảo Vy", "Content Specialist", 81, "Junior hơn JD"],
  ["Phạm Hoàng Nam", "Performance Marketing", 78, "Thiếu ecommerce"],
] as const;

const nav = [
  ["Tính năng", "/"],
  ["Việc làm", "/viec-lam"],
  ["Cho công ty", "/nha-tuyen-dung/cong-ty"],
  ["Bảng giá", "/bang-gia"],
  ["Guideline", "/cau-hoi"],
  ["Đăng nhập", "/dang-nhap"],
] as const;

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#07122f]">
      <CvaiHeader />
      {children}
      <CvaiFooter />
    </div>
  );
}

export function CvaiHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-3xl font-black tracking-normal text-[#1557ff]">
          CV<span className="text-[#20b26b]">AI</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
          {nav.map(([label, href]) => (
            <Link key={label} href={href} className="hover:text-[#1557ff]">
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/cv/moi" className="inline-flex h-10 items-center gap-2 rounded-2xl bg-[#1557ff] px-4 text-sm font-bold text-white shadow-sm shadow-blue-500/25">
          Review CV miễn phí
        </Link>
      </div>
    </header>
  );
}

export function HomePage() {
  return (
    <Shell>
      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-sm font-bold text-[#1557ff]">
              <Sparkles size={16} /> AI CV Review + AI Recruiting
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              CV của bạn đã đủ mạnh để được gọi phỏng vấn chưa?
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              AI phân tích CV, chấm điểm mức độ phù hợp với vị trí ứng tuyển, chỉ ra lỗi yếu và đề xuất cách sửa để tăng cơ hội.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/cv/moi" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#1557ff] px-6 text-base font-bold text-white shadow-lg shadow-blue-500/25">
                <CloudUpload size={19} /> Tải CV lên ngay
              </Link>
              <Link href="/cong-cu/jd-match" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#1557ff] bg-white px-6 text-base font-bold text-[#1557ff]">
                <FileText size={19} /> Dán Job Description
              </Link>
            </div>
            <UploadBox />
            <div className="mt-5 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                ["12.500+", "CV đã review"],
                ["1.800+", "công ty"],
                ["87%", "CV cải thiện sau lần đầu"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xl font-black text-[#1557ff]">{value}</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-2 shadow-2xl shadow-blue-200/60">
            <Image src="/assets/cvai-product-visual.png" alt="CVAI dashboard visual" width={1400} height={788} priority className="h-full w-full rounded-2xl object-cover" />
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-3xl border border-white/70 bg-white/92 p-4 shadow-lg backdrop-blur md:grid-cols-3">
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
        <HomeQuickActions />
        <LogoStrip />
        <FeatureGrid />
        <HowItWorks />
        <HomeReport />
        <JobsPreview />
        <CompanyPreview />
        <PricingCards />
        <Testimonials />
      </main>
    </Shell>
  );
}

export function HomeQuickActions() {
  const actions = [
    {
      title: "Ứng viên upload CV",
      body: "Tải CV lên, nhận điểm ATS, keyword thiếu và gợi ý sửa trong một dashboard rõ ràng.",
      href: "/cv/moi",
      cta: "Review CV miễn phí",
      icon: CloudUpload,
    },
    {
      title: "Ứng viên tìm job match",
      body: "Xem job phù hợp với CV, biết match bao nhiêu phần trăm và tối ưu CV trước khi apply.",
      href: "/viec-lam",
      cta: "Xem việc làm",
      icon: Target,
    },
    {
      title: "Công ty lọc CV bằng AI",
      body: "Đăng job, nhận CV, để AI xếp hạng và gợi ý shortlist ứng viên phù hợp nhất.",
      href: "/nha-tuyen-dung/cong-ty",
      cta: "Dành cho HR",
      icon: Building2,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="grid gap-4 lg:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.title} href={action.href} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1557ff] group-hover:bg-[#1557ff] group-hover:text-white">
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
  );
}

export function AppPage({ route }: { route: string }) {
  const page = pages.find((item) => item.route === route);
  if (!page) return null;

  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHero page={page} />
        <PageBody page={page} />
        <RouteIndex activeRoute={route} />
      </main>
    </Shell>
  );
}

function PageHero({ page }: { page: Page }) {
  const Icon = page.icon;
  return (
    <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1fr_340px]">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-2xl bg-blue-50 px-3 py-2 text-sm font-black text-[#1557ff]">#{page.number} · {page.group}</span>
          <span className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700">{page.eyebrow}</span>
        </div>
        <h1 className="mt-5 text-4xl font-black tracking-normal sm:text-5xl">{page.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{page.description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#1557ff] px-5 font-bold text-white">
            <Icon size={18} /> {page.ctas[0]}
          </button>
          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 font-bold text-slate-700">
            <Sparkles size={18} /> {page.ctas[1]}
          </button>
        </div>
      </div>
      <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1557ff] text-white">
          <Icon size={28} />
        </div>
        <div className="mt-5 grid gap-3">
          {["AI insight sẵn sàng", "Dữ liệu demo đầy đủ", "Responsive layout", "24 màn hình chính"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 text-sm font-bold text-slate-700 shadow-sm">
              <Check size={17} className="text-emerald-600" /> {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PageBody({ page }: { page: Page }) {
  const r = page.route;
  if (r === "jobs") return <JobsBoard />;
  if (r === "jobs/performance-marketing-executive") return <JobDetail />;
  if (r === "companies") return <CompaniesLanding />;
  if (r === "pricing") return <PricingCards />;
  if (r === "candidate/dashboard") return <CandidateDashboard />;
  if (r === "candidate/upload-cv") return <UploadCvPage />;
  if (r === "candidate/cv-library") return <CvLibrary />;
  if (r === "candidate/cv-review-report") return <CvReviewPage />;
  if (r === "candidate/jd-match") return <JdMatchPage />;
  if (r === "candidate/rewrite-studio") return <RewriteStudio />;
  if (r === "candidate/applications") return <ApplicationsPage />;
  if (r === "candidate/profile") return <CandidateProfile />;
  if (r === "company/dashboard") return <CompanyDashboard />;
  if (r === "company/profile") return <CompanyProfile />;
  if (r === "company/jobs") return <JobManagement />;
  if (r === "company/jobs/new") return <CreateJobPage />;
  if (r === "company/pipeline") return <PipelineBoard />;
  if (r === "company/candidates/nguyen-minh-anh") return <HrCandidateDetail />;
  if (r === "company/shortlist") return <ShortlistPage />;
  if (r === "company/interview-kit") return <InterviewKit />;
  if (r === "login") return <LoginPage />;
  if (r === "settings") return <SettingsPage />;
  if (r === "billing") return <BillingPage />;
  return null;
}

export function UploadBox() {
  return (
    <div className="mt-8 max-w-xl rounded-3xl border border-dashed border-blue-300 bg-white p-6 text-center shadow-sm">
      <CloudUpload className="mx-auto text-[#1557ff]" size={40} />
      <p className="mt-3 text-base font-extrabold">Kéo & thả CV của bạn</p>
      <p className="mt-1 text-sm text-slate-500">hoặc chọn tệp từ thiết bị</p>
      <div className="mt-4 flex justify-center gap-3">
        {["PDF", "DOCX", "PNG"].map((format) => (
          <span key={format} className="rounded-2xl bg-slate-100 px-5 py-2 text-xs font-bold text-slate-600">{format}</span>
        ))}
      </div>
    </div>
  );
}

export function LogoStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_1.8fr]">
        <p className="text-sm font-semibold text-slate-500">Được tin dùng bởi ứng viên và đội ngũ tuyển dụng tăng trưởng nhanh</p>
        <div className="flex flex-wrap items-center justify-between gap-5 text-sm font-black uppercase tracking-wide text-slate-500">
          {["Viettel", "FPT", "VNG", "Samsung", "MB", "Techcombank"].map((logo) => <span key={logo}>{logo}</span>)}
        </div>
      </div>
    </section>
  );
}

export function FeatureGrid() {
  const features = [
    ["AI Review CV", "Chấm điểm tổng thể, ATS, độ rõ ràng.", FileCheck2],
    ["So khớp với JD", "Phân tích mức độ phù hợp từng job.", Target],
    ["AI Rewrite Studio", "Viết lại summary, experience, achievements.", WandSparkles],
    ["Tìm việc phù hợp", "Gợi ý công việc dựa trên CV của bạn.", Search],
    ["Đăng job cho công ty", "Tạo JD và đăng tuyển nhanh chóng.", BriefcaseBusiness],
    ["AI Shortlist", "Xếp hạng ứng viên theo độ phù hợp.", BarChart3],
  ] as const;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl font-black">Công cụ giúp ứng viên và doanh nghiệp tuyển dụng nhanh hơn</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {features.map(([title, body, Icon]) => (
          <Link key={title} href="/cong-cu/danh-gia-cv" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1557ff] text-white"><Icon size={22} /></div>
            <h3 className="font-black">{title}</h3>
            <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">{body}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#1557ff]">Tìm hiểu thêm <ArrowRight size={15} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    ["Upload CV", "Tải CV của bạn lên hệ thống."],
    ["Dán JD hoặc chọn job", "Dán mô tả công việc hoặc chọn job trong hệ thống."],
    ["AI phân tích & gợi ý sửa", "Chấm điểm và chỉ ra phần cần cải thiện."],
    ["Apply hoặc shortlist", "Ứng tuyển vào job phù hợp hoặc được nhà tuyển dụng liên hệ."],
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl font-black">Cách hoạt động</h2>
      <div className="mt-7 grid gap-5 md:grid-cols-4">
        {steps.map(([title, body], index) => (
          <div key={title} className="relative rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <span className="absolute left-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#1557ff] text-sm font-black text-white">{index + 1}</span>
            <FileText className="mx-auto mt-5 text-[#1557ff]" size={34} />
            <h3 className="mt-5 font-black">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeReport() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <ScorePanel />
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-black">Biết chính xác CV của bạn đang yếu ở đâu</h2>
        <div className="mt-6 grid gap-4">
          {["Phát hiện lỗi ATS", "Tìm keyword còn thiếu", "Gợi ý viết lại từng mục", "Tạo phiên bản CV tối ưu theo từng job"].map((title) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1557ff]"><BadgeCheck size={22} /></div>
              <div>
                <h3 className="font-black">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">AI đọc CV và JD để chỉ ra vấn đề cụ thể, sau đó đề xuất cách sửa có thể dùng ngay.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Panel({ title, children, action }: { title: string; children: React.ReactNode; action?: string }) {
  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-xl font-black">{title}</h2>
        {action && <button className="inline-flex h-10 items-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-bold"><Filter size={16} /> {action}</button>}
      </div>
      {children}
    </section>
  );
}

export function ScorePanel() {
  const metrics = [
    ["Nội dung", 76, "bg-emerald-500"],
    ["Cấu trúc", 82, "bg-emerald-500"],
    ["ATS", 68, "bg-amber-500"],
    ["Keywords", 61, "bg-orange-500"],
    ["Thành tích", 55, "bg-red-500"],
    ["Chuyên nghiệp", 80, "bg-emerald-500"],
  ] as const;
  return (
    <div className="rounded-3xl border border-blue-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div><h3 className="text-xl font-black">CV Review Report</h3><p className="text-sm font-semibold text-slate-500">Báo cáo phân tích chi tiết</p></div>
        <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm font-black text-orange-600">CV thiếu số liệu thành tích</div>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-[160px_1fr]">
        <div className="flex aspect-square items-center justify-center rounded-full border-[14px] border-blue-600 bg-white text-center">
          <div><div className="text-4xl font-black">72</div><div className="text-sm font-bold text-slate-500">/100</div></div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {metrics.map(([label, value, color]) => (
            <div key={label} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex justify-between text-sm font-black"><span>{label}</span><span>{value}/100</span></div>
              <div className="mt-3 h-2 rounded-full bg-slate-100"><div className={cx("h-2 rounded-full", color)} style={{ width: `${value}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function JobCards() {
  return (
    <div className="mt-5 grid gap-4 lg:grid-cols-4">
      {jobs.map(([title, company, salary, place, mode, match]) => (
        <Link key={title} href="/viec-lam/performance-marketing-executive" className="rounded-3xl border border-slate-200 p-4 transition hover:border-blue-200 hover:shadow-md">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d2d6b] text-lg font-black text-white">{company.slice(0, 1)}</div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-black">{title}</h3>
              <p className="mt-1 text-sm font-bold text-[#1557ff]">{company}</p>
              <p className="mt-2 text-sm font-semibold text-slate-600">{salary}</p>
              <p className="mt-1 text-xs text-slate-500">{place} · {mode}</p>
            </div>
          </div>
          <div className="mt-4 inline-flex rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700">Match {match}%</div>
        </Link>
      ))}
    </div>
  );
}

export function JobsPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-2xl font-black">Tìm việc phù hợp với CV của bạn</h2>
          <div className="flex flex-wrap gap-2">
            {["Remote", "Marketing", "Hồ Chí Minh", "2-3 năm kinh nghiệm"].map((chip) => <span key={chip} className="rounded-2xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-bold text-[#1557ff]">{chip}</span>)}
          </div>
        </div>
        <JobCards />
      </div>
    </section>
  );
}

function JobsBoard() {
  return (
    <Panel title="Job board có filter đầy đủ" action="Bộ lọc">
      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <div className="grid gap-3 rounded-3xl bg-slate-50 p-4">
          {["Vị trí", "Ngành nghề", "Địa điểm", "Remote / Hybrid / Onsite", "Mức lương", "Kinh nghiệm", "Công ty", "Độ phù hợp với CV của tôi"].map((filter) => (
            <div key={filter} className="flex h-11 items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 text-sm font-bold">{filter} <ChevronDown size={16} /></div>
          ))}
        </div>
        <JobCards />
      </div>
    </Panel>
  );
}

function JobDetail() {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      <Panel title="Mô tả công việc"><ContentList items={["Quản lý chiến dịch Meta Ads, Google Ads và tracking hiệu quả theo kênh.", "Tối ưu CPA, ROAS, conversion rate và báo cáo performance hằng tuần.", "Phối hợp content, design, sales để cải thiện funnel chuyển đổi."]} /></Panel>
      <Panel title="CV match"><BigScore value={76} label="CV phù hợp với job này" /><div className="mt-5 rounded-2xl bg-orange-50 p-4 text-sm font-bold text-orange-700">Thiếu: SQL, CRM, Performance Marketing</div></Panel>
      <Panel title="Yêu cầu và quyền lợi"><ContentList items={["2-3 năm kinh nghiệm performance marketing.", "Có số liệu tăng trưởng rõ trong CV.", "Lương 12 - 18 triệu, hybrid, review 2 lần/năm."]} /></Panel>
    </div>
  );
}

function CompaniesLanding() {
  return (
    <Panel title="Bộ công cụ tuyển dụng AI cho HR">
      <div className="grid gap-4 md:grid-cols-3">
        {["Đăng job nhanh", "AI phân tích JD", "AI chấm CV", "Tự động shortlist", "So sánh ứng viên", "Quản lý pipeline"].map((item) => (
          <div key={item} className="rounded-3xl border border-slate-200 p-5">
            <ShieldCheck className="text-[#1557ff]" />
            <h3 className="mt-4 font-black">{item}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">Tối ưu quy trình tuyển dụng với dữ liệu rõ ràng và AI insight theo từng job.</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function CompanyPreview() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
      <PipelineBoard compact />
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-black">Đăng job, nhận CV, để AI xếp hạng ứng viên phù hợp nhất.</h2>
        <ContentList items={["Đăng job nhanh chóng, tiếp cận đúng ứng viên.", "AI sàng lọc và xếp hạng ứng viên theo độ phù hợp.", "Quản lý pipeline tuyển dụng khoa học.", "Tiết kiệm thời gian và tối ưu chất lượng tuyển dụng."]} />
        <Link href="/dashboard" className="mt-7 inline-flex h-12 w-fit items-center gap-2 rounded-2xl bg-[#1557ff] px-6 font-bold text-white">Tạo tài khoản công ty <ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}

export function PricingCards() {
  const plans = [
    ["Free", "0đ", "Review CV cơ bản", "Chấm điểm tổng thể", "Gợi ý cải thiện cơ bản"],
    ["Pro CV Review", "99.000đ", "Tất cả tính năng Free", "So khớp với JD", "AI Rewrite Studio"],
    ["Pro Job Apply", "199.000đ", "Tối ưu theo nhiều job", "Theo dõi ứng tuyển", "Portfolio insight"],
    ["Starter", "499.000đ", "3 job đang mở", "100 CV AI phân tích", "1 thành viên HR"],
    ["Growth", "1.990.000đ", "15 job đang mở", "1.000 CV AI phân tích", "5 thành viên HR"],
    ["Business", "Liên hệ", "API / SSO", "Không giới hạn shortlist", "Hỗ trợ ưu tiên"],
  ];
  return (
    <Panel title="Pricing cho ứng viên và công ty">
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map(([name, price, ...features], index) => (
          <div key={name} className={cx("rounded-3xl border p-5", index === 1 ? "border-[#1557ff] bg-blue-50" : "border-slate-200 bg-white")}>
            <div className="flex items-start justify-between gap-3"><h3 className="text-xl font-black">{name}</h3>{index === 1 && <span className="rounded-2xl bg-[#1557ff] px-2 py-1 text-xs font-black text-white">Phổ biến</span>}</div>
            <p className="mt-4 text-3xl font-black text-[#1557ff]">{price}</p>
            <ul className="mt-5 grid gap-3 text-sm font-semibold text-slate-600">{features.map((feature) => <li key={feature} className="flex gap-2"><Check size={17} className="text-emerald-600" /> {feature}</li>)}</ul>
            <button className="mt-6 h-10 w-full rounded-2xl border border-[#1557ff] font-bold text-[#1557ff]">Chọn gói</button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function CandidateDashboard() {
  const stats = [["CV hiện tại", "72/100", Gauge], ["Job phù hợp", "12", Target], ["Đã ứng tuyển", "3", ClipboardCheck], ["Lỗi cần sửa", "5", Lightbulb]] as const;
  return (
    <>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map(([label, value, Icon]) => <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><Icon className="text-[#1557ff]" size={24} /><p className="mt-4 text-sm font-bold text-slate-500">{label}</p><p className="mt-1 text-3xl font-black">{value}</p></div>)}</div>
      <Panel title="Gợi ý cần sửa"><ContentList items={["Thêm số liệu thành tích trong 2 kinh nghiệm gần nhất.", "Bổ sung keyword CRM và Performance Marketing.", "Rút gọn summary xuống 3 dòng rõ vai trò, ngành, kết quả."]} /></Panel>
      <JobsPreview />
    </>
  );
}

function UploadCvPage() {
  return (
    <Panel title="Upload và parse CV">
      <div className="grid gap-6 lg:grid-cols-2">
        <UploadBox />
        <div className="grid gap-3">{["Thông tin cá nhân", "Kinh nghiệm", "Học vấn", "Kỹ năng", "Dự án", "Chứng chỉ"].map((item) => <div key={item} className="rounded-2xl border border-slate-200 p-4 font-bold">{item}</div>)}</div>
      </div>
    </Panel>
  );
}

function CvLibrary() {
  return (
    <Panel title="Kho CV nhiều phiên bản">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {["CV Marketing tiếng Việt", "CV Marketing tiếng Anh", "CV Sales Manager", "CV Apply Shopee", "CV Apply Agency"].map((cv, index) => (
          <div key={cv} className="rounded-3xl border border-slate-200 p-5">
            <h3 className="font-black">{cv}</h3>
            <p className="mt-2 text-sm text-slate-500">Score {72 + index * 3}/100 · Cập nhật 2 ngày trước · Đã dùng {index + 1} lần</p>
            <div className="mt-4 flex gap-2"><button className="rounded-2xl bg-[#1557ff] px-3 py-2 text-sm font-bold text-white">Review lại</button><button className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-bold">Tối ưu theo job</button></div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function CvReviewPage() {
  return (
    <>
      <Panel title="Overall CV Score"><ScorePanel /></Panel>
      <Panel title="Điểm mạnh, điểm yếu và lỗi nghiêm trọng">
        <div className="grid gap-4 md:grid-cols-3">
          <InsightCard title="Điểm mạnh" items={["Có kinh nghiệm performance", "Biết tối ưu ngân sách", "Có dự án gần ngành"]} tone="good" />
          <InsightCard title="Điểm yếu" items={["Ít số liệu thành tích", "Keyword ATS thiếu", "Summary còn chung"]} tone="warn" />
          <InsightCard title="Lỗi nghiêm trọng" items={["Không nêu quy mô ngân sách", "Thiếu công cụ CRM", "Bullet chưa có kết quả"]} tone="bad" />
        </div>
      </Panel>
    </>
  );
}

function JdMatchPage() {
  return (
    <Panel title="CV phù hợp 78% với Performance Marketing Executive">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <BigScore value={78} label="Match score" />
        <div className="grid gap-4 md:grid-cols-2">
          <InsightCard title="Keyword thiếu" items={["SQL", "CRM", "TikTok Ads"]} tone="warn" />
          <InsightCard title="Kinh nghiệm phù hợp" items={["Meta Ads", "Google Ads", "Budget 300 triệu/tháng"]} tone="good" />
          <InsightCard title="Bullet nên viết lại" items={["Tăng ROAS từ 2.1 lên 3.4", "Giảm CPA 18% trong 2 tháng"]} tone="good" />
          <InsightCard title="Khả năng được gọi" items={["Cao nếu bổ sung số liệu", "Cần làm rõ ecommerce"]} tone="warn" />
        </div>
      </div>
    </Panel>
  );
}

function RewriteStudio() {
  return (
    <Panel title="AI CV Rewrite Studio">
      <div className="grid gap-5 lg:grid-cols-2">
        <EditorPane title="CV gốc" text="Quản lý quảng cáo Facebook và Google cho nhiều chiến dịch marketing. Theo dõi chi phí, báo cáo hiệu quả và phối hợp team content." />
        <EditorPane title="Bản AI đề xuất" text="Quản lý ngân sách quảng cáo 300 triệu/tháng trên Meta Ads và Google Ads, tối ưu CPA giảm 18% trong 8 tuần và tăng ROAS từ 2.1 lên 3.4 cho chiến dịch ecommerce." highlighted />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">{["Viết lại summary", "Thêm số liệu thành tích", "Dịch sang tiếng Anh", "Làm chuyên nghiệp hơn", "Tối ưu ATS"].map((tool) => <button key={tool} className="rounded-2xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-bold text-[#1557ff]">{tool}</button>)}</div>
    </Panel>
  );
}

function ApplicationsPage() {
  return (
    <Panel title="Trạng thái ứng tuyển">
      <div className="grid gap-4 md:grid-cols-3">{["Đã ứng tuyển", "Công ty đã xem", "Được shortlist", "Mời phỏng vấn", "Từ chối", "Đã nhận offer"].map((stage, index) => <div key={stage} className="rounded-3xl border border-slate-200 p-5"><p className="text-sm font-bold text-slate-500">Stage {index + 1}</p><h3 className="mt-2 font-black">{stage}</h3><p className="mt-2 text-sm text-slate-500">{index + 1} job trong trạng thái này</p></div>)}</div>
    </Panel>
  );
}

function CandidateProfile() {
  return <Panel title="Hồ sơ ứng viên"><FormGrid fields={["Họ tên", "Email", "Số điện thoại", "Kinh nghiệm tổng quát", "Kỹ năng", "Ngành quan tâm", "Mức lương kỳ vọng", "Khu vực làm việc", "Remote / onsite", "Portfolio", "LinkedIn", "CV mặc định"]} /></Panel>;
}

function CompanyDashboard() {
  const stats = [["Job đang mở", "12"], ["CV nhận được", "248"], ["AI Shortlisted", "37"], ["Đang phỏng vấn", "14"]];
  return (
    <>
      <div className="mt-6 grid gap-4 md:grid-cols-4">{stats.map(([label, value]) => <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-bold text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>)}</div>
      <Panel title="Job cần chú ý"><ContentList items={["Account Manager đang thiếu ứng viên chất lượng.", "Growth Marketing Lead có 9 ứng viên match trên 85%.", "Sales Executive cần tối ưu JD để tăng apply rate."]} /></Panel>
    </>
  );
}

function CompanyProfile() {
  return <Panel title="Thông tin công ty hiển thị ngoài job detail"><FormGrid fields={["Logo", "Tên công ty", "Giới thiệu", "Website", "Lĩnh vực", "Quy mô", "Địa chỉ", "Văn hóa công ty", "Phúc lợi", "Hình ảnh văn phòng"]} /></Panel>;
}

function JobManagement() {
  return (
    <Panel title="Danh sách job công ty đã đăng">
      <ResponsiveTable headers={["Job", "Trạng thái", "CV", "High match", "Interview", "Hạn tuyển"]} rows={jobs.map(([title], index) => [title, index === 2 ? "paused" : "active", `${42 + index * 8}`, `${8 + index}`, `${3 + index}`, "30/05/2026"])} />
    </Panel>
  );
}

function CreateJobPage() {
  return (
    <Panel title="Form tạo / chỉnh sửa job có AI">
      <FormGrid fields={["Tên vị trí", "Phòng ban", "Địa điểm", "Remote / hybrid / onsite", "Mức lương", "Loại hình", "Mô tả công việc", "Yêu cầu", "Quyền lợi", "Câu hỏi sàng lọc", "Hạn ứng tuyển"]} />
      <div className="mt-5 flex flex-wrap gap-2">{["AI viết JD", "Làm JD chuyên nghiệp hơn", "Tách required skills", "Tạo screening questions", "Dự đoán độ hấp dẫn"].map((item) => <button key={item} className="rounded-2xl bg-blue-50 px-3 py-2 text-sm font-bold text-[#1557ff]">{item}</button>)}</div>
    </Panel>
  );
}

function PipelineBoard({ compact = false }: { compact?: boolean }) {
  const stages = ["New", "AI Shortlisted", "HR Review", "Interview", "Offer", "Hired", "Rejected"];
  return (
    <Panel title="Candidate Pipeline">
      <div className={cx("grid gap-4", compact ? "md:grid-cols-4" : "md:grid-cols-3 xl:grid-cols-7")}>
        {stages.slice(0, compact ? 4 : stages.length).map((stage, index) => (
          <div key={stage} className="min-h-44 rounded-3xl border border-slate-200 bg-slate-50 p-3">
            <h3 className="font-black">{stage}</h3>
            <div className="mt-3 grid gap-3">
              {candidates.slice(0, compact ? 2 : 3).map(([name, role, match]) => (
                <div key={`${stage}-${name}`} className="rounded-2xl bg-white p-3 shadow-sm">
                  <p className="text-sm font-black">{name}</p>
                  <p className="mt-1 text-xs text-slate-500">{role}</p>
                  <p className="mt-2 text-xs font-black text-emerald-700">Match {match - index}%</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function HrCandidateDetail() {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      <Panel title="AI summary"><p className="leading-8 text-slate-600">Ứng viên có 3 năm kinh nghiệm Performance Marketing, từng quản lý ngân sách quảng cáo khoảng 300 triệu/tháng. Phù hợp mạnh với Meta Ads và Google Ads, nhưng CV chưa thể hiện rõ kinh nghiệm TikTok Ads.</p></Panel>
      <Panel title="Match score"><BigScore value={92} label="Phù hợp với JD" /></Panel>
      <Panel title="Red flags và câu hỏi phỏng vấn"><ContentList items={["Xác minh ngân sách thực tế đã quản lý.", "Hỏi cách đo ROAS theo từng kênh.", "Làm rõ kinh nghiệm TikTok Ads và CRM."]} /></Panel>
    </div>
  );
}

function ShortlistPage() {
  return <Panel title="AI xếp hạng ứng viên"><ResponsiveTable headers={["Rank", "Ứng viên", "Match", "Lý do", "Risk"]} rows={candidates.map(([name, , match, risk], index) => [`${index + 1}`, name, `${match}%`, "Kinh nghiệm sát JD, có số liệu rõ", risk])} /></Panel>;
}

function InterviewKit() {
  return (
    <Panel title="AI tạo bộ câu hỏi phỏng vấn">
      <div className="grid gap-4 md:grid-cols-2">{["Câu hỏi xác minh kinh nghiệm", "Câu hỏi kỹ thuật", "Câu hỏi tình huống", "Câu hỏi về điểm yếu trong CV", "Scorecard đánh giá", "Ghi chú phỏng vấn"].map((item) => <div key={item} className="rounded-3xl border border-slate-200 p-5"><h3 className="font-black">{item}</h3><p className="mt-3 text-sm leading-6 text-slate-500">AI tạo câu hỏi bám theo JD và CV để HR đánh giá công bằng, có cấu trúc.</p></div>)}</div>
    </Panel>
  );
}

function LoginPage() {
  return (
    <Panel title="Đăng nhập / đăng ký">
      <div className="grid gap-6 lg:grid-cols-2">
        <FormGrid fields={["Email", "Password"]} />
        <div className="grid gap-3">{["Candidate", "Company", "Dùng cả hai vai trò"].map((role) => <button key={role} className="h-14 rounded-2xl border border-slate-200 bg-white px-4 text-left font-black">{role}</button>)}</div>
      </div>
    </Panel>
  );
}

function SettingsPage() {
  return <Panel title="Cài đặt tài khoản"><FormGrid fields={["Thông tin tài khoản", "Email", "Password", "Billing", "Notification", "Privacy", "Xóa dữ liệu CV"]} /></Panel>;
}

function BillingPage() {
  return (
    <>
      <PricingCards />
      <Panel title="Lịch sử thanh toán"><ContentList items={["Pro CV Review · 99.000đ · 12/04/2026", "10 lượt rewrite · 59.000đ · 19/04/2026", "Growth Company · 1.990.000đ · 21/04/2026"]} /></Panel>
    </>
  );
}

function BigScore({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center">
      <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-[#1557ff]">
        <div><p className="text-4xl font-black">{value}%</p><p className="mt-1 text-sm font-bold text-slate-500">{label}</p></div>
      </div>
    </div>
  );
}

function InsightCard({ title, items, tone }: { title: string; items: string[]; tone: "good" | "warn" | "bad" }) {
  const toneClass = tone === "good" ? "text-emerald-700 bg-emerald-50" : tone === "warn" ? "text-orange-700 bg-orange-50" : "text-red-700 bg-red-50";
  return (
    <div className="rounded-3xl border border-slate-200 p-5">
      <h3 className="font-black">{title}</h3>
      <ul className="mt-4 grid gap-3">{items.map((item) => <li key={item} className={cx("rounded-2xl px-3 py-2 text-sm font-bold", toneClass)}>{item}</li>)}</ul>
    </div>
  );
}

function EditorPane({ title, text, highlighted }: { title: string; text: string; highlighted?: boolean }) {
  return (
    <div className={cx("min-h-72 rounded-3xl border p-5", highlighted ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white")}>
      <h3 className="font-black">{title}</h3>
      <p className="mt-5 leading-8 text-slate-700">{text}</p>
    </div>
  );
}

function ContentList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-3">
      {items.map((item) => <li key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-600"><Check size={18} className="shrink-0 text-emerald-600" /> {item}</li>)}
    </ul>
  );
}

function FormGrid({ fields }: { fields: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {fields.map((field) => (
        <label key={field} className={cx("grid gap-2 text-sm font-black", field.includes("Mô tả") || field.includes("Yêu cầu") || field.includes("Giới thiệu") ? "md:col-span-2" : "")}>
          {field}
          <div className="flex min-h-11 items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-400">Nhập {field.toLowerCase()}</div>
        </label>
      ))}
    </div>
  );
}

function ResponsiveTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-slate-50 text-slate-500"><tr>{headers.map((h) => <th key={h} className="p-4 font-black">{h}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row.join("-")} className="border-t border-slate-200">{row.map((cell, index) => <td key={`${cell}-${index}`} className={cx("p-4", index === 0 || index === 1 ? "font-black" : "", cell.endsWith("%") ? "font-black text-emerald-700" : "")}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function RouteIndex({ activeRoute }: { activeRoute: string }) {
  const groups: Group[] = ["Public", "Candidate", "Company", "Account"];
  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black">24 màn hình đã dựng</h2>
      <div className="mt-5 grid gap-5 lg:grid-cols-4">
        {groups.map((group) => (
          <div key={group}>
            <h3 className="mb-3 font-black text-[#1557ff]">{group}</h3>
            <div className="grid gap-2">
              {pages.filter((item) => item.group === group).map((item) => (
                <Link key={item.route} href={`/${item.route}`} className={cx("rounded-2xl border px-3 py-2 text-sm font-bold", item.route === activeRoute ? "border-[#1557ff] bg-blue-50 text-[#1557ff]" : "border-slate-200 text-slate-600")}>
                  #{item.number} {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-blue-200 bg-white p-6 shadow-sm">
        <h2 className="text-center text-2xl font-black">Người dùng nói gì về CVAI</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["Nguyễn Hà My", "CVAI giúp mình biết chính xác điểm yếu trong CV và cách viết lại cho hấp dẫn hơn. Sau khi chỉnh sửa theo gợi ý, mình đã nhận được 3 lời mời phỏng vấn."],
            ["Trần Quốc Hưng", "AI Shortlist giúp đội HR lọc ứng viên nhanh hơn rất nhiều. Tiết kiệm hơn 70% thời gian sàng lọc hồ sơ."],
          ].map(([name, quote]) => (
            <div key={name} className="rounded-3xl border border-slate-200 p-5">
              <div className="flex items-center gap-3"><div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-emerald-400" /><div><p className="font-black">{name}</p><p className="text-sm text-slate-500">Verified user</p></div></div>
              <p className="mt-4 text-sm leading-7 text-slate-600">“{quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CvaiFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-5 lg:px-8">
        <div className="md:col-span-2">
          <div className="text-3xl font-black text-[#1557ff]">CV<span className="text-[#20b26b]">AI</span></div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">Nền tảng AI giúp ứng viên tối ưu CV và doanh nghiệp tuyển dụng nhanh, thông minh hơn.</p>
        </div>
        {[["Sản phẩm", "Tính năng", "Việc làm", "Bảng giá"], ["Tài nguyên", "Blog", "Hướng dẫn CV", "Mẫu CV đẹp"], ["Công ty", "Về chúng tôi", "Tuyển dụng", "Bảo mật"]].map(([heading, ...items]) => (
          <div key={heading}><h3 className="font-black">{heading}</h3><ul className="mt-3 grid gap-2 text-sm text-slate-500">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>
        ))}
      </div>
    </footer>
  );
}
