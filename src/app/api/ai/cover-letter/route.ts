import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isPro as isProTier } from "@/lib/subscription";
import { chatJSON, isAiConfigured } from "@/lib/openai";
import { rateLimit } from "@/lib/rate-limit";

const TOOL = "cover_letter";
const FREE_LIMIT = 3;

const Body = z.object({
  cv_data: z.unknown().optional(),
  job_description: z.string().min(20).max(5000),
  tone: z.enum(["chuyên nghiệp", "thân thiện", "tự tin"]).optional(),
});

export async function POST(request: NextRequest) {
  const limit = await rateLimit(request, {
    name: "ai_cover_letter",
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
    return NextResponse.json(
      { error: "Vui lòng nhập mô tả công việc hợp lệ." },
      { status: 400 }
    );
  }
  const { cv_data, job_description, tone } = parsed.data;
  const cvJson = cv_data ? JSON.stringify(cv_data).slice(0, 30_000) : "";

  const result = await chatJSON<{ cover_letter: string }>({
    maxTokens: 1500,
    messages: [
      {
        role: "system",
        content: `Bạn là chuyên gia viết thư xin việc chuyên nghiệp tại Việt Nam. Hãy viết thư xin việc bằng tiếng Việt với giọng văn ${tone || "chuyên nghiệp"}. Thư phải ngắn gọn, súc tích.`,
      },
      {
        role: "user",
        content: `Dựa trên thông tin CV và mô tả công việc, hãy viết thư xin việc bằng tiếng Việt.

Trả về JSON: { "cover_letter": "<nội dung>" }

${cvJson ? `Thông tin CV:\n${cvJson}\n\n` : ""}Mô tả công việc:
${job_description}`,
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

  return NextResponse.json({ cover_letter: result.data.cover_letter });
}
