"use client";

import type { CVData } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Link2, ExternalLink } from "lucide-react";

interface TemplateProps {
  cv: CVData;
}

export function ClassicTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-gray-900 p-8 min-h-[297mm] w-[210mm] mx-auto text-[11px] leading-relaxed">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          {info.full_name || "Họ và tên"}
        </h1>
        {info.title && (
          <p className="text-sm text-gray-600 mt-1 font-medium">
            {info.title}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-gray-600">
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
      </div>

      {/* Summary */}
      {info.summary && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Giới thiệu
          </h2>
          <p className="text-gray-700 whitespace-pre-line">{info.summary}</p>
        </section>
      )}

      {/* Experience */}
      {cv.experiences.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Kinh nghiệm làm việc
          </h2>
          {cv.experiences.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold">{exp.position || "Vị trí"}</span>
                  {exp.company && (
                    <span className="text-gray-600"> | {exp.company}</span>
                  )}
                </div>
                <span className="text-gray-500 text-[10px] shrink-0 ml-2">
                  {exp.start_date}
                  {(exp.end_date || exp.is_current) &&
                    ` - ${exp.is_current ? "Hiện tại" : exp.end_date}`}
                </span>
              </div>
              {exp.location && (
                <p className="text-gray-500 text-[10px]">{exp.location}</p>
              )}
              {exp.description && (
                <p className="text-gray-700 mt-1 whitespace-pre-line">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {cv.education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Học vấn
          </h2>
          {cv.education.map((edu, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold">
                    {edu.school || "Trường"}
                  </span>
                  {edu.degree && (
                    <span className="text-gray-600">
                      {" "}
                      - {edu.degree}
                      {edu.field && `, ${edu.field}`}
                    </span>
                  )}
                </div>
                <span className="text-gray-500 text-[10px] shrink-0 ml-2">
                  {edu.start_date}
                  {edu.end_date && ` - ${edu.end_date}`}
                </span>
              </div>
              {edu.gpa && (
                <p className="text-gray-500 text-[10px]">GPA: {edu.gpa}</p>
              )}
              {edu.description && (
                <p className="text-gray-700 mt-1 whitespace-pre-line">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {cv.skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Kỹ năng
          </h2>
          <div className="flex flex-wrap gap-2">
            {cv.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-medium"
              >
                {skill.name}
                {skill.level >= 4 && " ★"}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {cv.languages.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Ngoại ngữ
          </h2>
          <div className="flex flex-wrap gap-4">
            {cv.languages.map((lang, i) => (
              <span key={i} className="text-gray-700">
                <span className="font-medium">{lang.name}</span>
                {lang.proficiency && (
                  <span className="text-gray-500"> - {lang.proficiency}</span>
                )}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {cv.projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Dự án
          </h2>
          {cv.projects.map((project, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="font-semibold">
                  {project.name || "Tên dự án"}
                </span>
                {project.url && (
                  <span className="text-gray-500 text-[10px]">
                    {project.url}
                  </span>
                )}
              </div>
              {project.description && (
                <p className="text-gray-700 mt-1 whitespace-pre-line">
                  {project.description}
                </p>
              )}
              {project.technologies.length > 0 && (
                <p className="text-gray-500 text-[10px] mt-1">
                  Tech: {project.technologies.join(", ")}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {cv.certifications.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Chứng chỉ
          </h2>
          {cv.certifications.map((cert, i) => (
            <div key={i} className="mb-1">
              <span className="font-medium">{cert.name}</span>
              {cert.issuer && (
                <span className="text-gray-600"> - {cert.issuer}</span>
              )}
              {cert.date && (
                <span className="text-gray-500 text-[10px] ml-2">
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
