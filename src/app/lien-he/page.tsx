import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Liên hệ với đội ngũ CareerFlow. Hỗ trợ ứng viên, nhà tuyển dụng và đối tác.",
};

const channels = [
  {
    label: "Hỗ trợ người dùng",
    desc: "Câu hỏi về CV, tài khoản, thanh toán, kỹ thuật.",
    value: "support@careerflow.vn",
    href: "mailto:support@careerflow.vn",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Doanh nghiệp & Tuyển dụng",
    desc: "Hợp tác Pro Employer, gói tuyển dụng số lượng lớn, EVP.",
    value: "sales@careerflow.vn",
    href: "mailto:sales@careerflow.vn",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const info = [
  {
    label: "Giờ hoạt động",
    value: "Thứ 2 – Thứ 6, 9:00 – 18:00 (GMT+7)",
  },
  {
    label: "Văn phòng",
    value: "TP. Hồ Chí Minh, Việt Nam",
  },
  {
    label: "Phản hồi trung bình",
    value: "Trong vòng 24 giờ làm việc",
  },
];

const socials = [
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Zalo OA", href: "#" },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f8f9fb] pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003d9b]/10 text-[#003d9b] text-xs font-semibold uppercase tracking-wider">
              Liên hệ
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-[#191c1e] tracking-tight"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Chúng tôi luôn lắng nghe
            </h1>
            <p className="text-[#434654] text-lg max-w-2xl mx-auto">
              Dù bạn là ứng viên cần hỗ trợ hay nhà tuyển dụng muốn hợp tác,
              đội ngũ CareerFlow sẵn sàng đồng hành.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Sidebar info */}
            <aside className="lg:col-span-2 space-y-6">
              {channels.map((c) => (
                <a
                  key={c.value}
                  href={c.href}
                  className="card-elevated block bg-white rounded-[24px] p-6 border border-slate-100 hover:border-[#003d9b]/30 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#003d9b]/10 text-[#003d9b] flex items-center justify-center shrink-0 group-hover:bg-[#003d9b] group-hover:text-white transition-colors">
                      {c.icon}
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="font-bold text-[#191c1e] mb-1"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {c.label}
                      </h3>
                      <p className="text-sm text-[#434654] mb-2">{c.desc}</p>
                      <p className="text-[#003d9b] font-semibold text-sm break-all">
                        {c.value}
                      </p>
                    </div>
                  </div>
                </a>
              ))}

              <div className="card-elevated bg-white rounded-[24px] p-6 border border-slate-100">
                <h3
                  className="text-sm font-bold text-[#003d9b] uppercase tracking-wider mb-4"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Thông tin liên hệ
                </h3>
                <dl className="space-y-4">
                  {info.map((i) => (
                    <div key={i.label}>
                      <dt className="text-xs font-semibold text-[#434654] uppercase tracking-wide mb-1">
                        {i.label}
                      </dt>
                      <dd className="text-[#191c1e] font-medium">
                        {i.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="card-elevated bg-gradient-to-br from-[#003d9b] to-[#0056d6] rounded-[24px] p-6 text-white">
                <h3
                  className="font-bold mb-2"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Câu hỏi thường gặp
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  Có thể câu trả lời đã có sẵn trong FAQ.
                </p>
                <Link
                  href="/cau-hoi"
                  className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
                >
                  Xem FAQ →
                </Link>
              </div>

              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-[#434654] hover:border-[#003d9b] hover:text-[#003d9b] transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card-elevated bg-white rounded-[24px] p-8 md:p-10 border border-slate-100">
                <h2
                  className="text-2xl md:text-3xl font-bold text-[#191c1e] mb-2"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Gửi tin nhắn cho chúng tôi
                </h2>
                <p className="text-[#434654] mb-8">
                  Điền form bên dưới, chúng tôi sẽ phản hồi trong vòng 24 giờ
                  làm việc.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
