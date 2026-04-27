import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isPro as isProTier } from "@/lib/subscription";
import { chatJSON } from "@/lib/openai";
import { rateLimit } from "@/lib/rate-limit";
import { env } from "@/lib/env";

const TOOL = "jd_match";
const FREE_LIMIT = 3;

const Body = z.object({
  cv_data: z.unknown().refine((v) => v != null, "Thiếu dữ liệu CV"),
  job_description: z.string().min(40).max(8000),
});

interface MatchResult {
  match_score: number; // 0-100
  ats_score: number;   // 0-100
  matched_keywords: string[];
  missing_keywords: string[];
  strengths: string[];
  gaps: string[];
  bullet_rewrite_suggestions: Array<{ from: string; to: string }>;
  overall: string;
}

export async function POST(request: NextRequest) {
  const limit = await rateLimit(request, {
    name: "ai_jd_match",
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
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
          message: `Hết lượt JD Match miễn phí (${FREE_LIMIT}/tháng). Nâng cấp Pro để dùng không giới hạn.`,
          limit: FREE_LIMIT,
        },
        { status: 429 }
      );
    }
  }

  if (!env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "AI tạm chưa khả dụng." },
      { status: 503 }
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Cần CV và mô tả công việc (JD ≥ 40 ký tự)." },
      { status: 400 }
    );
  }

  const cvJson = JSON.stringify(parsed.data.cv_data).slice(0, 30_000);

  const result = await chatJSON<MatchResult>({
    apiKey: env.OPENAI_API_KEY,
    maxTokens: 2200,
    messages: [
      {
        role: "system",
        content:
          "Bạn là chuyên gia tuyển dụng Việt Nam. Hãy đo độ phù hợp giữa CV và Job Description (JD) cụ thể. Trả lời tiếng Việt, định lượng, hành động được.",
      },
      {
        role: "user",
        content: `So khớp CV với JD và trả về JSON đúng format:
{
  "match_score": <0-100>,
  "ats_score": <0-100>,
  "matched_keywords": ["kw1", "kw2"],
  "missing_keywords": ["kw3", "kw4"],
  "strengths": ["điểm mạnh 1", ...],
  "gaps": ["thiếu sót 1", ...],
  "bullet_rewrite_suggestions": [{"from": "câu cũ", "to": "câu sửa"}],
  "overall": "tóm tắt 2-3 câu"
}

CV (JSON):
${cvJson}

JD:
${parsed.data.job_description}`,
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
