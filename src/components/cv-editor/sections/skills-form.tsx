"use client";

import { useCVEditorStore } from "@/lib/store/cv-editor-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { SKILL_LEVELS } from "@/lib/constants";

export function SkillsForm() {
  const cv = useCVEditorStore((s) => s.cv);
  const addSkill = useCVEditorStore((s) => s.addSkill);
  const updateSkill = useCVEditorStore((s) => s.updateSkill);
  const removeSkill = useCVEditorStore((s) => s.removeSkill);

  if (!cv) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Kỹ năng</h3>
        <Button variant="outline" size="sm" onClick={addSkill}>
          <Plus className="h-4 w-4 mr-1" />
          Thêm
        </Button>
      </div>

      {cv.skills.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          Chưa có kỹ năng nào. Nhấn &quot;Thêm&quot; để bắt đầu.
        </p>
      )}

      {cv.skills.map((skill, index) => (
        <Card key={index}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 space-y-2">
                <Input
                  value={skill.name}
                  onChange={(e) =>
                    updateSkill(index, { name: e.target.value })
                  }
                  placeholder="Tên kỹ năng (vd: React, Python, Photoshop)"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive shrink-0"
                onClick={() => removeSkill(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <Label>Mức độ</Label>
                <span className="text-muted-foreground">
                  {SKILL_LEVELS.find((l) => l.value === skill.level)?.label || "Khá"}
                </span>
              </div>
              <Slider
                value={[skill.level]}
                onValueChange={(value) =>
                  updateSkill(index, { level: Array.isArray(value) ? value[0] : value })
                }
                min={1}
                max={5}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Input
                value={skill.category}
                onChange={(e) =>
                  updateSkill(index, { category: e.target.value })
                }
                placeholder="Danh mục (vd: Frontend, Backend, Design)"
                className="text-sm"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
