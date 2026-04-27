import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isPro as isProTier } from "@/lib/subscription";
import { chatJSON, isAiConfigured } from "@/lib/openai";
import { rateLimit } from "@/lib/rate-limit";

const TOOL = "interview";
const FREE_LIMIT = 5;

const Body = z.object({
  industry: z.string().min(1).max(200),
  position: z.string().min(1).max(200),
  level: z.string().max(100).optional(),
});

export async function POST(request: NextRequest) {
  const limit = await rateLimit(request, {
    name: "ai_interview",
    max: 10,
    windowSec: 60,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "rate_limited", message: "Quá nhiều yêu cầu." },
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
          message: `Bạn đã hết lượt miễn phí (${FREE_LIMIT}/tháng). Nâng cấp Pro để dùng không giới hạn.`,
          limit: FREE_LIMIT,
        },
        { status: 429 }
      );
    }
  }

  if (!isAiConfigured()) {
    return NextResponse.json(
      { error: "AI tạm chưa khả dụng." },
      { status: 503 }
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Vui lòng chọn ngành nghề và vị trí." },
      { status: 400 }
    );
  }
  const { industry, position, level } = parsed.data;

  const result = await chatJSON<{
    questions: Array<{ question: string; suggested_answer: string }>;
  }>({
    maxTokens: 2500,
    messages: [
      {
        role: "system",
        content:
          "Bạn là chuyên gia phỏng vấn tuyển dụng tại Việt Nam. Hãy đưa ra các câu hỏi phỏng vấn thực tế và gợi ý cách trả lời hay bằng tiếng Việt.",
      },
      {
        role: "user",
        content: `Hãy tạo 10 câu hỏi phỏng vấn thực tế cho vị trí sau, kèm gợi ý cách trả lời hay.

Ngành nghề: ${industry}
Vị trí: ${position}
Cấp bậc: ${level || "Không xác định"}

Trả về JSON: { "questions": [{ "question": "...", "suggested_answer": "..." }, ...] }`,
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

  return NextResponse.json({ questions: result.data.questions });
}
