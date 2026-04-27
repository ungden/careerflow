"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, User, Building2 } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"candidate" | "employer">("candidate");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
      },
    });
    if (error) {
      toast.error("Đăng ký thất bại", { description: error.message });
      setLoading(false);
      return;
    }
    toast.success("Đăng ký thành công!", {
      description: "Kiểm tra email để xác nhận tài khoản.",
    });
    router.push("/dang-nhap");
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h1
        className="text-2xl font-black"
        style={{ fontFamily: "var(--font-headline)" }}
      >
        Đăng ký miễn phí
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        AI CV Review, JD Match, 10 templates — không cần thẻ tín dụng.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setRole("candidate")}
          className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition ${
            role === "candidate"
              ? "border-[#1557ff] bg-blue-50 text-[#1557ff]"
              : "border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          <User size={22} />
          <span className="text-sm font-bold">Ứng viên</span>
        </button>
        <button
          type="button"
          onClick={() => setRole("employer")}
          className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition ${
            role === "employer"
              ? "border-[#1557ff] bg-blue-50 text-[#1557ff]"
              : "border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          <Building2 size={22} />
          <span className="text-sm font-bold">Nhà tuyển dụng</span>
        </button>
      </div>

      <form onSubmit={handleRegister} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="text-xs font-black uppercase text-slate-500">
            Họ và tên
          </label>
          <input
            id="fullName"
            placeholder="Nguyễn Văn A"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold outline-none focus:border-[#1557ff]"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-black uppercase text-slate-500">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold outline-none focus:border-[#1557ff]"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-xs font-black uppercase text-slate-500">
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            placeholder="Tối thiểu 6 ký tự"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold outline-none focus:border-[#1557ff]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1557ff] text-base font-bold text-white shadow-sm shadow-blue-500/25 hover:bg-[#0e3fd5] disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Đăng ký {role === "candidate" ? "ứng viên" : "nhà tuyển dụng"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Đã có tài khoản?{" "}
        <Link
          href="/dang-nhap"
          className="font-black text-[#1557ff] hover:underline"
        >
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
