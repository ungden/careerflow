import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = decodeURIComponent(slug).replace(/-/g, " ");
  return {
    title: `${name} - Hồ sơ ứng viên`,
    description: `Xem hồ sơ chuyên nghiệp của ${name} trên CareerFlow.`,
  };
}

export default async function CandidateProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const candidateName = decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const skills = [
    "Content Strategy",
    "SEO",
    "UX Writing",
    "Brand Voice",
    "Data Analysis",
    "Figma",
    "Google Analytics",
    "Tiếng Anh",
  ];

  const experiences = [
    {
      role: "Senior Content Strategist",
      company: "Công ty ABC",
      period: "2022 - Hiện tại",
      description: "Xây dựng chiến lược nội dung toàn diện cho nền tảng số.",
    },
    {
      role: "Content Marketing Specialist",
      company: "Công ty XYZ",
      period: "2019 - 2022",
      description: "Quản lý đội ngũ content và phát triển chiến lược SEO.",
    },
    {
      role: "Copywriter",
      company: "Agency DEF",
      period: "2017 - 2019",
      description: "Sáng tạo nội dung quảng cáo và truyền thông thương hiệu.",
    },
  ];

  const education = [
    {
      degree: "Cử nhân Truyền thông",
      school: "Đại học Khoa học Xã hội và Nhân văn",
      year: "2013 - 2017",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f9fb] pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#434654] mb-8">
            <Link href="/ung-vien" className="hover:text-[#003d9b] transition-colors">
              Ứng viên
            </Link>
            <span>/</span>
            <span className="text-[#191c1e] font-medium">{candidateName}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {/* Profile Header */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  {/* Avatar */}
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#003d9b]/20 to-[#003d9b]/5 flex items-center justify-center shrink-0">
                    <span
                      className="text-4xl font-black text-[#003d9b]"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {candidateName.charAt(0)}
                    </span>
                  </div>

                  <div className="space-y-3 text-center sm:text-left">
                    <h1
                      className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[#191c1e]"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {candidateName}
                    </h1>
                    <p className="text-lg text-[#003d9b] font-semibold">
                      Senior Content Strategist
                    </p>
                    <p className="text-[#434654] max-w-lg leading-relaxed">
                      Chuyên gia chiến lược nội dung với hơn 5 năm kinh nghiệm trong lĩnh vực
                      truyền thông số và marketing. Đam mê tạo ra những nội dung có giá trị
                      và tác động tích cực.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-4 py-1.5 text-xs font-medium bg-[#f3f4f6] text-[#434654] rounded-xl">
                        TP. Hồ Chí Minh
                      </span>
                      <span className="px-4 py-1.5 text-xs font-medium bg-[#f3f4f6] text-[#434654] rounded-xl">
                        5 năm kinh nghiệm
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kinh nghiệm */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-8">
                <h2
                  className="text-xl font-extrabold text-[#191c1e]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Kinh nghiệm làm việc
                </h2>
                <div className="space-y-8">
                  {experiences.map((exp, i) => (
                    <div key={i} className="relative pl-8">
                      {/* Timeline dot and line */}
                      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-[#003d9b]" />
                      {i < experiences.length - 1 && (
                        <div className="absolute left-[5px] top-5 w-0.5 h-full bg-[#003d9b]/10" />
                      )}
                      <div className="space-y-1">
                        <h3
                          className="text-lg font-bold text-[#191c1e]"
                          style={{ fontFamily: "var(--font-headline)" }}
                        >
                          {exp.role}
                        </h3>
                        <p className="text-sm font-semibold text-[#003d9b]">{exp.company}</p>
                        <p className="text-xs text-[#434654]">{exp.period}</p>
                        <p className="text-sm text-[#434654] leading-relaxed pt-1">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Học vấn */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-6">
                <h2
                  className="text-xl font-extrabold text-[#191c1e]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Học vấn
                </h2>
                {education.map((edu, i) => (
                  <div key={i} className="space-y-1">
                    <h3
                      className="text-lg font-bold text-[#191c1e]"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-[#003d9b] font-semibold">{edu.school}</p>
                    <p className="text-xs text-[#434654]">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-80 shrink-0 space-y-8">
              {/* Liên hệ */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-6 lg:sticky lg:top-28">
                <button
                  className="w-full kinetic-gradient text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Liên hệ ứng viên
                </button>
                <button className="w-full bg-[#f3f4f6] text-[#191c1e] font-bold text-sm px-8 py-3.5 rounded-2xl hover:bg-[#e5e7eb] transition-colors">
                  Lưu hồ sơ
                </button>
              </div>

              {/* Kỹ năng */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-5">
                <h3
                  className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Kỹ năng
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 text-xs font-semibold text-[#003d9b] bg-[#003d9b]/5 rounded-2xl"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
