"use client";

import { useState } from "react";
import { useCVEditorStore } from "@/lib/store/cv-editor-store";
import { templates, type TemplateId } from "./templates/template-registry";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export function PreviewContainer() {
  const cv = useCVEditorStore((s) => s.cv);
  const [scale, setScale] = useState(0.5);

  if (!cv) return null;

  const templateId = cv.template_id as TemplateId;
  const template = templates[templateId] || templates.classic;
  const TemplateComponent = template.component;

  return (
    <div className="flex flex-col h-full bg-muted/50">
      {/* Zoom controls */}
      <div className="flex items-center justify-center gap-2 p-2 border-b bg-background">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setScale((s) => Math.max(0.25, s - 0.1))}
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </Button>
        <span className="text-xs text-muted-foreground w-12 text-center">
          {Math.round(scale * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setScale((s) => Math.min(1.5, s + 0.1))}
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setScale(0.5)}
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto p-4">
        <div
          className="origin-top-left shadow-lg"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          <TemplateComponent cv={cv} />
        </div>
      </div>
    </div>
  );
}
