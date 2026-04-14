"use client";

import { useCVEditorStore } from "@/lib/store/cv-editor-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";

export function ExperienceForm() {
  const cv = useCVEditorStore((s) => s.cv);
  const addExperience = useCVEditorStore((s) => s.addExperience);
  const updateExperience = useCVEditorStore((s) => s.updateExperience);
  const removeExperience = useCVEditorStore((s) => s.removeExperience);

  if (!cv) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Kinh nghiệm làm việc</h3>
        <Button variant="outline" size="sm" onClick={addExperience}>
          <Plus className="h-4 w-4 mr-1" />
          Thêm
        </Button>
      </div>

      {cv.experiences.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          Chưa có kinh nghiệm nào. Nhấn &quot;Thêm&quot; để bắt đầu.
        </p>
      )}

      {cv.experiences.map((exp, index) => (
        <Card key={index}>
          <CardContent className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GripVertical className="h-4 w-4" />
                <span className="text-sm font-medium">#{index + 1}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => removeExperience(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Công ty</Label>
                <Input
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(index, { company: e.target.value })
                  }
                  placeholder="Tên công ty"
                />
              </div>
              <div className="space-y-2">
                <Label>Vị trí</Label>
                <Input
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(index, { position: e.target.value })
                  }
                  placeholder="Software Developer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ngày bắt đầu</Label>
                <Input
                  type="month"
                  value={exp.start_date}
                  onChange={(e) =>
                    updateExperience(index, { start_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Ngày kết thúc</Label>
                <Input
                  type="month"
                  value={exp.end_date}
                  onChange={(e) =>
                    updateExperience(index, { end_date: e.target.value })
                  }
                  disabled={exp.is_current}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id={`current-${index}`}
                checked={exp.is_current}
                onCheckedChange={(checked) =>
                  updateExperience(index, {
                    is_current: !!checked,
                    end_date: checked ? "" : exp.end_date,
                  })
                }
              />
              <Label htmlFor={`current-${index}`} className="text-sm">
                Đang làm việc tại đây
              </Label>
            </div>

            <div className="space-y-2">
              <Label>Địa điểm</Label>
              <Input
                value={exp.location}
                onChange={(e) =>
                  updateExperience(index, { location: e.target.value })
                }
                placeholder="TP. Hồ Chí Minh"
              />
            </div>

            <div className="space-y-2">
              <Label>Mô tả công việc</Label>
              <Textarea
                value={exp.description}
                onChange={(e) =>
                  updateExperience(index, { description: e.target.value })
                }
                placeholder="- Phát triển và bảo trì ứng dụng web&#10;- Tối ưu hóa hiệu suất hệ thống..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
