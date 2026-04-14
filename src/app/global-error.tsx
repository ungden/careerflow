"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Global error boundary:", error);
  }, [error]);

  return (
    <html lang="vi">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#f8f9fb",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#191c1e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: 480,
            width: "100%",
            background: "#ffffff",
            borderRadius: 32,
            padding: "40px 32px",
            border: "1px solid #eef0f3",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#fee2e2",
              color: "#dc2626",
              margin: "0 auto 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            !
          </div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#191c1e",
            }}
          >
            Hệ thống gặp sự cố nghiêm trọng
          </h1>
          <p style={{ color: "#434654", margin: "0 0 24px", lineHeight: 1.6 }}>
            Rất tiếc, ứng dụng không thể khởi động đúng cách. Vui lòng thử lại
            hoặc quay về trang chủ.
          </p>
          {error.digest && (
            <p
              style={{
                fontSize: 12,
                color: "#9ca3af",
                fontFamily: "monospace",
                marginBottom: 24,
              }}
            >
              Mã lỗi: {error.digest}
            </p>
          )}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => unstable_retry()}
              style={{
                background: "#003d9b",
                color: "#ffffff",
                border: "none",
                padding: "14px 28px",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Thử lại
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                background: "#d4e0f8",
                color: "#003d9b",
                textDecoration: "none",
                padding: "14px 28px",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 14,
                display: "inline-block",
              }}
            >
              Về trang chủ
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
