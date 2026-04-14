"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("App error boundary:", error);
  }, [error]);

  return (
    <main className="flex-1 flex items-center justify-center bg-[#f8f9fb] px-6 py-20">
      <div className="max-w-lg w-full bg-white rounded-[40px] p-10 md:p-12 shadow-sm border border-slate-100 text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>
        </div>

        <h1
          className="text-2xl md:text-3xl font-extrabold text-[#191c1e] mb-3"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Đã có lỗi xảy ra
        </h1>
        <p className="text-[#434654] mb-8">
          Rất tiếc, hệ thống đang gặp sự cố. Bạn có thể thử lại hoặc quay về
          trang chủ. Đội ngũ CareerFlow đã được thông báo về vấn đề này.
        </p>

        {error.digest && (
          <p className="text-xs text-[#9ca3af] mb-6 font-mono">
            Mã lỗi: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="block text-center py-4 px-8 rounded-xl font-bold text-sm text-white bg-[#003d9b] hover:opacity-90 transition-all"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Thử lại
          </button>
          <Link
            href="/"
            className="block text-center py-4 px-8 rounded-xl font-bold text-sm text-[#003d9b] bg-[#d4e0f8] hover:opacity-90 transition-all"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}
