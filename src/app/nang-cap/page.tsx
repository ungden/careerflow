import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";
import { isPro as isProTier } from "@/lib/subscription";
import { UpgradeCheckoutButton } from "./checkout-button";

export const metadata: Metadata = {
  title: "Nâng cấp Pro",
  description:
    "YourCV Pro 99K/tháng — AI không giới hạn, 10 templates premium, không watermark, ưu tiên hiển thị.",
};

export const dynamic = "force-dynamic";

const benefits = [
  "Tất cả 10 templates premium (Classic, Modern, Tokyo, Berlin, Dubai...)",
  "Export PDF không watermark",
  "AI Review CV không giới hạn",
  "AI JD Match không giới hạn",
  "AI Cover Letter / Interview / Salary không giới hạn",
  "AI Rewrite Studio dùng thoải mái",
  "Ưu tiên hiển thị hồ sơ với nhà tuyển dụng",
  "Hỗ trợ ưu tiên qua email",
];

export default async function UpgradePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isPro = false;
  let expiresAt: string | null = null;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_tier, subscription_expires_at")
      .eq("id", user.id)
      .single();
    isPro = isProTier(profile);
    expiresAt = profile?.subscription_expires_at ?? null;
  }

  const { data: transactions } = user
    ? await supabase
        .from("transactions")
        .select("id, amount, currency, status, plan, paid_at, created_at, provider")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10)
    : { data: [] };

  return (
    <>
      <Header />
      <main className="bg-[#f8fbff] text-[#07122f]">
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              Billing &amp; Subscription
            </p>
            <h1
              className="mt-3 text-4xl font-black tracking-normal sm:text-5xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Nâng cấp YourCV Pro
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Đầu tư cho sự nghiệp với chỉ 99,000đ/tháng. Huỷ bất cứ lúc nào — thanh toán qua chuyển khoản (Sepay).
            </p>
          </div>

          {/* Pro card */}
          <div className="mx-auto max-w-2xl">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1557ff] via-[#3b6dff] to-emerald-500 p-10 text-white shadow-[0_24px_60px_-24px_rgba(21,87,255,0.5)]">
              <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-wider backdrop-blur">
                <Sparkles size={12} /> Phổ biến
              </span>
              <p className="text-sm font-black uppercase tracking-wider opacity-90">
                YourCV Pro
              </p>
              <p className="mt-3">
                <span
                  className="text-5xl font-black"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  99,000đ
                </span>
                <span className="ml-1 text-base font-bold opacity-90">/tháng</span>
              </p>
              <ul className="mt-6 space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 shrink-0" size={18} />
                    <span className="font-bold">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {isPro ? (
                  <div className="rounded-2xl bg-white/15 p-5 text-center backdrop-blur">
                    <p className="text-base font-black">Bạn đang dùng Pro</p>
                    {expiresAt && (
                      <p className="mt-1 text-xs font-bold opacity-90">
                        Hết hạn: {new Date(expiresAt).toLocaleDateString("vi-VN")}
                      </p>
                    )}
                  </div>
                ) : !user ? (
                  <Link
                    href="/dang-nhap?next=/nang-cap"
                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white text-base font-black text-[#1557ff] shadow-lg hover:opacity-90"
                  >
                    Đăng nhập để nâng cấp
                  </Link>
                ) : (
                  <UpgradeCheckoutButton />
                )}
              </div>
              <p className="mt-4 text-center text-xs font-bold opacity-80">
                Thanh toán nhanh qua chuyển khoản ngân hàng (Sepay)
              </p>
            </div>
          </div>

          {/* What's included */}
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "AI không giới hạn",
                body: "Review CV, JD Match, Cover Letter, Interview, Salary, Rewrite — dùng thoải mái cả tháng.",
              },
              {
                title: "Templates premium",
                body: "10 templates — Classic, Modern, Tokyo, Berlin, Dubai, Seoul, Milano, Creative, Executive, Minimal.",
              },
              {
                title: "Apply ưu tiên",
                body: "Hồ sơ Pro hiển thị trên đầu kết quả tìm kiếm của HR + huy hiệu Pro nổi bật.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
                  {c.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{c.body}</p>
              </div>
            ))}
          </div>

          {/* Transactions */}
          {user && (transactions ?? []).length > 0 && (
            <div className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-black uppercase tracking-wider text-slate-700">
                Lịch sử thanh toán
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs font-black uppercase text-slate-500">
                    <tr>
                      <th className="p-3">Ngày</th>
                      <th className="p-3">Gói</th>
                      <th className="p-3">Số tiền</th>
                      <th className="p-3">Trạng thái</th>
                      <th className="p-3">Provider</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(transactions ?? []).map((t) => {
                      const tone =
                        t.status === "succeeded"
                          ? "bg-emerald-100 text-emerald-700"
                          : t.status === "failed"
                            ? "bg-red-100 text-red-600"
                            : "bg-slate-100 text-slate-600";
                      return (
                        <tr key={t.id}>
                          <td className="p-3 text-slate-600">
                            {new Date(t.created_at).toLocaleDateString("vi-VN")}
                          </td>
                          <td className="p-3 font-bold capitalize">{t.plan ?? "—"}</td>
                          <td className="p-3 font-black text-[#1557ff]">
                            {t.amount?.toLocaleString("vi-VN")} {t.currency}
                          </td>
                          <td className="p-3">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-black ${tone}`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="p-3 capitalize text-slate-500">{t.provider}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FAQ */}
          <div className="mt-14 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/40 via-white to-emerald-50/30 p-6 sm:p-8">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">FAQ</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                {
                  q: "Có hợp đồng dài hạn không?",
                  a: "Không. Bạn trả 99K mỗi tháng và huỷ bất cứ lúc nào — quyền lợi tự động hết hạn cuối chu kỳ.",
                },
                {
                  q: "Thanh toán bằng cách nào?",
                  a: "Chuyển khoản ngân hàng qua Sepay — sinh QR động + nội dung tự động khớp giao dịch.",
                },
                {
                  q: "Có bao nhiêu lượt AI?",
                  a: "Pro: không giới hạn. Free: 1 review/tháng, 3 cover letter, 3 JD match, 5 phỏng vấn, 5 lương.",
                },
                {
                  q: "Hỗ trợ doanh nghiệp lớn?",
                  a: "Có gói Business cho công ty (đăng job + AI Shortlist) — liên hệ /lien-he để tư vấn.",
                },
              ].map((f) => (
                <div key={f.q} className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-black text-[#07122f]">{f.q}</p>
                  <p className="mt-1.5 text-xs leading-6 text-slate-600">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
