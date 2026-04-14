"use client";

import type { CVData } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Link2, ExternalLink } from "lucide-react";

interface TemplateProps {
  cv: CVData;
}

export function ModernTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-gray-900 min-h-[297mm] w-[210mm] mx-auto text-[11px] leading-relaxed">
      {/* Header with accent color */}
      <div className="bg-slate-800 text-white px-8 py-6">
        <h1 className="text-3xl font-light tracking-wide">
          {info.full_name || "Họ và tên"}
        </h1>
        {info.title && (
          <p className="text-slate-300 mt-1 text-sm font-light tracking-wider uppercase">
            {info.title}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-slate-300 text-[10px]">
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

      <div className="flex">
        {/* Sidebar */}
        <div className="w-[35%] bg-slate-50 p-6 space-y-5">
          {/* Skills */}
          {cv.skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                Kỹ năng
              </h2>
              <div className="space-y-2">
                {cv.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-700 rounded-full"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {cv.languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                Ngoại ngữ
              </h2>
              <div className="space-y-1.5">
                {cv.languages.map((lang, i) => (
                  <div key={i} className="flex justify-between text-[10px]">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-slate-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {cv.certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                Chứng chỉ
              </h2>
              <div className="space-y-2">
                {cv.certifications.map((cert, i) => (
                  <div key={i} className="text-[10px]">
                    <p className="font-medium">{cert.name}</p>
                    {cert.issuer && (
                      <p className="text-slate-500">{cert.issuer}</p>
                    )}
                    {cert.date && (
                      <p className="text-slate-400">{cert.date}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 space-y-5">
          {/* Summary */}
          {info.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
                Giới thiệu
              </h2>
              <p className="text-gray-600 whitespace-pre-line">{info.summary}</p>
            </section>
          )}

          {/* Experience */}
          {cv.experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-3">
                Kinh nghiệm
              </h2>
              {cv.experiences.map((exp, i) => (
                <div key={i} className="mb-4 relative pl-4 border-l-2 border-slate-200">
                  <div className="absolute left-[-5px] top-0 h-2 w-2 rounded-full bg-slate-700" />
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-[11px]">
                      {exp.position || "Vị trí"}
                    </h3>
                    <span className="text-slate-400 text-[10px] shrink-0 ml-2">
                      {exp.start_date}
                      {(exp.end_date || exp.is_current) &&
                        ` - ${exp.is_current ? "Hiện tại" : exp.end_date}`}
                    </span>
                  </div>
                  {exp.company && (
                    <p className="text-slate-500 text-[10px] font-medium">
                      {exp.company}
                      {exp.location && ` | ${exp.location}`}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-gray-600 mt-1 whitespace-pre-line text-[10px]">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {cv.education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-3">
                Học vấn
              </h2>
              {cv.education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-[11px]">
                      {edu.school || "Trường"}
                    </h3>
                    <span className="text-slate-400 text-[10px] shrink-0 ml-2">
                      {edu.start_date}
                      {edu.end_date && ` - ${edu.end_date}`}
                    </span>
                  </div>
                  {edu.degree && (
                    <p className="text-slate-500 text-[10px]">
                      {edu.degree}
                      {edu.field && ` - ${edu.field}`}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {cv.projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-3">
                Dự án
              </h2>
              {cv.projects.map((project, i) => (
                <div key={i} className="mb-3">
                  <h3 className="font-semibold text-[11px]">
                    {project.name || "Tên dự án"}
                  </h3>
                  {project.description && (
                    <p className="text-gray-600 mt-0.5 whitespace-pre-line text-[10px]">
                      {project.description}
                    </p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies.map((tech, j) => (
                        <span
                          key={j}
                          className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
