import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Inbox } from "lucide-react";
import { MessageList } from "./message-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin nhắn",
  description: "Hộp thư đến trên YourCV",
};

export default async function MessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/dang-nhap?redirect=/tin-nhan");

  const { data: messages } = await supabase
    .from("messages")
    .select("*, from:profiles!messages_from_user_id_fkey(*)")
    .eq("to_user_id", user.id)
    .order("created_at", { ascending: false });

  const validMessages = messages || [];
  const unreadCount = validMessages.filter((m: any) => !m.is_read).length;

  return (
    <div className="space-y-8">
      <div>
        <h1
          className="text-3xl font-black tracking-tight text-[#003d9b]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Tin nhắn
        </h1>
        <p className="text-slate-600 mt-1">
          {validMessages.length === 0
            ? "Hộp thư đến của bạn chưa có tin nhắn nào"
            : unreadCount > 0
            ? `Bạn có ${unreadCount} tin nhắn chưa đọc trong tổng số ${validMessages.length} tin nhắn`
            : `Tổng cộng ${validMessages.length} tin nhắn trong hộp thư`}
        </p>
      </div>

      {validMessages.length === 0 ? (
        <div className="bg-white rounded-[24px] p-12 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#e8f0fe] flex items-center justify-center mb-4">
            <Inbox className="h-7 w-7 text-[#003d9b]" />
          </div>
          <h3
            className="text-lg font-bold text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Hộp thư trống
          </h3>
          <p className="text-sm text-slate-500 mt-2 max-w-md">
            Khi nhà tuyển dụng hoặc ứng viên liên hệ với bạn, tin nhắn sẽ xuất
            hiện tại đây.
          </p>
        </div>
      ) : (
        <MessageList messages={validMessages as any} />
      )}
    </div>
  );
}
