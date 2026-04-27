"use client";

import { useRef, useState } from "react";
import { useCVEditorStore } from "@/lib/store/cv-editor-store";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Loader2, X } from "lucide-react";

export function PersonalInfoForm() {
  const cv = useCVEditorStore((s) => s.cv);
  const updatePersonalInfo = useCVEditorStore((s) => s.updatePersonalInfo);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!cv) return null;
  const info = cv.personal_info;

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) return; // 5MB max

    setUploading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setUploading(false); return; }

    const ext = file.name.split(".").pop();
    const filePath = `${user.id}/avatar-${Date.now()}.${ext}`;

    // Delete old avatar if exists
    if (info.photo_url) {
      const oldPath = info.photo_url.split("/avatars/")[1];
      if (oldPath) {
        await supabase.storage.from("avatars").remove([oldPath]);
      }
    }

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (!error) {
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      updatePersonalInfo({ photo_url: publicUrl });
    }

    setUploading(false);
    // Reset input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAvatar = () => {
    updatePersonalInfo({ photo_url: "" });
  };

  const initials = (info.full_name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-5">
      <h3 className="font-semibold text-lg">Thông tin cá nhân</h3>

      {/* Avatar Upload */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-[#f3f4f6] flex items-center justify-center shrink-0">
            {info.photo_url ? (
              <img
                src={info.photo_url}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-[#1557ff]/30">{initials}</span>
            )}
          </div>
          {/* Hover overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
          >
            {uploading ? (
              <Loader2 className="h-5 w-5 text-white animate-spin" />
            ) : (
              <Camera className="h-5 w-5 text-white" />
            )}
          </button>
          {/* Remove button */}
          {info.photo_url && !uploading && (
            <button
              type="button"
              onClick={removeAvatar}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleAvatarUpload}
          />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            Ảnh đại diện
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="text-xs font-bold text-[#1557ff] hover:underline disabled:opacity-50"
          >
            {uploading ? "Đang tải lên..." : info.photo_url ? "Thay đổi ảnh" : "Tải ảnh lên"}
          </button>
          <p className="text-[10px] text-muted-foreground mt-1">JPG, PNG, WebP. Tối đa 5MB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Họ và tên</Label>
          <Input
            id="full_name"
            value={info.full_name}
            onChange={(e) => updatePersonalInfo({ full_name: e.target.value })}
            placeholder="Nguyễn Văn A"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Vị trí ứng tuyển</Label>
          <Input
            id="title"
            value={info.title}
            onChange={(e) => updatePersonalInfo({ title: e.target.value })}
            placeholder="Software Developer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={info.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            placeholder="email@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            value={info.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            placeholder="0901234567"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Địa chỉ</Label>
        <Input
          id="address"
          value={info.address}
          onChange={(e) => updatePersonalInfo({ address: e.target.value })}
          placeholder="TP. Hồ Chí Minh"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Giới thiệu bản thân</Label>
        <Textarea
          id="summary"
          value={info.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          placeholder="Mô tả ngắn gọn về bản thân, kinh nghiệm và mục tiêu nghề nghiệp..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={info.website}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            placeholder="https://example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={info.linkedin}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/username"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          value={info.github}
          onChange={(e) => updatePersonalInfo({ github: e.target.value })}
          placeholder="github.com/username"
        />
      </div>
    </div>
  );
}
