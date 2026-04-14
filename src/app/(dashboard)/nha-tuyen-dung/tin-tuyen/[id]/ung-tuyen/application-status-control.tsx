"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const STATUSES = [
  { value: "pending", label: "Chờ xem", color: "bg-slate-100 text-slate-700" },
  { value: "viewed", label: "Đã xem", color: "bg-blue-100 text-blue-700" },
  { value: "shortlisted", label: "Vào shortlist", color: "bg-amber-100 text-amber-700" },
  { value: "hired", label: "Đã tuyển", color: "bg-green-100 text-green-700" },
  { value: "rejected", label: "Từ chối", color: "bg-red-100 text-red-700" },
];

interface ApplicationStatusControlProps {
  applicationId: string;
  initialStatus: string;
}

export function ApplicationStatusControl({
  applicationId,
  initialStatus,
}: ApplicationStatusControlProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  const current = STATUSES.find((s) => s.value === status) ?? STATUSES[0];

  const handleChange = (next: string) => {
    const prev = status;
    setStatus(next);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase
        .from("applications")
        .update({ status: next })
        .eq("id", applicationId);
      if (error) {
        toast.error("Cập nhật thất bại", { description: error.message });
        setStatus(prev);
        return;
      }
      const label = STATUSES.find((s) => s.value === next)?.label ?? next;
      toast.success(`Đã chuyển sang: ${label}`);
    });
  };

  return (
    <div className="flex flex-col items-end gap-2 min-w-[180px]">
      <span
        className={`text-xs font-bold px-3 py-1 rounded-full ${current.color}`}
      >
        {current.label}
      </span>
      <div className="relative">
        <select
          value={status}
          onChange={(e) => handleChange(e.target.value)}
          disabled={isPending}
          className="text-xs font-semibold border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 disabled:opacity-60"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {isPending && (
          <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 animate-spin text-slate-400" />
        )}
      </div>
    </div>
  );
}
