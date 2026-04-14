"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

interface JobActiveToggleProps {
  jobId: string;
  initialActive: boolean;
}

export function JobActiveToggle({ jobId, initialActive }: JobActiveToggleProps) {
  const [active, setActive] = useState(initialActive);
  const [, startTransition] = useTransition();

  const handleToggle = (next: boolean) => {
    const prev = active;
    setActive(next);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase
        .from("jobs")
        .update({ is_active: next })
        .eq("id", jobId);
      if (error) {
        toast.error("Cập nhật thất bại", { description: error.message });
        setActive(prev);
        return;
      }
      toast.success(next ? "Tin đã kích hoạt" : "Tin đã tạm dừng");
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Switch checked={active} onCheckedChange={handleToggle} />
      <span
        className={`text-xs font-bold ${
          active ? "text-green-600" : "text-slate-400"
        }`}
      >
        {active ? "Đang tuyển" : "Tạm dừng"}
      </span>
    </div>
  );
}
