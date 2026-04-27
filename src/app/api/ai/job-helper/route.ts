import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { chatJSON } from "@/lib/openai";
import { rateLimit } from "@/lib/rate-limit";
import { env } from "@/lib/env";

const TOOL = "job_helper";
const FREE_LIMIT = 10;

const Body = z.object({
  mode: z.enum(["write_jd", "polish", "extract_skills", "screening_questions"]),
  title: z.string().min(2).max(200),
  industry: z.string().max(120).optional(),
  context: z.string().max(8000).optional(),
});

const modeInstructions: Record<string, string> = {
  write_jd:
    "Viết một mô tả công việc (JD) đầy đủ bằng tiếng Việt, gồm: 1 đoạn giới thiệu vị trí, mục Trách nhiệm chính (5-7 bullets bắt đầu bằng động từ mạnh), Yêu cầu (5-6 bullets ưu tiên kỹ năng cụ thể + năm kinh nghiệm), Quyền lợi (5 bullets cụ thể có số liệu nếu được).",
  polish:
    "Viết lại JD này theo phong cách chuyên nghiệp, hấp dẫn ứng viên Việt: dùng giọng đối thoại thay vì sáo rỗng, nhấn mạnh impact và growth, thêm 1-2 chi tiết về văn hóa nếu có thể suy luận từ context.",
  extract_skills:
    "Phân tích JD và liệt kê các kỹ năng/công nghệ/công cụ cần thiết. Phân loại 3 nhóm: required (bắt buộc), preferred (nên có), bonus (gia điểm).",
  screening_questions:
    "Tạo 5-7 câu hỏi sàng lọc ngắn gọn để gửi đến ứng viên trước phỏng vấn (mỗi câu trả lời có thể trong 2-3 câu). Mục tiêu: lọc nhanh ai phù hợp.",
};

interface ResultByMode {
  write_jd: { description: string; requirements: string; benefits: string };
  polish: { description: string; requirements: string; benefits: string };
  extract_skills: { required: string[]; preferred: string[]; bonus: string[] };
  screening_questions: { questions: { question: string; why: string }[] };
}

export async function POST(request: NextRequest) {
  const limit = await rateLimit(request, {
    name: "ai_job_helper",
    max: 15,
    windowSec: 60,
  });
  if (!limit.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const month = new Date().toISOString().slice(0, 7);
  const { data: usage } = await supabase
    .from("ai_usage")
    .select("count")
    .eq("user_id", user.id)
    .eq("tool", TOOL)
    .eq("month", month)
    .single();
  const usageCount = usage?.count ?? 0;
  if (usageCount >= FREE_LIMIT) {
    return NextResponse.json(
      {
        error: "quota_exceeded",
        message: `Hết lượt AI Job Helper miễn phí (${FREE_LIMIT}/tháng).`,
      },
      { status: 429 }
    );
  }

  if (!env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "AI tạm chưa khả dụng." }, { status: 503 });
  }

  const json = await request.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const { mode, title, industry, context } = parsed.data;
  const instruction = modeInstructions[mode];

  const formatHints: Record<string, string> = {
    write_jd: `{
  "description": "<đoạn giới thiệu + Trách nhiệm chính dạng bullet>",
  "requirements": "<Yêu cầu dạng bullet>",
  "benefits": "<Quyền lợi dạng bullet>"
}`,
    polish: `{
  "description": "<JD chuyên nghiệp hơn>",
  "requirements": "<Yêu cầu>",
  "benefits": "<Quyền lợi>"
}`,
    extract_skills: `{
  "required": ["skill1", "skill2"],
  "preferred": ["skill3"],
  "bonus": ["skill4"]
}`,
    screening_questions: `{
  "questions": [{"question": "...", "why": "tại sao hỏi câu này"}]
}`,
  };

  const result = await chatJSON<ResultByMode[typeof mode]>({
    apiKey: env.OPENAI_API_KEY,
    maxTokens: 2200,
    messages: [
      {
        role: "system",
        content:
          "Bạn là HR consultant senior tại Việt Nam, chuyên viết JD hấp dẫn và phân tích yêu cầu vị trí. Trả lời tiếng Việt.",
      },
      {
        role: "user",
        content: `Nhiệm vụ: ${instruction}

Vị trí: ${title}
${industry ? `Ngành: ${industry}\n` : ""}${context ? `Context (JD gốc/note):\n${context}\n` : ""}
Trả về JSON đúng format:
${formatHints[mode]}`,
      },
    ],
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
  }

  await supabase.from("ai_usage").upsert(
    { user_id: user.id, tool: TOOL, month, count: usageCount + 1 },
    { onConflict: "user_id,tool,month" }
  );

  return NextResponse.json(result.data);
}
