"use client";

import type { CVData } from "@/lib/types";

interface TemplateProps {
  cv: CVData;
}

export function MinimalTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-[#222] min-h-[297mm] w-[210mm] mx-auto px-14 py-12" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header — large name, thin rule */}
      <header className="mb-10">
        <h1 className="text-[36px] font-extralight tracking-tight text-[#111] leading-none">
          {info.full_name || "Họ và tên"}
        </h1>
        {info.title && (
          <p className="text-[14px] text-[#888] mt-2 font-light tracking-[0.05em] uppercase">{info.title}</p>
        )}
        <div className="h-[1px] bg-[#ccc] mt-6" />
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-[12px] text-[#777]">
          {info.email && <span>{info.email}</span>}
          {info.phone && <span>{info.phone}</span>}
          {info.address && <span>{info.address}</span>}
          {info.linkedin && <span>{info.linkedin}</span>}
          {info.github && <span>{info.github}</span>}
          {info.website && <span>{info.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {info.summary && (
        <section className="mb-8">
          <p className="text-[13px] text-[#555] leading-[1.8] whitespace-pre-line">{info.summary}</p>
        </section>
      )}

      {/* Experience */}
      {cv.experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#aaa] mb-5">Kinh nghiệm</h2>
          <div className="space-y-6">
            {cv.experiences.map((exp, i) => (
              <div key={i} className="grid grid-cols-[140px_1fr] gap-4">
                <div className="text-[12px] text-[#999] pt-0.5">
                  {exp.start_date}{(exp.end_date || exp.is_current) && <><br />{exp.is_current ? "Hiện tại" : exp.end_date}</>}
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#222]">{exp.position || "Vị trí"}</h3>
                  <p className="text-[13px] text-[#666] mt-0.5">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  {exp.description && (
                    <p className="text-[12.5px] text-[#555] mt-2 leading-[1.7] whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {cv.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#aaa] mb-5">Học vấn</h2>
          <div className="space-y-4">
            {cv.education.map((edu, i) => (
              <div key={i} className="grid grid-cols-[140px_1fr] gap-4">
                <div className="text-[12px] text-[#999] pt-0.5">
                  {edu.start_date}{edu.end_date && <><br />{edu.end_date}</>}
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#222]">{edu.school || "Trường"}</h3>
                  <p className="text-[13px] text-[#666]">
                    {edu.degree}{edu.field && ` — ${edu.field}`}{edu.gpa && ` | GPA: ${edu.gpa}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {cv.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#aaa] mb-3">Kỹ năng</h2>
          <p className="text-[13px] text-[#444] leading-relaxed">
            {cv.skills.map(s => s.name).join("  ·  ")}
          </p>
        </section>
      )}

      {/* Languages */}
      {cv.languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#aaa] mb-3">Ngoại ngữ</h2>
          <p className="text-[13px] text-[#444]">
            {cv.languages.map(l => `${l.name} (${l.proficiency})`).join("  ·  ")}
          </p>
        </section>
      )}

      {/* Projects */}
      {cv.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#aaa] mb-5">Dự án</h2>
          <div className="space-y-5">
            {cv.projects.map((project, i) => (
              <div key={i} className="grid grid-cols-[140px_1fr] gap-4">
                <div className="text-[12px] text-[#999] pt-0.5">
                  {project.technologies.slice(0, 2).join(", ")}
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#222]">{project.name || "Tên dự án"}</h3>
                  {project.description && (
                    <p className="text-[12.5px] text-[#555] mt-1 leading-[1.7] whitespace-pre-line">{project.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {cv.certifications.length > 0 && (
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#aaa] mb-3">Chứng chỉ</h2>
          <div className="space-y-1.5">
            {cv.certifications.map((cert, i) => (
              <p key={i} className="text-[13px] text-[#444]">
                {cert.name}{cert.issuer && ` — ${cert.issuer}`}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
