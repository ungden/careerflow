"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "cookie_consent";

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // SSR / blocked storage
    }
  }, []);

  if (!mounted) return null;

  function notifyConsent() {
    try {
      window.dispatchEvent(new Event("cookie-consent-changed"));
    } catch {}
  }

  function accept() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted: true, at: new Date().toISOString() })
      );
    } catch {}
    notifyConsent();
    setVisible(false);
  }

  function dismiss() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted: false, at: new Date().toISOString() })
      );
    } catch {}
    notifyConsent();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[60]"
      role="dialog"
      aria-label="Thông báo cookies"
    >
      <div className="relative card-elevated bg-white/85 backdrop-blur-xl border border-[#1557ff]/15 rounded-[24px] p-5 md:p-6 shadow-[0_8px_32px_rgba(0,61,155,0.18)]">
        <button
          onClick={dismiss}
          aria-label="Đóng"
          className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 mb-4 pr-6">
          <div className="shrink-0 w-10 h-10 rounded-2xl bg-[#1557ff]/10 text-[#1557ff] flex items-center justify-center text-lg">
            🍪
          </div>
          <div>
            <h3
              className="font-bold text-[#191c1e] mb-1"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Chúng tôi sử dụng cookies
            </h3>
            <p className="text-sm text-[#434654] leading-relaxed">
              Chúng tôi sử dụng cookies để cải thiện trải nghiệm của bạn. Bằng
              việc tiếp tục, bạn đồng ý với{" "}
              <Link
                href="/bao-mat"
                className="text-[#1557ff] underline underline-offset-2 font-medium"
              >
                Chính sách bảo mật
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Link
            href="/bao-mat"
            className="text-center px-4 py-2.5 rounded-[16px] text-sm font-semibold text-[#1557ff] hover:bg-[#1557ff]/5 transition-colors"
          >
            Tìm hiểu thêm
          </Link>
          <button
            onClick={accept}
            className="px-5 py-2.5 rounded-[16px] text-sm font-semibold bg-[#1557ff] text-white hover:bg-[#002d75] transition-colors"
          >
            Chấp nhận
          </button>
        </div>
      </div>
    </div>
  );
}
