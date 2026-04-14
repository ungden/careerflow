"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, User, Building2 } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"candidate" | "employer">("candidate");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
      },
    });

    if (error) {
      toast.error("Đăng ký thất bại", {
        description: error.message,
      });
      setLoading(false);
      return;
    }

    toast.success("Đăng ký thành công!", {
      description: "Kiểm tra email để xác nhận tài khoản.",
    });
    router.push("/dang-nhap");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Đăng ký</CardTitle>
        <CardDescription>
          Tạo tài khoản miễn phí để bắt đầu
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Role selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole("candidate")}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
              role === "candidate"
                ? "border-primary bg-primary/5"
                : "border-muted hover:border-muted-foreground/20"
            }`}
          >
            <User
              className={`h-6 w-6 ${
                role === "candidate" ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                role === "candidate" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Ứng viên
            </span>
          </button>
          <button
            type="button"
            onClick={() => setRole("employer")}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
              role === "employer"
                ? "border-primary bg-primary/5"
                : "border-muted hover:border-muted-foreground/20"
            }`}
          >
            <Building2
              className={`h-6 w-6 ${
                role === "employer" ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                role === "employer" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Nhà tuyển dụng
            </span>
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input
              id="fullName"
              placeholder="Nguyễn Văn A"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              placeholder="Tối thiểu 6 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Đăng ký {role === "candidate" ? "ứng viên" : "nhà tuyển dụng"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link
            href="/dang-nhap"
            className="text-primary font-medium hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
