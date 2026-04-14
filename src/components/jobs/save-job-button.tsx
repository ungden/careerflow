"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface SaveJobButtonProps {
  jobId: string;
}

export function SaveJobButton({ jobId }: SaveJobButtonProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setChecking(false);
        return;
      }

      const { data } = await supabase
        .from("saved_jobs")
        .select("id")
        .eq("user_id", user.id)
        .eq("job_id", jobId)
        .maybeSingle();

      setSaved(Boolean(data));
      setChecking(false);
    };

    check();
  }, [jobId]);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Vui lòng đăng nhập để lưu việc làm");
      router.push(`/dang-nhap?redirect=${encodeURIComponent(window.location.pathname)}`);
      setLoading(false);
      return;
    }

    if (saved) {
      const { error } = await supabase
        .from("saved_jobs")
        .delete()
        .eq("user_id", user.id)
        .eq("job_id", jobId);

      if (error) {
        toast.error("Không thể bỏ lưu. Vui lòng thử lại.");
      } else {
        setSaved(false);
        toast.success("Đã bỏ lưu việc làm");
      }
    } else {
      const { error } = await supabase
        .from("saved_jobs")
        .insert({ user_id: user.id, job_id: jobId });

      if (error) {
        if (error.code === "23505") {
          setSaved(true);
          toast.info("Việc làm đã được lưu trước đó");
        } else {
          toast.error("Không thể lưu việc làm. Vui lòng thử lại.");
        }
      } else {
        setSaved(true);
        toast.success("Đã lưu việc làm vào danh sách của bạn");
      }
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading || checking}
      aria-label={saved ? "Bỏ lưu việc làm" : "Lưu việc làm"}
      aria-pressed={saved}
      className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-full border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
        saved
          ? "bg-[#003d9b] text-white border-[#003d9b] hover:opacity-90"
          : "bg-white text-[#003d9b] border-[#003d9b]/20 hover:border-[#003d9b] hover:bg-[#e8f0fe]"
      }`}
      style={{ fontFamily: "var(--font-headline)" }}
    >
      <Bookmark
        className="h-4 w-4"
        fill={saved ? "currentColor" : "none"}
        strokeWidth={2}
      />
      {saved ? "Đã lưu" : "Lưu việc làm"}
    </button>
  );
}
