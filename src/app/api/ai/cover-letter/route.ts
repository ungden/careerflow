import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const TOOL = "cover_letter";
const FREE_LIMIT = 3;

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
    const { cv_data, job_description, tone } = await request.json();

    if (!job_description) {
      return NextResponse.json(
        { error: "Vui lòng nhập mô tả công việc." },
        { status: 400 }
      );
    }

    const systemPrompt = `Bạn là chuyên gia viết thư xin việc chuyên nghiệp tại Việt Nam. Hãy viết thư xin việc bằng tiếng Việt với giọng văn ${tone || "chuyên nghiệp"}. Thư phải ngắn gọn, súc tích, thể hiện sự phù hợp của ứng viên với vị trí.`;

    const userPrompt = `Dựa trên thông tin CV và mô tả công việc dưới đây, hãy viết một thư xin việc chuyên nghiệp bằng tiếng Việt.

Trả về JSON với format: { "cover_letter": "<nội dung thư xin việc>" }

${cv_data ? `Thông tin CV:\n${JSON.stringify(cv_data, null, 2)}\n\n` : ""}Mô tả công việc:
${job_description}`;

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
        { error: "Không thể tạo thư xin việc. Vui lòng thử lại sau." },
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

    return NextResponse.json({ cover_letter: result.cover_letter });
  } catch (error) {
    console.error("Cover letter error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
