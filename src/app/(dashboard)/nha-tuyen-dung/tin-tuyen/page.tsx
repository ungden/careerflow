import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Users, MapPin, Megaphone, Plus } from "lucide-react";
import { JobActiveToggle } from "./job-active-toggle";

export default async function TinTuyenPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/dang-nhap");

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*, applications_count")
    .eq("posted_by", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-3xl font-black tracking-tight text-[#003d9b]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Tin tuyển dụng của bạn
          </h1>
          <p className="text-slate-600 mt-1">
            Quản lý toàn bộ tin đã đăng và xem ứng viên đã ứng tuyển.
          </p>
        </div>
        <Link
          href="/nha-tuyen-dung/dang-tin"
          className="kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          <Plus className="h-4 w-4" />
          Đăng tin mới
        </Link>
      </div>

      {!jobs || jobs.length === 0 ? (
        <Card className="card-elevated rounded-[24px] border-0">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#003d9b]/10 text-[#003d9b] mb-4">
              <Megaphone className="h-8 w-8" />
            </div>
            <h3
              className="text-xl font-bold text-[#0b1628] mb-2"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Chưa có tin tuyển dụng nào
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm">
              Hãy đăng tin đầu tiên để tiếp cận hàng ngàn ứng viên tiềm năng trên CareerFlow.
            </p>
            <Link
              href="/nha-tuyen-dung/dang-tin"
              className="kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Đăng tin đầu tiên
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="card-elevated rounded-[24px] border-0 hover:-translate-y-0.5 transition-transform"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex-1 min-w-[280px]">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3
                        className="text-lg font-bold text-[#0b1628]"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {job.title}
                      </h3>
                      <JobActiveToggle jobId={job.id} initialActive={job.is_active} />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-2 flex-wrap">
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {job.views_count ?? 0} lượt xem
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {job.applications_count ?? 0} ứng tuyển
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      href={`/viec-lam/${job.slug}`}
                      className="text-sm font-semibold text-slate-600 hover:text-[#003d9b] px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Chỉnh sửa
                    </Link>
                    <Link
                      href={`/nha-tuyen-dung/tin-tuyen/${job.id}/ung-tuyen`}
                      className="text-sm font-bold text-white bg-[#003d9b] px-4 py-2 rounded-lg hover:bg-[#002d77] transition-colors"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      Xem ứng tuyển
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
