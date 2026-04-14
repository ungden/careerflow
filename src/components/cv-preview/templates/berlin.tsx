"use client";

import type { CVData } from "@/lib/types";

interface TemplateProps {
  cv: CVData;
}

/** Berlin — Bold graphic Bauhaus-inspired. Strong black header, geometric accents, high contrast. */
export function BerlinTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-[#1a1a1a] min-h-[297mm] w-[210mm] mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Bold black header */}
      <div className="bg-[#111] text-white px-10 py-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff4d4d] rounded-bl-[80px] opacity-90" />
        <div className="relative z-10">
          <h1 className="text-[36px] font-black tracking-tight uppercase leading-[1.05]">
            {info.full_name || "Họ và tên"}
          </h1>
          {info.title && (
            <p className="text-[14px] text-[#ff4d4d] mt-2 font-bold uppercase tracking-[0.15em]">{info.title}</p>
          )}
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-5 text-[11px] text-[#aaa]">
            {info.email && <span>{info.email}</span>}
            {info.phone && <span>{info.phone}</span>}
            {info.address && <span>{info.address}</span>}
            {info.linkedin && <span>{info.linkedin}</span>}
            {info.github && <span>{info.github}</span>}
          </div>
        </div>
      </div>

      {/* Red accent bar */}
      <div className="h-1 bg-[#ff4d4d]" />

      <div className="px-10 py-10 space-y-8">
        {/* Summary */}
        {info.summary && (
          <section className="bg-[#fafafa] rounded-lg p-6">
            <p className="text-[13px] text-[#444] leading-[1.8] whitespace-pre-line">{info.summary}</p>
          </section>
        )}

        {/* Experience */}
        {cv.experiences.length > 0 && (
          <section>
            <h2 className="text-[13px] font-black uppercase tracking-[0.12em] text-[#111] mb-5 flex items-center gap-3">
              <div className="w-6 h-[3px] bg-[#ff4d4d] rounded-full" />
              Kinh nghiệm
            </h2>
            <div className="space-y-6">
              {cv.experiences.map((exp, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-[110px] shrink-0 pt-0.5">
                    <span className="text-[11px] text-[#999] font-mono">{exp.start_date}</span>
                    <br />
                    <span className="text-[11px] text-[#999] font-mono">{exp.is_current ? "Hiện tại" : exp.end_date}</span>
                  </div>
                  <div className="flex-1 border-l-2 border-[#eee] pl-5">
                    <h3 className="text-[15px] font-bold text-[#111]">{exp.position}</h3>
                    <p className="text-[13px] text-[#ff4d4d] font-semibold mt-0.5">{exp.company}</p>
                    {exp.description && (
                      <p className="text-[12px] text-[#555] mt-2 leading-[1.7] whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two-column bottom */}
        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {cv.education.length > 0 && (
            <section>
              <h2 className="text-[13px] font-black uppercase tracking-[0.12em] text-[#111] mb-4 flex items-center gap-3">
                <div className="w-6 h-[3px] bg-[#ff4d4d] rounded-full" />
                Học vấn
              </h2>
              <div className="space-y-3">
                {cv.education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="text-[13px] font-bold text-[#111]">{edu.school}</h3>
                    <p className="text-[11px] text-[#777]">{edu.degree}{edu.field && ` — ${edu.field}`}</p>
                    <p className="text-[10px] text-[#aaa] mt-0.5">{edu.start_date} — {edu.end_date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {cv.skills.length > 0 && (
            <section>
              <h2 className="text-[13px] font-black uppercase tracking-[0.12em] text-[#111] mb-4 flex items-center gap-3">
                <div className="w-6 h-[3px] bg-[#ff4d4d] rounded-full" />
                Kỹ năng
              </h2>
              <div className="flex flex-wrap gap-2">
                {cv.skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-[#111] text-white rounded text-[11px] font-bold">{s.name}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Languages + Projects */}
        <div className="grid grid-cols-2 gap-8">
          {cv.languages.length > 0 && (
            <section>
              <h2 className="text-[13px] font-black uppercase tracking-[0.12em] text-[#111] mb-3 flex items-center gap-3">
                <div className="w-6 h-[3px] bg-[#ff4d4d] rounded-full" />
                Ngoại ngữ
              </h2>
              <div className="space-y-1.5">
                {cv.languages.map((l, i) => (
                  <div key={i} className="flex justify-between text-[12px]">
                    <span className="font-semibold">{l.name}</span>
                    <span className="text-[#999]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.projects.length > 0 && (
            <section>
              <h2 className="text-[13px] font-black uppercase tracking-[0.12em] text-[#111] mb-3 flex items-center gap-3">
                <div className="w-6 h-[3px] bg-[#ff4d4d] rounded-full" />
                Dự án
              </h2>
              <div className="space-y-3">
                {cv.projects.map((p, i) => (
                  <div key={i}>
                    <h3 className="text-[13px] font-bold">{p.name}</h3>
                    {p.description && <p className="text-[11px] text-[#666] mt-0.5 leading-[1.6] whitespace-pre-line">{p.description}</p>}
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
