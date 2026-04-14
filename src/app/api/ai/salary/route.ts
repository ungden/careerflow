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
    const { industry, position, experience, location } = await request.json();

    if (!industry || !position) {
      return Response.json(
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
      return Response.json(
        { error: "Không thể ước tính mức lương. Vui lòng thử lại sau." },
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
      salary_min: result.salary_min,
      salary_median: result.salary_median,
      salary_max: result.salary_max,
      insights: result.insights,
    });
  } catch (error) {
    console.error("Salary estimation error:", error);
    return Response.json(
      { error: "Đã xảy ra lỗi. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
