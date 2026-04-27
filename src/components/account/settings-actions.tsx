"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, KeyRound, LogOut } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export function SettingsActions({ email }: { email: string }) {
  const router = useRouter();
  const [loadingPwd, setLoadingPwd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  async function sendPwdReset() {
    setLoadingPwd(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/cai-dat`,
    });
    setLoadingPwd(false);
    if (error) {
      toast.error("Không gửi được email", { description: error.message });
      return;
    }
    toast.success("Đã gửi email", { description: `Kiểm tra ${email}` });
  }

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  async function deleteData() {
    if (
      !confirm(
        "Xoá toàn bộ CV và dữ liệu của bạn? Hành động này không thể hoàn tác."
      )
    )
      return;
    setLoadingDelete(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Bạn đã đăng xuất");
      setLoadingDelete(false);
      return;
    }
    const { error } = await supabase.from("cvs").delete().eq("user_id", user.id);
    setLoadingDelete(false);
    if (error) {
      toast.error("Lỗi khi xoá dữ liệu");
      return;
    }
    toast.success("Đã xoá toàn bộ CV");
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <button
        onClick={sendPwdReset}
        disabled={loadingPwd}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:border-[#1557ff] hover:text-[#1557ff] disabled:opacity-60 sm:w-auto sm:px-5"
      >
        {loadingPwd ? <Loader2 className="animate-spin" size={14} /> : <KeyRound size={14} />}
        Gửi email đổi mật khẩu
      </button>
      <button
        onClick={logout}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:border-[#1557ff] hover:text-[#1557ff] sm:ml-2 sm:w-auto sm:px-5"
      >
        <LogOut size={14} />
        Đăng xuất
      </button>
      <button
        onClick={deleteData}
        disabled={loadingDelete}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-white text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-60 sm:ml-2 sm:w-auto sm:px-5"
      >
        {loadingDelete ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
        Xoá toàn bộ dữ liệu CV
      </button>
    </div>
  );
}
