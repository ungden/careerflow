"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/cong-cu", label: "Tính năng" },
  { href: "/viec-lam", label: "Việc làm" },
  { href: "/nha-tuyen-dung/cong-ty", label: "Cho công ty" },
  { href: "/bang-gia", label: "Bảng giá" },
  { href: "/dang-nhap", label: "Đăng nhập" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-[#1557ff]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Your<span className="text-emerald-500">CV</span>
        </Link>

        <nav className="hidden items-center gap-9 text-sm font-semibold text-slate-600 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-[#1557ff]",
                isActive(item.href) && "text-[#1557ff]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cong-cu/danh-gia-cv"
          className="hidden md:inline-flex h-11 items-center gap-2 rounded-full bg-[#1557ff] px-6 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-[#0e3fd5]"
        >
          Review CV miễn phí
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden p-2 rounded-full hover:bg-slate-100">
            <Menu className="h-5 w-5 text-slate-700" />
            <span className="sr-only">Menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
            <div className="mt-8 flex flex-col gap-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-base font-bold",
                    isActive(item.href)
                      ? "bg-blue-50 text-[#1557ff]"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 border-t border-slate-200 pt-4">
                <Link
                  href="/cong-cu/danh-gia-cv"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-[#1557ff] px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/25"
                >
                  Review CV miễn phí
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
