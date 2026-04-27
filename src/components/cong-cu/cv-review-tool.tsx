"use client";

import { useState } from "react";
import { Loader2, Sparkles, Check, AlertTriangle, AlertCircle, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface CV {
  id: string;
  title: string;
}

interface ReviewResult {
  overall_score: number;
  ats_score: number;
  keyword_score: number;
  experience_score: number;
  achievement_score: number;
  structure_score: number;
  professionalism_score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  critical_errors: string[];
  suggestions: string[];
  quick_wins: string[];
}

const STROKE_DASH = 2 * Math.PI * 54;

function scoreColor(v: number) {
  if (v >= 80) return "bg-emerald-500";
  if (v >= 65) return "bg-amber-500";
  if (v >= 50) return "bg-orange-500";
  return "bg-red-500";
}

function scoreLabel(v: number) {
  if (v >= 85) return "Tốt";
  if (v >= 70) return "Khá tốt";
  if (v >= 55) return "Trung bình";
  return "Cần cải thiện";
}

export function CvReviewTool({ cvs }: { cvs: CV[] }) {
  const [selectedCv, setSelectedCv] = useState<string>(cvs[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);

  async function run() {
    if (!selectedCv) return;
    setLoading(true);
    setResult(null);
    try {
      const supa = createClient();
      const { data: cv } = await supa
        .from("cvs")
        .select("personal_info, experiences, education, skills, languages, certifications, projects, title")
        .eq("id", selectedCv)
        .single();
      if (!cv) {
        toast.error("Không tải được CV");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/ai/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv_data: cv }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || data.error || "Lỗi khi gọi AI");
        setLoading(false);
        return;
      }
      setResult(data as ReviewResult);
    } catch {
      toast.error("Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              CV của bạn
            </label>
            <select
              value={selectedCv}
              onChange={(e) => setSelectedCv(e.target.value)}
              className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-bold outline-none focus:border-[#1557ff]"
            >
              {cvs.map((cv) => (
                <option key={cv.id} value={cv.id}>
                  {cv.title}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={run}
            disabled={loading || cvs.length === 0}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#1557ff] px-6 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-[#0e3fd5] disabled:opacity-60"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
            {loading ? "Đang chấm…" : "Chấm điểm CV ngay"}
          </button>
        </div>
      </div>

      {!result ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Sparkles className="mx-auto text-[#1557ff]" size={36} />
          <p className="mt-4 text-base font-bold text-slate-700">
            Chọn CV và bấm chấm điểm
          </p>
          <p className="mt-1 text-sm text-slate-500">
            AI sẽ phân tích 7 trục: Overall, ATS, Keyword, Experience,
            Achievement, Structure, Professionalism.
          </p>
        </div>
      ) : (
        <ResultDashboard result={result} />
      )}
    </div>
  );
}

function ResultDashboard({ result }: { result: ReviewResult }) {
  const offset = STROKE_DASH * (1 - result.overall_score / 100);

  const metrics = [
    { label: "Nội dung", value: result.experience_score },
    { label: "Cấu trúc", value: result.structure_score },
    { label: "ATS", value: result.ats_score },
    { label: "Keywords", value: result.keyword_score },
    { label: "Thành tích", value: result.achievement_score },
    { label: "Chuyên nghiệp", value: result.professionalism_score },
  ];

  return (
    <>
      {/* Hero score row */}
      <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
        <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-[0_24px_60px_-24px_rgba(21,87,255,0.35)]">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            CV Review Report
          </p>
          <h3 className="mt-1 text-xl font-black">Báo cáo phân tích chi tiết</h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-[180px_1fr]">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-5">
              <div className="relative h-[140px] w-[140px]">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="url(#cvGradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={STROKE_DASH}
                    strokeDashoffset={offset}
                  />
                  <defs>
                    <linearGradient id="cvGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1557ff" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-4xl font-black text-slate-900">
                    {result.overall_score}
                  </p>
                  <p className="text-xs font-bold text-slate-500">/100</p>
                </div>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                <Check size={12} /> {scoreLabel(result.overall_score)}
              </span>
            </div>
            <div className="space-y-3">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>{m.label}</span>
                    <span className="text-slate-500">
                      <span className="text-slate-900">{m.value}</span>/100
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full ${scoreColor(m.value)}`}
                      style={{ width: `${m.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Tóm tắt từ AI
          </p>
          <p className="mt-3 text-base leading-7 text-slate-700">{result.summary}</p>
          {result.quick_wins?.length > 0 && (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
              <p className="flex items-center gap-2 text-sm font-black text-amber-800">
                <Lightbulb size={16} /> Quick wins — sửa ngay
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                {result.quick_wins.map((q) => (
                  <li key={q} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Strengths / Weaknesses */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ListBox
          title="Điểm mạnh"
          icon={<Check className="text-emerald-600" size={16} />}
          tone="emerald"
          items={result.strengths}
        />
        <ListBox
          title="Điểm yếu"
          icon={<AlertCircle className="text-amber-500" size={16} />}
          tone="amber"
          items={result.weaknesses}
        />
      </div>

      {/* Critical errors */}
      {result.critical_errors?.length > 0 && (
        <div className="rounded-3xl border border-red-200 bg-red-50/40 p-6 shadow-sm">
          <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-red-700">
            <AlertTriangle size={16} /> Lỗi nghiêm trọng
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {result.critical_errors.map((e) => (
              <li key={e} className="flex items-start gap-2 text-red-900">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="font-semibold">{e}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Long-term suggestions */}
      {result.suggestions?.length > 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
            Gợi ý cải thiện dài hạn
          </p>
          <ol className="mt-4 space-y-3 text-sm">
            {result.suggestions.map((s, i) => (
              <li
                key={s}
                className="flex items-start gap-3 rounded-2xl bg-slate-50/60 p-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1557ff] text-xs font-black text-white">
                  {i + 1}
                </span>
                <span className="text-slate-700">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}

function ListBox({
  title,
  icon,
  tone,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  tone: "emerald" | "amber";
  items: string[];
}) {
  const dot = tone === "emerald" ? "bg-emerald-500" : "bg-amber-500";
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-700">
        {icon} {title}
      </p>
      {items?.length ? (
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {items.map((s) => (
            <li key={s} className="flex items-start gap-2">
              <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-slate-400">—</p>
      )}
    </div>
  );
}
