import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText, Calendar } from "lucide-react";
import { ApplicationStatusControl } from "./application-status-control";

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

export default async function UngTuyenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: jobId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/dang-nhap");

  const { data: job } = await supabase
    .from("jobs")
    .select("id, title, posted_by")
    .eq("id", jobId)
    .single();

  if (!job) notFound();
  if (job.posted_by !== user.id) {
    redirect("/nha-tuyen-dung/tin-tuyen");
  }

  const { data: applications } = await supabase
    .from("applications")
    .select("*, candidate:profiles(*), cv:cvs(*)")
    .eq("job_id", jobId)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <Link
          href="/nha-tuyen-dung/tin-tuyen"
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-[#1557ff] mb-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách tin
        </Link>
        <h1
          className="text-3xl font-black tracking-tight text-[#1557ff]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Ứng viên ứng tuyển
        </h1>
        <p className="text-slate-600 mt-1">
          Vị trí: <span className="font-semibold text-[#0b1628]">{job.title}</span>
        </p>
      </div>

      {!applications || applications.length === 0 ? (
        <Card className="card-elevated rounded-[24px] border-0">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <h3
              className="text-xl font-bold text-[#0b1628] mb-2"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Chưa có ứng viên nào
            </h3>
            <p className="text-sm text-slate-500 max-w-sm">
              Tin của bạn đang chờ ứng viên. Hãy kiểm tra lại sau hoặc chia sẻ để tăng lượt tiếp cận.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => {
            const candidate = app.candidate as {
              id: string;
              full_name?: string;
              avatar_url?: string;
              headline?: string;
              slug?: string;
            } | null;
            const cv = app.cv as { id: string; title: string } | null;
            return (
              <Card
                key={app.id}
                className="card-elevated rounded-[24px] border-0"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 flex-wrap">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#1557ff] to-[#0066ff] flex items-center justify-center text-white font-black text-lg overflow-hidden shrink-0">
                      {candidate?.avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={candidate.avatar_url}
                          alt={candidate.full_name || ""}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        (candidate?.full_name || "?").charAt(0).toUpperCase()
                      )}
                    </div>

                    <div className="flex-1 min-w-[220px]">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3
                          className="text-lg font-bold text-[#0b1628]"
                          style={{ fontFamily: "var(--font-headline)" }}
                        >
                          {candidate?.full_name || "Ứng viên ẩn danh"}
                        </h3>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(app.created_at)}
                        </span>
                      </div>
                      {candidate?.headline && (
                        <p className="text-sm text-slate-600 mt-1">{candidate.headline}</p>
                      )}
                      {app.cover_letter && (
                        <p className="text-sm text-slate-600 mt-3 bg-slate-50 rounded-xl p-3 line-clamp-3">
                          {app.cover_letter}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-4 flex-wrap">
                        {cv?.id && (
                          <Link
                            href={`/cv/${cv.id}`}
                            className="inline-flex items-center gap-1 text-sm font-bold text-[#1557ff] hover:underline"
                          >
                            <FileText className="h-4 w-4" />
                            Xem CV
                          </Link>
                        )}
                        {candidate?.slug && (
                          <Link
                            href={`/ung-vien/${candidate.slug}`}
                            className="text-sm font-semibold text-slate-600 hover:text-[#1557ff]"
                          >
                            Hồ sơ ứng viên
                          </Link>
                        )}
                      </div>
                    </div>

                    <ApplicationStatusControl
                      applicationId={app.id}
                      initialStatus={app.status || "pending"}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
