"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Props {
  jobId: string;
  cvId: string;
  alreadyApplied?: boolean;
  className?: string;
}

export function OneClickApplyButton({ jobId, cvId, alreadyApplied, className }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(Boolean(alreadyApplied));

  if (applied) {
    return (
      <span
        className={
          className ||
          "inline-flex items-center justify-center rounded-2xl bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-700"
        }
        style={{ fontFamily: "var(--font-headline)" }}
      >
        ✓ Đã ứng tuyển
      </span>
    );
  }

  async function handleApply(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Vui lòng đăng nhập để ứng tuyển.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("applications").insert({
      job_id: jobId,
      candidate_id: user.id,
      cv_id: cvId,
    });

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast.info("Bạn đã ứng tuyển vị trí này rồi.");
        setApplied(true);
        return;
      }
      toast.error("Gửi ứng tuyển thất bại. Vui lòng thử lại.");
      return;
    }

    toast.success("Ứng tuyển thành công! Nhà tuyển dụng sẽ liên hệ bạn sớm.");
    setApplied(true);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleApply}
      disabled={loading}
      className={
        className ||
        "kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-60"
      }
      style={{ fontFamily: "var(--font-headline)" }}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Đang gửi…
        </span>
      ) : (
        "Ứng tuyển 1-click"
      )}
    </button>
  );
}
