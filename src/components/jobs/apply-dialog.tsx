"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ApplyDialogProps {
  jobId: string;
}

interface CV {
  id: string;
  title: string;
  template_id: string;
}

export function ApplyDialog({ jobId }: ApplyDialogProps) {
  const [open, setOpen] = useState(false);
  const [cvs, setCvs] = useState<CV[]>([]);
  const [selectedCV, setSelectedCV] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingCVs, setFetchingCVs] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchCVs = async () => {
      setFetchingCVs(true);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Vui lòng đăng nhập để ứng tuyển");
        setOpen(false);
        setFetchingCVs(false);
        return;
      }

      const { data, error } = await supabase
        .from("cvs")
        .select("id, title, template_id")
        .eq("user_id", user.id);

      if (error) {
        toast.error("Không thể tải danh sách CV");
      } else {
        setCvs(data || []);
        if (data && data.length > 0) {
          setSelectedCV(data[0].id);
        }
      }
      setFetchingCVs(false);
    };

    fetchCVs();
  }, [open]);

  const handleSubmit = async () => {
    if (!selectedCV) {
      toast.error("Vui lòng chọn CV để ứng tuyển");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Vui lòng đăng nhập để ứng tuyển");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("applications").insert({
      job_id: jobId,
      candidate_id: user.id,
      cv_id: selectedCV,
      cover_letter: coverLetter || null,
    });

    if (error) {
      if (error.code === "23505") {
        toast.error("Bạn đã ứng tuyển vị trí này rồi");
      } else {
        toast.error("Gửi ứng tuyển thất bại. Vui lòng thử lại.");
      }
    } else {
      toast.success("Ứng tuyển thành công! Nhà tuyển dụng sẽ liên hệ bạn sớm.");
      setOpen(false);
      setCoverLetter("");
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="w-full kinetic-gradient text-white font-bold text-base py-4 rounded-xl shadow-lg hover:opacity-90 transition-all cursor-pointer"
        style={{ fontFamily: "var(--font-headline)" }}
      >
        Ứng tuyển ngay
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-[#003d9b]">Ứng tuyển vị trí này</DialogTitle>
          <DialogDescription>
            Chọn CV và viết thư giới thiệu để gửi đến nhà tuyển dụng.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* CV Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-[#1a1a1a]">
              Chọn CV của bạn
            </label>
            {fetchingCVs ? (
              <p className="text-sm text-[#999]">Đang tải danh sách CV...</p>
            ) : cvs.length === 0 ? (
              <p className="text-sm text-[#999]">
                Bạn chưa có CV nào.{" "}
                <Link href="/cv/moi" className="text-[#003d9b] underline">
                  Tạo CV ngay
                </Link>
              </p>
            ) : (
              <div className="space-y-2">
                {cvs.map((cv) => (
                  <label
                    key={cv.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      selectedCV === cv.id
                        ? "border-[#003d9b] bg-[#003d9b]/5"
                        : "border-[#e5e7eb] hover:border-[#003d9b]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="cv"
                      value={cv.id}
                      checked={selectedCV === cv.id}
                      onChange={() => setSelectedCV(cv.id)}
                      className="accent-[#003d9b]"
                    />
                    <span className="text-sm font-medium text-[#1a1a1a]">
                      {cv.title || "CV không tiêu đề"}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Cover Letter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1a1a1a]">
              Thư giới thiệu{" "}
              <span className="text-[#999] font-normal">(không bắt buộc)</span>
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Viết vài dòng giới thiệu bản thân và lý do bạn phù hợp với vị trí này..."
              rows={4}
              className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#999] outline-none resize-none focus:ring-2 focus:ring-[#003d9b]/20"
            />
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={handleSubmit}
            disabled={loading || cvs.length === 0}
            className="w-full kinetic-gradient text-white font-bold text-sm py-3 rounded-xl shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            {loading ? "Đang gửi..." : "Gửi ứng tuyển"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
