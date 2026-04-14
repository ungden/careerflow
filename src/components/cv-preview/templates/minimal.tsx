"use client";

import type { CVData } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Link2, ExternalLink } from "lucide-react";

interface TemplateProps {
  cv: CVData;
}

export function MinimalTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-gray-900 p-10 min-h-[297mm] w-[210mm] mx-auto text-[11px] leading-relaxed">
      {/* Header — large name, minimal contact */}
      <header className="mb-10">
        <h1 className="text-4xl font-light tracking-tight text-black">
          {info.full_name || "Họ và tên"}
        </h1>
        {info.title && (
          <p className="text-sm text-gray-400 mt-2 font-light tracking-wide">
            {info.title}
          </p>
        )}
        <div className="h-px bg-gray-200 mt-6 mb-4" />
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[10px] text-gray-400">
          {info.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {info.email}
            </span>
          )}
          {info.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {info.phone}
            </span>
          )}
          {info.address && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {info.address}
            </span>
          )}
          {info.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {info.website}
            </span>
          )}
          {info.linkedin && (
            <span className="flex items-center gap-1">
              <Link2 className="h-3 w-3" />
              {info.linkedin}
            </span>
          )}
          {info.github && (
            <span className="flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              {info.github}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {info.summary && (
        <section className="mb-8">
          <p className="text-gray-500 leading-relaxed whitespace-pre-line">
            {info.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {cv.experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-4">
            Kinh nghiệm làm việc
          </h2>
          <div className="h-px bg-gray-100 mb-4" />
          {cv.experiences.map((exp, i) => (
            <div key={i} className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="text-[12px] font-medium text-black">
                  {exp.position || "Vị trí"}
                </h3>
                <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                  {exp.start_date}
                  {(exp.end_date || exp.is_current) &&
                    ` — ${exp.is_current ? "Hiện tại" : exp.end_date}`}
                </span>
              </div>
              {exp.company && (
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {exp.company}
                  {exp.location && ` / ${exp.location}`}
                </p>
              )}
              {exp.description && (
                <p className="text-gray-600 mt-2 whitespace-pre-line text-[10.5px] leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {cv.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-4">
            Học vấn
          </h2>
          <div className="h-px bg-gray-100 mb-4" />
          {cv.education.map((edu, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-[12px] font-medium text-black">
                  {edu.school || "Trường"}
                </h3>
                <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                  {edu.start_date}
                  {edu.end_date && ` — ${edu.end_date}`}
                </span>
              </div>
              {edu.degree && (
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {edu.degree}
                  {edu.field && `, ${edu.field}`}
                  {edu.gpa && ` — GPA: ${edu.gpa}`}
                </p>
              )}
              {edu.description && (
                <p className="text-gray-600 mt-1 whitespace-pre-line text-[10.5px]">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills — comma-separated, no bars or chips */}
      {cv.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-4">
            Kỹ năng
          </h2>
          <div className="h-px bg-gray-100 mb-4" />
          <p className="text-gray-600 text-[11px] leading-relaxed">
            {cv.skills.map((s) => s.name).join(", ")}
          </p>
        </section>
      )}

      {/* Languages — inline */}
      {cv.languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-4">
            Ngoại ngữ
          </h2>
          <div className="h-px bg-gray-100 mb-4" />
          <p className="text-gray-600 text-[11px]">
            {cv.languages
              .map(
                (l) =>
                  `${l.name}${l.proficiency ? ` (${l.proficiency})` : ""}`
              )
              .join(", ")}
          </p>
        </section>
      )}

      {/* Projects */}
      {cv.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-4">
            Dự án
          </h2>
          <div className="h-px bg-gray-100 mb-4" />
          {cv.projects.map((project, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-[12px] font-medium text-black">
                  {project.name || "Tên dự án"}
                </h3>
                {project.url && (
                  <span className="text-[10px] text-gray-400">
                    {project.url}
                  </span>
                )}
              </div>
              {project.description && (
                <p className="text-gray-600 mt-1 whitespace-pre-line text-[10.5px]">
                  {project.description}
                </p>
              )}
              {project.technologies.length > 0 && (
                <p className="text-gray-400 text-[10px] mt-1">
                  {project.technologies.join(" / ")}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {cv.certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-4">
            Chứng chỉ
          </h2>
          <div className="h-px bg-gray-100 mb-4" />
          {cv.certifications.map((cert, i) => (
            <div key={i} className="mb-2">
              <span className="text-[11px] font-medium text-black">
                {cert.name}
              </span>
              {cert.issuer && (
                <span className="text-gray-400 text-[10px]">
                  {" "}
                  — {cert.issuer}
                </span>
              )}
              {cert.date && (
                <span className="text-gray-300 text-[10px] ml-1">
                  ({cert.date})
                </span>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
