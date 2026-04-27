import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const alt = "YourCV — Public CV";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, headline, industry, experience_level, location, avatar_url")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  const name = profile?.full_name ?? "Ứng viên";
  const headline = profile?.headline ?? "CV trên YourCV";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #1557ff 0%, #3b6dff 50%, #20b26b 100%)",
          padding: 60,
          fontFamily: "Inter, system-ui",
          color: "white",
        }}
      >
        {/* Left: text */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingRight: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: -0.5,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "rgba(255,255,255,0.95)",
              }}
            />
            <span>YourCV</span>
          </div>

          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                opacity: 0.85,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              CV Public · {profile?.experience_level ?? "—"}
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                lineHeight: 1.05,
                marginTop: 16,
                letterSpacing: -1.5,
              }}
            >
              {name}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                marginTop: 14,
                opacity: 0.95,
                maxWidth: 700,
              }}
            >
              {headline.length > 110 ? headline.slice(0, 107) + "…" : headline}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {profile?.industry && (
                <span style={badge}>{profile.industry}</span>
              )}
              {profile?.location && <span style={badge}>{profile.location}</span>}
            </div>
          </div>

          <div style={{ fontSize: 20, opacity: 0.9, fontWeight: 700 }}>
            yourcv.net/cv/p/{slug}
          </div>
        </div>

        {/* Right: initials avatar (rendered in-process for reliability) */}
        <div
          style={{
            width: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: 9999,
              border: "10px solid rgba(255,255,255,0.95)",
              background: "white",
              color: "#1557ff",
              fontSize: 120,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {(name || "?")
              .split(/\s+/)
              .filter(Boolean)
              .map((w: string) => w[0])
              .slice(-2)
              .join("")
              .toUpperCase()}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

const badge: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.18)",
  border: "1px solid rgba(255,255,255,0.3)",
  fontSize: 18,
  fontWeight: 700,
};
