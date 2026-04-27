"use client";

import type { CVData } from "@/lib/types";
import { Mail, Phone, MapPin, Link2, ExternalLink } from "lucide-react";

interface TemplateProps {
  cv: CVData;
}

export function ExecutiveTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-[#2d2d2d] min-h-[297mm] w-[210mm] mx-auto flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Dark Sidebar */}
      <div className="w-[36%] bg-[#1e293b] text-white px-7 py-10 flex flex-col">
        <div className="w-24 h-24 rounded-full bg-[#334155] mx-auto mb-6 flex items-center justify-center text-[28px] font-bold text-slate-300 overflow-hidden">
          {info.photo_url ? (
            <img src={info.photo_url} alt="" className="w-full h-full object-cover" />
          ) : (
            (info.full_name || "?").split(" ").map(w => w[0]).slice(-2).join("")
          )}
        </div>

        <section className="mb-7">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">Liên hệ</h2>
          <div className="space-y-2.5 text-[12px] text-slate-300">
            {info.phone && <div className="flex items-center gap-2.5"><Phone className="h-3.5 w-3.5 text-slate-500" />{info.phone}</div>}
            {info.email && <div className="flex items-center gap-2.5"><Mail className="h-3.5 w-3.5 text-slate-500" />{info.email}</div>}
            {info.address && <div className="flex items-center gap-2.5"><MapPin className="h-3.5 w-3.5 text-slate-500" />{info.address}</div>}
            {info.linkedin && <div className="flex items-center gap-2.5"><Link2 className="h-3.5 w-3.5 text-slate-500" />{info.linkedin}</div>}
            {info.github && <div className="flex items-center gap-2.5"><ExternalLink className="h-3.5 w-3.5 text-slate-500" />{info.github}</div>}
          </div>
        </section>

        {cv.skills.length > 0 && (
          <section className="mb-7">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">Kỹ năng</h2>
            <div className="space-y-3">
              {cv.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[12px] mb-1.5">
                    <span className="font-medium text-slate-200">{skill.name}</span>
                    <span className="text-slate-500 text-[10px]">{Math.round((skill.level / 5) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(skill.level / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {cv.languages.length > 0 && (
          <section className="mb-7">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">Ngoại ngữ</h2>
            <div className="space-y-2">
              {cv.languages.map((lang, i) => (
                <div key={i} className="flex justify-between text-[12px]">
                  <span className="text-slate-200">{lang.name}</span>
                  <span className="text-slate-400">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {cv.certifications.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">Chứng chỉ</h2>
            <div className="space-y-2.5">
              {cv.certifications.map((cert, i) => (
                <div key={i}>
                  <p className="text-[12px] font-medium text-slate-200">{cert.name}</p>
                  {cert.issuer && <p className="text-[11px] text-slate-400">{cert.issuer}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-9 py-10 space-y-7">
        <header>
          <h1 className="text-[28px] font-extrabold text-[#1e293b] tracking-tight leading-tight">
            {info.full_name || "Họ và tên"}
          </h1>
          {info.title && (
            <p className="text-[14px] text-[#1557ff] font-semibold mt-1 uppercase tracking-wider">{info.title}</p>
          )}
        </header>

        {info.summary && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#1e293b] mb-3 pb-2 border-b-2 border-[#1557ff]">Giới thiệu</h2>
            <p className="text-[13px] text-[#555] leading-[1.8] whitespace-pre-line">{info.summary}</p>
          </section>
        )}

        {cv.experiences.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#1e293b] mb-4 pb-2 border-b-2 border-[#1557ff]">Kinh nghiệm làm việc</h2>
            <div className="space-y-5">
              {cv.experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[14px] font-bold text-[#1e293b]">{exp.position || "Vị trí"}</h3>
                      <p className="text-[13px] text-[#1557ff] font-semibold mt-0.5">{exp.company}</p>
                    </div>
                    <span className="text-[11px] text-[#999] shrink-0 ml-4 mt-0.5">
                      {exp.start_date} — {exp.is_current ? "Hiện tại" : exp.end_date}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="text-[12.5px] text-[#555] mt-2 leading-[1.7] whitespace-pre-line">{exp.description}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {cv.education.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#1e293b] mb-4 pb-2 border-b-2 border-[#1557ff]">Học vấn</h2>
            <div className="space-y-4">
              {cv.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-[14px] font-bold text-[#1e293b]">{edu.school || "Trường"}</h3>
                    <span className="text-[11px] text-[#999] shrink-0 ml-3">{edu.start_date} — {edu.end_date}</span>
                  </div>
                  <p className="text-[12px] text-[#555] mt-0.5">{edu.degree}{edu.field && ` — ${edu.field}`}{edu.gpa && ` | GPA: ${edu.gpa}`}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {cv.projects.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#1e293b] mb-4 pb-2 border-b-2 border-[#1557ff]">Dự án</h2>
            <div className="space-y-4">
              {cv.projects.map((project, i) => (
                <div key={i}>
                  <h3 className="text-[14px] font-bold text-[#1e293b]">{project.name || "Tên dự án"}</h3>
                  {project.description && (
                    <p className="text-[12.5px] text-[#555] mt-1 leading-[1.6] whitespace-pre-line">{project.description}</p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.technologies.map((tech, j) => (
                        <span key={j} className="px-2.5 py-0.5 bg-[#f1f5f9] text-[#1e293b] rounded text-[11px] font-medium">{tech}</span>
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
