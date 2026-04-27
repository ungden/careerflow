"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const STAGES = [
  { id: "pending", label: "Mới", tone: "border-slate-300" },
  { id: "viewed", label: "Đã xem", tone: "border-blue-300" },
  { id: "shortlisted", label: "Shortlist", tone: "border-emerald-400" },
  { id: "hired", label: "Trúng tuyển", tone: "border-amber-400" },
  { id: "rejected", label: "Từ chối", tone: "border-red-300" },
] as const;

export interface PipelineApplication {
  id: string;
  status: string;
  created_at: string;
  cover_letter?: string | null;
  candidate?: { full_name?: string | null; avatar_url?: string | null; slug?: string | null } | null;
  job?: { title?: string | null; slug?: string | null } | null;
}

export function PipelineBoard({ items }: { items: PipelineApplication[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [local, setLocal] = useState(items);

  const buckets = STAGES.map((s) => ({
    ...s,
    items: local.filter((it) => it.status === s.id),
  }));

  async function move(appId: string, target: string) {
    const supabase = createClient();
    setLocal((prev) => prev.map((a) => (a.id === appId ? { ...a, status: target } : a)));
    const { error } = await supabase
      .from("applications")
      .update({ status: target })
      .eq("id", appId);
    if (error) {
      toast.error("Không cập nhật được trạng thái");
      setLocal((prev) => prev.map((a) => (a.id === appId ? { ...a, status: items.find((x) => x.id === appId)?.status ?? a.status } : a)));
      return;
    }
    toast.success("Đã chuyển sang " + STAGES.find((s) => s.id === target)?.label);
    startTransition(() => router.refresh());
  }

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {buckets.map((b) => (
        <div key={b.id} className={`rounded-lg border-t-4 ${b.tone} bg-slate-50/60 p-3`}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider">{b.label}</h3>
            <span className="rounded-md bg-white px-2 py-0.5 text-xs font-black text-slate-600 shadow-sm">
              {b.items.length}
            </span>
          </div>
          <div className="space-y-2">
            {b.items.length === 0 && (
              <p className="rounded-md border border-dashed border-slate-300 bg-white px-3 py-6 text-center text-xs text-slate-400">
                Trống
              </p>
            )}
            {b.items.map((app) => (
              <div
                key={app.id}
                className="rounded-md border border-slate-200 bg-white p-3 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-[#1557ff]">
                    {(app.candidate?.full_name ?? "?")[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    {app.candidate?.slug ? (
                      <Link
                        href={`/ung-vien/${app.candidate.slug}`}
                        className="block truncate text-sm font-black hover:text-[#1557ff]"
                      >
                        {app.candidate?.full_name ?? "Ứng viên"}
                      </Link>
                    ) : (
                      <p className="truncate text-sm font-black">
                        {app.candidate?.full_name ?? "Ứng viên"}
                      </p>
                    )}
                    <p className="mt-0.5 truncate text-xs font-bold text-slate-500">
                      {app.job?.title}
                    </p>
                  </div>
                </div>
                {app.cover_letter && (
                  <p className="mt-2 line-clamp-2 text-xs text-slate-500">{app.cover_letter}</p>
                )}
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  {STAGES.filter((s) => s.id !== app.status).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => move(app.id, s.id)}
                      className="rounded-md border border-slate-200 px-2 py-1 text-[11px] font-bold text-slate-600 hover:border-[#1557ff] hover:text-[#1557ff]"
                    >
                      → {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
