"use client";

import { useState } from "react";
import { Loader2, Sparkles, Target } from "lucide-react";
import { toast } from "sonner";

interface CV {
  id: string;
  title: string;
}

interface MatchResult {
  match_score: number;
  ats_score: number;
  matched_keywords: string[];
  missing_keywords: string[];
  strengths: string[];
  gaps: string[];
  bullet_rewrite_suggestions: Array<{ from: string; to: string }>;
  overall: string;
}

export function JdMatchTool({
  cvs,
  defaultJD,
}: {
  cvs: CV[];
  defaultJD?: string;
}) {
  const [selectedCv, setSelectedCv] = useState<string>(cvs[0]?.id ?? "");
  const [jd, setJd] = useState(defaultJD ?? "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);

  async function run() {
    if (!selectedCv) {
      toast.error("Vui lòng chọn CV");
      return;
    }
    if (jd.trim().length < 40) {
      toast.error("JD cần ≥ 40 ký tự");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      // 1. Fetch CV data
      const cvRes = await fetch(`/api/cv/${selectedCv}`).catch(() => null);
      let cvData: unknown = null;
      if (cvRes && cvRes.ok) {
        cvData = await cvRes.json();
      } else {
        // Fallback: load via supabase client
        const { createClient } = await import("@/lib/supabase/client");
        const supa = createClient();
        const { data } = await supa
          .from("cvs")
          .select("personal_info, experiences, education, skills, languages, certifications, projects, title")
          .eq("id", selectedCv)
          .single();
        cvData = data;
      }
      if (!cvData) {
        toast.error("Không tải được CV");
        setLoading(false);
        return;
      }
      // 2. Call jd-match
      const res = await fetch("/api/ai/jd-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv_data: cvData, job_description: jd }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || data.error || "Lỗi khi gọi AI");
        setLoading(false);
        return;
      }
      setResult(data as MatchResult);
    } catch {
      toast.error("Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      {/* Input */}
      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <label className="text-sm font-black uppercase text-slate-500">CV của bạn</label>
          <select
            value={selectedCv}
            onChange={(e) => setSelectedCv(e.target.value)}
            className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-bold outline-none focus:border-[#1557ff]"
          >
            {cvs.map((cv) => (
              <option key={cv.id} value={cv.id}>
                {cv.title}
              </option>
            ))}
            {cvs.length === 0 && <option>(Bạn chưa có CV nào)</option>}
          </select>
        </div>
        <div>
          <label className="text-sm font-black uppercase text-slate-500">Mô tả công việc (JD)</label>
          <textarea
            rows={14}
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Dán JD mục tiêu vào đây — càng chi tiết càng đo chính xác..."
            className="mt-2 w-full rounded-md border border-slate-200 bg-white p-3 text-sm leading-7 outline-none focus:border-[#1557ff]"
          />
          <p className="mt-1 text-xs text-slate-400">{jd.length} ký tự</p>
        </div>
        <button
          onClick={run}
          disabled={loading || cvs.length === 0}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#1557ff] text-base font-bold text-white shadow-sm shadow-blue-500/25 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Đang phân tích…
            </>
          ) : (
            <>
              <Target size={18} /> Tính match %
            </>
          )}
        </button>
      </div>

      {/* Output */}
      <div className="space-y-4">
        {!result ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
            <Sparkles className="mx-auto text-[#1557ff]" size={28} />
            <p className="mt-3 text-base font-bold text-slate-700">
              Kết quả AI sẽ hiện ở đây
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Match %, từ khoá thiếu, gợi ý sửa bullet — đầy đủ.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <ScoreCard label="Match Score" value={result.match_score} tone="blue" />
              <ScoreCard label="ATS Score" value={result.ats_score} tone="emerald" />
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-black uppercase text-slate-500">Tóm tắt</p>
              <p className="mt-2 text-sm leading-7 text-slate-700">{result.overall}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <KwBox title="Từ khoá khớp" tone="emerald" items={result.matched_keywords} />
              <KwBox title="Từ khoá thiếu" tone="red" items={result.missing_keywords} />
            </div>

            {result.strengths?.length > 0 && (
              <ListBox title="Điểm mạnh" tone="emerald" items={result.strengths} />
            )}
            {result.gaps?.length > 0 && (
              <ListBox title="Cần cải thiện" tone="amber" items={result.gaps} />
            )}

            {result.bullet_rewrite_suggestions?.length > 0 && (
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-black uppercase text-[#1557ff]">Gợi ý viết lại bullet</p>
                <div className="mt-3 space-y-3">
                  {result.bullet_rewrite_suggestions.map((s, i) => (
                    <div key={i} className="rounded-md bg-slate-50 p-3">
                      <p className="text-xs font-black uppercase text-slate-400">CV cũ</p>
                      <p className="mt-1 text-sm text-slate-600 line-through">{s.from}</p>
                      <p className="mt-2 text-xs font-black uppercase text-emerald-600">AI đề xuất</p>
                      <p className="mt-1 text-sm font-bold text-slate-800">{s.to}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ScoreCard({ label, value, tone }: { label: string; value: number; tone: "blue" | "emerald" }) {
  const palette =
    tone === "blue"
      ? "from-blue-50 via-white to-blue-50 text-[#1557ff]"
      : "from-emerald-50 via-white to-emerald-50 text-emerald-700";
  return (
    <div className={`rounded-lg border border-slate-200 bg-gradient-to-br ${palette} p-5 shadow-sm`}>
      <p className="text-xs font-black uppercase">{label}</p>
      <p className="mt-2 text-5xl font-black">{value}<span className="text-2xl text-slate-400">/100</span></p>
    </div>
  );
}

function KwBox({ title, tone, items }: { title: string; tone: "emerald" | "red"; items: string[] }) {
  const palette =
    tone === "emerald" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600";
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-slate-500">{title}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {items?.length ? (
          items.map((k) => (
            <span key={k} className={`rounded-md px-2 py-1 text-xs font-bold ${palette}`}>
              {k}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-400">—</span>
        )}
      </div>
    </div>
  );
}

function ListBox({ title, tone, items }: { title: string; tone: "emerald" | "amber"; items: string[] }) {
  const dot = tone === "emerald" ? "bg-emerald-500" : "bg-amber-500";
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-slate-500">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((s, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot}`} />
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
