import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CompanyForm } from "./company-form";

export default async function CongTyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/dang-nhap");

  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1
          className="text-3xl font-black tracking-tight text-[#003d9b]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          {company ? "Hồ sơ công ty" : "Tạo hồ sơ công ty"}
        </h1>
        <p className="text-slate-600 mt-1">
          Thông tin này sẽ hiển thị trên các tin tuyển dụng bạn đăng.
        </p>
      </div>

      <CompanyForm userId={user.id} initialCompany={company} />
    </div>
  );
}
