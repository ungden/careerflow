import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = (body?.name || "").toString().trim();
    const email = (body?.email || "").toString().trim();
    const subject = (body?.subject || "").toString().trim();
    const message = (body?.message || "").toString().trim();

    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: "Vui lòng điền đầy đủ họ tên, email, chủ đề và nội dung." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return Response.json(
        { error: "Email không hợp lệ." },
        { status: 400 }
      );
    }

    if (message.length > 5000 || name.length > 200 || subject.length > 200) {
      return Response.json(
        { error: "Nội dung quá dài. Vui lòng rút gọn." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.from("email_queue").insert({
      to_email: "support@yourcv.net",
      subject: `[Liên hệ] ${subject}`.slice(0, 200),
      template: "contact_form",
      payload: {
        name,
        email,
        subject,
        message,
        submitted_at: new Date().toISOString(),
      },
      status: "pending",
    });

    if (error) {
      console.error("Contact insert error:", error);
      return Response.json(
        { error: "Không thể gửi tin nhắn. Vui lòng thử lại sau." },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "Đã nhận được tin nhắn của bạn. Chúng tôi sẽ phản hồi sớm.",
    });
  } catch (err) {
    console.error("Contact error:", err);
    return Response.json(
      { error: "Đã xảy ra lỗi. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
