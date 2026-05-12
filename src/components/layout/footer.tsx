import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white px-4 py-10 text-slate-500 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="text-2xl font-black text-[#1557ff]">
            Your<span className="text-[#20b26b]">CV</span>
          </div>
          <p className="text-sm font-medium text-slate-500">
            &copy; {new Date().getFullYear()} YourCV. Tạo CV chuyên nghiệp cho người Việt.
          </p>
        </div>
        <div className="flex flex-wrap justify-start gap-6 md:justify-end">
          {[
            { href: "/lien-he", label: "Về chúng tôi" },
            { href: "/dieu-khoan", label: "Điều khoản" },
            { href: "/bao-mat", label: "Bảo mật" },
            { href: "/cau-hoi", label: "FAQ" },
            { href: "/lien-he", label: "Liên hệ" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-bold text-slate-500 transition hover:text-[#1557ff]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
