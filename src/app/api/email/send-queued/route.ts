import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getResend, FROM_EMAIL } from "@/lib/email/resend";
import { renderTemplate, type EmailTemplateName } from "@/lib/email/templates";

export async function POST(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return Response.json({ error: "Không có quyền" }, { status: 401 });
    }
  }

  const resend = getResend();
  if (!resend) {
    return Response.json(
      { error: "Dịch vụ email đang được cấu hình" },
      { status: 503 }
    );
  }

  const supabase = await createClient();

  const { data: pending, error: fetchError } = await supabase
    .from("email_queue")
    .select("id, to_email, subject, template, payload, html")
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(20);

  if (fetchError) {
    console.error("Không thể lấy hàng đợi email:", fetchError);
    return Response.json(
      { error: "Lỗi truy vấn hàng đợi email" },
      { status: 500 }
    );
  }

  if (!pending || pending.length === 0) {
    return Response.json({ sent: 0, message: "Không có email cần gửi" });
  }

  let sent = 0;
  let failed = 0;

  for (const row of pending) {
    let subject = row.subject as string | null;
    let html = row.html as string | null;

    if ((!subject || !html) && row.template) {
      const rendered = renderTemplate(
        row.template as EmailTemplateName,
        (row.payload as Record<string, unknown>) || {}
      );
      if (rendered) {
        subject = subject || rendered.subject;
        html = html || rendered.html;
      }
    }

    if (!subject || !html || !row.to_email) {
      await supabase
        .from("email_queue")
        .update({
          status: "failed",
          error: "Thiếu nội dung email",
          updated_at: new Date().toISOString(),
        })
        .eq("id", row.id);
      failed++;
      continue;
    }

    try {
      const { error: sendError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: row.to_email as string,
        subject,
        html,
      });

      if (sendError) {
        await supabase
          .from("email_queue")
          .update({
            status: "failed",
            error: sendError.message,
            updated_at: new Date().toISOString(),
          })
          .eq("id", row.id);
        failed++;
      } else {
        await supabase
          .from("email_queue")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", row.id);
        sent++;
      }
    } catch (err) {
      console.error("Lỗi gửi email:", err);
      await supabase
        .from("email_queue")
        .update({
          status: "failed",
          error: err instanceof Error ? err.message : "Unknown error",
          updated_at: new Date().toISOString(),
        })
        .eq("id", row.id);
      failed++;
    }
  }

  return Response.json({ sent, failed, total: pending.length });
}
