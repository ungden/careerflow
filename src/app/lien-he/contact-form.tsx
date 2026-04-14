"use client";

import { useState } from "react";
import { toast } from "sonner";

const subjects = [
  "Hỗ trợ tài khoản",
  "Vấn đề thanh toán / hoàn tiền",
  "Báo lỗi kỹ thuật",
  "Hợp tác doanh nghiệp",
  "Báo cáo lạm dụng",
  "Khác",
];

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: subjects[0],
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Gửi không thành công");
      toast.success("Đã gửi tin nhắn! Chúng tôi sẽ phản hồi sớm nhất có thể.");
      setForm({ name: "", email: "", subject: subjects[0], message: "" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Đã xảy ra lỗi";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-[16px] border border-slate-200 bg-white text-[#191c1e] placeholder:text-slate-400 focus:outline-none focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-[#191c1e] mb-2">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nguyễn Văn A"
            className={inputCls}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#191c1e] mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="ban@example.com"
            className={inputCls}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#191c1e] mb-2">
          Chủ đề
        </label>
        <select
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={inputCls}
        >
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#191c1e] mb-2">
          Nội dung <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={6}
          placeholder="Mô tả chi tiết câu hỏi hoặc vấn đề của bạn..."
          className={inputCls + " resize-none"}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="text-xs text-slate-500">
          Bằng việc gửi, bạn đồng ý với{" "}
          <a href="/bao-mat" className="text-[#003d9b] underline underline-offset-2">
            Chính sách bảo mật
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#003d9b] text-white px-8 py-3 rounded-[24px] font-semibold hover:bg-[#002d75] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Đang gửi..." : "Gửi tin nhắn"}
        </button>
      </div>
    </form>
  );
}
