"use client";

import { isPro as isProTier } from "@/lib/subscription";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCVEditorStore } from "@/lib/store/cv-editor-store";
import { CV_TEMPLATES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Lock, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function NewCVPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [creating, setCreating] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const router = useRouter();
  const initNewCV = useCVEditorStore((s) => s.initNewCV);

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_tier, subscription_expires_at")
        .eq("id", user.id)
        .single();
      setIsPro(isProTier(profile));
    })();
  }, []);

  const handleCreate = async () => {
    const tmpl = CV_TEMPLATES.find((t) => t.id === selectedTemplate);
    if (tmpl?.premium && !isPro) {
      router.push("/bang-gia");
      return;
    }
    setCreating(true);
    try {
      const cvId = await initNewCV(selectedTemplate);
      if (cvId) {
        router.push(`/cv/${cvId}`);
      }
    } catch {
      toast.error("Không thể tạo CV. Vui lòng thử lại.");
      setCreating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Chọn template</h1>
        <p className="text-muted-foreground mt-2">
          Chọn mẫu CV phù hợp với bạn. Bạn có thể thay đổi sau.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {CV_TEMPLATES.map((template) => {
          const isLocked = template.premium && !isPro;
          return (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === template.id
                  ? "ring-2 ring-primary shadow-md"
                  : ""
              } ${isLocked ? "opacity-70" : ""}`}
              onClick={() => {
                if (isLocked) {
                  router.push("/bang-gia");
                  return;
                }
                setSelectedTemplate(template.id);
              }}
            >
              <CardContent className="p-4">
                <div className="aspect-[210/297] bg-muted rounded-md mb-3 flex items-center justify-center relative">
                  <FileText className="h-12 w-12 text-muted-foreground/30" />
                  <span className="absolute bottom-2 text-xs font-medium text-muted-foreground">
                    {template.name}
                  </span>
                  {isLocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/70 rounded-md">
                      <Lock className="h-6 w-6 text-[#003d9b]" />
                      <Badge variant="secondary" className="gap-1 bg-[#003d9b] text-white hover:bg-[#003d9b]">
                        Nâng cấp Pro
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{template.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                  {selectedTemplate === template.id && !isLocked && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground text-xs">✓</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          className="px-8"
          onClick={handleCreate}
          disabled={creating}
        >
          {creating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4 mr-2" />
          )}
          Tạo CV với template {CV_TEMPLATES.find((t) => t.id === selectedTemplate)?.name}
        </Button>
      </div>
    </div>
  );
}
