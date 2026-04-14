import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Hồ sơ cá nhân",
  description: "Quản lý hồ sơ cá nhân và cài đặt tài khoản CareerFlow.",
};

export default async function HoSoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dang-nhap");
  }

  const displayName = user.user_metadata?.full_name || user.email || "";
  const phone = user.user_metadata?.phone || "";
  const slug = user.user_metadata?.slug || "";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f9fb] pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Page Title */}
          <div className="mb-10">
            <h1
              className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[#191c1e]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Hồ sơ cá nhân
            </h1>
            <p className="text-[#434654] mt-2">
              Quản lý thông tin cá nhân và cài đặt tài khoản của bạn
            </p>
          </div>

          {/* Avatar Section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#003d9b]/20 to-[#003d9b]/5 flex items-center justify-center shrink-0">
                <span
                  className="text-3xl font-black text-[#003d9b]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {displayName.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <p
                  className="text-xl font-extrabold text-[#191c1e]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {displayName || "Chưa cập nhật tên"}
                </p>
                <p className="text-sm text-[#434654]">{user.email}</p>
                <button className="text-sm font-semibold text-[#003d9b] hover:underline">
                  Thay đổi ảnh đại diện
                </button>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 space-y-8">
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
                  defaultValue={displayName}
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
                  defaultValue={user.email || ""}
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
                  defaultValue={phone}
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
                    careerflow.vn/ung-vien/
                  </span>
                  <input
                    type="text"
                    defaultValue={slug}
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
                className="kinetic-gradient text-white font-extrabold text-base px-10 py-4 rounded-2xl shadow-lg hover:opacity-90 hover:scale-[1.02] transition-all"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
