import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProfileForm } from "./profile-form";

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
          <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10">
            <ProfileForm
              userId={user.id}
              initialName={displayName}
              email={user.email || ""}
              initialPhone={phone}
              initialSlug={slug}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
