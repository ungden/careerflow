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
    const { industry, position, level } = await request.json();

    if (!industry || !position) {
      return Response.json(
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
      return Response.json(
        { error: "Không thể tạo câu hỏi phỏng vấn. Vui lòng thử lại sau." },
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
    return Response.json({ questions: result.questions });
  } catch (error) {
    console.error("Interview questions error:", error);
    return Response.json(
      { error: "Đã xảy ra lỗi. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
