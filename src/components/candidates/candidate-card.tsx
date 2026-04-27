"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Candidate {
  id: string;
  slug?: string | null;
  full_name?: string | null;
  headline?: string | null;
  photo_url?: string | null;
  avatar_url?: string | null;
  location?: string | null;
  experience_level?: string | null;
  industry?: string | null;
  skills?: string[] | null;
  subscription_tier?: string | null;
}

function getInitials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .slice(-2)
      .join("")
      .toUpperCase() || "UV"
  );
}

export function CandidateCard({ c }: { c: Candidate }) {
  const router = useRouter();
  const slug = c.slug ?? "";
  const href = `/ung-vien/${slug}`;
  const photo = c.photo_url || c.avatar_url || null;

  function navigate() {
    if (slug) router.push(href);
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate();
        }
      }}
      className="relative bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-5 hover:shadow-lg hover:bg-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1557ff]/40"
    >
      {c.subscription_tier === "pro" && (
        <span
          className="absolute top-6 right-6 px-4 py-1.5 text-xs font-bold text-white rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #1557ff 0%, #3b6dff 100%)",
          }}
        >
          Nổi bật
        </span>
      )}

      <div className="w-20 h-20 rounded-full bg-[#f3f4f6] flex items-center justify-center overflow-hidden">
        {photo ? (
          <Image
            src={photo}
            alt={c.full_name ?? "Ứng viên"}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-2xl font-black text-[#1557ff]/30">
            {getInitials(c.full_name ?? "UV")}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <h2
          className="text-xl font-extrabold text-[#191c1e]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          {c.full_name}
        </h2>
        {c.headline && <p className="text-sm text-[#434654]">{c.headline}</p>}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#434654]/70">
          {c.location && <span>{c.location}</span>}
          {c.location && c.experience_level && <span>&middot;</span>}
          {c.experience_level && <span>{c.experience_level}</span>}
        </div>
        {c.industry && (
          <span className="inline-block mt-1 px-3 py-1 text-xs font-medium bg-[#1557ff]/5 text-[#1557ff] rounded-xl">
            {c.industry}
          </span>
        )}
      </div>

      {c.skills && Array.isArray(c.skills) && c.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {c.skills.slice(0, 6).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 text-xs font-medium bg-[#1557ff]/5 text-[#1557ff] rounded-xl"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <div
        className="flex gap-3 pt-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Link
          href={href}
          className="flex-1 text-center px-5 py-3 text-sm font-bold text-[#1557ff] bg-[#f3f4f6] rounded-2xl hover:bg-[#1557ff]/10 transition-colors"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Xem Profile
        </Link>
        <Link
          href={`/cv/p/${slug}`}
          className="flex-1 text-center kinetic-gradient text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-md hover:opacity-90 transition-all"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Xem CV
        </Link>
      </div>
    </div>
  );
}
