"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { INDUSTRIES, LOCATIONS } from "@/lib/constants";

const COMPANY_SIZES = [
  "1-10 nhân viên",
  "11-50 nhân viên",
  "51-200 nhân viên",
  "201-500 nhân viên",
  "501-1000 nhân viên",
  "1000+ nhân viên",
];

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

interface Company {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  industry?: string;
  company_size?: string;
  location?: string;
  website?: string;
  logo_url?: string;
}

interface CompanyFormProps {
  userId: string;
  initialCompany: Company | null;
}

export function CompanyForm({ userId, initialCompany }: CompanyFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialCompany?.name || "");
  const [slug, setSlug] = useState(initialCompany?.slug || "");
  const [description, setDescription] = useState(initialCompany?.description || "");
  const [industry, setIndustry] = useState(initialCompany?.industry || "");
  const [companySize, setCompanySize] = useState(initialCompany?.company_size || "");
  const [location, setLocation] = useState(initialCompany?.location || "");
  const [website, setWebsite] = useState(initialCompany?.website || "");
  const [logoUrl, setLogoUrl] = useState(initialCompany?.logo_url || "");
  const [saving, setSaving] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!initialCompany?.slug) {
      setSlug(slugify(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Vui lòng nhập tên công ty");
      return;
    }
    setSaving(true);

    try {
      const supabase = createClient();
      const payload = {
        owner_id: userId,
        name: name.trim(),
        slug: slug.trim() || slugify(name),
        description: description.trim() || null,
        industry: industry || null,
        company_size: companySize || null,
        location: location || null,
        website: website.trim() || null,
        logo_url: logoUrl.trim() || null,
      };

      const query = initialCompany?.id
        ? supabase.from("companies").update(payload).eq("id", initialCompany.id)
        : supabase.from("companies").insert(payload);

      const { error } = await query;

      if (error) {
        toast.error("Lưu thất bại", { description: error.message });
        setSaving(false);
        return;
      }

      toast.success(initialCompany?.id ? "Đã cập nhật công ty" : "Đã tạo công ty thành công");
      router.refresh();
    } catch (err) {
      toast.error("Đã xảy ra lỗi", {
        description: err instanceof Error ? err.message : "Vui lòng thử lại.",
      });
    } finally {
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
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-[#0b1628] mb-2">
            Tên công ty <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={inputClass}
            placeholder="VD: Công ty TNHH ABC"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-[#0b1628] mb-2">
            Slug (đường dẫn)
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            className={inputClass}
            placeholder="cong-ty-abc"
          />
          <p className="text-xs text-slate-500 mt-1">
            Tự động tạo từ tên công ty. careerflow.vn/cong-ty/{slug || "..."}
          </p>
        </div>

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
          <label className="block text-sm font-bold text-[#0b1628] mb-2">Quy mô</label>
          <select
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value)}
            className={inputClass}
          >
            <option value="">-- Chọn quy mô --</option>
            {COMPANY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
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
          <label className="block text-sm font-bold text-[#0b1628] mb-2">Website</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className={inputClass}
            placeholder="https://example.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-[#0b1628] mb-2">Logo URL</label>
          <input
            type="url"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className={inputClass}
            placeholder="https://.../logo.png"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-[#0b1628] mb-2">
            Giới thiệu công ty
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
            rows={6}
            placeholder="Mô tả về công ty, văn hóa, sứ mệnh..."
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="kinetic-gradient text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center gap-2"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {initialCompany?.id ? "Cập nhật" : "Tạo công ty"}
        </button>
      </div>
    </form>
  );
}
