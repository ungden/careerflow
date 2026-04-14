"use client";

import { useCVEditorStore } from "@/lib/store/cv-editor-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { LANGUAGE_PROFICIENCY } from "@/lib/constants";

export function LanguagesForm() {
  const cv = useCVEditorStore((s) => s.cv);
  const addLanguage = useCVEditorStore((s) => s.addLanguage);
  const updateLanguage = useCVEditorStore((s) => s.updateLanguage);
  const removeLanguage = useCVEditorStore((s) => s.removeLanguage);

  if (!cv) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Ngoại ngữ</h3>
        <Button variant="outline" size="sm" onClick={addLanguage}>
          <Plus className="h-4 w-4 mr-1" />
          Thêm
        </Button>
      </div>

      {cv.languages.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          Chưa có ngoại ngữ nào. Nhấn &quot;Thêm&quot; để bắt đầu.
        </p>
      )}

      {cv.languages.map((lang, index) => (
        <Card key={index}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Ngôn ngữ</Label>
                  <Input
                    value={lang.name}
                    onChange={(e) =>
                      updateLanguage(index, { name: e.target.value })
                    }
                    placeholder="Tiếng Anh"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Trình độ</Label>
                  <select
                    value={lang.proficiency}
                    onChange={(e) =>
                      updateLanguage(index, { proficiency: e.target.value })
                    }
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {LANGUAGE_PROFICIENCY.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive shrink-0 mt-5"
                onClick={() => removeLanguage(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
