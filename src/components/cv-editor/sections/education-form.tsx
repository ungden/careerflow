"use client";

import { useCVEditorStore } from "@/lib/store/cv-editor-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";

export function EducationForm() {
  const cv = useCVEditorStore((s) => s.cv);
  const addEducation = useCVEditorStore((s) => s.addEducation);
  const updateEducation = useCVEditorStore((s) => s.updateEducation);
  const removeEducation = useCVEditorStore((s) => s.removeEducation);

  if (!cv) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Học vấn</h3>
        <Button variant="outline" size="sm" onClick={addEducation}>
          <Plus className="h-4 w-4 mr-1" />
          Thêm
        </Button>
      </div>

      {cv.education.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          Chưa có thông tin học vấn. Nhấn &quot;Thêm&quot; để bắt đầu.
        </p>
      )}

      {cv.education.map((edu, index) => (
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
                onClick={() => removeEducation(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Trường</Label>
                <Input
                  value={edu.school}
                  onChange={(e) =>
                    updateEducation(index, { school: e.target.value })
                  }
                  placeholder="Đại học Bách Khoa"
                />
              </div>
              <div className="space-y-2">
                <Label>Bằng cấp</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(index, { degree: e.target.value })
                  }
                  placeholder="Cử nhân"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Chuyên ngành</Label>
              <Input
                value={edu.field}
                onChange={(e) =>
                  updateEducation(index, { field: e.target.value })
                }
                placeholder="Khoa học Máy tính"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ngày bắt đầu</Label>
                <Input
                  type="month"
                  value={edu.start_date}
                  onChange={(e) =>
                    updateEducation(index, { start_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Ngày tốt nghiệp</Label>
                <Input
                  type="month"
                  value={edu.end_date}
                  onChange={(e) =>
                    updateEducation(index, { end_date: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>GPA</Label>
              <Input
                value={edu.gpa}
                onChange={(e) =>
                  updateEducation(index, { gpa: e.target.value })
                }
                placeholder="3.5/4.0"
              />
            </div>

            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea
                value={edu.description}
                onChange={(e) =>
                  updateEducation(index, { description: e.target.value })
                }
                placeholder="Hoạt động, thành tích nổi bật..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
