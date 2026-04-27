import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isPro as isProTier } from "@/lib/subscription";
import { chatJSON, isAiConfigured } from "@/lib/openai";
import { rateLimit } from "@/lib/rate-limit";

const TOOL = "salary";
const FREE_LIMIT = 5;

const Body = z.object({
  industry: z.string().min(1).max(200),
  position: z.string().min(1).max(200),
  experience: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
});

export async function POST(request: NextRequest) {
  const limit = await rateLimit(request, {
    name: "ai_salary",
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
  const { industry, position, experience, location } = parsed.data;

  const result = await chatJSON<{
    salary_min: number;
    salary_median: number;
    salary_max: number;
    insights: string;
  }>({
    maxTokens: 1500,
    messages: [
      {
        role: "system",
        content:
          "Bạn là chuyên gia thị trường lao động Việt Nam. Hãy ước tính mức lương dựa trên dữ liệu thực tế. Đơn vị: triệu VND/tháng.",
      },
      {
        role: "user",
        content: `Ước tính mức lương cho vị trí trên thị trường VN.

Ngành nghề: ${industry}
Vị trí: ${position}
Kinh nghiệm: ${experience || "Không xác định"}
Khu vực: ${location || "TP. Hồ Chí Minh"}

Trả về JSON: { "salary_min": <triệu VND>, "salary_median": <triệu VND>, "salary_max": <triệu VND>, "insights": "<phân tích>" }`,
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

  return NextResponse.json({
    salary_min: result.data.salary_min,
    salary_median: result.data.salary_median,
    salary_max: result.data.salary_max,
    insights: result.data.insights,
  });
}
