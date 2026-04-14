"use client";

import { useCVEditorStore } from "@/lib/store/cv-editor-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PersonalInfoForm() {
  const cv = useCVEditorStore((s) => s.cv);
  const updatePersonalInfo = useCVEditorStore((s) => s.updatePersonalInfo);

  if (!cv) return null;
  const info = cv.personal_info;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Thông tin cá nhân</h3>

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
