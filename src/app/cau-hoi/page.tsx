import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp (FAQ)",
  description:
    "Giải đáp những thắc mắc phổ biến về YourCV: gói dịch vụ, bảo mật, cách publish CV, hoàn tiền và nhiều hơn nữa.",
};

const faqs = [
  {
    q: "YourCV là gì?",
    a: "YourCV là nền tảng kiến tạo sự nghiệp thông minh dành cho người Việt. Chúng tôi cung cấp công cụ tạo CV chuyên nghiệp với nhiều template hiện đại, publish hồ sơ trực tuyến để NTD chủ động tìm thấy bạn, và bộ AI tools hỗ trợ cover letter, mô phỏng phỏng vấn, đàm phán lương.",
  },
  {
    q: "Tôi có thể sử dụng miễn phí được không?",
    a: "Có. Gói Free hoàn toàn miễn phí trọn đời và bao gồm: 1 template CV cơ bản, export PDF (có watermark YourCV), publish profile lên marketplace, và 1 lượt AI review CV. Bạn không cần nhập thẻ tín dụng để bắt đầu.",
  },
  {
    q: "Gói Pro có gì khác biệt so với gói Free?",
    a: "Gói Pro mở khoá toàn bộ thư viện template cao cấp, xoá watermark khi export PDF, sử dụng AI tools không giới hạn (cover letter, interview prep, salary negotiation), ưu tiên hiển thị hồ sơ trên marketplace, và hỗ trợ ưu tiên qua email. Xem chi tiết tại trang Bảng giá.",
  },
  {
    q: "Làm sao để publish CV của tôi?",
    a: 'Sau khi hoàn thiện CV trong editor, vào dashboard và bật toggle "Publish profile". CV sẽ có URL công khai dạng yourcv.net/u/<username> và xuất hiện trong marketplace để NTD tìm thấy. Bạn có thể tắt publish bất cứ lúc nào.',
  },
  {
    q: "Nhà tuyển dụng có phải trả phí không?",
    a: "NTD có thể tạo tài khoản và đăng tin tuyển dụng miễn phí với giới hạn 3 tin/tháng. Để xem hồ sơ ứng viên đầy đủ, gửi tin nhắn trực tiếp và sử dụng bộ lọc nâng cao, NTD cần đăng ký gói Pro Employer. Liên hệ sales@yourcv.net để nhận báo giá doanh nghiệp.",
  },
  {
    q: "Làm sao để liên hệ NTD hoặc ứng viên?",
    a: "Sau khi ứng tuyển hoặc lưu hồ sơ quan tâm, bạn có thể gửi tin nhắn trực tiếp qua hệ thống Messaging tích hợp trong dashboard. Mọi cuộc trò chuyện đều được lưu trữ và mã hoá để đảm bảo an toàn.",
  },
  {
    q: "Dữ liệu CV của tôi có an toàn không?",
    a: "Có. Toàn bộ dữ liệu được lưu trên hạ tầng Supabase với mã hoá HTTPS/TLS 1.3, mật khẩu hash bcrypt, dữ liệu nhạy cảm mã hoá at-rest. YourCV tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân tại Việt Nam.",
  },
  {
    q: "Xuất PDF có watermark không?",
    a: "Tài khoản Free khi export PDF sẽ có dòng watermark mờ 'Made with YourCV' ở chân trang. Tài khoản Pro export PDF hoàn toàn sạch, không watermark, sẵn sàng gửi cho NTD ở bất kỳ định dạng nào.",
  },
  {
    q: "Chính sách hoàn tiền như thế nào?",
    a: "Bạn được hoàn tiền 100% trong vòng 7 ngày kể từ thời điểm thanh toán gói Pro, với điều kiện chưa sử dụng quá 5 lượt AI hoặc chưa export PDF không watermark. Gửi yêu cầu kèm mã giao dịch về support@yourcv.net — tiền sẽ về tài khoản trong 5–7 ngày làm việc.",
  },
  {
    q: "Làm sao để báo cáo nội dung lạm dụng?",
    a: "Trên mỗi hồ sơ ứng viên, tin tuyển dụng hoặc tin nhắn đều có nút 'Báo cáo'. Bạn có thể chọn lý do (spam, gian lận, nội dung không phù hợp...) và gửi kèm mô tả. Đội ngũ moderation sẽ xử lý trong vòng 24 giờ. Trường hợp khẩn cấp, gửi email trực tiếp tới support@yourcv.net.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f8f9fb] pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003d9b]/10 text-[#003d9b] text-xs font-semibold uppercase tracking-wider">
              Hỗ trợ
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-[#191c1e] tracking-tight"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Câu hỏi thường gặp
            </h1>
            <p className="text-[#434654] text-lg">
              10 câu hỏi phổ biến nhất về YourCV.
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="card-elevated group bg-white rounded-[24px] border border-slate-100 overflow-hidden open:shadow-lg transition-shadow"
              >
                <summary className="flex items-start justify-between gap-4 p-6 md:p-7 cursor-pointer list-none">
                  <div className="flex items-start gap-4 min-w-0">
                    <span
                      className="shrink-0 w-8 h-8 rounded-full bg-[#003d9b]/10 text-[#003d9b] flex items-center justify-center text-sm font-bold"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {idx + 1}
                    </span>
                    <h3
                      className="text-base md:text-lg font-bold text-[#191c1e] pt-0.5"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {faq.q}
                    </h3>
                  </div>
                  <svg
                    className="w-6 h-6 text-[#003d9b] shrink-0 mt-0.5 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-6 md:px-7 pb-7 pl-[4.5rem] text-[#434654] leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 card-elevated bg-gradient-to-br from-[#003d9b] to-[#0056d6] rounded-[24px] p-8 md:p-10 text-center text-white">
            <h2
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Vẫn chưa tìm thấy câu trả lời?
            </h2>
            <p className="text-white/85 mb-6 max-w-xl mx-auto">
              Đội ngũ hỗ trợ YourCV sẵn sàng giải đáp mọi thắc mắc trong
              vòng 24 giờ làm việc.
            </p>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 bg-white text-[#003d9b] px-8 py-3 rounded-[24px] font-bold hover:bg-slate-100 transition-colors"
            >
              Liên hệ hỗ trợ
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
