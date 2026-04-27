import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = {
  title: "Hồ sơ ứng viên",
  description: "Quản lý hồ sơ cá nhân và cài đặt YourCV.",
};

export const dynamic = "force-dynamic";

export default async function HoSoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap?next=/ho-so");

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "full_name, email, phone, slug, headline, industry, experience_level, location, avatar_url, is_published, availability, salary_expectation_min, salary_expectation_max, preferred_locations"
    )
    .eq("id", user.id)
    .maybeSingle();

  const displayName = profile?.full_name || user.user_metadata?.full_name || user.email || "";
  const phone = profile?.phone || user.user_metadata?.phone || "";
  const slug = profile?.slug || "";
  const initials = displayName.split(/\s+/).filter(Boolean).map((w: string) => w[0]).slice(-2).join("").toUpperCase() || "U";

  return (
    <main className="bg-[#f8fbff] text-[#07122f]">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
            Profile
          </p>
          <h1
            className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Hồ sơ ứng viên
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            Hồ sơ này hiển thị công khai khi bạn bật &quot;Public&quot; — nhà tuyển dụng có thể tìm bạn theo ngành, kỹ năng, địa điểm.
          </p>
        </header>

        {/* Avatar + summary card */}
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-50 via-white to-emerald-50 ring-4 ring-blue-50">
              {profile?.avatar_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={profile.avatar_url}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span
                  className="text-3xl font-black text-[#1557ff]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {initials}
                </span>
              )}
            </div>
            <div className="flex-1">
              <p
                className="text-xl font-black"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {displayName || "Chưa cập nhật tên"}
              </p>
              <p className="mt-0.5 text-sm font-bold text-slate-500">{user.email}</p>
              {profile?.headline && (
                <p className="mt-1 text-sm font-bold text-[#1557ff]">{profile.headline}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                {profile?.is_published ? (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 font-black text-emerald-700">
                    ● Public
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-black text-slate-500">
                    ○ Private
                  </span>
                )}
                {profile?.availability === "open" && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 font-bold text-[#1557ff]">
                    Sẵn sàng nhận việc
                  </span>
                )}
                {profile?.location && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-bold text-slate-600">
                    {profile.location}
                  </span>
                )}
                {profile?.industry && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-bold text-slate-600">
                    {profile.industry}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
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
  );
}
