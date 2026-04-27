import { redirect } from "next/navigation";

export default function V2LoginRedirect() {
  redirect("/dang-nhap?next=/v2/candidate/dashboard");
}
