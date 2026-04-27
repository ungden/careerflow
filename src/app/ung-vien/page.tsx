import type { Metadata } from "next";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";
import { CandidateCard } from "@/components/candidates/candidate-card";

export const metadata: Metadata = {
  title: "Ứng viên",
  description:
    "Khám phá ứng viên đã publish hồ sơ trên YourCV — kỹ năng, kinh nghiệm, mức lương kỳ vọng.",
};

export const dynamic = "force-dynamic";

const INDUSTRIES = [
  "Công nghệ thông tin",
  "Marketing - Truyền thông",
  "Tài chính - Ngân hàng",
  "Thiết kế - Sáng tạo",
];

function buildFilterUrl(
  current: { q?: string; industry?: string; location?: string },
  overrides: Partial<{ q?: string; industry?: string; location?: string }>
) {
  const merged = { ...current, ...overrides };
  const params = new URLSearchParams();
  if (merged.q) params.set("q", merged.q);
  if (merged.industry) params.set("industry", merged.industry);
  if (merged.location) params.set("location", merged.location);
  const qs = params.toString();
  return qs ? `/ung-vien?${qs}` : "/ung-vien";
}

export default async function UngVienPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; industry?: string; location?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("profiles")
    .select("*")
    .eq("is_published", true);
  if (params.q) {
    query = query.or(
      `full_name.ilike.%${params.q}%,headline.ilike.%${params.q}%`
    );
  }
  if (params.industry) query = query.eq("industry", params.industry);
  if (params.location) query = query.eq("location", params.location);

  const { data: candidates } = await query.order("published_at", {
    ascending: false,
  });

  return (
    <>
      <Header />
      <main className="bg-[#f8fbff] text-[#07122f]">
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-sm font-black uppercase tracking-wider text-[#1557ff]">
              Talent Pool
            </p>
            <h1
              className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Tìm kiếm ứng viên Việt
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
              {candidates?.length ?? 0} ứng viên đã public hồ sơ. Tìm theo
              ngành, kỹ năng, địa điểm.
            </p>
          </header>

          {/* Search */}
          <form
            action="/ung-vien"
            method="GET"
            className="mb-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:flex-row md:items-center"
          >
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3">
              <Search size={18} className="text-slate-400" />
              <input
                name="q"
                defaultValue={params.q ?? ""}
                placeholder="Tên, vị trí, kỹ năng..."
                className="h-11 flex-1 bg-transparent text-sm font-bold outline-none placeholder:font-normal placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 md:w-56">
              <MapPin size={18} className="text-slate-400" />
              <input
                name="location"
                defaultValue={params.location ?? ""}
                placeholder="Địa điểm"
                className="h-11 flex-1 bg-transparent text-sm font-bold outline-none placeholder:font-normal placeholder:text-slate-400"
              />
            </div>
            {params.industry && (
              <input type="hidden" name="industry" value={params.industry} />
            )}
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1557ff] px-6 text-sm font-bold text-white shadow-sm shadow-blue-500/25 hover:bg-[#0e3fd5]"
            >
              Tìm
            </button>
          </form>

          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-black uppercase tracking-wider text-slate-700">
                  Ngành nghề
                </p>
                <ul className="mt-3 space-y-1.5">
                  {INDUSTRIES.map((ind) => {
                    const active = params.industry === ind;
                    const href = buildFilterUrl(params, {
                      industry: active ? undefined : ind,
                    });
                    return (
                      <li key={ind}>
                        <Link
                          href={href}
                          className={`flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-bold ${
                            active
                              ? "bg-blue-50 text-[#1557ff]"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              active ? "bg-[#1557ff]" : "bg-slate-300"
                            }`}
                          />
                          {ind}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-5 shadow-sm">
                <p className="text-xs font-black uppercase text-[#1557ff]">
                  HR Tip
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Vào{" "}
                  <Link
                    href="/nha-tuyen-dung/pipeline"
                    className="font-black text-[#1557ff] hover:underline"
                  >
                    Recruitment Pipeline
                  </Link>{" "}
                  để quản lý ứng viên đã apply vào job của bạn.
                </p>
              </div>
            </aside>

            <div className="grid gap-4 sm:grid-cols-2">
              {(!candidates || candidates.length === 0) ? (
                <div className="sm:col-span-2 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                  <p className="text-base font-bold text-slate-700">
                    Chưa có ứng viên nào public.
                  </p>
                  <Link
                    href="/cv/moi"
                    className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-[#1557ff] px-4 text-sm font-bold text-white"
                  >
                    Hãy là người đầu tiên
                  </Link>
                </div>
              ) : (
                candidates.map((c) => <CandidateCard key={c.id} c={c} />)
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
