"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export function RemoveSavedJobButton({ savedId }: { savedId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    if (loading) return;
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("id", savedId);

    if (error) {
      toast.error("Không thể bỏ lưu. Vui lòng thử lại.");
      setLoading(false);
      return;
    }

    toast.success("Đã bỏ lưu việc làm");
    router.refresh();
    setLoading(false);
  };

  return (
    <button
      onClick={handleRemove}
      disabled={loading}
      aria-label="Bỏ lưu"
      className="flex items-center justify-center gap-1 text-xs px-5 py-2 rounded-xl border border-[#e5e7eb] text-[#555] hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Bỏ lưu
    </button>
  );
}
