"use client";

import type { CVData } from "@/lib/types";
import { Mail, Phone, MapPin, Link2, ExternalLink } from "lucide-react";

interface TemplateProps {
  cv: CVData;
}

/** Seoul — Clean tech startup vibe. Gradient header, rounded elements, modern cards. */
export function SeoulTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-[#fafbfc] text-[#24292e] min-h-[297mm] w-[210mm] mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Gradient header */}
      <div className="px-10 pt-10 pb-8" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="flex items-center gap-5">
          {info.photo_url && (
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
              <img src={info.photo_url} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <h1 className="text-[30px] font-extrabold text-white tracking-tight">
            {info.full_name || "Họ và tên"}
          </h1>
        </div>
        {info.title && (
          <p className="text-[14px] text-white/70 mt-1 font-medium">{info.title}</p>
        )}
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-5 text-[11px] text-white/60">
          {info.email && <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{info.email}</span>}
          {info.phone && <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{info.phone}</span>}
          {info.address && <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{info.address}</span>}
          {info.linkedin && <span className="flex items-center gap-1.5"><Link2 className="h-3 w-3" />{info.linkedin}</span>}
          {info.github && <span className="flex items-center gap-1.5"><ExternalLink className="h-3 w-3" />{info.github}</span>}
        </div>
      </div>

      <div className="px-10 py-8 space-y-6">
        {/* Summary card */}
        {info.summary && (
          <div className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <p className="text-[13px] text-[#555] leading-[1.8] whitespace-pre-line">{info.summary}</p>
          </div>
        )}

        {/* Experience */}
        {cv.experiences.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#8b5cf6] mb-4">Kinh nghiệm</h2>
            <div className="space-y-3">
              {cv.experiences.map((exp, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[14px] font-bold text-[#24292e]">{exp.position}</h3>
                      <p className="text-[12px] font-semibold mt-0.5" style={{ color: "#764ba2" }}>{exp.company}</p>
                    </div>
                    <span className="text-[10px] text-[#999] bg-[#f5f3ff] px-2.5 py-1 rounded-full shrink-0 ml-3">
                      {exp.start_date} — {exp.is_current ? "Hiện tại" : exp.end_date}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[12px] text-[#555] mt-3 leading-[1.7] whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two-column: Education + Skills */}
        <div className="grid grid-cols-2 gap-5">
          {cv.education.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#8b5cf6] mb-3">Học vấn</h2>
              <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-3">
                {cv.education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="text-[13px] font-bold text-[#24292e]">{edu.school}</h3>
                    <p className="text-[11px] text-[#777]">{edu.degree}{edu.field && ` — ${edu.field}`}</p>
                    <p className="text-[10px] text-[#aaa] mt-0.5">{edu.start_date} — {edu.end_date}{edu.gpa && ` | GPA: ${edu.gpa}`}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.skills.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#8b5cf6] mb-3">Kỹ năng</h2>
              <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <div className="flex flex-wrap gap-1.5">
                  {cv.skills.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-[11px] font-semibold" style={{
                      background: `linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)`,
                      color: "#764ba2",
                    }}>{s.name}</span>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Two-column: Languages + Projects */}
        <div className="grid grid-cols-2 gap-5">
          {cv.languages.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#8b5cf6] mb-3">Ngoại ngữ</h2>
              <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <div className="space-y-2">
                  {cv.languages.map((l, i) => (
                    <div key={i} className="flex justify-between text-[12px]">
                      <span className="font-medium">{l.name}</span>
                      <span className="text-[#aaa]">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {cv.projects.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#8b5cf6] mb-3">Dự án</h2>
              <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-3">
                {cv.projects.map((p, i) => (
                  <div key={i}>
                    <h3 className="text-[13px] font-bold text-[#24292e]">{p.name}</h3>
                    {p.description && <p className="text-[11px] text-[#777] mt-0.5 leading-[1.5]">{p.description}</p>}
                    {p.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {p.technologies.map((t, j) => (
                          <span key={j} className="px-1.5 py-0.5 bg-[#f5f3ff] text-[#764ba2] rounded text-[9px] font-medium">{t}</span>
                        ))}
                      </div>
                    )}
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
