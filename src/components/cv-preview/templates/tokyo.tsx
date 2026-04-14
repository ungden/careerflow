"use client";

import type { CVData } from "@/lib/types";

interface TemplateProps {
  cv: CVData;
}

/** Tokyo — Japanese zen minimalism. Extreme whitespace, hairline dividers, monochrome with one red accent. */
export function TokyoTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-[#333] min-h-[297mm] w-[210mm] mx-auto px-16 py-14" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header — off-center name with red accent dot */}
      <header className="mb-12">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-[#c23b22] mt-3 shrink-0" />
          <div>
            <h1 className="text-[34px] font-light tracking-tight text-[#111] leading-none">
              {info.full_name || "Họ và tên"}
            </h1>
            {info.title && (
              <p className="text-[13px] text-[#999] mt-2 tracking-[0.08em] uppercase font-light">{info.title}</p>
            )}
          </div>
        </div>
        <div className="h-[0.5px] bg-[#ddd] mt-7" />
        <div className="flex flex-wrap gap-x-8 gap-y-1.5 mt-4 text-[11px] text-[#aaa]">
          {info.email && <span>{info.email}</span>}
          {info.phone && <span>{info.phone}</span>}
          {info.address && <span>{info.address}</span>}
          {info.linkedin && <span>{info.linkedin}</span>}
          {info.github && <span>{info.github}</span>}
        </div>
      </header>

      {/* Summary — pulled quote style */}
      {info.summary && (
        <section className="mb-10 pl-5 border-l-2 border-[#c23b22]/30">
          <p className="text-[13px] text-[#555] leading-[1.9] whitespace-pre-line">{info.summary}</p>
        </section>
      )}

      {/* Experience */}
      {cv.experiences.length > 0 && (
        <section className="mb-10">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#bbb] mb-6">Kinh nghiệm</h2>
          <div className="space-y-7">
            {cv.experiences.map((exp, i) => (
              <div key={i}>
                <div className="flex items-baseline gap-4">
                  <span className="text-[11px] text-[#bbb] tracking-wider shrink-0 w-[100px]">
                    {exp.start_date}<br />{exp.is_current ? "Hiện tại" : exp.end_date}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-[15px] font-medium text-[#111]">{exp.position}</h3>
                    <p className="text-[12px] text-[#c23b22]/80 mt-0.5">{exp.company}</p>
                    {exp.description && (
                      <p className="text-[12px] text-[#666] mt-2 leading-[1.75] whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                </div>
                {i < cv.experiences.length - 1 && <div className="h-[0.5px] bg-[#eee] mt-6" />}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {cv.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#bbb] mb-6">Học vấn</h2>
          <div className="space-y-4">
            {cv.education.map((edu, i) => (
              <div key={i} className="flex items-baseline gap-4">
                <span className="text-[11px] text-[#bbb] tracking-wider shrink-0 w-[100px]">
                  {edu.start_date}<br />{edu.end_date}
                </span>
                <div>
                  <h3 className="text-[14px] font-medium text-[#111]">{edu.school}</h3>
                  <p className="text-[12px] text-[#777]">{edu.degree}{edu.field && `, ${edu.field}`}{edu.gpa && ` — ${edu.gpa}`}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom grid: Skills + Languages + Projects */}
      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-8">
          {cv.skills.length > 0 && (
            <section>
              <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#bbb] mb-4">Kỹ năng</h2>
              <div className="flex flex-wrap gap-2">
                {cv.skills.map((s, i) => (
                  <span key={i} className="text-[11px] text-[#555] px-3 py-1 border border-[#e5e5e5] rounded-sm">{s.name}</span>
                ))}
              </div>
            </section>
          )}

          {cv.languages.length > 0 && (
            <section>
              <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#bbb] mb-4">Ngoại ngữ</h2>
              <div className="space-y-1.5">
                {cv.languages.map((l, i) => (
                  <div key={i} className="flex justify-between text-[12px]">
                    <span className="text-[#333]">{l.name}</span>
                    <span className="text-[#aaa]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {cv.projects.length > 0 && (
          <div>
            <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#bbb] mb-4">Dự án</h2>
            <div className="space-y-4">
              {cv.projects.map((p, i) => (
                <div key={i}>
                  <h3 className="text-[13px] font-medium text-[#111]">{p.name}</h3>
                  {p.description && <p className="text-[11px] text-[#777] mt-1 leading-[1.6] whitespace-pre-line">{p.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
