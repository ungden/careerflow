import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isPro as isProTier } from "@/lib/subscription";
import { chatJSON, isAiConfigured } from "@/lib/openai";
import { rateLimit } from "@/lib/rate-limit";

const TOOL = "rewrite";
const FREE_LIMIT = 5;

const Body = z.object({
  section: z.enum([
    "summary",
    "experience",
    "achievement",
    "translate_en",
    "shorter",
    "professional",
    "ats",
  ]),
  original: z.string().min(5).max(8000),
  context: z
    .object({
      role: z.string().optional(),
      industry: z.string().optional(),
      jd: z.string().max(5000).optional(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  const limit = await rateLimit(request, {
    name: "ai_rewrite",
    max: 10,
    windowSec: 60,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
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
          message: `Hết lượt rewrite miễn phí (${FREE_LIMIT}/tháng). Nâng cấp Pro.`,
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
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const { section, original, context } = parsed.data;

  const sectionInstructions: Record<string, string> = {
    summary:
      "Viết lại phần tóm tắt sự nghiệp ngắn gọn 3-4 câu, có số liệu nếu có thể, làm nổi bật giá trị mang lại cho công ty.",
    experience:
      "Viết lại bullet kinh nghiệm theo công thức Action + Metric + Impact. Mỗi bullet bắt đầu bằng động từ mạnh, kèm số liệu cụ thể, và nêu rõ tác động.",
    achievement:
      "Thêm số liệu thành tích cụ thể vào nội dung. Nếu nội dung gốc thiếu số liệu, gợi ý số ước lượng hợp lý theo ngữ cảnh và đánh dấu (ước tính) sau số đó.",
    translate_en:
      "Translate the content into professional English suitable for a CV/resume. Keep numbers and proper nouns intact.",
    shorter:
      "Rút gọn nội dung này khoảng 30-40% mà vẫn giữ key information. Bỏ filler word, chuyển sang câu chủ động.",
    professional:
      "Viết lại theo phong cách chuyên nghiệp, formal, dùng terminology ngành. Loại bỏ informal expressions.",
    ats:
      "Tối ưu cho ATS: thêm keywords ngành, dùng cấu trúc tiêu chuẩn, viết câu rõ ràng, dùng bullet points đồng đều.",
  };

  const instruction = sectionInstructions[section];

  const result = await chatJSON<{
    rewritten: string;
    rationale: string[];
    keywords_added: string[];
  }>({
    maxTokens: 2000,
    messages: [
      {
        role: "system",
        content:
          "Bạn là chuyên gia viết CV cho thị trường Việt Nam, hiểu rõ ATS và ngôn ngữ chuyên ngành. Trả lời tiếng Việt trừ khi yêu cầu dịch sang tiếng Anh.",
      },
      {
        role: "user",
        content: `Nhiệm vụ: ${instruction}

${context?.role ? `Vị trí mục tiêu: ${context.role}\n` : ""}${context?.industry ? `Ngành: ${context.industry}\n` : ""}${context?.jd ? `JD tham chiếu:\n${context.jd}\n\n` : ""}
Nội dung gốc:
${original}

Trả về JSON đúng format:
{
  "rewritten": "<bản viết lại — giữ nguyên format dòng nếu là bullets>",
  "rationale": ["<lý do cải thiện 1>", "<lý do 2>", ...],
  "keywords_added": ["<keyword đã thêm>", ...]
}`,
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
