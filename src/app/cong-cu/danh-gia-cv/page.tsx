"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/client";

interface CVItem {
  id: string;
  title: string;
  personal_info: Record<string, unknown>;
  experiences: unknown[];
  education: unknown[];
  skills: unknown[];
}

interface ReviewResult {
  score: number;
  summary: string;
  suggestions: string[];
}

export default function DanhGiaCVPage() {
  const [cvList, setCvList] = useState<CVItem[]>([]);
  const [selectedCvId, setSelectedCvId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCvs, setLoadingCvs] = useState(true);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCVs() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoadingCvs(false);
          return;
        }

        const { data } = await supabase
          .from("cvs")
          .select("id, title, personal_info, experiences, education, skills")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false });

        if (data) setCvList(data as CVItem[]);
      } catch {
        // silently fail - user may not be logged in
      } finally {
        setLoadingCvs(false);
      }
    }
    fetchCVs();
  }, []);

  async function handleReview() {
    if (!selectedCvId) {
      setError("Vui lòng chọn một CV để đánh giá.");
      return;
    }

    const cv = cvList.find((c) => c.id === selectedCvId);
    if (!cv) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ai/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cv_data: {
            personal_info: cv.personal_info,
            experiences: cv.experiences,
            education: cv.education,
            skills: cv.skills,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Đã xảy ra lỗi.");
        return;
      }

      setResult(data);
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
            <Link href="/cong-cu" className="hover:text-[#003d9b] transition-colors">
              Công cụ
            </Link>
            <span>/</span>
            <span className="text-[#191c1e] font-medium">AI Review CV</span>
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
              AI Review CV
            </h1>
            <p className="text-lg text-[#434654] max-w-2xl mx-auto leading-relaxed">
              Chọn CV của bạn và nhận phân tích chi tiết từ AI. Chúng tôi sẽ đánh giá
              nội dung, từ khóa và đưa ra gợi ý cải thiện cụ thể để tăng cơ hội
              được mời phỏng vấn.
            </p>
          </div>

          {/* CV Selector */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-8">
            <h2
              className="text-xl font-extrabold text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Chọn CV của bạn
            </h2>

            {loadingCvs ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-3 border-[#003d9b] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-[#434654] mt-3">Đang tải danh sách CV...</p>
              </div>
            ) : cvList.length === 0 ? (
              <div className="bg-[#f3f4f6] rounded-3xl p-8 text-center space-y-4">
                <p className="text-sm text-[#434654]">
                  Bạn chưa có CV nào. Hãy tạo CV trước khi sử dụng tính năng đánh giá.
                </p>
                <Link
                  href="/cv/tao-moi"
                  className="inline-block kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-xl"
                >
                  Tạo CV mới
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {cvList.map((cv) => (
                  <label
                    key={cv.id}
                    className={`flex items-center gap-4 rounded-2xl px-5 py-4 cursor-pointer transition-colors ${
                      selectedCvId === cv.id
                        ? "bg-[#003d9b]/10 ring-2 ring-[#003d9b]/30"
                        : "bg-[#f3f4f6] hover:bg-[#003d9b]/5"
                    }`}
                  >
                    <input
                      type="radio"
                      name="cv-select"
                      value={cv.id}
                      checked={selectedCvId === cv.id}
                      onChange={() => setSelectedCvId(cv.id)}
                      className="accent-[#003d9b]"
                    />
                    <span className="text-sm font-semibold text-[#191c1e]">
                      {cv.title || "CV không tên"}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-700 rounded-2xl px-5 py-4 text-sm">
                {error}
              </div>
            )}

            {/* CTA */}
            <div className="text-center pt-4">
              <button
                onClick={handleReview}
                disabled={loading || !selectedCvId}
                className="kinetic-gradient text-white font-extrabold text-lg px-12 py-5 rounded-2xl shadow-2xl hover:opacity-90 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang đánh giá...
                  </span>
                ) : (
                  "Bắt đầu đánh giá"
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-10 space-y-6">
              {/* Score */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 text-center space-y-4">
                <h2
                  className="text-xl font-extrabold text-[#191c1e]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Kết quả đánh giá
                </h2>
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke={result.score >= 70 ? "#22c55e" : result.score >= 40 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${(result.score / 100) * 327} 327`}
                    />
                  </svg>
                  <span
                    className="absolute inset-0 flex items-center justify-center text-4xl font-black text-[#191c1e]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {result.score}
                  </span>
                </div>
                <p className="text-sm text-[#434654] max-w-lg mx-auto leading-relaxed">
                  {result.summary}
                </p>
              </div>

              {/* Suggestions */}
              {result.suggestions?.length > 0 && (
                <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-6">
                  <h2
                    className="text-xl font-extrabold text-[#191c1e]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Gợi ý cải thiện
                  </h2>
                  <ul className="space-y-3">
                    {result.suggestions.map((suggestion, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 bg-[#f3f4f6] rounded-2xl px-5 py-4 text-sm text-[#434654]"
                      >
                        <span className="shrink-0 w-6 h-6 rounded-full bg-[#003d9b]/10 text-[#003d9b] font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* How it works */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Chọn CV",
                description: "Chọn CV bạn muốn đánh giá từ danh sách CV đã tạo.",
              },
              {
                step: "02",
                title: "AI phân tích",
                description: "Hệ thống AI sẽ phân tích toàn diện nội dung và hình thức CV.",
              },
              {
                step: "03",
                title: "Nhận kết quả",
                description: "Xem báo cáo chi tiết với điểm số và gợi ý cải thiện cụ thể.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 space-y-4"
              >
                <span
                  className="text-4xl font-black text-[#003d9b]/10"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {item.step}
                </span>
                <h3
                  className="text-lg font-extrabold text-[#191c1e]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#434654] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
