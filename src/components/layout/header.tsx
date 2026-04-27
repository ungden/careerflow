"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/viec-lam", label: "Việc làm" },
  { href: "/ung-vien", label: "Ứng viên" },
  { href: "/cong-cu", label: "AI Tools" },
  { href: "/bang-gia", label: "Bảng giá" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-3xl font-black tracking-normal text-[#1557ff]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Your<span className="text-emerald-600">CV</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-bold text-slate-700 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "hover:text-[#1557ff]",
                isActive(item.href) && "text-[#1557ff]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/dang-nhap"
            className="text-sm font-bold text-slate-700 hover:text-[#1557ff]"
          >
            Đăng nhập
          </Link>
          <Link
            href="/cv/moi"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-[#1557ff] px-4 text-sm font-bold text-white shadow-sm shadow-blue-500/25 hover:bg-[#0e3fd5]"
          >
            Tạo CV miễn phí
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden p-2 rounded-lg hover:bg-slate-100">
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
                    "rounded-md px-4 py-3 text-base font-bold",
                    isActive(item.href)
                      ? "bg-blue-50 text-[#1557ff]"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 border-t border-slate-200 pt-4 space-y-2">
                <Link
                  href="/dang-nhap"
                  onClick={() => setOpen(false)}
                  className="block rounded-md border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/cv/moi"
                  onClick={() => setOpen(false)}
                  className="block rounded-md bg-[#1557ff] px-4 py-3 text-center text-sm font-bold text-white shadow-sm shadow-blue-500/25"
                >
                  Tạo CV miễn phí
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
