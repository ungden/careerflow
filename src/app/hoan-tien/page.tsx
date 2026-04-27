import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Chính sách hoàn tiền",
  description:
    "Chính sách hoàn tiền cho gói Pro và dịch vụ tin tuyển dụng nổi bật trên YourCV. Cam kết minh bạch, xử lý nhanh chóng theo luật bảo vệ người tiêu dùng Việt Nam.",
};

const sections = [
  {
    id: "pham-vi",
    title: "1. Phạm vi áp dụng",
    body: (
      <>
        <p>
          Chính sách này áp dụng cho mọi giao dịch trả phí thực hiện trên
          YourCV (yourcv.net), bao gồm:
        </p>
        <ul>
          <li>
            <strong>Gói Pro</strong> dành cho ứng viên (review CV không
            giới hạn, JD match, rewrite studio, công cụ AI nâng cao).
          </li>
          <li>
            <strong>Tin tuyển dụng nổi bật (Featured Job)</strong> dành
            cho nhà tuyển dụng — đẩy tin lên top, tô màu nổi bật, kèm
            badge &ldquo;HOT&rdquo;.
          </li>
          <li>
            <strong>Các gói dịch vụ HR</strong> khác (AI shortlist, gói
            đa tin) khi được mở bán.
          </li>
        </ul>
        <p>
          Mọi thanh toán thực hiện qua Sepay (chuyển khoản ngân hàng nội
          địa) hoặc Stripe (thẻ quốc tế khi được kích hoạt) đều tuân theo
          chính sách này.
        </p>
      </>
    ),
  },
  {
    id: "thoi-han",
    title: "2. Thời hạn yêu cầu hoàn tiền",
    body: (
      <>
        <p>
          Bạn có thể gửi yêu cầu hoàn tiền trong <strong>7 ngày</strong>{" "}
          kể từ thời điểm thanh toán thành công, miễn là điều kiện ở
          mục 3 được đáp ứng. Sau thời hạn này, YourCV không xử lý hoàn
          tiền trừ trường hợp bất khả kháng (lỗi hệ thống nghiêm trọng từ
          phía YourCV).
        </p>
        <p>
          Riêng <strong>gói Pro tháng đầu</strong>, nếu bạn đã sử dụng
          quá 30% quota AI trong tháng (review/rewrite/JD match), yêu
          cầu hoàn tiền sẽ chỉ được xét hoàn một phần (pro-rata).
        </p>
      </>
    ),
  },
  {
    id: "dieu-kien",
    title: "3. Điều kiện hoàn tiền 100%",
    body: (
      <>
        <p>YourCV sẽ hoàn tiền đầy đủ trong các trường hợp sau:</p>
        <ul>
          <li>
            Thanh toán bị tính trùng (double charge) do lỗi cổng thanh
            toán hoặc người dùng thao tác sai.
          </li>
          <li>
            Hệ thống không kích hoạt gói Pro / tin nổi bật sau khi giao
            dịch đã ghi nhận thành công và đội kỹ thuật không khắc phục
            được trong 24 giờ.
          </li>
          <li>
            Tin tuyển dụng nổi bật bị xoá bởi YourCV vì lý do vi phạm
            chính sách <em>không thuộc về lỗi của bạn</em> (ví dụ: lỗi
            phân loại tự động).
          </li>
          <li>
            Bạn chưa sử dụng bất kỳ tính năng AI tính phí nào và yêu cầu
            huỷ trong 24 giờ đầu sau khi mua.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "khong-hoan",
    title: "4. Trường hợp KHÔNG được hoàn tiền",
    body: (
      <>
        <p>YourCV không hoàn tiền trong các trường hợp:</p>
        <ul>
          <li>
            Tài khoản bị khoá do vi phạm{" "}
            <Link href="/dieu-khoan">Điều khoản dịch vụ</Link> (đăng tin
            sai sự thật, spam, lừa đảo, nội dung phản cảm).
          </li>
          <li>
            Bạn đã sử dụng phần lớn quota AI hoặc thời lượng gói (&gt;50%)
            trước khi yêu cầu hoàn tiền.
          </li>
          <li>
            Tin tuyển dụng nổi bật đã hiển thị trên trang chủ &gt;3
            ngày.
          </li>
          <li>
            Bạn đổi ý sau thời hạn 7 ngày, không có lỗi nào từ phía
            YourCV.
          </li>
          <li>
            Bạn không cung cấp đủ thông tin xác minh (email tài khoản,
            mã giao dịch Sepay, ảnh chụp uỷ nhiệm chi).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "quy-trinh",
    title: "5. Quy trình yêu cầu hoàn tiền",
    body: (
      <>
        <p>
          Để gửi yêu cầu, vui lòng làm theo các bước sau:
        </p>
        <ul>
          <li>
            <strong>Bước 1.</strong> Gửi email đến{" "}
            <a href="mailto:support@yourcv.net">support@yourcv.net</a>{" "}
            với tiêu đề{" "}
            <strong>&ldquo;[HOÀN TIỀN] &lt;mã giao dịch&gt;&rdquo;</strong>.
          </li>
          <li>
            <strong>Bước 2.</strong> Cung cấp: email tài khoản, mã giao
            dịch (CFxxxxxxxxxx) hoặc mã Sepay, lý do yêu cầu, ảnh chụp
            uỷ nhiệm chi (nếu có).
          </li>
          <li>
            <strong>Bước 3.</strong> YourCV phản hồi xác nhận tiếp nhận
            trong vòng <strong>24 giờ làm việc</strong>.
          </li>
          <li>
            <strong>Bước 4.</strong> Sau khi xác minh hợp lệ, YourCV sẽ
            chuyển khoản hoàn tiền về đúng số tài khoản đã thanh toán
            (đối với Sepay) hoặc hoàn về thẻ gốc (đối với Stripe) trong{" "}
            <strong>5–7 ngày làm việc</strong>.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "phi",
    title: "6. Phí xử lý",
    body: (
      <>
        <p>
          YourCV <strong>không thu phí xử lý</strong> đối với mọi yêu
          cầu hoàn tiền hợp lệ. Tuy nhiên, phí giao dịch ngân hàng
          (nếu có, thường &lt;11.000đ với chuyển khoản nội địa) sẽ được
          khấu trừ vào số tiền hoàn.
        </p>
        <p>
          Đối với hoàn tiền qua Stripe quốc tế, phí thẻ và chênh lệch
          tỷ giá có thể phát sinh tuỳ ngân hàng phát hành — phần này
          nằm ngoài tầm kiểm soát của YourCV.
        </p>
      </>
    ),
  },
  {
    id: "tranh-chap",
    title: "7. Giải quyết tranh chấp",
    body: (
      <>
        <p>
          Trường hợp không đồng ý với quyết định của YourCV, bạn có
          quyền:
        </p>
        <ul>
          <li>
            Yêu cầu xem xét lại bằng văn bản gửi đến{" "}
            <a href="mailto:legal@yourcv.net">legal@yourcv.net</a>{" "}
            trong 30 ngày kể từ ngày nhận quyết định.
          </li>
          <li>
            Nếu vẫn chưa thoả đáng, hai bên ưu tiên thương lượng theo
            thiện chí.
          </li>
          <li>
            Trường hợp không thương lượng được, tranh chấp sẽ được
            giải quyết tại Toà án Nhân dân có thẩm quyền tại Thành
            phố Hồ Chí Minh, Việt Nam.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "lien-he",
    title: "8. Liên hệ",
    body: (
      <>
        <p>Mọi câu hỏi về chính sách hoàn tiền, vui lòng liên hệ:</p>
        <ul>
          <li>
            Email hỗ trợ:{" "}
            <a href="mailto:support@yourcv.net">support@yourcv.net</a>
          </li>
          <li>
            Email pháp lý:{" "}
            <a href="mailto:legal@yourcv.net">legal@yourcv.net</a>
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

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f8f9fb] pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1557ff]/10 text-[#1557ff] text-xs font-semibold uppercase tracking-wider">
              Pháp lý
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-[#191c1e] tracking-tight"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Chính sách hoàn tiền
            </h1>
            <p className="text-[#434654] text-lg">
              Cập nhật lần cuối: 27 tháng 4, 2026
            </p>
          </div>

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

          <div className="mt-16 card-elevated bg-white rounded-[24px] p-8 border border-slate-100 text-center">
            <p className="text-[#434654] mb-4">
              Cần hỗ trợ thêm? Đội ngũ YourCV xử lý yêu cầu hoàn tiền
              trong 24h làm việc.
            </p>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 bg-[#1557ff] text-white px-6 py-3 rounded-[24px] font-semibold hover:bg-[#002d75] transition-colors"
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
