"use client";

import type { CVData } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Link2, ExternalLink } from "lucide-react";

interface TemplateProps {
  cv: CVData;
}

export function CreativeTemplate({ cv }: TemplateProps) {
  const info = cv.personal_info;

  return (
    <div className="bg-white text-gray-900 min-h-[297mm] w-[210mm] mx-auto text-[11px] leading-relaxed">
      {/* Bold header with navy background */}
      <div className="relative bg-[#003d9b] text-white px-8 pt-8 pb-14">
        <h1 className="text-3xl font-bold tracking-wide">
          {info.full_name || "Họ và tên"}
        </h1>
        {info.title && (
          <p className="text-blue-200 mt-1 text-sm font-medium tracking-wider uppercase">
            {info.title}
          </p>
        )}
      </div>

      {/* Photo circle overlapping header/content */}
      <div className="relative h-0">
        <div className="absolute right-8 -top-10 w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
          {info.photo_url ? (
            <img
              src={info.photo_url}
              alt={info.full_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-2xl font-bold">
              {(info.full_name || "?").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Left sidebar */}
        <div className="w-[30%] bg-[#f3f4f6] p-6 pt-8 space-y-5 min-h-[calc(297mm-90px)]">
          {/* Contact */}
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-[#003d9b] mb-3">
              Liên hệ
            </h2>
            <div className="space-y-2 text-[10px] text-gray-600">
              {info.email && (
                <div className="flex items-start gap-2">
                  <Mail className="h-3 w-3 text-[#003d9b] shrink-0 mt-0.5" />
                  <span className="break-all">{info.email}</span>
                </div>
              )}
              {info.phone && (
                <div className="flex items-start gap-2">
                  <Phone className="h-3 w-3 text-[#003d9b] shrink-0 mt-0.5" />
                  <span>{info.phone}</span>
                </div>
              )}
              {info.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-3 w-3 text-[#003d9b] shrink-0 mt-0.5" />
                  <span>{info.address}</span>
                </div>
              )}
              {info.website && (
                <div className="flex items-start gap-2">
                  <Globe className="h-3 w-3 text-[#003d9b] shrink-0 mt-0.5" />
                  <span className="break-all">{info.website}</span>
                </div>
              )}
              {info.linkedin && (
                <div className="flex items-start gap-2">
                  <Link2 className="h-3 w-3 text-[#003d9b] shrink-0 mt-0.5" />
                  <span className="break-all">{info.linkedin}</span>
                </div>
              )}
              {info.github && (
                <div className="flex items-start gap-2">
                  <ExternalLink className="h-3 w-3 text-[#003d9b] shrink-0 mt-0.5" />
                  <span className="break-all">{info.github}</span>
                </div>
              )}
            </div>
          </section>

          {/* Skills — rounded chips */}
          {cv.skills.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-[#003d9b] mb-3">
                Kỹ năng
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {cv.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-[#003d9b]/10 text-[#003d9b] rounded-full text-[9px] font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {cv.languages.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-[#003d9b] mb-3">
                Ngoại ngữ
              </h2>
              <div className="space-y-1.5">
                {cv.languages.map((lang, i) => (
                  <div key={i} className="text-[10px]">
                    <span className="font-medium text-gray-700">
                      {lang.name}
                    </span>
                    {lang.proficiency && (
                      <span className="text-gray-400 ml-1">
                        - {lang.proficiency}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {cv.certifications.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-[#003d9b] mb-3">
                Chứng chỉ
              </h2>
              <div className="space-y-2">
                {cv.certifications.map((cert, i) => (
                  <div key={i} className="text-[10px]">
                    <p className="font-medium text-gray-700">{cert.name}</p>
                    {cert.issuer && (
                      <p className="text-gray-400">{cert.issuer}</p>
                    )}
                    {cert.date && (
                      <p className="text-gray-400">{cert.date}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right main content */}
        <div className="flex-1 p-6 pt-8 space-y-5">
          {/* Summary */}
          {info.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#003d9b] mb-2">
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#003d9b] mb-3">
                Kinh nghiệm
              </h2>
              {cv.experiences.map((exp, i) => (
                <div
                  key={i}
                  className="mb-4 pl-4 border-l-2 border-[#003d9b]/30"
                >
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-[11px] text-gray-800">
                      {exp.position || "Vị trí"}
                    </h3>
                    <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                      {exp.start_date}
                      {(exp.end_date || exp.is_current) &&
                        ` - ${exp.is_current ? "Hiện tại" : exp.end_date}`}
                    </span>
                  </div>
                  {exp.company && (
                    <p className="text-[10px] text-[#003d9b] font-medium">
                      {exp.company}
                      {exp.location && (
                        <span className="text-gray-400 font-normal">
                          {" "}
                          | {exp.location}
                        </span>
                      )}
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#003d9b] mb-3">
                Học vấn
              </h2>
              {cv.education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-[11px] text-gray-800">
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#003d9b] mb-3">
                Dự án
              </h2>
              {cv.projects.map((project, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-[11px] text-gray-800">
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
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies.map((tech, j) => (
                        <span
                          key={j}
                          className="px-1.5 py-0.5 bg-[#003d9b]/10 text-[#003d9b] rounded text-[9px]"
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
