"use client";

import type { CVData } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Link2, ExternalLink } from "lucide-react";

interface TemplateProps {
  cv: CVData;
}

export function ClassicTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-[#2d2d2d] min-h-[297mm] w-[210mm] mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="px-12 pt-10 pb-8 border-b-[3px] border-[#1a1a1a]">
        <h1 className="text-[28px] font-bold tracking-tight text-[#1a1a1a]">
          {info.full_name || "Họ và tên"}
        </h1>
        {info.title && (
          <p className="text-[15px] text-[#555] mt-1 font-medium tracking-wide uppercase">
            {info.title}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-4 text-[12px] text-[#666]">
          {info.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-[#999]" />
              {info.email}
            </span>
          )}
          {info.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-[#999]" />
              {info.phone}
            </span>
          )}
          {info.address && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#999]" />
              {info.address}
            </span>
          )}
          {info.linkedin && (
            <span className="flex items-center gap-1.5">
              <Link2 className="h-3.5 w-3.5 text-[#999]" />
              {info.linkedin}
            </span>
          )}
          {info.github && (
            <span className="flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5 text-[#999]" />
              {info.github}
            </span>
          )}
        </div>
      </div>

      <div className="px-12 py-8 space-y-7">
        {/* Summary */}
        {info.summary && (
          <section>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1a1a1a] mb-3 pb-1.5 border-b border-[#ddd]">
              Giới thiệu
            </h2>
            <p className="text-[13px] text-[#444] leading-[1.7] whitespace-pre-line">{info.summary}</p>
          </section>
        )}

        {/* Experience */}
        {cv.experiences.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1a1a1a] mb-4 pb-1.5 border-b border-[#ddd]">
              Kinh nghiệm làm việc
            </h2>
            <div className="space-y-5">
              {cv.experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[14px] font-bold text-[#1a1a1a]">{exp.position || "Vị trí"}</h3>
                      <p className="text-[13px] text-[#1557ff] font-semibold mt-0.5">
                        {exp.company}{exp.location && ` — ${exp.location}`}
                      </p>
                    </div>
                    <span className="text-[12px] text-[#888] shrink-0 ml-4 mt-0.5">
                      {exp.start_date}{(exp.end_date || exp.is_current) && ` — ${exp.is_current ? "Hiện tại" : exp.end_date}`}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[12.5px] text-[#444] mt-2 leading-[1.7] whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {cv.education.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1a1a1a] mb-4 pb-1.5 border-b border-[#ddd]">
              Học vấn
            </h2>
            <div className="space-y-4">
              {cv.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[14px] font-bold text-[#1a1a1a]">{edu.school || "Trường"}</h3>
                      <p className="text-[13px] text-[#555] mt-0.5">
                        {edu.degree}{edu.field && ` — ${edu.field}`}{edu.gpa && ` | GPA: ${edu.gpa}`}
                      </p>
                    </div>
                    <span className="text-[12px] text-[#888] shrink-0 ml-4">
                      {edu.start_date}{edu.end_date && ` — ${edu.end_date}`}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-[12.5px] text-[#444] mt-1.5 leading-[1.6]">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {cv.skills.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1a1a1a] mb-3 pb-1.5 border-b border-[#ddd]">
              Kỹ năng
            </h2>
            <div className="flex flex-wrap gap-2">
              {cv.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-[#f0f0f0] text-[#333] rounded-md text-[12px] font-medium">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Two-column: Languages + Certifications */}
        <div className="grid grid-cols-2 gap-8">
          {cv.languages.length > 0 && (
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1a1a1a] mb-3 pb-1.5 border-b border-[#ddd]">
                Ngoại ngữ
              </h2>
              <div className="space-y-1.5">
                {cv.languages.map((lang, i) => (
                  <div key={i} className="flex justify-between text-[12.5px]">
                    <span className="font-medium text-[#333]">{lang.name}</span>
                    <span className="text-[#777]">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.certifications.length > 0 && (
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1a1a1a] mb-3 pb-1.5 border-b border-[#ddd]">
                Chứng chỉ
              </h2>
              <div className="space-y-1.5">
                {cv.certifications.map((cert, i) => (
                  <div key={i} className="text-[12.5px]">
                    <span className="font-medium text-[#333]">{cert.name}</span>
                    {cert.issuer && <span className="text-[#777]"> — {cert.issuer}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {cv.projects.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1a1a1a] mb-4 pb-1.5 border-b border-[#ddd]">
              Dự án
            </h2>
            <div className="space-y-4">
              {cv.projects.map((project, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[14px] font-bold text-[#1a1a1a]">{project.name || "Tên dự án"}</h3>
                    {project.url && <span className="text-[11px] text-[#1557ff]">{project.url}</span>}
                  </div>
                  {project.description && (
                    <p className="text-[12.5px] text-[#444] mt-1.5 leading-[1.6] whitespace-pre-line">{project.description}</p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.technologies.map((tech, j) => (
                        <span key={j} className="px-2 py-0.5 bg-[#e8f0fe] text-[#1557ff] rounded text-[11px] font-medium">{tech}</span>
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
