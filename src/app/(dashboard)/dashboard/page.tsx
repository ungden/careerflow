import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, Briefcase, Eye, Sparkles } from "lucide-react";

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
