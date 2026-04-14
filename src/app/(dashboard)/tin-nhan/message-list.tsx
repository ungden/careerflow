"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, MailOpen, ChevronDown, ChevronUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Message {
  id: string;
  subject: string | null;
  content: string;
  context_type: string | null;
  is_read: boolean;
  created_at: string;
  from: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    headline: string | null;
    slug: string | null;
  } | null;
}

const CONTEXT_LABELS: Record<string, string> = {
  candidate_contact: "Liên hệ ứng viên",
  job_application: "Ứng tuyển việc làm",
  general: "Tin nhắn chung",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    return `Hôm nay ${d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;
  }
  if (diffDays === 1) return "Hôm qua";
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return d.toLocaleDateString("vi-VN");
}

export function MessageList({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [localMessages, setLocalMessages] = useState(messages);

  const handleToggle = async (msg: Message) => {
    const willExpand = expandedId !== msg.id;
    setExpandedId(willExpand ? msg.id : null);

    if (willExpand && !msg.is_read) {
      const supabase = createClient();
      const { error } = await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("id", msg.id);

      if (!error) {
        setLocalMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m))
        );
        router.refresh();
      }
    }
  };

  return (
    <div className="space-y-3">
      {localMessages.map((msg) => {
        const isExpanded = expandedId === msg.id;
        const senderName = msg.from?.full_name || "Người dùng ẩn danh";
        const initials = senderName
          .split(" ")
          .map((w) => w[0])
          .slice(-2)
          .join("")
          .toUpperCase();

        return (
          <div
            key={msg.id}
            className={`bg-white rounded-[20px] shadow-sm hover:shadow-md transition-all overflow-hidden ${
              !msg.is_read ? "border-l-4 border-[#003d9b]" : ""
            }`}
          >
            <button
              onClick={() => handleToggle(msg)}
              className="w-full p-5 flex items-start gap-4 text-left"
            >
              <div className="w-11 h-11 rounded-full bg-[#e8f0fe] flex items-center justify-center shrink-0 overflow-hidden">
                {msg.from?.avatar_url ? (
                  <img
                    src={msg.from.avatar_url}
                    alt={senderName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-[#003d9b]">
                    {initials || "?"}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[14px] ${
                      !msg.is_read
                        ? "font-bold text-[#1a1a1a]"
                        : "font-semibold text-[#555]"
                    }`}
                  >
                    {senderName}
                  </span>
                  {msg.from?.headline && (
                    <span className="text-[11px] text-[#999]">
                      · {msg.from.headline}
                    </span>
                  )}
                  {!msg.is_read && (
                    <span className="px-2 py-0.5 bg-[#003d9b] text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Mới
                    </span>
                  )}
                </div>

                <p
                  className={`text-[14px] mt-1 ${
                    !msg.is_read ? "font-bold text-[#1a1a1a]" : "text-[#333]"
                  }`}
                >
                  {msg.subject || "(Không có tiêu đề)"}
                </p>

                {!isExpanded && (
                  <p className="text-[12px] text-[#777] mt-1 line-clamp-1">
                    {msg.content}
                  </p>
                )}

                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px] text-[#999]">
                    {formatDate(msg.created_at)}
                  </span>
                  {msg.context_type && (
                    <span className="px-2 py-0.5 bg-[#f3f4f6] text-[#555] rounded-full text-[10px] font-medium">
                      {CONTEXT_LABELS[msg.context_type] || msg.context_type}
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-[#999]">
                {msg.is_read ? (
                  <MailOpen className="h-4 w-4" />
                ) : (
                  <Mail className="h-4 w-4 text-[#003d9b]" />
                )}
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </button>

            {isExpanded && (
              <div className="px-5 pb-5 pl-20">
                <div className="pt-4 border-t border-[#f0f0f0]">
                  <p className="text-[13px] text-[#333] leading-[1.8] whitespace-pre-line">
                    {msg.content}
                  </p>
                  {msg.from?.slug && (
                    <a
                      href={`/ung-vien/${msg.from.slug}`}
                      className="inline-block mt-4 text-[12px] text-[#003d9b] font-semibold hover:underline"
                    >
                      Xem hồ sơ người gửi →
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
