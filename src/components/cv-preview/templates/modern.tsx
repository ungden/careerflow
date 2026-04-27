"use client";

import type { CVData } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Link2, ExternalLink } from "lucide-react";

interface TemplateProps {
  cv: CVData;
}

export function ModernTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-[#2d2d2d] min-h-[297mm] w-[210mm] mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="bg-[#1557ff] text-white px-10 py-8">
        <h1 className="text-[30px] font-extrabold tracking-tight">
          {info.full_name || "Họ và tên"}
        </h1>
        {info.title && (
          <p className="text-[15px] text-blue-200 mt-1 font-medium tracking-wider uppercase">
            {info.title}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-5 text-[12px] text-blue-100">
          {info.email && (
            <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 opacity-70" />{info.email}</span>
          )}
          {info.phone && (
            <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 opacity-70" />{info.phone}</span>
          )}
          {info.address && (
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 opacity-70" />{info.address}</span>
          )}
          {info.linkedin && (
            <span className="flex items-center gap-1.5"><Link2 className="h-3.5 w-3.5 opacity-70" />{info.linkedin}</span>
          )}
          {info.github && (
            <span className="flex items-center gap-1.5"><ExternalLink className="h-3.5 w-3.5 opacity-70" />{info.github}</span>
          )}
        </div>
      </div>

      <div className="flex min-h-0">
        {/* Sidebar */}
        <div className="w-[34%] bg-[#f5f7fa] px-7 py-8 space-y-7">
          {/* Skills */}
          {cv.skills.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-4">
                Kỹ năng
              </h2>
              <div className="space-y-3">
                {cv.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="font-semibold text-[#333]">{skill.name}</span>
                    </div>
                    <div className="h-2 bg-[#dde3ed] rounded-full overflow-hidden">
                      <div className="h-full bg-[#1557ff] rounded-full transition-all" style={{ width: `${(skill.level / 5) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {cv.languages.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-4">
                Ngoại ngữ
              </h2>
              <div className="space-y-2.5">
                {cv.languages.map((lang, i) => (
                  <div key={i} className="flex justify-between text-[12px]">
                    <span className="font-semibold text-[#333]">{lang.name}</span>
                    <span className="text-[#777]">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {cv.certifications.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-4">
                Chứng chỉ
              </h2>
              <div className="space-y-3">
                {cv.certifications.map((cert, i) => (
                  <div key={i}>
                    <p className="text-[12px] font-semibold text-[#333]">{cert.name}</p>
                    {cert.issuer && <p className="text-[11px] text-[#777]">{cert.issuer}</p>}
                    {cert.date && <p className="text-[11px] text-[#999]">{cert.date}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 px-8 py-8 space-y-7">
          {/* Summary */}
          {info.summary && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-3 pb-2 border-b-2 border-[#1557ff]/20">
                Giới thiệu
              </h2>
              <p className="text-[13px] text-[#444] leading-[1.7] whitespace-pre-line">{info.summary}</p>
            </section>
          )}

          {/* Experience */}
          {cv.experiences.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-4 pb-2 border-b-2 border-[#1557ff]/20">
                Kinh nghiệm
              </h2>
              <div className="space-y-5">
                {cv.experiences.map((exp, i) => (
                  <div key={i} className="relative pl-5 border-l-2 border-[#dde3ed]">
                    <div className="absolute left-[-5px] top-1 h-2 w-2 rounded-full bg-[#1557ff]" />
                    <div className="flex justify-between items-start">
                      <h3 className="text-[14px] font-bold text-[#1a1a1a]">{exp.position || "Vị trí"}</h3>
                      <span className="text-[11px] text-[#999] shrink-0 ml-3 mt-0.5">
                        {exp.start_date}{(exp.end_date || exp.is_current) && ` — ${exp.is_current ? "Hiện tại" : exp.end_date}`}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#1557ff] font-semibold mt-0.5">
                      {exp.company}{exp.location && ` | ${exp.location}`}
                    </p>
                    {exp.description && (
                      <p className="text-[12px] text-[#555] mt-2 leading-[1.7] whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {cv.education.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-4 pb-2 border-b-2 border-[#1557ff]/20">
                Học vấn
              </h2>
              <div className="space-y-4">
                {cv.education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start">
                      <h3 className="text-[14px] font-bold text-[#1a1a1a]">{edu.school || "Trường"}</h3>
                      <span className="text-[11px] text-[#999] shrink-0 ml-3">{edu.start_date}{edu.end_date && ` — ${edu.end_date}`}</span>
                    </div>
                    <p className="text-[12px] text-[#555] mt-0.5">
                      {edu.degree}{edu.field && ` — ${edu.field}`}{edu.gpa && ` | GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {cv.projects.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-4 pb-2 border-b-2 border-[#1557ff]/20">
                Dự án
              </h2>
              <div className="space-y-4">
                {cv.projects.map((project, i) => (
                  <div key={i}>
                    <h3 className="text-[14px] font-bold text-[#1a1a1a]">{project.name || "Tên dự án"}</h3>
                    {project.description && (
                      <p className="text-[12px] text-[#555] mt-1.5 leading-[1.6] whitespace-pre-line">{project.description}</p>
                    )}
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.technologies.map((tech, j) => (
                          <span key={j} className="px-2.5 py-0.5 bg-[#e8f0fe] text-[#1557ff] rounded-md text-[11px] font-semibold">{tech}</span>
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
