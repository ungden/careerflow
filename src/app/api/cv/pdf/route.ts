import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { isPro as isProTier } from "@/lib/subscription";
import { CVDocument } from "@/lib/pdf/cv-document";
import type { CVData } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cvId = searchParams.get("id");

  if (!cvId) {
    return NextResponse.json({ error: "Thiếu CV ID" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const { data: cv, error } = await supabase
    .from("cvs")
    .select("*")
    .eq("id", cvId)
    .eq("user_id", user.id)
    .single();

  if (error || !cv) {
    return NextResponse.json({ error: "Không tìm thấy CV" }, { status: 404 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier, subscription_expires_at")
    .eq("id", user.id)
    .single();

  const isPro = isProTier(profile);
  const cvData = cv as CVData;
  const stream = await renderToStream(CVDocument({ cv: cvData, isPro }));

  const chunks: Buffer[] = [];
  for await (const chunk of stream as unknown as AsyncIterable<Buffer>) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const filenameBase = cvData.personal_info?.full_name || cvData.title || "CV";
  const filename = encodeURIComponent(`${filenameBase}-YourCV.pdf`);

  return new NextResponse(new Uint8Array(Buffer.concat(chunks)), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "private, no-cache",
    },
  });
}
