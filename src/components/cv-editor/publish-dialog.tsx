"use client";

import { useState, useEffect } from "react";
import { useCVEditorStore } from "@/lib/store/cv-editor-store";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Globe, CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { INDUSTRIES, LOCATIONS, EXPERIENCE_LEVELS } from "@/lib/constants";

export function PublishDialog() {
  const cv = useCVEditorStore((s) => s.cv);
  const saveCV = useCVEditorStore((s) => s.saveCV);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(false);
  const [slug, setSlug] = useState("");
  const [headline, setHeadline] = useState("");
  const [industry, setIndustry] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  // Load existing profile data when dialog opens
  useEffect(() => {
    if (!open) return;
    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("slug, headline, industry, experience_level, location, skills, is_published")
        .eq("id", user.id)
        .single();

      if (profile) {
        setSlug(profile.slug || "");
        setHeadline(profile.headline || cv?.personal_info.title || "");
        setIndustry(profile.industry || "");
        setExperienceLevel(profile.experience_level || "");
        setLocation(profile.location || cv?.personal_info.address || "");
        setSkills(profile.skills?.join(", ") || cv?.skills.map((s) => s.name).join(", ") || "");
        setPublished(profile.is_published || false);
        if (profile.slug) {
          setProfileUrl(`${window.location.origin}/ung-vien/${profile.slug}`);
        }
      }
    })();
  }, [open, cv]);

  // Auto-generate slug from name
  useEffect(() => {
    if (slug) return;
    if (cv?.personal_info.full_name) {
      const generated = cv.personal_info.full_name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setSlug(generated);
    }
  }, [cv?.personal_info.full_name, slug]);

  const handlePublish = async () => {
    if (!slug.trim()) {
      toast.error("Vui lòng nhập đường dẫn profile");
      return;
    }
    if (!industry) {
      toast.error("Vui lòng chọn ngành nghề");
      return;
    }

    setLoading(true);

    // Save CV first
    await saveCV();

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    // Update profile with publish info
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        slug: slug.trim().toLowerCase(),
        headline: headline.trim(),
        industry,
        experience_level: experienceLevel,
        location: location.trim(),
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        is_published: true,
        published_at: new Date().toISOString(),
        full_name: cv?.personal_info.full_name || null,
        avatar_url: cv?.personal_info.photo_url || null,
      })
      .eq("id", user.id);

    if (profileError) {
      if (profileError.message.includes("duplicate") || profileError.message.includes("unique")) {
        toast.error("Đường dẫn đã được sử dụng", {
          description: "Vui lòng chọn đường dẫn khác.",
        });
      } else {
        toast.error("Không thể publish", { description: profileError.message });
      }
      setLoading(false);
      return;
    }

    // Mark this CV as primary
    if (cv) {
      // Unset other primary CVs
      await supabase
        .from("cvs")
        .update({ is_primary: false })
        .eq("user_id", user.id)
        .neq("id", cv.id);

      // Set this as primary
      await supabase
        .from("cvs")
        .update({ is_primary: true })
        .eq("id", cv.id);
    }

    setPublished(true);
    setProfileUrl(`${window.location.origin}/ung-vien/${slug.trim().toLowerCase()}`);
    setLoading(false);
    toast.success("CV đã được publish thành công!");
  };

  const handleUnpublish = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    await supabase
      .from("profiles")
      .update({ is_published: false, published_at: null })
      .eq("id", user.id);

    setPublished(false);
    setProfileUrl("");
    setLoading(false);
    toast.success("Đã gỡ publish");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg shadow-[#1557ff]/20 kinetic-gradient">
        Publish lên Marketplace
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        {/* Header */}
        <div className="kinetic-gradient px-6 py-5 text-white">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Publish CV lên Marketplace
          </DialogTitle>
          <DialogDescription className="text-blue-100 text-sm mt-1">
            CV của bạn sẽ hiển thị công khai để nhà tuyển dụng tìm thấy
          </DialogDescription>
        </div>

        <div className="p-6 space-y-5">
          {/* Published success state */}
          {published && profileUrl && (
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-800 text-sm">Đang hiển thị trên Marketplace</p>
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-600 hover:underline break-all"
                >
                  {profileUrl}
                </a>
              </div>
            </div>
          )}

          {/* Slug */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Đường dẫn profile
            </Label>
            <div className="flex items-center gap-0 border rounded-xl overflow-hidden bg-[#f3f4f6]">
              <span className="px-3 text-sm text-muted-foreground bg-[#f3f4f6] shrink-0">
                /ung-vien/
              </span>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                placeholder="nguyen-van-a"
                className="border-0 bg-white rounded-none rounded-r-xl focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tiêu đề chuyên môn
            </Label>
            <Input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="VD: Senior Frontend Developer | 5 năm kinh nghiệm"
            />
          </div>

          {/* Industry + Experience */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Ngành nghề *
              </Label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="flex h-9 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Chọn ngành</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Cấp bậc
              </Label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="flex h-9 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Chọn cấp bậc</option>
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Địa điểm
            </Label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex h-9 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Chọn địa điểm</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Skills tags */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Kỹ năng chính
            </Label>
            <Input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, TypeScript, Node.js (phân cách bằng dấu phẩy)"
            />
            {skills && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {skills.split(",").map((s) => s.trim()).filter(Boolean).map((s, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#e8f0fe] text-[#1557ff] rounded text-[11px] font-medium">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {published ? (
              <>
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className="flex-1 kinetic-gradient text-white font-bold text-sm py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Cập nhật
                </button>
                <button
                  onClick={handleUnpublish}
                  disabled={loading}
                  className="px-6 py-3 text-sm font-bold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                >
                  Gỡ publish
                </button>
              </>
            ) : (
              <button
                onClick={handlePublish}
                disabled={loading}
                className="w-full kinetic-gradient text-white font-bold text-sm py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
                Publish ngay
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
