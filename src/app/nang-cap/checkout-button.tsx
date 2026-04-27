"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SepayCheckout } from "@/components/sepay-checkout";

export function UpgradeCheckoutButton() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <div className="rounded-3xl bg-white p-6 text-[#191c1e]">
        <SepayCheckout
          plan="pro_monthly"
          onPaid={() => {
            setTimeout(() => router.refresh(), 1500);
          }}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShow(true)}
      className="block w-full rounded-xl bg-white px-8 py-4 text-center text-sm font-bold text-[#1557ff] transition-all hover:opacity-90"
      style={{ fontFamily: "var(--font-headline)" }}
    >
      Nâng cấp với chuyển khoản (Sepay)
    </button>
  );
}
