import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";
import { Mail, MapPin, Globe, Link2, ExternalLink } from "lucide-react";
import { ContactDialog } from "@/components/candidates/contact-dialog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, headline")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!profile) return { title: "Ứng viên không tồn tại" };
  return {
    title: profile.full_name || "Ứng viên",
    description: profile.headline || `Xem hồ sơ của ${profile.full_name} trên YourCV`,
  };
}

export default async function CandidateProfilePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!profile) notFound();

  const { data: cv } = await supabase
    .from("cvs")
    .select("*")
    .eq("user_id", profile.id)
    .eq("is_primary", true)
    .single();

  const info = cv?.personal_info || {};
  const experiences = cv?.experiences || [];
  const education = cv?.education || [];
  const skills = cv?.skills || [];
  const languages = cv?.languages || [];
  const projects = cv?.projects || [];

  const initials = (profile.full_name || "?")
    .split(" ")
    .map((w: string) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f9fb]">
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
          {/* Profile Header */}
          <div className="bg-white rounded-[32px] overflow-hidden shadow-sm mb-8">
            <div className="h-40 kinetic-gradient" />
            <div className="px-8 pb-8">
              {/* Avatar half-overlaps banner; contact button aligned to bottom */}
              <div className="flex justify-between items-end -mt-16 mb-5 gap-4">
                <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center shrink-0">
                  {profile.avatar_url || info.photo_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={profile.avatar_url || info.photo_url}
                      alt={profile.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#e8f0fe] flex items-center justify-center text-[32px] font-bold text-[#1557ff]">
                      {initials}
                    </div>
                  )}
                </div>
                <div className="pb-2">
                  <ContactDialog
                    candidateId={profile.id}
                    candidateName={profile.full_name}
                  />
                </div>
              </div>

              <h1
                className="text-[28px] font-extrabold text-[#1a1a1a] tracking-tight"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {profile.full_name}
              </h1>
              {profile.headline && (
                <p className="text-[15px] text-[#1557ff] font-semibold mt-1">
                  {profile.headline}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                {profile.industry && (
                  <span className="px-3 py-1 bg-[#e8f0fe] text-[#1557ff] rounded-full text-[12px] font-semibold">
                    {profile.industry}
                  </span>
                )}
                {profile.experience_level && (
                  <span className="px-3 py-1 bg-[#f3f4f6] text-[#555] rounded-full text-[12px] font-medium capitalize">
                    {profile.experience_level}
                  </span>
                )}
                {profile.location && (
                  <span className="px-3 py-1 bg-[#f3f4f6] text-[#555] rounded-full text-[12px] font-medium flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {profile.location}
                  </span>
                )}
                {profile.availability === "open" && (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[12px] font-semibold">
                    Sẵn sàng nhận việc
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              {info.summary && (
                <div className="bg-white rounded-[24px] p-8 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-4">Giới thiệu</h2>
                  <p className="text-[14px] text-[#444] leading-[1.8] whitespace-pre-line">{info.summary}</p>
                </div>
              )}

              {experiences.length > 0 && (
                <div className="bg-white rounded-[24px] p-8 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-6">Kinh nghiệm làm việc</h2>
                  <div className="space-y-6">
                    {experiences.map((exp: any, i: number) => (
                      <div key={i} className="relative pl-6 border-l-2 border-[#e8f0fe]">
                        <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[#1557ff]" />
                        <div className="flex justify-between items-start">
                          <h3 className="text-[15px] font-bold text-[#1a1a1a]">{exp.position}</h3>
                          <span className="text-[12px] text-[#999] shrink-0 ml-3">{exp.start_date} — {exp.is_current ? "Hiện tại" : exp.end_date}</span>
                        </div>
                        <p className="text-[13px] text-[#1557ff] font-semibold mt-0.5">{exp.company}</p>
                        {exp.description && <p className="text-[13px] text-[#555] mt-2 leading-[1.7] whitespace-pre-line">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {education.length > 0 && (
                <div className="bg-white rounded-[24px] p-8 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-5">Học vấn</h2>
                  <div className="space-y-4">
                    {education.map((edu: any, i: number) => (
                      <div key={i}>
                        <div className="flex justify-between items-start">
                          <h3 className="text-[15px] font-bold text-[#1a1a1a]">{edu.school}</h3>
                          <span className="text-[12px] text-[#999] shrink-0 ml-3">{edu.start_date} — {edu.end_date}</span>
                        </div>
                        <p className="text-[13px] text-[#555]">{edu.degree}{edu.field && ` — ${edu.field}`}{edu.gpa && ` | GPA: ${edu.gpa}`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {projects.length > 0 && (
                <div className="bg-white rounded-[24px] p-8 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-5">Dự án</h2>
                  <div className="space-y-5">
                    {projects.map((p: any, i: number) => (
                      <div key={i}>
                        <h3 className="text-[15px] font-bold text-[#1a1a1a]">{p.name}</h3>
                        {p.description && <p className="text-[13px] text-[#555] mt-1 leading-[1.7] whitespace-pre-line">{p.description}</p>}
                        {p.technologies?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {p.technologies.map((t: string, j: number) => (
                              <span key={j} className="px-2.5 py-0.5 bg-[#e8f0fe] text-[#1557ff] rounded-xl text-[11px] font-semibold">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-[24px] p-8 shadow-sm">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-4">Liên hệ</h2>
                <div className="space-y-3 text-[13px] text-[#555]">
                  {info.email && <div className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-[#1557ff]/50" />{info.email}</div>}
                  {info.address && <div className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-[#1557ff]/50" />{info.address}</div>}
                  {info.website && <div className="flex items-center gap-2.5"><Globe className="h-4 w-4 text-[#1557ff]/50" /><a href={info.website} className="text-[#1557ff] hover:underline">{info.website}</a></div>}
                  {info.linkedin && <div className="flex items-center gap-2.5"><Link2 className="h-4 w-4 text-[#1557ff]/50" />{info.linkedin}</div>}
                  {info.github && <div className="flex items-center gap-2.5"><ExternalLink className="h-4 w-4 text-[#1557ff]/50" />{info.github}</div>}
                </div>
              </div>

              {skills.length > 0 && (
                <div className="bg-white rounded-[24px] p-8 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-4">Kỹ năng</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s: any, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-[#e8f0fe] text-[#1557ff] rounded-full text-[12px] font-semibold">{s.name}</span>
                    ))}
                  </div>
                </div>
              )}

              {languages.length > 0 && (
                <div className="bg-white rounded-[24px] p-8 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1557ff] mb-4">Ngoại ngữ</h2>
                  <div className="space-y-2">
                    {languages.map((l: any, i: number) => (
                      <div key={i} className="flex justify-between text-[13px]">
                        <span className="font-medium text-[#333]">{l.name}</span>
                        <span className="text-[#999]">{l.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
