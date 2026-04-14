import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0b1628] text-slate-300 w-full py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div className="space-y-4">
          <div className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-headline)" }}>
            CareerFlow
          </div>
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} CareerFlow. The Editorial Architect.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 justify-start md:justify-end">
          {[
            { href: "#", label: "Về chúng tôi" },
            { href: "#", label: "Điều khoản" },
            { href: "#", label: "Bảo mật" },
            { href: "#", label: "Liên hệ" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-slate-400 hover:text-white underline decoration-slate-600 underline-offset-4 opacity-80 hover:opacity-100 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
