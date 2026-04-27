import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const alt = "YourCV — Job listing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function fmtSalary(min?: number | null, max?: number | null) {
  if (min && max) return `${(min / 1_000_000).toFixed(0)}-${(max / 1_000_000).toFixed(0)} triệu`;
  if (min) return `Từ ${(min / 1_000_000).toFixed(0)} triệu`;
  if (max) return `Đến ${(max / 1_000_000).toFixed(0)} triệu`;
  return "Thỏa thuận";
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase
    .from("jobs")
    .select("title, location, job_type, industry, salary_min, salary_max, company:companies(name)")
    .eq("slug", slug)
    .maybeSingle();

  const company =
    (job?.company as { name?: string } | null)?.name ?? "Công ty";
  const title = job?.title ?? "Việc làm trên YourCV";
  const salary = fmtSalary(job?.salary_min, job?.salary_max);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #f8fbff 0%, #eef4ff 60%, #e3f5ec 100%)",
          padding: 64,
          fontFamily: "Inter, system-ui",
          color: "#0b1740",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: -1,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "linear-gradient(135deg, #1557ff 0%, #20b26b 100%)",
              }}
            />
            <span style={{ color: "#1557ff" }}>Your</span>
            <span style={{ color: "#20b26b", marginLeft: -8 }}>CV</span>
          </div>
          <span
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              background: "#1557ff",
              color: "white",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            Đang tuyển
          </span>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#1557ff",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {company}
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1.1,
              marginTop: 14,
              maxWidth: 1000,
              letterSpacing: -1.5,
            }}
          >
            {title.length > 90 ? title.slice(0, 87) + "…" : title}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            {job?.location && (
              <span style={chipStyle()}>{job.location}</span>
            )}
            {job?.job_type && <span style={chipStyle()}>{job.job_type}</span>}
            {job?.industry && (
              <span style={chipStyle("blue")}>{job.industry}</span>
            )}
            <span style={chipStyle("emerald")}>💰 {salary}</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: "2px solid #e2e8f0",
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: "#475569" }}>
            yourcv.net/viec-lam/{slug}
          </span>
          <span
            style={{
              padding: "14px 26px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #1557ff 0%, #20b26b 100%)",
              color: "white",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            Ứng tuyển 1-click →
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

function chipStyle(tone: "default" | "blue" | "emerald" = "default") {
  const palette = {
    default: { bg: "#f1f5f9", color: "#475569" },
    blue: { bg: "#dbeafe", color: "#1557ff" },
    emerald: { bg: "#d1fae5", color: "#047857" },
  }[tone];
  return {
    padding: "8px 18px",
    borderRadius: 999,
    background: palette.bg,
    color: palette.color,
    fontSize: 22,
    fontWeight: 800,
  };
}
