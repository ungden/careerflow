import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";
import { isPro as isProTier } from "@/lib/subscription";

export const metadata: Metadata = {
  title: "Bảng giá",
  description:
    "Free dùng thử AI CV review + JD match + cover letter. Pro 99K/tháng dùng không giới hạn, 10 templates, không watermark.",
};

export const dynamic = "force-dynamic";

const FREE = [
  "2 templates miễn phí (Classic, Modern)",
  "1 lượt AI CV review / tháng",
  "3 lượt JD Match / tháng",
  "3 lượt AI Cover Letter / tháng",
  "5 lượt AI Phỏng vấn / tháng",
  "5 lượt AI Lương thị trường / tháng",
  "Apply 1-click vào job phù hợp",
  "Hồ sơ public chia sẻ link",
];

const PRO = [
  "Tất cả 10 templates Premium",
  "AI không giới hạn (cả 5 công cụ)",
  "Export PDF không watermark",
  "Ưu tiên hiển thị với nhà tuyển dụng",
  "Hỗ trợ ưu tiên qua email",
  "Áp dụng ngay sau khi thanh toán Sepay",
];

export default async function BangGiaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let isPro = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_tier, subscription_expires_at")
      .eq("id", user.id)
      .maybeSingle();
    isPro = isProTier(profile);
  }

  return (
    <>
      <Header />
      <main className="bg-[#f8fbff] text-[#07122f]">
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              Pricing
            </p>
            <h1
              className="mt-3 text-4xl font-black tracking-normal sm:text-5xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Bắt đầu miễn phí. Nâng cấp khi bạn cần thêm.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Free đủ dùng cho 1-2 vị trí ứng tuyển/tháng. Pro cho người
              nghiêm túc tìm việc — AI không giới hạn, templates đẹp, không
              watermark.
            </p>
            {user && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm">
                Gói hiện tại:{" "}
                <span className={`font-black ${isPro ? "text-[#1557ff]" : "text-slate-700"}`}>
                  {isPro ? "Pro" : "Free"}
                </span>
              </div>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Free */}
            <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs font-black uppercase text-slate-500">Free</p>
              <h2
                className="mt-2 text-2xl font-black"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Hoàn hảo để bắt đầu
              </h2>
              <p className="mt-4 flex items-baseline gap-1">
                <span
                  className="text-5xl font-black"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  0đ
                </span>
                <span className="text-sm font-bold text-slate-500">/tháng</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {FREE.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="mt-0.5 shrink-0 text-emerald-600" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
              {!user ? (
                <Link
                  href="/dang-ky"
                  className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-md border border-[#1557ff] bg-white text-base font-bold text-[#1557ff] hover:bg-blue-50"
                >
                  Bắt đầu miễn phí
                </Link>
              ) : !isPro ? (
                <div className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-md bg-slate-100 text-base font-bold text-slate-600">
                  Đang sử dụng
                </div>
              ) : (
                <Link
                  href="/cv/moi"
                  className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-md border border-slate-200 bg-white text-base font-bold text-slate-700"
                >
                  Tạo CV mới
                </Link>
              )}
            </div>

            {/* Pro */}
            <div className="relative flex flex-col rounded-lg border-2 border-[#1557ff] bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-8 shadow-md">
              <div className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-md bg-emerald-500 px-2 py-1 text-xs font-black text-white">
                <Sparkles size={12} /> Phổ biến
              </div>
              <p className="text-xs font-black uppercase text-[#1557ff]">YourCV Pro</p>
              <h2
                className="mt-2 text-2xl font-black"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Cho người nghiêm túc với sự nghiệp
              </h2>
              <p className="mt-4 flex items-baseline gap-1">
                <span
                  className="text-5xl font-black text-[#1557ff]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  99,000đ
                </span>
                <span className="text-sm font-bold text-slate-500">/tháng</span>
              </p>
              <p className="mt-1 text-xs font-bold text-emerald-600">
                Huỷ bất cứ lúc nào.
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {PRO.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="mt-0.5 shrink-0 text-emerald-600" size={18} />
                    <span className="font-bold">{item}</span>
                  </li>
                ))}
              </ul>
              {isPro ? (
                <div className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-md bg-[#1557ff]/15 text-base font-bold text-[#1557ff]">
                  Bạn đang dùng Pro
                </div>
              ) : (
                <Link
                  href={user ? "/nang-cap" : "/dang-nhap?next=/nang-cap"}
                  className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#1557ff] text-base font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0e3fd5]"
                >
                  Nâng cấp Pro
                </Link>
              )}
              <p className="mt-3 text-center text-xs text-slate-500">
                Thanh toán bằng chuyển khoản ngân hàng (Sepay)
              </p>
            </div>
          </div>

          {/* Compare table - quick */}
          <div className="mt-16">
            <h2
              className="text-2xl font-black"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              So sánh chi tiết
            </h2>
            <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="p-4 font-black uppercase text-slate-500">Tính năng</th>
                    <th className="p-4 font-black uppercase text-slate-500">Free</th>
                    <th className="p-4 font-black uppercase text-[#1557ff]">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ["Số templates", "2", "10"],
                    ["AI CV Review", "1/tháng", "Không giới hạn"],
                    ["JD Match", "3/tháng", "Không giới hạn"],
                    ["AI Cover Letter", "3/tháng", "Không giới hạn"],
                    ["AI Phỏng vấn", "5/tháng", "Không giới hạn"],
                    ["AI Lương thị trường", "5/tháng", "Không giới hạn"],
                    ["Watermark khi export", "Có", "Không"],
                    ["Hồ sơ public chia sẻ", "Có", "Có"],
                    ["Apply 1-click", "Có", "Có"],
                  ].map(([feat, free, pro]) => (
                    <tr key={feat}>
                      <td className="p-4 font-bold">{feat}</td>
                      <td className="p-4 text-slate-600">{free}</td>
                      <td className="p-4 font-bold text-[#1557ff]">{pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
