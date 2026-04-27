"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Loader2,
  MessageSquareText,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface QA {
  question: string;
  suggested_answer: string;
}

const INDUSTRIES = [
  "Công nghệ thông tin",
  "Truyền thông & Marketing",
  "Tài chính & Ngân hàng",
  "Giáo dục & Đào tạo",
  "Thiết kế & Sáng tạo",
  "Bán hàng & Kinh doanh",
];

const POSITIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Product Manager",
  "Marketing Specialist",
  "Data Analyst",
  "Business Analyst",
];

const LEVELS = [
  "Intern",
  "Junior",
  "Mid-level",
  "Senior",
  "Lead",
  "Manager",
];

export default function PhongVanPage() {
  const [industry, setIndustry] = useState("");
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QA[]>([]);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  async function run() {
    if (!industry || !position) {
      toast.error("Vui lòng chọn ngành và vị trí");
      return;
    }
    setLoading(true);
    setQuestions([]);
    try {
      const res = await fetch("/api/ai/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, position, level }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || data.error || "Lỗi khi gọi AI");
        setLoading(false);
        return;
      }
      setQuestions(data.questions || []);
    } catch {
      toast.error("Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="bg-[#f8fbff] text-[#07122f]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              AI Interview Kit
            </p>
            <h1
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              10 câu hỏi phỏng vấn thực tế cho vị trí của bạn
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
              AI sinh câu hỏi sát ngữ cảnh ngành + cấp bậc kèm gợi ý cách trả lời hay. Dùng để chuẩn bị trước phỏng vấn.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            {/* Sidebar form */}
            <aside className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Cấu hình
                </p>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-500">Ngành nghề</label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-bold outline-none focus:border-[#1557ff]"
                    >
                      <option value="">— Chọn ngành —</option>
                      {INDUSTRIES.map((i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-500">Vị trí</label>
                    <input
                      list="position-list"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder="VD: Senior Backend Engineer"
                      className="mt-1.5 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-bold outline-none focus:border-[#1557ff]"
                    />
                    <datalist id="position-list">
                      {POSITIONS.map((p) => (
                        <option key={p} value={p} />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-500">Cấp bậc</label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-bold outline-none focus:border-[#1557ff]"
                    >
                      <option value="">— Tuỳ chọn —</option>
                      {LEVELS.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={run}
                    disabled={loading || !industry || !position}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1557ff] text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-[#0e3fd5] disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} /> Đang sinh…
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} /> Sinh 10 câu hỏi
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-amber-200 bg-amber-50/40 p-5">
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-700">
                  <Lightbulb size={14} /> Tip
                </p>
                <p className="mt-2 text-xs leading-6 text-slate-700">
                  Sau khi sinh câu hỏi, click từng câu để xem gợi ý cách trả lời. Dùng kết hợp với{" "}
                  <a href="/cong-cu/jd-match" className="font-black text-[#1557ff] hover:underline">
                    JD Match
                  </a>{" "}
                  để biết câu nào liên quan đến điểm yếu trong CV của bạn.
                </p>
              </div>
            </aside>

            {/* Result */}
            <section>
              {questions.length === 0 ? (
                <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                  <MessageSquareText size={36} className="text-[#1557ff]" />
                  <p className="mt-4 text-base font-bold text-slate-700">
                    Chọn ngành + vị trí + cấp bậc, AI sẽ sinh ra 10 câu hỏi tại đây.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {questions.map((qa, i) => {
                    const expanded = expandedIdx === i;
                    return (
                      <div
                        key={i}
                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-300"
                      >
                        <button
                          onClick={() => setExpandedIdx(expanded ? null : i)}
                          className="flex w-full items-start gap-3 p-5 text-left"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1557ff] text-xs font-black text-white">
                            {i + 1}
                          </span>
                          <span className="flex-1 text-sm font-bold text-slate-800">
                            {qa.question}
                          </span>
                          {expanded ? (
                            <ChevronUp className="text-slate-400" size={18} />
                          ) : (
                            <ChevronDown className="text-slate-400" size={18} />
                          )}
                        </button>
                        {expanded && (
                          <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-4">
                            <p className="text-xs font-black uppercase tracking-wider text-emerald-700">
                              💡 Gợi ý cách trả lời
                            </p>
                            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700">
                              {qa.suggested_answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
