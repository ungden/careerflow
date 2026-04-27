import { Lightbulb, Check, AlertCircle } from "lucide-react";

interface Metric {
  label: string;
  value: number;
  color: string;
}

const detailMetrics: Metric[] = [
  { label: "Nội dung", value: 76, color: "bg-emerald-500" },
  { label: "Cấu trúc", value: 82, color: "bg-emerald-500" },
  { label: "ATS", value: 68, color: "bg-amber-500" },
  { label: "Keywords", value: 61, color: "bg-orange-500" },
  { label: "Thành tích", value: 55, color: "bg-red-500" },
  { label: "Chuyên nghiệp", value: 80, color: "bg-emerald-500" },
];

const quickAnalysis: { tone: "ok" | "warn"; text: string }[] = [
  { tone: "ok", text: "CV của bạn có cấu trúc tốt" },
  { tone: "warn", text: "Từ khóa còn thiếu so với JD" },
  { tone: "warn", text: "Thiếu số liệu thành tích" },
  { tone: "ok", text: "Có thể tối ưu nhân kỹ năng" },
];

const STROKE_DASH = 2 * Math.PI * 54;

export function HeroScoreCard() {
  const overall = 78;
  const offset = STROKE_DASH * (1 - overall / 100);

  return (
    <div className="rounded-[28px] border border-blue-100 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(21,87,255,0.35)] sm:p-7">
      {/* Top row: Overall score + ATS + JD */}
      <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
        <div className="rounded-[20px] border border-slate-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Overall Score
          </p>
          <div className="relative mx-auto mt-3 h-[120px] w-[120px]">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={STROKE_DASH}
                strokeDashoffset={offset}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1557ff" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-black text-slate-900">
                {overall}
                <span className="ml-0.5 text-base text-slate-400">/100</span>
              </p>
            </div>
          </div>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
            <Check size={12} /> Khá tốt
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[20px] border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              ATS Match
            </p>
            <p className="mt-2 text-2xl font-black text-slate-900">84%</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: "84%" }} />
            </div>
          </div>
          <div className="rounded-[20px] border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              JD Match
            </p>
            <p className="mt-2 text-2xl font-black text-slate-900">72%</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-amber-500" style={{ width: "72%" }} />
            </div>
          </div>
          <div className="rounded-[20px] border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Missing Keywords
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["SQL", "CRM", "B2B Sales"].map((k) => (
                <span
                  key={k}
                  className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[20px] border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Gợi ý cải thiện
            </p>
            <p className="mt-2 inline-flex items-center gap-2 text-2xl font-black text-slate-900">
              12 <span className="text-sm font-bold text-slate-500">gợi ý</span>
              <Lightbulb size={20} className="text-amber-500" />
            </p>
          </div>
        </div>
      </div>

      {/* Detail metrics */}
      <div className="mt-5 grid gap-5 rounded-[20px] border border-slate-100 bg-slate-50/40 p-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            Điểm chi tiết theo tiêu chí
          </p>
          <div className="space-y-2.5">
            {detailMetrics.map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>{m.label}</span>
                  <span className="text-slate-500">
                    <span className="text-slate-900">{m.value}</span>/100
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${m.color}`}
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            Phân tích nhanh
          </p>
          <ul className="space-y-2.5">
            {quickAnalysis.map((a) => (
              <li key={a.text} className="flex items-start gap-2 text-xs text-slate-700">
                {a.tone === "ok" ? (
                  <Check className="mt-0.5 shrink-0 text-emerald-600" size={14} />
                ) : (
                  <AlertCircle className="mt-0.5 shrink-0 text-amber-500" size={14} />
                )}
                <span className="font-semibold">{a.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
