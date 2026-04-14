import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const WATERMARK_TEXT = "Tạo bởi CareerFlow - careerflow.vn";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cvId = searchParams.get("id");

  if (!cvId) {
    return NextResponse.json({ error: "Missing CV ID" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: cv, error } = await supabase
    .from("cvs")
    .select("*")
    .eq("id", cvId)
    .eq("user_id", user.id)
    .single();

  if (error || !cv) {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier")
    .eq("id", user.id)
    .single();
  const isPro = profile?.subscription_tier === "pro";

  // HTML-based PDF-ready output (printable in browser)
  const watermarkOverlay = !isPro
    ? `<div class="watermark" aria-hidden="true">${WATERMARK_TEXT}</div>`
    : "";

  const watermarkStyles = !isPro
    ? `
    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-size: 64px;
      font-weight: 800;
      color: rgba(0, 61, 155, 0.10);
      pointer-events: none;
      white-space: nowrap;
      z-index: 9999;
      letter-spacing: 2px;
      user-select: none;
    }
    @media print {
      .watermark {
        color: rgba(0, 61, 155, 0.12);
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  `
    : "";

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>${cv.title || "CV"} - CareerFlow</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    @page { size: A4; margin: 0; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .cv-data { display: none; }
    ${watermarkStyles}
  </style>
</head>
<body>
  ${watermarkOverlay}
  <script type="application/json" id="cv-data">${JSON.stringify(cv).replace(/</g, "\\u003c")}</script>
  <div id="cv-root"></div>
  <script>
    // Client should render CV from window CV_DATA into #cv-root, then call window.print()
    window.CV_DATA = ${JSON.stringify(cv).replace(/</g, "\\u003c")};
    window.IS_PRO = ${isPro};
  </script>
</body>
</html>`;

  // If client requests JSON (e.g., for client-side rendering), return data + watermark flag
  const accept = request.headers.get("accept") || "";
  if (accept.includes("application/json")) {
    return NextResponse.json({
      cv,
      isPro,
      watermark: isPro ? null : WATERMARK_TEXT,
    });
  }

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
