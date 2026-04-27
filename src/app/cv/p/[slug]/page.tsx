import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { templates, type TemplateId } from "@/components/cv-preview/templates/template-registry";
import { env } from "@/lib/env";
import type { CVData } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

async function loadCV(slug: string) {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, headline, avatar_url, slug, is_published")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (!profile) return null;

  const { data: cv } = await supabase
    .from("cvs")
    .select("*")
    .eq("user_id", profile.id)
    .eq("is_primary", true)
    .maybeSingle();
  if (!cv) return null;

  return { profile, cv };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await loadCV(slug);
  if (!data) return { title: "CV không tồn tại" };
  const { profile, cv } = data;
  const info = (cv.personal_info as Partial<CVData["personal_info"]> | null) || {};
  const title = info.full_name || profile.full_name || "CV";
  const subtitle = info.title || profile.headline || "Hồ sơ ứng viên";
  const baseUrl = env.NEXT_PUBLIC_APP_URL || "https://yourcv.net";
  const url = `${baseUrl}/cv/p/${profile.slug}`;
  return {
    title: `${title} — ${subtitle}`,
    description: info.summary?.slice(0, 200) || `Xem CV của ${title} trên YourCV`,
    openGraph: {
      title: `${title} — ${subtitle}`,
      description: info.summary?.slice(0, 200) || `Xem CV của ${title} trên YourCV`,
      url,
      type: "profile",
      images: info.photo_url || profile.avatar_url ? [info.photo_url || profile.avatar_url!] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${subtitle}`,
    },
    alternates: { canonical: url },
  };
}

export default async function PublicCVPage({ params }: Props) {
  const { slug } = await params;
  const data = await loadCV(slug);
  if (!data) notFound();
  const { profile, cv } = data;

  const templateId = (cv.template_id as TemplateId) || "classic";
  const template = templates[templateId] || templates.classic;
  const TemplateComponent = template.component;

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-bold text-[#1557ff]"
          >
            <span style={{ fontFamily: "var(--font-headline)" }}>YourCV</span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Link
              href={`/ung-vien/${profile.slug}`}
              className="rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100"
            >
              Xem hồ sơ đầy đủ
            </Link>
            <Link
              href="/dang-ky"
              className="rounded-xl bg-[#1557ff] px-4 py-2 font-semibold text-white hover:bg-[#002d75]"
            >
              Tạo CV của bạn
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
          <TemplateComponent cv={cv as unknown as CVData} />
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Được tạo trên{" "}
          <Link href="/" className="font-semibold text-[#1557ff] hover:underline">
            YourCV
          </Link>{" "}
          — Nền tảng tạo CV chuyên nghiệp.
        </p>
      </main>
    </div>
  );
}
