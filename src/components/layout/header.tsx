"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navItems = [
  { href: "/cv/moi", label: "Tạo CV" },
  { href: "/viec-lam", label: "Việc làm" },
  { href: "/ung-vien", label: "Ứng viên" },
  { href: "/cong-cu", label: "Tools" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href.split("/").slice(0, 2).join("/"));

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(11,22,40,0.08),0_8px_24px_rgba(11,22,40,0.04)]">
      <nav className="max-w-7xl mx-auto flex justify-between items-center h-20 px-8">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter text-blue-800 font-[var(--font-headline)]" style={{ fontFamily: "var(--font-headline)" }}>
          YourCV
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold tracking-tight transition-colors",
                isActive(item.href)
                  ? "text-blue-700 font-bold border-b-2 border-blue-700 pb-1"
                  : "text-slate-600 hover:text-blue-600"
              )}
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/dang-nhap"
            className="text-sm font-semibold text-blue-700 px-6 py-2 hover:bg-slate-50 rounded-lg transition-all"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Đăng nhập
          </Link>
          <Link
            href="/dang-ky"
            className="kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Bắt đầu ngay
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <Menu className="h-5 w-5 text-slate-700" />
            <span className="sr-only">Menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-semibold rounded-xl transition-colors",
                    isActive(item.href)
                      ? "text-blue-700 bg-blue-50"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  )}
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t pt-4 flex flex-col gap-2">
                <Link
                  href="/dang-nhap"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")}
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/dang-ky"
                  onClick={() => setOpen(false)}
                  className="kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-xl text-center"
                >
                  Bắt đầu miễn phí
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
