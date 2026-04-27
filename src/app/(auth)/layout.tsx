import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Tài khoản",
  description: "Đăng nhập hoặc đăng ký tài khoản YourCV",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8fbff] text-[#07122f]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-3xl font-black tracking-normal text-[#1557ff]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Your<span className="text-emerald-600">CV</span>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-bold text-[#1557ff]">
            <Sparkles size={12} /> AI CV Review + AI Recruiting
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
