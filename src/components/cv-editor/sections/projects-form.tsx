"use client";

import { useCVEditorStore } from "@/lib/store/cv-editor-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";

export function ProjectsForm() {
  const cv = useCVEditorStore((s) => s.cv);
  const addProject = useCVEditorStore((s) => s.addProject);
  const updateProject = useCVEditorStore((s) => s.updateProject);
  const removeProject = useCVEditorStore((s) => s.removeProject);

  if (!cv) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Dự án</h3>
        <Button variant="outline" size="sm" onClick={addProject}>
          <Plus className="h-4 w-4 mr-1" />
          Thêm
        </Button>
      </div>

      {cv.projects.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          Chưa có dự án nào. Nhấn &quot;Thêm&quot; để bắt đầu.
        </p>
      )}

      {cv.projects.map((project, index) => (
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
                onClick={() => removeProject(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tên dự án</Label>
                <Input
                  value={project.name}
                  onChange={(e) =>
                    updateProject(index, { name: e.target.value })
                  }
                  placeholder="E-commerce Platform"
                />
              </div>
              <div className="space-y-2">
                <Label>URL</Label>
                <Input
                  value={project.url}
                  onChange={(e) =>
                    updateProject(index, { url: e.target.value })
                  }
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea
                value={project.description}
                onChange={(e) =>
                  updateProject(index, { description: e.target.value })
                }
                placeholder="Mô tả ngắn gọn về dự án, vai trò và kết quả..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Công nghệ sử dụng</Label>
              <Input
                value={project.technologies.join(", ")}
                onChange={(e) =>
                  updateProject(index, {
                    technologies: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="React, Node.js, PostgreSQL (phân cách bằng dấu phẩy)"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
