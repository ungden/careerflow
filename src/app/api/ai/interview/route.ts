import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const TOOL = "interview";
const FREE_LIMIT = 5;

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier")
    .eq("id", user.id)
    .single();
  const isPro = profile?.subscription_tier === "pro";
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

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI tạm chưa khả dụng. Vui lòng thử lại sau." },
      { status: 503 }
    );
  }

  try {
    const { industry, position, level } = await request.json();

    if (!industry || !position) {
      return NextResponse.json(
        { error: "Vui lòng chọn ngành nghề và vị trí." },
        { status: 400 }
      );
    }

    const systemPrompt =
      "Bạn là chuyên gia phỏng vấn tuyển dụng tại Việt Nam với kinh nghiệm phỏng vấn hàng ngàn ứng viên. Hãy đưa ra các câu hỏi phỏng vấn thực tế và gợi ý cách trả lời hay bằng tiếng Việt.";

    const userPrompt = `Hãy tạo 10 câu hỏi phỏng vấn thực tế cho vị trí sau, kèm gợi ý cách trả lời hay.

Ngành nghề: ${industry}
Vị trí: ${position}
Cấp bậc: ${level || "Không xác định"}

Trả về JSON với format:
{
  "questions": [
    { "question": "<câu hỏi>", "suggested_answer": "<gợi ý trả lời>" },
    ...
  ]
}`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("OpenAI API error:", errorData);
      return NextResponse.json(
        { error: "Không thể tạo câu hỏi phỏng vấn. Vui lòng thử lại sau." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "Không nhận được phản hồi từ AI." },
        { status: 502 }
      );
    }

    const result = JSON.parse(content);

    if (!isPro) {
      await supabase.from("ai_usage").upsert(
        {
          user_id: user.id,
          tool: TOOL,
          month,
          count: usageCount + 1,
        },
        { onConflict: "user_id,tool,month" }
      );
    }

    return NextResponse.json({ questions: result.questions });
  } catch (error) {
    console.error("Interview questions error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
