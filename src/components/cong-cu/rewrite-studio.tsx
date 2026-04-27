"use client";

import { useState } from "react";
import { Loader2, Sparkles, ArrowRight, Wand2, Check } from "lucide-react";
import { toast } from "sonner";

const presets = [
  { id: "summary", label: "Viết lại Summary", desc: "3-4 câu súc tích, có số liệu" },
  { id: "experience", label: "Viết lại Kinh nghiệm", desc: "Action + Metric + Impact" },
  { id: "achievement", label: "Thêm số liệu thành tích", desc: "Quantify mọi bullet" },
  { id: "professional", label: "Chuyên nghiệp hơn", desc: "Formal tone, ngữ ngành" },
  { id: "shorter", label: "Ngắn gọn hơn", desc: "Rút gọn 30-40%" },
  { id: "ats", label: "Tối ưu ATS", desc: "Keyword + format chuẩn" },
  { id: "translate_en", label: "Dịch sang tiếng Anh", desc: "Professional resume English" },
] as const;

type PresetId = (typeof presets)[number]["id"];

interface RewriteResult {
  rewritten: string;
  rationale: string[];
  keywords_added: string[];
}

export function RewriteStudio() {
  const [original, setOriginal] = useState("");
  const [section, setSection] = useState<PresetId>("summary");
  const [role, setRole] = useState("");
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RewriteResult | null>(null);

  async function run() {
    if (original.trim().length < 5) {
      toast.error("Nhập nội dung gốc trước");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/ai/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          original,
          context: { role, jd: jd || undefined },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || data.error || "Lỗi khi gọi AI");
        setLoading(false);
        return;
      }
      setResult(data as RewriteResult);
    } catch {
      toast.error("Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    if (!result?.rewritten) return;
    navigator.clipboard.writeText(result.rewritten).then(
      () => toast.success("Đã copy bản viết lại"),
      () => toast.error("Không copy được")
    );
  }

  return (
    <div className="space-y-5">
      {/* Preset chips */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Tác vụ
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {presets.map((p) => {
            const active = p.id === section;
            return (
              <button
                key={p.id}
                onClick={() => setSection(p.id)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  active
                    ? "border-[#1557ff] bg-[#1557ff] text-white shadow-md shadow-blue-500/25"
                    : "border-slate-200 bg-white text-slate-600 hover:border-[#1557ff] hover:text-[#1557ff]"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {presets.find((p) => p.id === section)?.desc}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Vị trí mục tiêu (tuỳ chọn)
            </label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="VD: Senior Backend Engineer"
              className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold outline-none focus:border-[#1557ff]"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              JD tham chiếu (tuỳ chọn)
            </label>
            <input
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Dán JD nếu muốn AI tối ưu theo job cụ thể"
              className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold outline-none focus:border-[#1557ff]"
            />
          </div>
        </div>
      </div>

      {/* 2-column editor */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Original */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-black uppercase tracking-wider text-slate-700">
              CV gốc
            </p>
            <span className="text-xs font-semibold text-slate-400">
              {original.length} ký tự
            </span>
          </div>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            rows={16}
            placeholder="Dán đoạn CV cần viết lại — summary, bullet kinh nghiệm, hoặc cả paragraph..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm leading-7 outline-none focus:border-[#1557ff] focus:bg-white"
          />
          <button
            onClick={run}
            disabled={loading || original.trim().length < 5}
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1557ff] text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-[#0e3fd5] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Đang viết lại…
              </>
            ) : (
              <>
                <Wand2 size={18} />
                Viết lại bằng AI <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>

        {/* Rewritten */}
        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/40 via-white to-blue-50/30 p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-black uppercase tracking-wider text-emerald-700">
              <Sparkles className="mr-1 inline" size={14} /> AI đề xuất
            </p>
            {result && (
              <button
                onClick={copy}
                className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-50"
              >
                Copy
              </button>
            )}
          </div>
          {!result ? (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <Sparkles className="text-emerald-500" size={32} />
              <p className="mt-3 text-sm font-bold text-slate-600">
                Chọn tác vụ + dán nội dung CV — AI sẽ rewrite ngay tại đây.
              </p>
            </div>
          ) : (
            <>
              <pre className="whitespace-pre-wrap rounded-2xl bg-white p-4 text-sm leading-7 text-slate-800">
                {result.rewritten}
              </pre>
              {result.keywords_added?.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Từ khoá đã thêm
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {result.keywords_added.map((k) => (
                      <span
                        key={k}
                        className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700"
                      >
                        + {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {result.rationale?.length > 0 && (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Tại sao bản này tốt hơn
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                    {result.rationale.map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <Check className="mt-1 shrink-0 text-emerald-600" size={14} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
