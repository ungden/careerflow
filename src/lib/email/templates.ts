export interface EmailContent {
  subject: string;
  html: string;
}

const BRAND_COLOR = "#1557ff";

function wrap(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f8f9fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#191c1e;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fb;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding:32px 40px;background:${BRAND_COLOR};color:#ffffff;">
              <div style="font-size:20px;font-weight:800;letter-spacing:-0.5px;">YourCV</div>
              <div style="font-size:13px;color:#d4e0f8;margin-top:4px;">Kiến tạo sự nghiệp tương lai</div>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;font-size:15px;line-height:1.6;color:#434654;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;background:#f8f9fb;border-top:1px solid #eef0f3;font-size:12px;color:#6b7280;text-align:center;">
              © ${new Date().getFullYear()} YourCV. Nền tảng tuyển dụng & tạo CV thông minh cho người Việt.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escape(text: string): string {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function welcome(name: string): EmailContent {
  const safeName = escape(name || "bạn");
  return {
    subject: "Chào mừng bạn đến với YourCV!",
    html: wrap(
      "Chào mừng đến với YourCV",
      `<h1 style="font-size:22px;font-weight:800;color:#191c1e;margin:0 0 16px;">Xin chào ${safeName}!</h1>
       <p>Cảm ơn bạn đã đăng ký YourCV. Chúng tôi rất vui được đồng hành cùng bạn trên hành trình kiến tạo sự nghiệp.</p>
       <p>Hãy bắt đầu bằng việc tạo CV chuyên nghiệp đầu tiên của bạn:</p>
       <p style="margin:24px 0;"><a href="${process.env.NEXT_PUBLIC_APP_URL || "https://yourcv.net"}/dashboard" style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:700;font-size:14px;">Vào dashboard</a></p>
       <p style="margin-top:24px;color:#6b7280;font-size:13px;">Nếu cần hỗ trợ, hãy trả lời email này — chúng tôi luôn sẵn sàng giúp bạn.</p>`
    ),
  };
}

export function application_received(
  jobTitle: string,
  candidateName: string
): EmailContent {
  const safeJob = escape(jobTitle);
  const safeName = escape(candidateName);
  return {
    subject: `Có ứng viên mới ứng tuyển vị trí ${jobTitle}`,
    html: wrap(
      "Ứng viên mới",
      `<h1 style="font-size:22px;font-weight:800;color:#191c1e;margin:0 0 16px;">Bạn có ứng viên mới!</h1>
       <p><strong>${safeName}</strong> vừa ứng tuyển vào vị trí <strong>${safeJob}</strong> của bạn.</p>
       <p>Hãy đăng nhập để xem chi tiết hồ sơ và phản hồi ứng viên sớm nhất có thể.</p>
       <p style="margin:24px 0;"><a href="${process.env.NEXT_PUBLIC_APP_URL || "https://yourcv.net"}/nha-tuyen-dung/ung-vien" style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:700;font-size:14px;">Xem ứng viên</a></p>`
    ),
  };
}

export function application_confirmation(
  jobTitle: string,
  companyName: string
): EmailContent {
  const safeJob = escape(jobTitle);
  const safeCompany = escape(companyName);
  return {
    subject: `Đã gửi đơn ứng tuyển: ${jobTitle}`,
    html: wrap(
      "Xác nhận ứng tuyển",
      `<h1 style="font-size:22px;font-weight:800;color:#191c1e;margin:0 0 16px;">Đơn ứng tuyển đã được gửi</h1>
       <p>Bạn đã ứng tuyển thành công vị trí <strong>${safeJob}</strong> tại <strong>${safeCompany}</strong>.</p>
       <p>Nhà tuyển dụng sẽ xem xét hồ sơ và liên hệ với bạn nếu phù hợp. Trong thời gian chờ đợi, bạn có thể tiếp tục khám phá các cơ hội khác trên YourCV.</p>
       <p style="margin:24px 0;"><a href="${process.env.NEXT_PUBLIC_APP_URL || "https://yourcv.net"}/viec-lam" style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:700;font-size:14px;">Khám phá việc làm</a></p>`
    ),
  };
}

export function new_message(senderName: string): EmailContent {
  const safeSender = escape(senderName);
  return {
    subject: `Tin nhắn mới từ ${senderName}`,
    html: wrap(
      "Tin nhắn mới",
      `<h1 style="font-size:22px;font-weight:800;color:#191c1e;margin:0 0 16px;">Bạn có tin nhắn mới</h1>
       <p><strong>${safeSender}</strong> vừa gửi cho bạn một tin nhắn trên YourCV.</p>
       <p style="margin:24px 0;"><a href="${process.env.NEXT_PUBLIC_APP_URL || "https://yourcv.net"}/tin-nhan" style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:700;font-size:14px;">Đọc tin nhắn</a></p>`
    ),
  };
}

export function subscription_activated(
  name: string,
  expiresAt: string | null
): EmailContent {
  const safeName = escape(name || "bạn");
  const expiresFormatted = formatDate(expiresAt);
  return {
    subject: "Chào mừng đến với YourCV Pro!",
    html: wrap(
      "YourCV Pro đã kích hoạt",
      `<h1 style="font-size:22px;font-weight:800;color:#191c1e;margin:0 0 16px;">Cảm ơn ${safeName}!</h1>
       <p>Tài khoản của bạn đã được nâng cấp lên <strong>YourCV Pro</strong>. Tất cả tính năng cao cấp đã sẵn sàng:</p>
       <ul style="padding-left:20px;color:#434654;">
         <li>Tất cả templates cao cấp</li>
         <li>Export PDF không watermark</li>
         <li>AI không giới hạn</li>
         <li>Ưu tiên hiển thị với nhà tuyển dụng</li>
       </ul>
       ${expiresFormatted ? `<p style="margin-top:16px;color:#6b7280;font-size:13px;">Gói Pro của bạn có hiệu lực đến <strong>${expiresFormatted}</strong>.</p>` : ""}
       <p style="margin:24px 0;"><a href="${process.env.NEXT_PUBLIC_APP_URL || "https://yourcv.net"}/dashboard" style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:700;font-size:14px;">Khám phá Pro ngay</a></p>`
    ),
  };
}

export function contact_form(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): EmailContent {
  const safeName = escape(payload.name);
  const safeEmail = escape(payload.email);
  const safeSubject = escape(payload.subject);
  const safeMessage = escape(payload.message).replace(/\n/g, "<br />");
  return {
    subject: `[Liên hệ] ${payload.subject}`.slice(0, 200),
    html: wrap(
      "Liên hệ mới từ YourCV",
      `<h1 style="font-size:20px;font-weight:800;margin:0 0 16px;">Tin nhắn liên hệ mới</h1>
       <p><strong>Họ tên:</strong> ${safeName}</p>
       <p><strong>Email:</strong> ${safeEmail}</p>
       <p><strong>Chủ đề:</strong> ${safeSubject}</p>
       <hr style="border:none;border-top:1px solid #eef0f3;margin:20px 0;" />
       <p>${safeMessage}</p>`
    ),
  };
}

export type EmailTemplateName =
  | "welcome"
  | "application_received"
  | "application_confirmation"
  | "new_message"
  | "subscription_activated"
  | "contact_form";

export function renderTemplate(
  name: EmailTemplateName,
  payload: Record<string, unknown>
): EmailContent | null {
  switch (name) {
    case "welcome":
      return welcome(String(payload.name ?? ""));
    case "application_received":
      return application_received(
        String(payload.job_title ?? payload.jobTitle ?? ""),
        String(payload.candidate_name ?? payload.candidateName ?? "")
      );
    case "application_confirmation":
      return application_confirmation(
        String(payload.job_title ?? payload.jobTitle ?? ""),
        String(payload.company_name ?? payload.companyName ?? "")
      );
    case "new_message":
      return new_message(
        String(payload.sender_name ?? payload.senderName ?? "")
      );
    case "subscription_activated":
      return subscription_activated(
        String(payload.name ?? ""),
        (payload.expires_at as string | null) ??
          (payload.expiresAt as string | null) ??
          null
      );
    case "contact_form":
      return contact_form({
        name: String(payload.name ?? ""),
        email: String(payload.email ?? ""),
        subject: String(payload.subject ?? ""),
        message: String(payload.message ?? ""),
      });
    default:
      return null;
  }
}
