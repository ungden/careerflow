"use client";

import type { CVData } from "@/lib/types";
import { Mail, Phone, MapPin, Link2 } from "lucide-react";

interface TemplateProps {
  cv: CVData;
}

/** Dubai — Luxury premium. Dark sidebar with gold accents, elegant serif headings. */
export function DubaiTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-[#2d2d2d] min-h-[297mm] w-[210mm] mx-auto flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Dark luxury sidebar */}
      <div className="w-[38%] bg-[#0f172a] text-white px-8 py-12 flex flex-col">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#a07d50] mx-auto mb-4 flex items-center justify-center text-[32px] font-light text-white/90 overflow-hidden">
          {info.photo_url ? (
            <img src={info.photo_url} alt="" className="w-full h-full object-cover" />
          ) : (
            (info.full_name || "?").split(" ").map(w => w[0]).slice(-2).join("")
          )}
        </div>
        <div className="text-center mb-8">
          <h1 className="text-[22px] font-light tracking-wide text-white">{info.full_name || "Họ và tên"}</h1>
          {info.title && <p className="text-[11px] text-[#c9a96e] mt-1 uppercase tracking-[0.2em]">{info.title}</p>}
        </div>

        <div className="h-[0.5px] bg-[#c9a96e]/30 mb-8" />

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a96e] mb-4">Liên hệ</h2>
          <div className="space-y-3 text-[11px] text-slate-300">
            {info.phone && <div className="flex items-center gap-2.5"><Phone className="h-3.5 w-3.5 text-[#c9a96e]/60" />{info.phone}</div>}
            {info.email && <div className="flex items-center gap-2.5"><Mail className="h-3.5 w-3.5 text-[#c9a96e]/60" />{info.email}</div>}
            {info.address && <div className="flex items-center gap-2.5"><MapPin className="h-3.5 w-3.5 text-[#c9a96e]/60" />{info.address}</div>}
            {info.linkedin && <div className="flex items-center gap-2.5"><Link2 className="h-3.5 w-3.5 text-[#c9a96e]/60" />{info.linkedin}</div>}
          </div>
        </section>

        {/* Skills with gold dots */}
        {cv.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a96e] mb-4">Kỹ năng</h2>
            <div className="space-y-3">
              {cv.skills.map((s, i) => (
                <div key={i}>
                  <span className="text-[12px] text-slate-200 font-medium">{s.name}</span>
                  <div className="flex gap-1.5 mt-1.5">
                    {[1, 2, 3, 4, 5].map(n => (
                      <div key={n} className={`w-5 h-1 rounded-full ${n <= s.level ? "bg-[#c9a96e]" : "bg-slate-700"}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {cv.languages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a96e] mb-4">Ngoại ngữ</h2>
            <div className="space-y-2">
              {cv.languages.map((l, i) => (
                <div key={i} className="flex justify-between text-[12px]">
                  <span className="text-slate-200">{l.name}</span>
                  <span className="text-slate-500">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {cv.certifications.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a96e] mb-4">Chứng chỉ</h2>
            <div className="space-y-2.5">
              {cv.certifications.map((c, i) => (
                <div key={i}>
                  <p className="text-[12px] font-medium text-slate-200">{c.name}</p>
                  {c.issuer && <p className="text-[11px] text-slate-500">{c.issuer}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 px-10 py-12 space-y-8">
        {info.summary && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9a96e] mb-3">Giới thiệu</h2>
            <p className="text-[13px] text-[#555] leading-[1.85] whitespace-pre-line">{info.summary}</p>
          </section>
        )}

        {cv.experiences.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9a96e] mb-5">Kinh nghiệm</h2>
            <div className="space-y-6">
              {cv.experiences.map((exp, i) => (
                <div key={i} className="relative pl-5 border-l border-[#c9a96e]/25">
                  <div className="absolute left-[-4px] top-1 w-[7px] h-[7px] rounded-full bg-[#c9a96e]" />
                  <div className="flex justify-between items-start">
                    <h3 className="text-[15px] font-bold text-[#1a1a1a]">{exp.position}</h3>
                    <span className="text-[10px] text-[#bbb] shrink-0 ml-3">{exp.start_date} — {exp.is_current ? "Hiện tại" : exp.end_date}</span>
                  </div>
                  <p className="text-[12px] text-[#c9a96e] font-semibold mt-0.5">{exp.company}</p>
                  {exp.description && (
                    <p className="text-[12px] text-[#555] mt-2 leading-[1.75] whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {cv.education.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9a96e] mb-4">Học vấn</h2>
            <div className="space-y-4">
              {cv.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-[14px] font-bold text-[#1a1a1a]">{edu.school}</h3>
                    <span className="text-[10px] text-[#bbb] shrink-0 ml-3">{edu.start_date} — {edu.end_date}</span>
                  </div>
                  <p className="text-[12px] text-[#777]">{edu.degree}{edu.field && ` — ${edu.field}`}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {cv.projects.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9a96e] mb-4">Dự án</h2>
            <div className="space-y-4">
              {cv.projects.map((p, i) => (
                <div key={i}>
                  <h3 className="text-[14px] font-bold text-[#1a1a1a]">{p.name}</h3>
                  {p.description && <p className="text-[12px] text-[#555] mt-1 leading-[1.7] whitespace-pre-line">{p.description}</p>}
                  {p.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.technologies.map((t, j) => (
                        <span key={j} className="px-2 py-0.5 bg-[#fdf6e9] text-[#8a6d3b] rounded text-[10px] font-medium">{t}</span>
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
  );
}
