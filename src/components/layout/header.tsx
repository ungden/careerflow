"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navItems = [
  { href: "/cv/moi", label: "Tạo CV" },
  { href: "/viec-lam", label: "Việc làm" },
  { href: "/ung-vien", label: "Ứng viên" },
  { href: "/cong-ty", label: "Nhà tuyển dụng" },
  { href: "/cong-cu", label: "Công cụ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href.split("/").slice(0, 2).join("/"));

  return (
    <header className="fixed top-0 w-full z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-3xl font-black tracking-normal text-[#1557ff]">
          Your<span className="text-[#20b26b]">CV</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold transition-colors",
                isActive(item.href)
                  ? "text-blue-700 font-bold border-b-2 border-blue-700 pb-1"
                  : "text-slate-600 hover:text-blue-600"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/dang-nhap"
            className="rounded-md px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-[#1557ff]"
          >
            Đăng nhập
          </Link>
          <Link
            href="/cv/moi"
            className="inline-flex h-10 items-center rounded-md bg-[#1557ff] px-4 text-sm font-bold text-white shadow-sm shadow-blue-500/25"
          >
            Tạo CV miễn phí
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="rounded-md p-2 transition-colors hover:bg-slate-50 md:hidden">
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
                    "px-4 py-3 text-base font-semibold rounded-md transition-colors",
                    isActive(item.href)
                      ? "text-blue-700 bg-blue-50"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  )}
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
                  href="/cv/moi"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-[#1557ff] px-6 py-3 text-center text-sm font-bold text-white"
                >
                  Tạo CV miễn phí
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
