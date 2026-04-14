"use client";

import type { CVData } from "@/lib/types";

interface TemplateProps {
  cv: CVData;
}

/** Milano — Editorial magazine layout. Large serif-like name, asymmetric columns, elegant spacing. */
export function MilanoTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-[#1a1a1a] min-h-[297mm] w-[210mm] mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Masthead */}
      <div className="px-12 pt-14 pb-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#b0a090] mb-4">Curriculum Vitae</p>
        <h1 className="text-[42px] font-extralight tracking-[-0.02em] leading-[1.05] text-[#1a1a1a]">
          {info.full_name || "Họ và tên"}
        </h1>
        {info.title && (
          <p className="text-[16px] text-[#8a7968] mt-2 font-light italic">{info.title}</p>
        )}
      </div>

      {/* Thin gold line */}
      <div className="mx-12 h-[0.5px] bg-gradient-to-r from-[#c9a96e] via-[#c9a96e] to-transparent" />

      {/* Contact strip */}
      <div className="px-12 py-4 flex flex-wrap gap-x-6 text-[11px] text-[#999] tracking-wide">
        {info.email && <span>{info.email}</span>}
        {info.phone && <span>{info.phone}</span>}
        {info.address && <span>{info.address}</span>}
        {info.linkedin && <span>{info.linkedin}</span>}
        {info.website && <span>{info.website}</span>}
      </div>

      {/* Two-column body */}
      <div className="px-12 pb-12 flex gap-10">
        {/* Main — 65% */}
        <div className="w-[63%] space-y-8">
          {/* Summary */}
          {info.summary && (
            <section>
              <p className="text-[13px] text-[#555] leading-[1.9] whitespace-pre-line italic">{info.summary}</p>
            </section>
          )}

          {/* Experience */}
          {cv.experiences.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a96e] mb-5">Kinh nghiệm</h2>
              <div className="space-y-6">
                {cv.experiences.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[15px] font-semibold text-[#1a1a1a]">{exp.position}</h3>
                      <span className="text-[10px] text-[#aaa] tracking-wider shrink-0 ml-3">
                        {exp.start_date} — {exp.is_current ? "Hiện tại" : exp.end_date}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#8a7968] font-medium mt-0.5">{exp.company}</p>
                    {exp.description && (
                      <p className="text-[12px] text-[#555] mt-2 leading-[1.75] whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {cv.education.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a96e] mb-5">Học vấn</h2>
              <div className="space-y-4">
                {cv.education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[14px] font-semibold text-[#1a1a1a]">{edu.school}</h3>
                      <span className="text-[10px] text-[#aaa] shrink-0 ml-3">{edu.start_date} — {edu.end_date}</span>
                    </div>
                    <p className="text-[12px] text-[#777]">{edu.degree}{edu.field && ` — ${edu.field}`}{edu.gpa && ` | ${edu.gpa}`}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {cv.projects.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a96e] mb-5">Dự án</h2>
              <div className="space-y-4">
                {cv.projects.map((p, i) => (
                  <div key={i}>
                    <h3 className="text-[14px] font-semibold text-[#1a1a1a]">{p.name}</h3>
                    {p.description && <p className="text-[12px] text-[#555] mt-1 leading-[1.7] whitespace-pre-line">{p.description}</p>}
                    {p.technologies.length > 0 && (
                      <p className="text-[10px] text-[#aaa] mt-1.5 tracking-wide">{p.technologies.join(" · ")}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar — 35% */}
        <div className="w-[37%] pl-8 border-l border-[#e8e0d6] space-y-8 pt-1">
          {cv.skills.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a96e] mb-4">Kỹ năng</h2>
              <div className="space-y-2.5">
                {cv.skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[12px] font-medium text-[#333] flex-1">{s.name}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(n => (
                        <div key={n} className={`w-2 h-2 rounded-full ${n <= s.level ? "bg-[#c9a96e]" : "bg-[#e8e0d6]"}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.languages.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a96e] mb-4">Ngoại ngữ</h2>
              <div className="space-y-2">
                {cv.languages.map((l, i) => (
                  <div key={i} className="flex justify-between text-[12px]">
                    <span className="font-medium text-[#333]">{l.name}</span>
                    <span className="text-[#999]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.certifications.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a96e] mb-4">Chứng chỉ</h2>
              <div className="space-y-2.5">
                {cv.certifications.map((c, i) => (
                  <div key={i}>
                    <p className="text-[12px] font-medium text-[#333]">{c.name}</p>
                    {c.issuer && <p className="text-[11px] text-[#999]">{c.issuer}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
