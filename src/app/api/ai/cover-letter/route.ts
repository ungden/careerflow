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
    const { cv_data, job_description, tone } = await request.json();

    if (!job_description) {
      return Response.json(
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
      return Response.json(
        { error: "Không thể tạo thư xin việc. Vui lòng thử lại sau." },
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
    return Response.json({ cover_letter: result.cover_letter });
  } catch (error) {
    console.error("Cover letter error:", error);
    return Response.json(
      { error: "Đã xảy ra lỗi. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
