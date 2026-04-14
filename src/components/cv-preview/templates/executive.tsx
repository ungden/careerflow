"use client";

import type { CVData } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Link2, ExternalLink } from "lucide-react";

interface TemplateProps {
  cv: CVData;
}

export function ExecutiveTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-gray-900 min-h-[297mm] w-[210mm] mx-auto text-[11px] leading-relaxed flex">
      {/* Dark left sidebar */}
      <div className="w-[35%] bg-[#1e293b] text-white p-6 space-y-5 min-h-[297mm]">
        {/* Photo */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20">
            {info.photo_url ? (
              <img
                src={info.photo_url}
                alt={info.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-600 flex items-center justify-center text-white/60 text-3xl font-bold">
                {(info.full_name || "?").charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Contact info */}
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
            Liên hệ
          </h2>
          <div className="space-y-2.5 text-[10px]">
            {info.email && (
              <div className="flex items-start gap-2">
                <Mail className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 break-all">{info.email}</span>
              </div>
            )}
            {info.phone && (
              <div className="flex items-start gap-2">
                <Phone className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{info.phone}</span>
              </div>
            )}
            {info.address && (
              <div className="flex items-start gap-2">
                <MapPin className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{info.address}</span>
              </div>
            )}
            {info.website && (
              <div className="flex items-start gap-2">
                <Globe className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 break-all">{info.website}</span>
              </div>
            )}
            {info.linkedin && (
              <div className="flex items-start gap-2">
                <Link2 className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 break-all">{info.linkedin}</span>
              </div>
            )}
            {info.github && (
              <div className="flex items-start gap-2">
                <ExternalLink className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 break-all">{info.github}</span>
              </div>
            )}
          </div>
        </section>

        {/* Skills with progress bars */}
        {cv.skills.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              Kỹ năng
            </h2>
            <div className="space-y-2.5">
              {cv.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-slate-200 font-medium">
                      {skill.name}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/80 rounded-full"
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
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              Ngoại ngữ
            </h2>
            <div className="space-y-1.5">
              {cv.languages.map((lang, i) => (
                <div key={i} className="flex justify-between text-[10px]">
                  <span className="text-slate-200 font-medium">
                    {lang.name}
                  </span>
                  <span className="text-slate-400">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {cv.certifications.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              Chứng chỉ
            </h2>
            <div className="space-y-2">
              {cv.certifications.map((cert, i) => (
                <div key={i} className="text-[10px]">
                  <p className="text-slate-200 font-medium">{cert.name}</p>
                  {cert.issuer && (
                    <p className="text-slate-400">{cert.issuer}</p>
                  )}
                  {cert.date && (
                    <p className="text-slate-500">{cert.date}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Right main content */}
      <div className="flex-1 p-8 space-y-6">
        {/* Name and title */}
        <header className="mb-2">
          <h1 className="text-3xl font-bold text-[#1e293b] tracking-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {info.full_name || "Họ và tên"}
          </h1>
          {info.title && (
            <p className="text-sm text-gray-500 mt-1 font-medium tracking-wide uppercase">
              {info.title}
            </p>
          )}
        </header>

        {/* Summary */}
        {info.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1e293b] pb-1.5 mb-2 border-b-2 border-[#1e293b]">
              Giới thiệu
            </h2>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {info.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {cv.experiences.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1e293b] pb-1.5 mb-3 border-b-2 border-[#1e293b]">
              Kinh nghiệm làm việc
            </h2>
            {cv.experiences.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[11px] text-[#1e293b]">
                    {exp.position || "Vị trí"}
                  </h3>
                  <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                    {exp.start_date}
                    {(exp.end_date || exp.is_current) &&
                      ` - ${exp.is_current ? "Hiện tại" : exp.end_date}`}
                  </span>
                </div>
                {exp.company && (
                  <p className="text-[10px] text-gray-500 font-medium">
                    {exp.company}
                    {exp.location && ` | ${exp.location}`}
                  </p>
                )}
                {exp.description && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.description.split("\n").filter(Boolean).map((line, j) => (
                      <li
                        key={j}
                        className="text-gray-600 text-[10px] pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[5px] before:w-1 before:h-1 before:bg-[#1e293b] before:rounded-full"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {cv.education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1e293b] pb-1.5 mb-3 border-b-2 border-[#1e293b]">
              Học vấn
            </h2>
            {cv.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[11px] text-[#1e293b]">
                    {edu.school || "Trường"}
                  </h3>
                  <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                    {edu.start_date}
                    {edu.end_date && ` - ${edu.end_date}`}
                  </span>
                </div>
                {edu.degree && (
                  <p className="text-[10px] text-gray-500">
                    {edu.degree}
                    {edu.field && ` - ${edu.field}`}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </p>
                )}
                {edu.description && (
                  <p className="text-gray-600 mt-1 whitespace-pre-line text-[10px]">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {cv.projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1e293b] pb-1.5 mb-3 border-b-2 border-[#1e293b]">
              Dự án
            </h2>
            {cv.projects.map((project, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[11px] text-[#1e293b]">
                    {project.name || "Tên dự án"}
                  </h3>
                  {project.url && (
                    <span className="text-[10px] text-gray-400">
                      {project.url}
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="text-gray-600 mt-0.5 whitespace-pre-line text-[10px]">
                    {project.description}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <p className="text-gray-400 text-[9px] mt-1">
                    {project.technologies.join(" | ")}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
