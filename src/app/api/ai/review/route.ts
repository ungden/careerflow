import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isPro as isProTier } from "@/lib/subscription";
import { chatJSON, isAiConfigured } from "@/lib/openai";
import { rateLimit } from "@/lib/rate-limit";

const TOOL = "review";
const FREE_LIMIT = 1;

const Body = z.object({
  cv_data: z.unknown().refine((v) => v != null, "Thiếu dữ liệu CV"),
});

export async function POST(request: NextRequest) {
  const limit = await rateLimit(request, {
    name: "ai_review",
    max: 10,
    windowSec: 60,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "rate_limited", message: "Quá nhiều yêu cầu. Thử lại sau." },
      { status: 429 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier, subscription_expires_at")
    .eq("id", user.id)
    .single();
  const isPro = isProTier(profile);
  const month = new Date().toISOString().slice(0, 7);

  let usageCount = 0;
  if (!isPro) {
    const { data: usage } = await supabase
      .from("ai_usage")
      .select("count")
      .eq("user_id", user.id)
      .eq("tool", TOOL)
      .eq("month", month)
      .single();
    usageCount = usage?.count ?? 0;
    if (usageCount >= FREE_LIMIT) {
      return NextResponse.json(
        {
          error: "quota_exceeded",
          message: `Bạn đã hết lượt sử dụng miễn phí (${FREE_LIMIT}/tháng). Nâng cấp Pro để dùng không giới hạn.`,
          limit: FREE_LIMIT,
        },
        { status: 429 }
      );
    }
  }

  if (!isAiConfigured()) {
    return NextResponse.json(
      { error: "AI tạm chưa khả dụng. Vui lòng thử lại sau." },
      { status: 503 }
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const cvJson = JSON.stringify(parsed.data.cv_data);
  if (cvJson.length > 50_000) {
    return NextResponse.json(
      { error: "CV quá lớn, vui lòng rút gọn." },
      { status: 413 }
    );
  }

  const result = await chatJSON<{
    overall_score: number;
    ats_score: number;
    keyword_score: number;
    experience_score: number;
    achievement_score: number;
    structure_score: number;
    professionalism_score: number;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    critical_errors: string[];
    suggestions: string[];
    quick_wins: string[];
  }>({
    maxTokens: 2500,
    messages: [
      {
        role: "system",
        content:
          "Bạn là chuyên gia tuyển dụng Việt Nam. Hãy phân tích CV theo 7 trục độc lập và đưa ra báo cáo chi tiết bằng tiếng Việt. Mỗi trục cho điểm 0-100.",
      },
      {
        role: "user",
        content: `Hãy chấm điểm CV theo 7 trục: Overall (tổng), ATS (machine-readable), Keyword (từ khoá ngành), Experience (kinh nghiệm), Achievement (số liệu thành tích), Structure (cấu trúc), Professionalism (chuyên nghiệp).

Trả về JSON đúng format:
{
  "overall_score": <0-100>,
  "ats_score": <0-100>,
  "keyword_score": <0-100>,
  "experience_score": <0-100>,
  "achievement_score": <0-100>,
  "structure_score": <0-100>,
  "professionalism_score": <0-100>,
  "summary": "<tóm tắt 2-3 câu>",
  "strengths": ["<điểm mạnh 1>", "<điểm mạnh 2>", ...],
  "weaknesses": ["<điểm yếu 1>", "<điểm yếu 2>", ...],
  "critical_errors": ["<lỗi nghiêm trọng 1>", ...],
  "suggestions": ["<gợi ý dài hạn 1>", ...],
  "quick_wins": ["<sửa ngay 1>", "<sửa ngay 2>", ...]
}

Dữ liệu CV:
${cvJson}`,
      },
    ],
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
  }

  if (!isPro) {
    await supabase.from("ai_usage").upsert(
      { user_id: user.id, tool: TOOL, month, count: usageCount + 1 },
      { onConflict: "user_id,tool,month" }
    );
  }

  return NextResponse.json(result.data);
}
