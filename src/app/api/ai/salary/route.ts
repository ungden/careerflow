import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const TOOL = "salary";
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
    const { industry, position, experience, location } = await request.json();

    if (!industry || !position) {
      return NextResponse.json(
        { error: "Vui lòng chọn ngành nghề và vị trí." },
        { status: 400 }
      );
    }

    const systemPrompt =
      "Bạn là chuyên gia thị trường lao động Việt Nam. Hãy ước tính mức lương dựa trên dữ liệu thực tế của thị trường Việt Nam. Trả lời bằng tiếng Việt. Đơn vị lương là triệu VND/tháng.";

    const userPrompt = `Hãy ước tính mức lương cho vị trí sau trên thị trường lao động Việt Nam.

Ngành nghề: ${industry}
Vị trí: ${position}
Kinh nghiệm: ${experience || "Không xác định"}
Khu vực: ${location || "TP. Hồ Chí Minh"}

Trả về JSON với format:
{
  "salary_min": <number triệu VND>,
  "salary_median": <number triệu VND>,
  "salary_max": <number triệu VND>,
  "insights": "<phân tích chi tiết về mức lương, xu hướng và yếu tố ảnh hưởng>"
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
        { error: "Không thể ước tính mức lương. Vui lòng thử lại sau." },
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

    return NextResponse.json({
      salary_min: result.salary_min,
      salary_median: result.salary_median,
      salary_max: result.salary_max,
      insights: result.insights,
    });
  } catch (error) {
    console.error("Salary estimation error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
