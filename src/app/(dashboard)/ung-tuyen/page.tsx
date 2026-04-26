import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đơn ứng tuyển của tôi",
  description: "Theo dõi trạng thái các đơn ứng tuyển của bạn trên YourCV",
};

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  pending: { label: "Chờ xử lý", bg: "bg-yellow-100", text: "text-yellow-800" },
  viewed: { label: "Đã xem", bg: "bg-blue-100", text: "text-blue-800" },
  shortlisted: { label: "Vào vòng chọn", bg: "bg-green-100", text: "text-green-800" },
  rejected: { label: "Từ chối", bg: "bg-red-100", text: "text-red-800" },
  hired: { label: "Trúng tuyển", bg: "bg-green-100", text: "text-green-800" },
};

export default async function UngTuyenPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dang-nhap");
  }

  const { data: applications } = await supabase
    .from("applications")
    .select("*, job:jobs(*, company:companies(name))")
    .eq("candidate_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto">
      <h1
        className="text-3xl font-extrabold tracking-tight text-[#1a1a1a] mb-8"
        style={{ fontFamily: "var(--font-headline)" }}
      >
        Đơn ứng tuyển của tôi
      </h1>

      {!applications || applications.length === 0 ? (
        <div className="bg-white rounded-[24px] p-12 text-center space-y-4 shadow-sm">
          <p
            className="text-xl font-extrabold text-[#191c1e]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Chưa có đơn ứng tuyển nào
          </p>
          <p className="text-sm text-[#434654]">
            Bạn chưa ứng tuyển vị trí nào. Hãy khám phá các cơ hội việc làm ngay!
          </p>
          <Link
            href="/viec-lam"
            className="inline-block kinetic-gradient text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg hover:opacity-90 transition-all mt-2"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Tìm việc làm
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const job = app.job as any;
            const companyName = job?.company?.name ?? "Công ty";
            const status = STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;
            const appliedDate = new Date(app.created_at).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            return (
              <div
                key={app.id}
                className="bg-white rounded-[24px] p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-4"
              >
                {/* Company initial */}
                <div className="w-12 h-12 rounded-2xl bg-[#f3f4f6] flex items-center justify-center shrink-0">
                  <span className="text-lg font-black text-[#003d9b]/30">
                    {companyName.charAt(0)}
                  </span>
                </div>

                {/* Job info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/viec-lam/${job?.slug || ""}`}
                    className="text-base font-bold text-[#1a1a1a] hover:text-[#003d9b] transition-colors"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {job?.title || "Vị trí không xác định"}
                  </Link>
                  <p className="text-sm text-[#434654] mt-0.5">{companyName}</p>
                </div>

                {/* Date */}
                <div className="text-sm text-[#999] shrink-0">
                  Ngày ứng tuyển: {appliedDate}
                </div>

                {/* Status badge */}
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${status.bg} ${status.text}`}
                >
                  {status.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
