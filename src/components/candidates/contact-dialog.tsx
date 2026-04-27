"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContactDialogProps {
  candidateId: string;
  candidateName: string;
}

export function ContactDialog({ candidateId, candidateName }: ContactDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject.trim()) {
      toast.error("Vui lòng nhập tiêu đề tin nhắn");
      return;
    }
    if (!content.trim()) {
      toast.error("Vui lòng nhập nội dung tin nhắn");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Vui lòng đăng nhập để liên hệ ứng viên");
      setLoading(false);
      router.push("/dang-nhap");
      return;
    }

    if (user.id === candidateId) {
      toast.error("Bạn không thể gửi tin nhắn cho chính mình");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("messages").insert({
      from_user_id: user.id,
      to_user_id: candidateId,
      subject: subject.trim(),
      content: content.trim(),
      context_type: "candidate_contact",
      context_id: candidateId,
      is_read: false,
    });

    if (error) {
      toast.error("Gửi tin nhắn thất bại. Vui lòng thử lại.");
      setLoading(false);
      return;
    }

    toast.success(`Đã gửi tin nhắn đến ${candidateName}`);
    setSubject("");
    setContent("");
    setOpen(false);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="kinetic-gradient text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all cursor-pointer"
        style={{ fontFamily: "var(--font-headline)" }}
      >
        Liên hệ ứng viên
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-[#1557ff]">
            Liên hệ {candidateName}
          </DialogTitle>
          <DialogDescription>
            Gửi tin nhắn trực tiếp để trao đổi về cơ hội nghề nghiệp.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <label
              htmlFor="contact-subject"
              className="text-sm font-semibold text-[#1a1a1a]"
            >
              Tiêu đề
            </label>
            <input
              id="contact-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ví dụ: Cơ hội việc làm tại công ty ABC"
              className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#999] outline-none focus:ring-2 focus:ring-[#1557ff]/20"
              maxLength={200}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="contact-content"
              className="text-sm font-semibold text-[#1a1a1a]"
            >
              Nội dung tin nhắn
            </label>
            <textarea
              id="contact-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Giới thiệu ngắn về công ty, vị trí tuyển dụng và lý do bạn muốn liên hệ với ứng viên này..."
              rows={6}
              className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#999] outline-none resize-none focus:ring-2 focus:ring-[#1557ff]/20"
              maxLength={2000}
            />
            <p className="text-[11px] text-[#999] text-right">
              {content.length}/2000
            </p>
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full kinetic-gradient text-white font-bold text-sm py-3 rounded-xl shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            {loading ? "Đang gửi..." : "Gửi tin nhắn"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
