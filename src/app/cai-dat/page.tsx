import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  CreditCard,
  Bell,
  ShieldCheck,
  Mail,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";
import { SettingsActions } from "@/components/account/settings-actions";
import { isPro as isProTier } from "@/lib/subscription";

export const metadata: Metadata = {
  title: "Cài đặt — YourCV",
};

export const dynamic = "force-dynamic";

export default async function CaiDatPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap?next=/cai-dat");

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "full_name, email, role, subscription_tier, subscription_expires_at, locale"
    )
    .eq("id", user.id)
    .maybeSingle();

  const isPro = isProTier(profile);

  return (
    <>
      <Header />
      <main className="bg-[#f8fbff] text-[#07122f]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              Settings
            </p>
            <h1
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Cài đặt tài khoản
            </h1>
          </header>

          <div className="space-y-5">
            {/* Account info */}
            <Section icon={User} title="Thông tin tài khoản">
              <Field label="Họ tên" value={profile?.full_name || "—"} />
              <Field label="Email" value={profile?.email ?? user.email ?? "—"} />
              <Field
                label="Vai trò"
                value={
                  profile?.role === "employer"
                    ? "Nhà tuyển dụng"
                    : profile?.role === "admin"
                      ? "Quản trị viên"
                      : "Ứng viên"
                }
              />
              <Field label="Ngôn ngữ" value={profile?.locale === "en" ? "English" : "Tiếng Việt"} />
              <p className="mt-3 text-xs text-slate-500">
                Để cập nhật thông tin chi tiết hơn, vào{" "}
                <Link href="/ho-so" className="font-bold text-[#1557ff] hover:underline">
                  Hồ sơ ứng viên
                </Link>
                .
              </p>
            </Section>

            {/* Subscription */}
            <Section icon={CreditCard} title="Gói &amp; thanh toán">
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-bold text-slate-700">
                    Gói hiện tại
                  </p>
                  <p
                    className={`mt-1 text-2xl font-black ${isPro ? "text-[#1557ff]" : "text-slate-700"}`}
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {isPro ? "YourCV Pro" : "Free"}
                  </p>
                  {isPro && profile?.subscription_expires_at && (
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      Hết hạn:{" "}
                      {new Date(profile.subscription_expires_at).toLocaleDateString("vi-VN")}
                    </p>
                  )}
                </div>
                <Link
                  href={isPro ? "/bang-gia" : "/nang-cap"}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1557ff] px-5 text-sm font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0e3fd5]"
                >
                  {isPro ? "Quản lý gói" : "Nâng cấp Pro"} <ArrowRight size={14} />
                </Link>
              </div>
              <Link
                href="/bang-gia"
                className="mt-4 inline-flex text-xs font-bold text-[#1557ff] hover:underline"
              >
                Xem chi tiết các gói →
              </Link>
            </Section>

            {/* Notification — placeholder for now, only displays defaults */}
            <Section icon={Bell} title="Thông báo">
              <ul className="space-y-2.5 text-sm">
                {[
                  ["Email khi có ứng viên ứng tuyển", true],
                  ["Email khi đơn ứng tuyển đổi trạng thái", true],
                  ["Email gợi ý job phù hợp hằng tuần", true],
                  ["Newsletter sản phẩm + cập nhật AI", false],
                ].map(([label, on]) => (
                  <li
                    key={String(label)}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/40 px-4 py-3"
                  >
                    <span className="text-slate-700">{String(label)}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${on ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}
                    >
                      {on ? "Bật" : "Tắt"}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Cấu hình notification chi tiết sẽ ra sớm. Hiện email vẫn được
                gửi qua Resend theo mặc định.
              </p>
            </Section>

            {/* Privacy */}
            <Section icon={ShieldCheck} title="Quyền riêng tư &amp; dữ liệu">
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  CV chỉ public khi bạn bật ở{" "}
                  <Link href="/ho-so" className="font-bold text-[#1557ff] hover:underline">
                    Hồ sơ
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  Nhà tuyển dụng chỉ thấy thông tin liên hệ sau khi bạn ứng tuyển
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  Dữ liệu lưu trên Supabase (Singapore region) — RLS chặt chẽ
                </li>
              </ul>
            </Section>

            {/* Sensitive */}
            <Section icon={Mail} title="Bảo mật &amp; tài khoản">
              <SettingsActions email={profile?.email ?? user.email ?? ""} />
            </Section>

            {/* Footer help */}
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6 text-center">
              <Sparkles className="mx-auto text-[#1557ff]" size={24} />
              <p className="mt-2 text-sm font-bold text-slate-700">
                Cần trợ giúp?
              </p>
              <Link
                href="/lien-he"
                className="mt-3 inline-flex h-10 items-center gap-1 rounded-full bg-[#1557ff] px-4 text-xs font-bold text-white shadow-md shadow-blue-500/25"
              >
                Liên hệ hỗ trợ <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#1557ff]">
          <Icon size={18} />
        </div>
        <h2
          className="text-lg font-black"
          style={{ fontFamily: "var(--font-headline)" }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-2.5 last:border-0">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <span className="text-sm font-bold text-slate-800">{value}</span>
    </div>
  );
}
