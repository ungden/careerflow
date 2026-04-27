"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface QA {
  question: string;
  suggested_answer: string;
}

export default function PhongVanPage() {
  const industries = [
    "Công nghệ thông tin",
    "Truyền thông & Marketing",
    "Tài chính & Ngân hàng",
    "Giáo dục & Đào tạo",
    "Thiết kế & Sáng tạo",
    "Bán hàng & Kinh doanh",
  ];

  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Product Manager",
    "Marketing Specialist",
    "Data Analyst",
    "Business Analyst",
  ];

  const levels = [
    "Intern / Thực tập sinh",
    "Junior / Nhân viên mới",
    "Mid-level / Chuyên viên",
    "Senior / Chuyên gia",
    "Lead / Trưởng nhóm",
    "Manager / Quản lý",
  ];

  const [industry, setIndustry] = useState("");
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QA[]>([]);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function handleGenerate() {
    if (!industry || !position) {
      setError("Vui lòng chọn ngành nghề và vị trí.");
      return;
    }

    setLoading(true);
    setError("");
    setQuestions([]);
    setExpandedIdx(null);

    try {
      const res = await fetch("/api/ai/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, position, level }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Đã xảy ra lỗi.");
        return;
      }

      setQuestions(data.questions || []);
    } catch {
      setError("Không thể kết nối đến server. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f9fb] pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#434654] mb-8">
            <Link href="/cong-cu" className="hover:text-[#1557ff] transition-colors">
              Công cụ
            </Link>
            <span>/</span>
            <span className="text-[#191c1e] font-medium">Luyện phỏng vấn AI</span>
          </nav>

          {/* Hero */}
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 bg-[#dae2ff] text-[#001848] px-4 py-2 rounded-full">
              <span className="text-xs font-bold uppercase tracking-widest">AI-Powered</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Luyện phỏng vấn AI
            </h1>
            <p className="text-lg text-[#434654] max-w-2xl mx-auto leading-relaxed">
              Chuẩn bị cho buổi phỏng vấn tiếp theo với AI. Chọn ngành nghề và vị trí,
              sau đó luyện tập trả lời các câu hỏi phỏng vấn thực tế.
            </p>
          </div>

          {/* Setup Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-8">
            <h2
              className="text-xl font-extrabold text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Thiết lập buổi luyện tập
            </h2>

            {/* Ngành nghề */}
            <div className="space-y-3">
              <label
                className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Ngành nghề
              </label>
              <div className="flex flex-wrap gap-3">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => setIndustry(ind)}
                    className={`px-5 py-2.5 text-sm font-semibold rounded-2xl cursor-pointer transition-colors ${
                      industry === ind
                        ? "bg-[#1557ff] text-white"
                        : "text-[#1557ff] bg-[#f3f4f6] hover:bg-[#1557ff]/10"
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            {/* Vị trí */}
            <div className="space-y-3">
              <label
                className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Vị trí ứng tuyển
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Ví dụ: Frontend Developer, Marketing Manager..."
                className="w-full bg-[#f3f4f6] rounded-2xl px-5 py-3.5 text-sm text-[#191c1e] placeholder:text-[#434654]/40 outline-none focus:ring-2 focus:ring-[#1557ff]/20 transition-all"
                list="position-suggestions"
              />
              <datalist id="position-suggestions">
                {positions.map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>
            </div>

            {/* Cấp bậc */}
            <div className="space-y-3">
              <label
                className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Cấp bậc ứng tuyển
              </label>
              <div className="flex flex-wrap gap-3">
                {levels.map((lv) => (
                  <button
                    key={lv}
                    type="button"
                    onClick={() => setLevel(lv)}
                    className={`px-5 py-2.5 text-sm font-semibold rounded-2xl cursor-pointer transition-colors ${
                      level === lv
                        ? "bg-[#1557ff] text-white"
                        : "text-[#1557ff] bg-[#f3f4f6] hover:bg-[#1557ff]/10"
                    }`}
                  >
                    {lv}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-700 rounded-2xl px-5 py-4 text-sm">
                {error}
              </div>
            )}

            {/* CTA */}
            <div className="text-center pt-4">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="kinetic-gradient text-white font-extrabold text-lg px-12 py-5 rounded-2xl shadow-2xl hover:opacity-90 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang tạo câu hỏi...
                  </span>
                ) : (
                  "Bắt đầu luyện tập"
                )}
              </button>
            </div>
          </div>

          {/* Q&A Results */}
          {questions.length > 0 && (
            <div className="mt-10 space-y-4">
              <h2
                className="text-xl font-extrabold text-[#191c1e] px-2"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Câu hỏi phỏng vấn ({questions.length})
              </h2>
              {questions.map((qa, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-xl rounded-[28px] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                    className="w-full text-left px-8 py-6 flex items-start gap-4"
                  >
                    <span className="shrink-0 w-8 h-8 rounded-full bg-[#1557ff]/10 text-[#1557ff] font-bold text-sm flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-[15px] font-semibold text-[#191c1e] leading-relaxed">
                      {qa.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-[#434654] shrink-0 mt-1 transition-transform ${
                        expandedIdx === idx ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedIdx === idx && (
                    <div className="px-8 pb-6 pl-20">
                      <div className="bg-[#f0f9ff] rounded-2xl px-6 py-5">
                        <p className="text-xs font-bold text-[#1557ff] uppercase tracking-wide mb-2">
                          Gợi ý trả lời
                        </p>
                        <p className="text-sm text-[#434654] leading-relaxed whitespace-pre-wrap">
                          {qa.suggested_answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Câu hỏi thực tế",
                description:
                  "Câu hỏi được tạo bởi AI dựa trên xu hướng phỏng vấn thực tế tại các công ty hàng đầu.",
              },
              {
                title: "Gợi ý trả lời",
                description:
                  "Mỗi câu hỏi đi kèm gợi ý trả lời chi tiết để bạn tham khảo.",
              },
              {
                title: "Luyện tập không giới hạn",
                description:
                  "Thực hành bao nhiêu lần tùy thích cho đến khi bạn tự tin hoàn toàn.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-4"
              >
                <h3
                  className="text-lg font-extrabold text-[#191c1e]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-[#434654] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
