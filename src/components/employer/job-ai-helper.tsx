"use client";

import { useState } from "react";
import { Loader2, Sparkles, Wand2, ListChecks, MessageSquareText } from "lucide-react";
import { toast } from "sonner";

interface Setters {
  setDescription: (v: string) => void;
  setRequirements: (v: string) => void;
  setBenefits: (v: string) => void;
}

interface Props extends Setters {
  title: string;
  industry?: string;
  description: string;
  requirements: string;
  benefits: string;
}

type Mode = "write_jd" | "polish" | "extract_skills" | "screening_questions";

export function JobAiHelper(props: Props) {
  const { title, industry, description, requirements, benefits } = props;
  const [busy, setBusy] = useState<Mode | null>(null);
  const [skills, setSkills] = useState<{
    required: string[];
    preferred: string[];
    bonus: string[];
  } | null>(null);
  const [questions, setQuestions] = useState<{ question: string; why: string }[] | null>(null);

  async function call(mode: Mode) {
    if (title.trim().length < 2) {
      toast.error("Nhập tiêu đề trước");
      return;
    }
    setBusy(mode);
    try {
      const res = await fetch("/api/ai/job-helper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          title,
          industry,
          context:
            mode === "polish" || mode === "extract_skills" || mode === "screening_questions"
              ? `${description}\n\n${requirements}\n\n${benefits}`.trim()
              : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || data.error || "Lỗi AI");
        setBusy(null);
        return;
      }
      if (mode === "write_jd" || mode === "polish") {
        if (data.description) props.setDescription(data.description);
        if (data.requirements) props.setRequirements(data.requirements);
        if (data.benefits) props.setBenefits(data.benefits);
        toast.success(mode === "write_jd" ? "AI đã viết JD đầy đủ" : "AI đã polish JD");
      } else if (mode === "extract_skills") {
        setSkills(data);
        toast.success("Đã trích kỹ năng");
      } else if (mode === "screening_questions") {
        setQuestions(data.questions || []);
        toast.success("Đã sinh câu hỏi sàng lọc");
      }
    } catch {
      toast.error("Lỗi kết nối");
    } finally {
      setBusy(null);
    }
  }

  const buttons: { mode: Mode; label: string; icon: typeof Sparkles; desc: string }[] = [
    { mode: "write_jd", label: "AI viết JD đầy đủ", icon: Sparkles, desc: "Sinh description + requirements + benefits từ tiêu đề" },
    { mode: "polish", label: "Làm chuyên nghiệp hơn", icon: Wand2, desc: "Viết lại JD hiện tại theo phong cách hấp dẫn" },
    { mode: "extract_skills", label: "Tách required skills", icon: ListChecks, desc: "Trích kỹ năng required / preferred / bonus" },
    { mode: "screening_questions", label: "Sinh câu hỏi sàng lọc", icon: MessageSquareText, desc: "5-7 câu hỏi gửi ứng viên trước phỏng vấn" },
  ];

  return (
    <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/40 via-white to-emerald-50/30 p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="text-[#1557ff]" size={18} />
        <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
          AI Job Helper
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {buttons.map((b) => {
          const Icon = b.icon;
          const loading = busy === b.mode;
          return (
            <button
              key={b.mode}
              type="button"
              disabled={Boolean(busy)}
              onClick={() => call(b.mode)}
              className="group flex flex-col items-start gap-1 rounded-2xl border border-slate-200 bg-white p-3 text-left text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-[#1557ff] hover:text-[#1557ff] disabled:opacity-60"
            >
              <span className="flex items-center gap-2">
                {loading ? (
                  <Loader2 className="animate-spin" size={14} />
                ) : (
                  <Icon size={14} />
                )}
                {b.label}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-600">
                {b.desc}
              </span>
            </button>
          );
        })}
      </div>

      {skills && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-wider text-slate-700">
            Kỹ năng (AI trích từ JD)
          </p>
          <Group label="Bắt buộc" tone="red" items={skills.required} />
          <Group label="Nên có" tone="amber" items={skills.preferred} />
          <Group label="Bonus" tone="emerald" items={skills.bonus} />
        </div>
      )}

      {questions && questions.length > 0 && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-wider text-slate-700">
            Câu hỏi sàng lọc
          </p>
          <ol className="mt-3 space-y-2.5">
            {questions.map((q, i) => (
              <li key={i} className="rounded-xl bg-slate-50 p-3">
                <p className="flex items-start gap-2 text-sm font-bold text-slate-800">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1557ff] text-[10px] font-black text-white">
                    {i + 1}
                  </span>
                  {q.question}
                </p>
                {q.why && (
                  <p className="mt-1 pl-7 text-xs text-slate-500">
                    💡 {q.why}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function Group({ label, tone, items }: { label: string; tone: "red" | "amber" | "emerald"; items: string[] }) {
  if (!items?.length) return null;
  const palette = {
    red: "bg-red-50 text-red-700",
    amber: "bg-amber-50 text-amber-700",
    emerald: "bg-emerald-50 text-emerald-700",
  }[tone];
  return (
    <div className="mt-3">
      <p className="text-[11px] font-black uppercase text-slate-500">{label}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {items.map((s) => (
          <span
            key={s}
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${palette}`}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
