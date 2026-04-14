"use client";

import type { CVData } from "@/lib/types";
import { Mail, Phone, MapPin, Link2, ExternalLink } from "lucide-react";

interface TemplateProps {
  cv: CVData;
}

export function CreativeTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-[#2d2d2d] min-h-[297mm] w-[210mm] mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Header */}
      <div className="bg-[#003d9b] px-10 pt-10 pb-14 relative">
        <h1 className="text-[32px] font-extrabold text-white tracking-tight">
          {info.full_name || "Họ và tên"}
        </h1>
        {info.title && (
          <p className="text-[15px] text-blue-200 mt-1.5 font-semibold tracking-wider uppercase">{info.title}</p>
        )}
        <div className="absolute -bottom-10 right-10 w-20 h-20 rounded-full bg-[#e8f0fe] border-4 border-white flex items-center justify-center text-[24px] font-bold text-[#003d9b] overflow-hidden">
          {info.photo_url ? (
            <img src={info.photo_url} alt="" className="w-full h-full object-cover" />
          ) : (
            (info.full_name || "?").split(" ").map(w => w[0]).slice(-2).join("")
          )}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-[34%] bg-[#f0f4f8] px-7 pt-8 pb-10 space-y-7">
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#003d9b] mb-4">Liên hệ</h2>
            <div className="space-y-2.5 text-[12px] text-[#555]">
              {info.phone && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-[#003d9b]" />{info.phone}</div>}
              {info.email && <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-[#003d9b]" />{info.email}</div>}
              {info.address && <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[#003d9b]" />{info.address}</div>}
              {info.linkedin && <div className="flex items-center gap-2"><Link2 className="h-3.5 w-3.5 text-[#003d9b]" />{info.linkedin}</div>}
              {info.github && <div className="flex items-center gap-2"><ExternalLink className="h-3.5 w-3.5 text-[#003d9b]" />{info.github}</div>}
            </div>
          </section>

          {cv.skills.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#003d9b] mb-4">Kỹ năng</h2>
              <div className="flex flex-wrap gap-1.5">
                {cv.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-white text-[#003d9b] rounded-full text-[11px] font-semibold shadow-sm">{skill.name}</span>
                ))}
              </div>
            </section>
          )}

          {cv.languages.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#003d9b] mb-4">Ngoại ngữ</h2>
              <div className="space-y-2">
                {cv.languages.map((lang, i) => (
                  <div key={i} className="flex justify-between text-[12px]">
                    <span className="font-semibold text-[#333]">{lang.name}</span>
                    <span className="text-[#777]">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.certifications.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#003d9b] mb-4">Chứng chỉ</h2>
              <div className="space-y-2.5">
                {cv.certifications.map((cert, i) => (
                  <div key={i}>
                    <p className="text-[12px] font-semibold text-[#333]">{cert.name}</p>
                    {cert.issuer && <p className="text-[11px] text-[#777]">{cert.issuer}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Main */}
        <div className="flex-1 px-8 pt-8 pb-10 space-y-7">
          {info.summary && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#003d9b] mb-3">Giới thiệu</h2>
              <p className="text-[13px] text-[#444] leading-[1.8] whitespace-pre-line">{info.summary}</p>
            </section>
          )}

          {cv.experiences.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#003d9b] mb-5">Kinh nghiệm</h2>
              <div className="space-y-5">
                {cv.experiences.map((exp, i) => (
                  <div key={i} className="relative pl-5">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-[#003d9b]/15" />
                    <div className="absolute left-[-3px] top-1.5 h-[9px] w-[9px] rounded-full bg-[#003d9b]" />
                    <div className="flex justify-between items-start">
                      <h3 className="text-[14px] font-bold text-[#1a1a1a]">{exp.position || "Vị trí"}</h3>
                      <span className="text-[11px] text-[#999] shrink-0 ml-3 bg-[#f5f5f5] px-2 py-0.5 rounded">
                        {exp.start_date} — {exp.is_current ? "Hiện tại" : exp.end_date}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#003d9b] font-semibold mt-0.5">{exp.company}</p>
                    {exp.description && (
                      <p className="text-[12px] text-[#555] mt-2 leading-[1.7] whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.education.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#003d9b] mb-4">Học vấn</h2>
              <div className="space-y-4">
                {cv.education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start">
                      <h3 className="text-[14px] font-bold text-[#1a1a1a]">{edu.school || "Trường"}</h3>
                      <span className="text-[11px] text-[#999] shrink-0 ml-3">{edu.start_date} — {edu.end_date}</span>
                    </div>
                    <p className="text-[12px] text-[#555]">{edu.degree}{edu.field && ` — ${edu.field}`}{edu.gpa && ` | GPA: ${edu.gpa}`}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.projects.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#003d9b] mb-4">Dự án</h2>
              <div className="space-y-4">
                {cv.projects.map((project, i) => (
                  <div key={i}>
                    <h3 className="text-[14px] font-bold text-[#1a1a1a]">{project.name || "Tên dự án"}</h3>
                    {project.description && (
                      <p className="text-[12px] text-[#555] mt-1 leading-[1.6] whitespace-pre-line">{project.description}</p>
                    )}
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.technologies.map((tech, j) => (
                          <span key={j} className="px-2 py-0.5 bg-[#e8f0fe] text-[#003d9b] rounded text-[10px] font-semibold">{tech}</span>
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
