import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Điều khoản dịch vụ",
  description:
    "Điều khoản và điều kiện sử dụng nền tảng YourCV. Vui lòng đọc kỹ trước khi sử dụng dịch vụ.",
};

const sections = [
  {
    id: "gioi-thieu",
    title: "1. Giới thiệu",
    body: (
      <>
        <p>
          YourCV là nền tảng kiến tạo sự nghiệp thông minh dành cho người
          Việt, cung cấp công cụ tạo CV chuyên nghiệp, publish hồ sơ trực tuyến
          và kết nối ứng viên với nhà tuyển dụng (NTD) hàng đầu.
        </p>
        <p>
          Khi truy cập, đăng ký tài khoản hoặc sử dụng bất kỳ tính năng nào
          của YourCV (sau đây gọi là &ldquo;Dịch vụ&rdquo;), bạn xác nhận
          đã đọc, hiểu và đồng ý với toàn bộ Điều khoản này. Nếu bạn không
          đồng ý, vui lòng ngừng sử dụng Dịch vụ.
        </p>
      </>
    ),
  },
  {
    id: "tai-khoan",
    title: "2. Tài khoản người dùng",
    body: (
      <>
        <p>
          Để sử dụng đầy đủ các tính năng, bạn cần tạo tài khoản với địa chỉ
          email hợp lệ. Bạn có trách nhiệm:
        </p>
        <ul>
          <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật khi đăng ký.</li>
          <li>
            Bảo mật thông tin đăng nhập, mật khẩu và mọi hoạt động phát sinh
            trên tài khoản của mình.
          </li>
          <li>
            Thông báo ngay cho YourCV nếu phát hiện tài khoản bị truy cập
            trái phép qua email{" "}
            <a href="mailto:support@yourcv.net">support@yourcv.net</a>.
          </li>
          <li>
            Không chia sẻ tài khoản, không tạo nhiều tài khoản giả mạo nhằm
            mục đích gian lận.
          </li>
        </ul>
        <p>
          YourCV có quyền tạm khóa hoặc xóa vĩnh viễn tài khoản vi phạm mà
          không cần báo trước.
        </p>
      </>
    ),
  },
  {
    id: "su-dung",
    title: "3. Sử dụng dịch vụ",
    body: (
      <>
        <p>
          Bạn có quyền sử dụng Dịch vụ cho mục đích cá nhân hoặc tuyển dụng
          hợp pháp. Bạn cam kết:
        </p>
        <ul>
          <li>Tuân thủ pháp luật Việt Nam và các quy định hiện hành.</li>
          <li>
            Không sử dụng Dịch vụ để phát tán nội dung gây hại, lừa đảo, hoặc
            xâm phạm quyền của bên thứ ba.
          </li>
          <li>
            Không can thiệp, dò quét hoặc tấn công hệ thống dưới mọi hình
            thức.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "noi-dung",
    title: "4. Nội dung người dùng",
    body: (
      <>
        <p>
          Bạn giữ toàn bộ quyền sở hữu trí tuệ đối với CV, hồ sơ, ảnh đại diện
          và các nội dung mà bạn tải lên (&ldquo;Nội dung người dùng&rdquo;).
          Khi đăng tải, bạn cấp cho YourCV giấy phép không độc quyền,
          miễn phí, có thể chuyển nhượng để lưu trữ, hiển thị và xử lý nội
          dung phục vụ mục đích vận hành Dịch vụ.
        </p>
        <p>
          Bạn cam kết Nội dung người dùng không vi phạm bản quyền, không chứa
          thông tin sai lệch hoặc gây thiệt hại cho bên thứ ba. YourCV có
          quyền gỡ bỏ nội dung vi phạm mà không cần báo trước.
        </p>
      </>
    ),
  },
  {
    id: "thanh-toan",
    title: "5. Thanh toán và hoàn tiền",
    body: (
      <>
        <p>YourCV cung cấp hai gói dịch vụ:</p>
        <ul>
          <li>
            <strong>Gói Free:</strong> Miễn phí trọn đời với 1 template cơ
            bản, export PDF có watermark, publish profile và 1 lượt AI review.
          </li>
          <li>
            <strong>Gói Pro:</strong> Trả phí theo tháng/năm, mở khóa toàn bộ
            templates, xóa watermark, AI không giới hạn và ưu tiên hiển thị.
          </li>
        </ul>
        <p>
          <strong>Chính sách hoàn tiền:</strong> Bạn được hoàn tiền 100% trong
          vòng 7 ngày kể từ thời điểm thanh toán nếu chưa sử dụng quá 5 lượt
          AI hoặc chưa export bản PDF không watermark. Yêu cầu hoàn tiền gửi
          về <a href="mailto:support@yourcv.net">support@yourcv.net</a>{" "}
          kèm mã giao dịch.
        </p>
      </>
    ),
  },
  {
    id: "quy-dinh-cam",
    title: "6. Quy định cấm",
    body: (
      <>
        <p>Người dùng tuyệt đối không được:</p>
        <ul>
          <li>Spam tin nhắn, gửi email hàng loạt cho NTD/ứng viên.</li>
          <li>
            Gian lận thông tin trong CV (bằng cấp giả, kinh nghiệm bịa đặt).
          </li>
          <li>
            Đăng tải nội dung khiêu dâm, bạo lực, kỳ thị, vi phạm thuần phong
            mỹ tục Việt Nam.
          </li>
          <li>
            Sử dụng bot, scraper hoặc công cụ tự động để khai thác dữ liệu
            ứng viên.
          </li>
          <li>
            Mạo danh tổ chức, cá nhân khác để đăng tin tuyển dụng hoặc ứng
            tuyển.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "trach-nhiem",
    title: "7. Giới hạn trách nhiệm",
    body: (
      <>
        <p>
          YourCV cung cấp Dịch vụ trên nguyên tắc &ldquo;hiện trạng&rdquo;
          (as-is). Trong phạm vi pháp luật cho phép, YourCV không chịu
          trách nhiệm với:
        </p>
        <ul>
          <li>
            Thiệt hại gián tiếp, ngẫu nhiên hoặc hệ quả phát sinh từ việc sử
            dụng/không sử dụng được Dịch vụ.
          </li>
          <li>
            Quyết định tuyển dụng, ký hợp đồng giữa ứng viên và NTD — đây là
            thoả thuận giữa các bên.
          </li>
          <li>
            Nội dung do người dùng đăng tải hoặc bên thứ ba liên kết với nền
            tảng.
          </li>
        </ul>
        <p>
          Tổng mức bồi thường (nếu có) không vượt quá tổng số tiền bạn đã
          thanh toán cho YourCV trong 12 tháng gần nhất.
        </p>
      </>
    ),
  },
  {
    id: "thay-doi",
    title: "8. Thay đổi điều khoản",
    body: (
      <>
        <p>
          YourCV có quyền điều chỉnh Điều khoản bất kỳ lúc nào. Phiên bản
          cập nhật sẽ được công bố tại trang này kèm thời điểm hiệu lực. Việc
          tiếp tục sử dụng Dịch vụ sau ngày hiệu lực được xem như bạn chấp
          thuận các thay đổi.
        </p>
      </>
    ),
  },
  {
    id: "luat-ap-dung",
    title: "9. Luật áp dụng",
    body: (
      <>
        <p>
          Điều khoản này được điều chỉnh và giải thích theo pháp luật nước
          Cộng hoà Xã hội Chủ nghĩa Việt Nam. Mọi tranh chấp phát sinh sẽ
          được ưu tiên giải quyết bằng thương lượng. Trường hợp không đạt
          thoả thuận, vụ việc sẽ được đưa ra Toà án có thẩm quyền tại TP. Hồ
          Chí Minh.
        </p>
      </>
    ),
  },
  {
    id: "lien-he",
    title: "10. Liên hệ",
    body: (
      <>
        <p>
          Mọi câu hỏi liên quan đến Điều khoản này, vui lòng liên hệ:
        </p>
        <ul>
          <li>
            Email hỗ trợ:{" "}
            <a href="mailto:support@yourcv.net">support@yourcv.net</a>
          </li>
          <li>
            Trang liên hệ:{" "}
            <Link href="/lien-he">yourcv.net/lien-he</Link>
          </li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f8f9fb] pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003d9b]/10 text-[#003d9b] text-xs font-semibold uppercase tracking-wider">
              Pháp lý
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-[#191c1e] tracking-tight"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Điều khoản dịch vụ
            </h1>
            <p className="text-[#434654] text-lg">
              Cập nhật lần cuối: 15 tháng 4, 2026
            </p>
          </div>

          {/* Mục lục */}
          <nav className="card-elevated bg-white rounded-[24px] p-6 md:p-8 mb-12 border border-slate-100">
            <h2
              className="text-sm font-bold text-[#003d9b] uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Mục lục
            </h2>
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-[#434654]">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="hover:text-[#003d9b] transition-colors"
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
                <div className="prose prose-slate max-w-none text-[#434654] leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_a]:text-[#003d9b] [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-[#191c1e]">
                  {s.body}
                </div>
              </section>
            ))}
          </article>

          {/* CTA */}
          <div className="mt-16 card-elevated bg-white rounded-[24px] p-8 border border-slate-100 text-center">
            <p className="text-[#434654] mb-4">
              Còn thắc mắc về điều khoản? Đội ngũ YourCV luôn sẵn sàng hỗ
              trợ.
            </p>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 bg-[#003d9b] text-white px-6 py-3 rounded-[24px] font-semibold hover:bg-[#002d75] transition-colors"
            >
              Liên hệ với chúng tôi
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
