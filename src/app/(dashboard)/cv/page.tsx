import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Plus, Pencil, Trash2 } from "lucide-react";

export default async function CVListPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/dang-nhap");

  const { data: cvs } = await supabase
    .from("cvs")
    .select("id, title, template_id, is_primary, updated_at, created_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">CV của tôi</h1>
          <p className="text-muted-foreground text-sm">
            Quản lý tất cả CV của bạn
          </p>
        </div>
        <Link href="/cv/moi" className={buttonVariants()}>
            <Plus className="h-4 w-4 mr-1" />
            Tạo CV mới
        </Link>
      </div>

      {cvs && cvs.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cvs.map((cv) => (
            <Card key={cv.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="aspect-[210/297] bg-muted rounded-md mb-2 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground/30" />
                </div>
                <CardTitle className="text-base">{cv.title}</CardTitle>
                <CardDescription className="text-xs">
                  Template: {cv.template_id}
                  {cv.is_primary && " • CV chính"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Link href={`/cv/${cv.id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1")}>
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      Chỉnh sửa
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="font-semibold text-lg mb-1">Bắt đầu tạo CV</h3>
            <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
              Tạo CV chuyên nghiệp đầu tiên của bạn chỉ trong vài phút
            </p>
            <Link href="/cv/moi" className={buttonVariants({ size: "lg" })}>
                <Plus className="h-4 w-4 mr-2" />
                Tạo CV mới
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
