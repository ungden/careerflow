import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description:
    "Cách YourCV thu thập, sử dụng và bảo vệ dữ liệu cá nhân của người dùng theo tiêu chuẩn quốc tế.",
};

const sections = [
  {
    id: "thu-thap",
    title: "1. Thông tin chúng tôi thu thập",
    body: (
      <>
        <p>
          Để cung cấp Dịch vụ, YourCV thu thập các nhóm thông tin sau:
        </p>
        <ul>
          <li>
            <strong>Thông tin tài khoản:</strong> địa chỉ email, họ tên, mật
            khẩu được mã hoá, vai trò (ứng viên hoặc nhà tuyển dụng).
          </li>
          <li>
            <strong>Dữ liệu CV và hồ sơ:</strong> kinh nghiệm làm việc, học
            vấn, kỹ năng, mục tiêu nghề nghiệp, ảnh đại diện (avatar) và các
            file đính kèm bạn chủ động tải lên.
          </li>
          <li>
            <strong>Dữ liệu sử dụng:</strong> lịch sử ứng tuyển, lượt xem hồ
            sơ, tin nhắn trao đổi, thiết bị, trình duyệt, địa chỉ IP, thời
            gian truy cập.
          </li>
          <li>
            <strong>Cookies và công nghệ tương tự:</strong> để duy trì phiên
            đăng nhập, ghi nhớ tuỳ chọn và đo lường hiệu suất.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "su-dung",
    title: "2. Cách chúng tôi sử dụng thông tin",
    body: (
      <>
        <p>Thông tin của bạn được sử dụng nhằm:</p>
        <ul>
          <li>Cung cấp, vận hành và cải thiện Dịch vụ YourCV.</li>
          <li>
            Cá nhân hoá trải nghiệm: gợi ý việc làm, ứng viên, mẫu CV phù
            hợp.
          </li>
          <li>
            Gửi email giao dịch (xác nhận, thông báo, nhắc lịch phỏng vấn) và
            email marketing nếu bạn đã đồng ý nhận.
          </li>
          <li>Phòng chống gian lận, lạm dụng và các hành vi vi phạm.</li>
          <li>Tuân thủ nghĩa vụ pháp lý theo yêu cầu của cơ quan có thẩm quyền.</li>
        </ul>
      </>
    ),
  },
  {
    id: "chia-se",
    title: "3. Chia sẻ thông tin",
    body: (
      <>
        <p>
          YourCV <strong>không bán</strong> dữ liệu cá nhân của bạn cho
          bên thứ ba. Chúng tôi chỉ chia sẻ thông tin trong các trường hợp:
        </p>
        <ul>
          <li>
            <strong>Với nhà tuyển dụng:</strong> khi bạn chủ động publish CV
            ra marketplace hoặc ứng tuyển vào tin tuyển dụng cụ thể.
          </li>
          <li>
            <strong>Với đối tác kỹ thuật:</strong> nhà cung cấp hosting
            (Supabase), email (Resend), thanh toán (Sepay, Stripe),
            phân tích (Google Analytics) — tất cả đều ký cam kết bảo mật.
          </li>
          <li>
            <strong>Theo yêu cầu pháp luật:</strong> khi có yêu cầu hợp pháp
            từ cơ quan nhà nước có thẩm quyền tại Việt Nam.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "4. Cookies và tracking",
    body: (
      <>
        <p>
          Chúng tôi sử dụng cookies cần thiết (đăng nhập, bảo mật) và cookies
          phân tích (Google Analytics) để hiểu cách người dùng tương tác với
          nền tảng. Bạn có thể tắt cookies trong trình duyệt, nhưng một số
          tính năng có thể hoạt động không đầy đủ.
        </p>
      </>
    ),
  },
  {
    id: "quyen",
    title: "5. Quyền của bạn",
    body: (
      <>
        <p>Theo quy định của Nghị định 13/2023/NĐ-CP, bạn có quyền:</p>
        <ul>
          <li>
            <strong>Truy cập và sao chép</strong> dữ liệu cá nhân đang được
            YourCV lưu trữ.
          </li>
          <li>
            <strong>Chỉnh sửa</strong> thông tin sai lệch hoặc lỗi thời.
          </li>
          <li>
            <strong>Xoá dữ liệu</strong> và đóng tài khoản vĩnh viễn.
          </li>
          <li>
            <strong>Xuất dữ liệu</strong> dưới định dạng JSON hoặc PDF có thể
            đọc được.
          </li>
          <li>
            <strong>Rút lại sự đồng ý</strong> đối với việc xử lý dữ liệu
            cho mục đích marketing.
          </li>
        </ul>
        <p>
          Để thực hiện quyền trên, vui lòng gửi yêu cầu về{" "}
          <a href="mailto:privacy@yourcv.net">privacy@yourcv.net</a>.
          Chúng tôi phản hồi trong vòng 72 giờ làm việc.
        </p>
      </>
    ),
  },
  {
    id: "bao-mat",
    title: "6. Bảo mật dữ liệu",
    body: (
      <>
        <p>
          Dữ liệu của bạn được lưu trữ trên hạ tầng Supabase đặt tại trung
          tâm dữ liệu khu vực châu Á. Mọi kết nối đều mã hoá HTTPS/TLS 1.3.
          Mật khẩu được hash bằng thuật toán bcrypt; dữ liệu nhạy cảm được mã
          hoá at-rest. Truy cập nội bộ áp dụng nguyên tắc least-privilege và
          được audit định kỳ.
        </p>
      </>
    ),
  },
  {
    id: "tre-em",
    title: "7. Trẻ em",
    body: (
      <>
        <p>
          YourCV chỉ dành cho người từ <strong>16 tuổi trở lên</strong>.
          Chúng tôi không cố ý thu thập dữ liệu của trẻ em dưới 16 tuổi. Nếu
          phát hiện, dữ liệu sẽ bị xoá ngay lập tức.
        </p>
      </>
    ),
  },
  {
    id: "thay-doi",
    title: "8. Thay đổi chính sách",
    body: (
      <>
        <p>
          Chính sách này có thể được cập nhật theo thời gian. Mọi thay đổi
          quan trọng sẽ được thông báo qua email và banner trên nền tảng ít
          nhất 7 ngày trước khi có hiệu lực.
        </p>
      </>
    ),
  },
  {
    id: "lien-he",
    title: "9. Liên hệ DPO",
    body: (
      <>
        <p>
          Cán bộ phụ trách bảo vệ dữ liệu (Data Protection Officer) của
          YourCV tiếp nhận mọi khiếu nại, yêu cầu liên quan đến quyền
          riêng tư:
        </p>
        <ul>
          <li>
            Email DPO:{" "}
            <a href="mailto:privacy@yourcv.net">privacy@yourcv.net</a>
          </li>
          <li>
            Văn phòng: TP. Hồ Chí Minh, Việt Nam
          </li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f8f9fb] pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1557ff]/10 text-[#1557ff] text-xs font-semibold uppercase tracking-wider">
              Quyền riêng tư
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-[#191c1e] tracking-tight"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Chính sách bảo mật
            </h1>
            <p className="text-[#434654] text-lg">
              Cập nhật lần cuối: 15 tháng 4, 2026 · Tuân thủ Nghị định
              13/2023/NĐ-CP
            </p>
          </div>

          {/* Mục lục */}
          <nav className="card-elevated bg-white rounded-[24px] p-6 md:p-8 mb-12 border border-slate-100">
            <h2
              className="text-sm font-bold text-[#1557ff] uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Mục lục
            </h2>
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-[#434654]">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="hover:text-[#1557ff] transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Nội dung */}
          <article className="space-y-12">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-32">
                <h2
                  className="text-2xl md:text-3xl font-bold text-[#191c1e] mb-4"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {s.title}
                </h2>
                <div className="prose prose-slate max-w-none text-[#434654] leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_a]:text-[#1557ff] [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-[#191c1e]">
                  {s.body}
                </div>
              </section>
            ))}
          </article>

          {/* CTA */}
          <div className="mt-16 card-elevated bg-white rounded-[24px] p-8 border border-slate-100 text-center">
            <p className="text-[#434654] mb-4">
              Bạn muốn yêu cầu xuất hoặc xoá dữ liệu cá nhân?
            </p>
            <Link
              href="mailto:privacy@yourcv.net"
              className="inline-flex items-center gap-2 bg-[#1557ff] text-white px-6 py-3 rounded-[24px] font-semibold hover:bg-[#002d75] transition-colors"
            >
              Liên hệ DPO
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
