import Link from "next/link";
import { Sparkles } from "lucide-react";

const links = [
  {
    title: "Sản phẩm",
    items: [
      { href: "/cv/moi", label: "Tạo CV" },
      { href: "/cong-cu/danh-gia-cv", label: "AI Đánh giá CV" },
      { href: "/cong-cu/jd-match", label: "AI JD Match" },
      { href: "/cong-cu/thu-xin-viec", label: "AI Thư xin việc" },
      { href: "/bang-gia", label: "Bảng giá" },
    ],
  },
  {
    title: "Cộng đồng",
    items: [
      { href: "/viec-lam", label: "Việc làm" },
      { href: "/ung-vien", label: "Ứng viên" },
      { href: "/cho-cong-ty", label: "Cho công ty" },
      { href: "/cau-hoi", label: "Câu hỏi thường gặp" },
    ],
  },
  {
    title: "Pháp lý",
    items: [
      { href: "/dieu-khoan", label: "Điều khoản" },
      { href: "/bao-mat", label: "Bảo mật" },
      { href: "/lien-he", label: "Liên hệ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <Link
              href="/"
              className="text-3xl font-black tracking-normal text-[#1557ff]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Your<span className="text-emerald-600">CV</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">
              Nền tảng AI cho ứng viên và nhà tuyển dụng Việt — review CV, JD
              match, kết nối job phù hợp.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-black text-[#1557ff]">
              <Sparkles size={14} /> AI CV Review + AI Recruiting
            </div>
          </div>
          {links.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-black uppercase tracking-wider text-slate-900">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2">
                {group.items.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-bold text-slate-600 hover:text-[#1557ff]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} YourCV. Made in Vietnam.</p>
          <p>Hỗ trợ thanh toán nhanh qua chuyển khoản ngân hàng (Sepay).</p>
        </div>
      </div>
    </footer>
  );
}
