"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ProfileFormProps {
  userId: string;
  initialName: string;
  email: string;
  initialPhone: string;
  initialSlug: string;
}

export function ProfileForm({
  userId,
  initialName,
  email,
  initialPhone,
  initialSlug,
}: ProfileFormProps) {
  const [fullName, setFullName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [slug, setSlug] = useState(initialSlug);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const supabase = createClient();

      // Update user metadata via auth
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone,
          slug,
        },
      });

      if (authError) {
        toast.error("Lưu thất bại", {
          description: authError.message,
        });
        setSaving(false);
        return;
      }

      // Also update profiles table if it exists
      await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          phone,
          slug,
        })
        .eq("id", userId);

      toast.success("Đã lưu thành công", {
        description: "Thông tin hồ sơ của bạn đã được cập nhật.",
      });
    } catch {
      toast.error("Đã xảy ra lỗi", {
        description: "Vui lòng thử lại sau.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <h2
        className="text-xl font-extrabold text-[#191c1e]"
        style={{ fontFamily: "var(--font-headline)" }}
      >
        Thông tin cá nhân
      </h2>

      <div className="space-y-6">
        {/* Họ tên */}
        <div className="space-y-2">
          <label
            className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Họ và tên
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nhập họ và tên"
            className="w-full bg-[#f3f4f6] rounded-2xl px-5 py-3.5 text-sm text-[#191c1e] placeholder:text-[#434654]/40 outline-none focus:ring-2 focus:ring-[#003d9b]/20 transition-all"
          />
        </div>

        {/* Email (read-only) */}
        <div className="space-y-2">
          <label
            className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Email
          </label>
          <input
            type="email"
            defaultValue={email}
            disabled
            className="w-full bg-[#f3f4f6] rounded-2xl px-5 py-3.5 text-sm text-[#434654] outline-none cursor-not-allowed"
          />
          <p className="text-xs text-[#434654]/60">
            Email không thể thay đổi
          </p>
        </div>

        {/* Số điện thoại */}
        <div className="space-y-2">
          <label
            className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Số điện thoại
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nhập số điện thoại"
            className="w-full bg-[#f3f4f6] rounded-2xl px-5 py-3.5 text-sm text-[#191c1e] placeholder:text-[#434654]/40 outline-none focus:ring-2 focus:ring-[#003d9b]/20 transition-all"
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label
            className="text-sm font-extrabold text-[#191c1e] uppercase tracking-wide"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Đường dẫn hồ sơ (slug)
          </label>
          <div className="flex items-center gap-0">
            <span className="bg-[#e5e7eb] rounded-l-2xl px-4 py-3.5 text-sm text-[#434654] border-r border-[#d1d5db]">
              yourcv.net/ung-vien/
            </span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ten-cua-ban"
              className="flex-1 bg-[#f3f4f6] rounded-r-2xl px-5 py-3.5 text-sm text-[#191c1e] placeholder:text-[#434654]/40 outline-none focus:ring-2 focus:ring-[#003d9b]/20 transition-all"
            />
          </div>
          <p className="text-xs text-[#434654]/60">
            Đường dẫn công khai đến hồ sơ của bạn. Chỉ sử dụng chữ thường, số và dấu gạch ngang.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="kinetic-gradient text-white font-extrabold text-base px-10 py-4 rounded-2xl shadow-lg hover:opacity-90 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Lưu thay đổi
        </button>
      </div>
    </form>
  );
}
