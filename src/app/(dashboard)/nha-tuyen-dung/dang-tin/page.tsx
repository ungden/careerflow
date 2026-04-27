import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { JobForm } from "./job-form";

export default async function DangTinPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/dang-nhap");

  const { data: company } = await supabase
    .from("companies")
    .select("id, name")
    .eq("owner_id", user.id)
    .single();

  if (!company) {
    redirect("/nha-tuyen-dung/cong-ty");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1
          className="text-3xl font-black tracking-tight text-[#1557ff]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Đăng tin tuyển dụng
        </h1>
        <p className="text-slate-600 mt-1">
          Công ty: <span className="font-semibold text-[#0b1628]">{company.name}</span>
        </p>
      </div>

      <JobForm userId={user.id} companyId={company.id} />
    </div>
  );
}
