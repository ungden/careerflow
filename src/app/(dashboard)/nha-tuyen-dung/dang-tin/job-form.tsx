"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  INDUSTRIES,
  LOCATIONS,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
} from "@/lib/constants";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface JobFormProps {
  userId: string;
  companyId: string;
}

export function JobForm({ userId, companyId }: JobFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");
  const [industry, setIndustry] = useState("");
  const [jobType, setJobType] = useState("full-time");
  const [experienceLevel, setExperienceLevel] = useState("mid");
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Vui lòng nhập tiêu đề và mô tả công việc");
      return;
    }
    setSaving(true);

    try {
      const supabase = createClient();
      const baseSlug = slugify(title);
      const uniqueSlug = `${baseSlug}-${Date.now().toString(36)}`;

      const { error } = await supabase.from("jobs").insert({
        company_id: companyId,
        posted_by: userId,
        title: title.trim(),
        slug: uniqueSlug,
        description: description.trim(),
        requirements: requirements.trim() || null,
        benefits: benefits.trim() || null,
        industry: industry || null,
        job_type: jobType,
        experience_level: experienceLevel,
        location: location || null,
        salary_min: salaryMin ? Number(salaryMin) : null,
        salary_max: salaryMax ? Number(salaryMax) : null,
        is_active: true,
      });

      if (error) {
        toast.error("Đăng tin thất bại", { description: error.message });
        setSaving(false);
        return;
      }

      toast.success("Đã đăng tin thành công!");
      router.push("/nha-tuyen-dung/tin-tuyen");
      router.refresh();
    } catch (err) {
      toast.error("Đã xảy ra lỗi", {
        description: err instanceof Error ? err.message : "Vui lòng thử lại.",
      });
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]";

  return (
    <form
      onSubmit={handleSubmit}
      className="card-elevated rounded-[24px] bg-white p-6 md:p-8 space-y-6"
    >
      <div>
        <label className="block text-sm font-bold text-[#0b1628] mb-2">
          Tiêu đề công việc <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          placeholder="VD: Senior Frontend Developer"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-[#0b1628] mb-2">Ngành nghề</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className={inputClass}
          >
            <option value="">-- Chọn ngành --</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0b1628] mb-2">Địa điểm</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputClass}
          >
            <option value="">-- Chọn địa điểm --</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0b1628] mb-2">Hình thức</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className={inputClass}
          >
            {JOB_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0b1628] mb-2">Cấp bậc</label>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className={inputClass}
          >
            {EXPERIENCE_LEVELS.map((lv) => (
              <option key={lv.value} value={lv.value}>
                {lv.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0b1628] mb-2">
            Lương tối thiểu (VND)
          </label>
          <input
            type="number"
            value={salaryMin}
            onChange={(e) => setSalaryMin(e.target.value)}
            className={inputClass}
            placeholder="15000000"
            min={0}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0b1628] mb-2">
            Lương tối đa (VND)
          </label>
          <input
            type="number"
            value={salaryMax}
            onChange={(e) => setSalaryMax(e.target.value)}
            className={inputClass}
            placeholder="30000000"
            min={0}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#0b1628] mb-2">
          Mô tả công việc <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
          rows={6}
          placeholder="Mô tả chi tiết về trách nhiệm, công việc cụ thể..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[#0b1628] mb-2">Yêu cầu ứng viên</label>
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className={inputClass}
          rows={5}
          placeholder="Kinh nghiệm, kỹ năng, trình độ học vấn..."
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[#0b1628] mb-2">Quyền lợi</label>
        <textarea
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          className={inputClass}
          rows={4}
          placeholder="Lương thưởng, chế độ đãi ngộ, môi trường làm việc..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="kinetic-gradient text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center gap-2"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Đăng tin tuyển dụng
        </button>
      </div>
    </form>
  );
}
