"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Plan = "pro_monthly" | "pro_yearly" | "featured_basic" | "featured_pro";

interface CheckoutSession {
  transaction_id: string;
  ref_code: string;
  amount: number;
  bank_account: string;
  bank_brand: string;
  account_name: string;
  qr_url: string;
  expires_at: string;
  label: string;
}

export function SepayCheckout({
  plan,
  jobId,
  onPaid,
}: {
  plan: Plan;
  jobId?: string;
  onPaid?: () => void;
}) {
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [creating, setCreating] = useState(false);
  const [paid, setPaid] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function create() {
    setCreating(true);
    try {
      const res = await fetch("/api/sepay/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, job_id: jobId }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Không thể tạo giao dịch");
        return;
      }
      setSession(data);
    } catch {
      toast.error("Lỗi kết nối");
    } finally {
      setCreating(false);
    }
  }

  useEffect(() => {
    if (!session || paid) return;
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/sepay/status?id=${encodeURIComponent(session.transaction_id)}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.status === "succeeded") {
          setPaid(true);
          if (pollRef.current) clearInterval(pollRef.current);
          toast.success("Thanh toán thành công!");
          onPaid?.();
        } else if (data.status === "failed") {
          if (pollRef.current) clearInterval(pollRef.current);
          toast.error("Giao dịch thất bại — vui lòng liên hệ hỗ trợ");
        }
      } catch {
        // network blip — keep polling
      }
    }, 3500);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [session, paid, onPaid]);

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text).then(
      () => toast.success(`Đã sao chép ${label}`),
      () => toast.error("Không thể sao chép")
    );
  }

  if (paid) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-emerald-600" aria-hidden />
        <h3 className="text-xl font-bold text-emerald-900">
          Thanh toán thành công!
        </h3>
        <p className="text-emerald-700">
          Cảm ơn bạn đã ủng hộ YourCV. Quyền lợi đã được kích hoạt.
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <button
        type="button"
        onClick={create}
        disabled={creating}
        className="w-full rounded-2xl bg-[#1557ff] px-6 py-3 text-base font-semibold text-white hover:bg-[#002d75] disabled:opacity-60"
      >
        {creating ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Đang tạo
            giao dịch…
          </span>
        ) : (
          "Thanh toán bằng chuyển khoản (Sepay)"
        )}
      </button>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">{session.label}</h3>
        <span className="text-sm text-slate-500">
          Mã giao dịch: <code className="font-mono">{session.ref_code}</code>
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl bg-slate-50 p-4">
          <Image
            src={session.qr_url}
            alt="Mã QR thanh toán Sepay"
            width={280}
            height={280}
            unoptimized
            className="rounded-xl"
          />
        </div>

        <div className="space-y-3 text-sm">
          <Field
            label="Ngân hàng"
            value={session.bank_brand}
            onCopy={() => copy(session.bank_brand, "ngân hàng")}
          />
          <Field
            label="Số tài khoản"
            value={session.bank_account}
            onCopy={() => copy(session.bank_account, "số tài khoản")}
          />
          <Field label="Chủ tài khoản" value={session.account_name} />
          <Field
            label="Số tiền (VND)"
            value={session.amount.toLocaleString("vi-VN")}
            onCopy={() => copy(String(session.amount), "số tiền")}
          />
          <Field
            label="Nội dung CK"
            value={session.ref_code}
            highlight
            onCopy={() => copy(session.ref_code, "nội dung")}
          />

          <p className="rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
            <strong>Quan trọng:</strong> Nhập <em>chính xác</em> nội dung chuyển
            khoản <code className="font-mono">{session.ref_code}</code> để hệ
            thống nhận diện giao dịch.
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Loader2 className="h-3 w-3 animate-spin" aria-hidden />
            Đang chờ giao dịch…
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  highlight,
  onCopy,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  onCopy?: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
        highlight
          ? "border-[#1557ff]/30 bg-[#1557ff]/5"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </div>
        <div
          className={`truncate font-mono text-sm ${
            highlight ? "font-bold text-[#1557ff]" : "text-slate-900"
          }`}
        >
          {value}
        </div>
      </div>
      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Sao chép ${label.toLowerCase()}`}
          className="shrink-0 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <Copy className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  );
}
