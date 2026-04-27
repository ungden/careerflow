import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Plus,
  Briefcase,
  Eye,
  Sparkles,
  Building2,
  Megaphone,
  ListChecks,
  Users,
  Bookmark,
  Mail,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/dang-nhap");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Employer dashboard branch
  if (profile?.role === "employer") {
    const { data: company } = await supabase
      .from("companies")
      .select("*")
      .eq("owner_id", user.id)
      .single();

    const { data: jobs } = await supabase
      .from("jobs")
      .select("id, views_count, applications_count, is_active")
      .eq("posted_by", user.id);

    const activeJobs = jobs?.filter((j) => j.is_active).length ?? 0;
    const totalApplications = jobs?.reduce((sum, j) => sum + (j.applications_count ?? 0), 0) ?? 0;
    const totalViews = jobs?.reduce((sum, j) => sum + (j.views_count ?? 0), 0) ?? 0;

    return (
      <div className="space-y-8">
        <div>
          <h1
            className="text-3xl font-black tracking-tight text-[#1557ff]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Dashboard nhà tuyển dụng
          </h1>
          <p className="text-slate-600 mt-1">
            Xin chào {profile?.full_name || "bạn"},{" "}
            {company
              ? `quản lý tin tuyển dụng của ${company.name}`
              : "hãy tạo hồ sơ công ty để bắt đầu đăng tin"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="card-elevated rounded-[24px] border-0">
            <CardContent className="p-6">
              <p className="text-sm text-slate-500 font-semibold">Tin đang active</p>
              <p
                className="text-4xl font-black text-[#1557ff] mt-2"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {activeJobs}
              </p>
            </CardContent>
          </Card>
          <Card className="card-elevated rounded-[24px] border-0">
            <CardContent className="p-6">
              <p className="text-sm text-slate-500 font-semibold">Tổng ứng tuyển</p>
              <p
                className="text-4xl font-black text-[#1557ff] mt-2"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {totalApplications}
              </p>
            </CardContent>
          </Card>
          <Card className="card-elevated rounded-[24px] border-0">
            <CardContent className="p-6">
              <p className="text-sm text-slate-500 font-semibold">Tổng lượt xem</p>
              <p
                className="text-4xl font-black text-[#1557ff] mt-2"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {totalViews}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick actions */}
        <div>
          <h2
            className="text-xl font-bold mb-4 text-[#0b1628]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Thao tác nhanh
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="card-elevated rounded-[24px] border-0 hover:-translate-y-1 transition-transform">
              <CardContent className="p-5">
                <Link href="/nha-tuyen-dung/cong-ty" className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1557ff]/10 text-[#1557ff]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">
                      {company ? "Quản lý công ty" : "Tạo công ty"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {company ? "Cập nhật thông tin" : "Bắt đầu tại đây"}
                    </p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-elevated rounded-[24px] border-0 hover:-translate-y-1 transition-transform">
              <CardContent className="p-5">
                <Link href="/nha-tuyen-dung/dang-tin" className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                    <Megaphone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Đăng tin tuyển dụng</p>
                    <p className="text-xs text-slate-500">Tiếp cận hàng ngàn ứng viên</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-elevated rounded-[24px] border-0 hover:-translate-y-1 transition-transform">
              <CardContent className="p-5">
                <Link href="/nha-tuyen-dung/tin-tuyen" className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                    <ListChecks className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Quản lý tin đã đăng</p>
                    <p className="text-xs text-slate-500">Chỉnh sửa, tạm dừng tin</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-elevated rounded-[24px] border-0 hover:-translate-y-1 transition-transform">
              <CardContent className="p-5">
                <Link href="/nha-tuyen-dung/tin-tuyen" className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Ứng viên đã ứng tuyển</p>
                    <p className="text-xs text-slate-500">Xem và phản hồi</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-elevated rounded-[24px] border-0 hover:-translate-y-1 transition-transform">
              <CardContent className="p-5">
                <Link href="/tin-nhan" className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Tin nhắn</p>
                    <p className="text-xs text-slate-500">Hộp thư đến</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {!company && (
          <Card className="card-elevated rounded-[24px] border-0 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6 flex flex-col items-start gap-4">
              <div>
                <h3
                  className="text-lg font-bold text-[#1557ff]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Bước tiếp theo: Tạo hồ sơ công ty
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Bạn cần tạo công ty trước khi có thể đăng tin tuyển dụng.
                </p>
              </div>
              <Link
                href="/nha-tuyen-dung/cong-ty"
                className="kinetic-gradient text-white font-bold text-sm px-6 py-3 rounded-xl"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Tạo công ty ngay
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Candidate dashboard (original)
  const { data: cvs } = await supabase
    .from("cvs")
    .select("id, title, template_id, is_primary, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Xin chào, {profile?.full_name || "bạn"} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Quản lý CV và tìm kiếm việc làm tại đây
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <Link href="/cv/moi" className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Tạo CV mới</p>
                <p className="text-xs text-muted-foreground">Chọn template và bắt đầu</p>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <Link href="/viec-lam" className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Tìm việc làm</p>
                <p className="text-xs text-muted-foreground">Browse và ứng tuyển</p>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <Link
              href={profile?.slug ? `/ung-vien/${profile.slug}` : "/ho-so"}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                <Eye className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Profile công khai</p>
                <p className="text-xs text-muted-foreground">
                  {profile?.is_published ? "Đang hiển thị" : "Chưa publish"}
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <Link href="/cong-cu/danh-gia-cv" className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">AI Review CV</p>
                <p className="text-xs text-muted-foreground">Cải thiện CV với AI</p>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <Link href="/viec-da-luu" className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
                <Bookmark className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Việc đã lưu</p>
                <p className="text-xs text-muted-foreground">Xem lại việc làm yêu thích</p>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <Link href="/tin-nhan" className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Tin nhắn</p>
                <p className="text-xs text-muted-foreground">Hộp thư đến</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* My CVs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">CV của tôi</h2>
          <Link href="/cv/moi" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Plus className="h-4 w-4 mr-1" />
              Tạo mới
          </Link>
        </div>

        {cvs && cvs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cvs.map((cv) => (
              <Card key={cv.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{cv.title}</CardTitle>
                      <CardDescription className="text-xs">
                        Template: {cv.template_id}
                        {cv.is_primary && " • Chính"}
                      </CardDescription>
                    </div>
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={`/cv/${cv.id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full")}>Chỉnh sửa</Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="font-semibold mb-1">Chưa có CV nào</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tạo CV đầu tiên của bạn ngay bây giờ
              </p>
              <Link href="/cv/moi" className={buttonVariants()}>
                  <Plus className="h-4 w-4 mr-1" />
                  Tạo CV mới
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
