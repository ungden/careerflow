"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "cookie_consent";

export function AnalyticsLoader({ gaId }: { gaId: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    function check() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return setAllowed(false);
        const parsed = JSON.parse(raw) as { accepted?: boolean };
        setAllowed(Boolean(parsed.accepted));
      } catch {
        setAllowed(false);
      }
    }
    check();
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) check();
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("cookie-consent-changed", check);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cookie-consent-changed", check);
    };
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `}</Script>
    </>
  );
}
