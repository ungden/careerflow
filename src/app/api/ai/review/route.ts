import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Tính năng AI đang được cấu hình. Vui lòng thử lại sau." },
      { status: 503 }
    );
  }

  try {
    const { cv_data } = await request.json();

    if (!cv_data) {
      return Response.json(
        { error: "Thiếu dữ liệu CV." },
        { status: 400 }
      );
    }

    const systemPrompt =
      "Bạn là chuyên gia tuyển dụng Việt Nam. Hãy đánh giá CV sau và cho điểm 1-100, cùng gợi ý cải thiện cụ thể bằng tiếng Việt.";

    const userPrompt = `Hãy đánh giá CV sau đây và trả về JSON với format:
{
  "score": <number 1-100>,
  "summary": "<tóm tắt đánh giá>",
  "suggestions": ["<gợi ý 1>", "<gợi ý 2>", ...]
}

Dữ liệu CV:
${JSON.stringify(cv_data, null, 2)}`;

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
      return Response.json(
        { error: "Không thể phân tích CV. Vui lòng thử lại sau." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return Response.json(
        { error: "Không nhận được phản hồi từ AI." },
        { status: 502 }
      );
    }

    const result = JSON.parse(content);
    return Response.json({
      score: result.score,
      summary: result.summary,
      suggestions: result.suggestions,
    });
  } catch (error) {
    console.error("CV review error:", error);
    return Response.json(
      { error: "Đã xảy ra lỗi. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
