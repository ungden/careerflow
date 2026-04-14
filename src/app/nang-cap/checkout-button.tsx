"use client";

import { useState } from "react";
import { toast } from "sonner";

export function UpgradeCheckoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Không thể bắt đầu thanh toán.");
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Không nhận được link thanh toán.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className="block w-full text-center py-4 px-8 rounded-xl font-bold text-sm bg-white text-[#003d9b] hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      style={{ fontFamily: "var(--font-headline)" }}
    >
      {loading ? "Đang chuyển hướng..." : "Thanh toán với Stripe"}
    </button>
  );
}
