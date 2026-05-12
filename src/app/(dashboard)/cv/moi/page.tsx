"use client";

import { isPro as isProTier } from "@/lib/subscription";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, FileText, Lock, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useCVEditorStore } from "@/lib/store/cv-editor-store";
import { CV_TEMPLATES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { sampleCvPresets, makePreviewCV } from "@/lib/cv-samples";
import { templates, type TemplateId } from "@/components/cv-preview/templates/template-registry";
import { cn } from "@/lib/utils";

const allIndustries = ["Tất cả", ...Array.from(new Set(sampleCvPresets.map((sample) => sample.industry)))];
const allStyles = ["Tất cả", ...Array.from(new Set(CV_TEMPLATES.map((template) => template.category)))];

export default function NewCVPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [selectedSample, setSelectedSample] = useState<string | null>("it-product-engineer");
  const [industryFilter, setIndustryFilter] = useState("Tất cả");
  const [styleFilter, setStyleFilter] = useState("Tất cả");
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

  const filteredSamples = useMemo(
    () =>
      sampleCvPresets.filter((sample) => {
        if (industryFilter === "Tất cả") return true;
        return sample.industry === industryFilter;
      }),
    [industryFilter]
  );

  const filteredTemplates = useMemo(
    () =>
      CV_TEMPLATES.filter((template) => {
        if (styleFilter === "Tất cả") return true;
        return template.category === styleFilter;
      }),
    [styleFilter]
  );

  const selectedTemplateMeta = CV_TEMPLATES.find((template) => template.id === selectedTemplate) ?? CV_TEMPLATES[1];
  const selectedSampleMeta = sampleCvPresets.find((sample) => sample.id === selectedSample) ?? null;

  const handleCreate = async () => {
    const tmpl = CV_TEMPLATES.find((t) => t.id === selectedTemplate);
    if (tmpl?.premium && !isPro) {
      router.push("/bang-gia");
      return;
    }
    setCreating(true);
    try {
      const cvId = await initNewCV(selectedTemplate, selectedSample ?? undefined);
      if (cvId) {
        router.push(`/cv/${cvId}`);
      } else {
        router.push("/dang-nhap");
      }
    } catch {
      toast.error("Không thể tạo CV. Vui lòng thử lại.");
      setCreating(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <section className="grid min-w-0 gap-6 rounded-lg border border-blue-100 bg-[#f8fbff] p-5 shadow-sm lg:grid-cols-[0.86fr_1.14fr] lg:p-7">
        <div className="flex min-w-0 flex-col justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-sm font-black text-[#1557ff]">
              <Sparkles size={16} /> Professional CV Templates
            </div>
            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-normal text-[#07122f] sm:text-5xl">
              Chọn mẫu đẹp, điền nhanh, xuất CV chuẩn.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Bắt đầu từ CV trống hoặc dùng mẫu theo ngành với nội dung đã viết sẵn. Bạn chỉ cần thay thông tin cá nhân, chỉnh vài dòng kinh nghiệm và tải PDF.
            </p>
          </div>

          <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
            {[
              ["8", "CV mẫu theo ngành"],
              ["10", "template chuyên nghiệp"],
              ["A4", "preview và export"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-2xl font-black text-[#1557ff]">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-xl shadow-blue-100/60">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#20b26b]">Đang chọn</p>
              <h2 className="mt-1 text-2xl font-black text-[#07122f]">{selectedTemplateMeta.name}</h2>
            </div>
            <button
              onClick={handleCreate}
              disabled={creating}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1557ff] px-5 text-sm font-black text-white shadow-lg shadow-blue-500/25 disabled:opacity-60"
            >
              {creating ? <Loader2 size={17} className="animate-spin" /> : <ArrowRight size={17} />}
              Tạo CV
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-[220px_1fr]">
            <MiniCVPreview templateId={selectedTemplate} sampleId={selectedSample ?? selectedTemplateMeta.previewSampleId} />
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-black text-[#07122f]">{selectedSampleMeta?.name ?? "CV trống"}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {selectedSampleMeta?.description ??
                  "Dành cho người đã có nội dung sẵn và chỉ muốn chọn layout trước khi nhập thông tin."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[selectedTemplateMeta.category, ...selectedTemplateMeta.tags].map((tag) => (
                  <span key={tag} className="rounded-md border border-blue-100 bg-white px-2.5 py-1 text-xs font-bold text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
              {selectedTemplateMeta.premium && !isPro ? (
                <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm font-black text-[#1557ff]">
                  <Lock size={15} /> Nâng cấp Pro để dùng template này
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[340px_1fr]">
        <aside className="min-w-0 space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-[#07122f]">CV mẫu</h2>
              <button
                onClick={() => setSelectedSample(null)}
                className={cn(
                  "rounded-md border px-3 py-2 text-xs font-black",
                  selectedSample === null
                    ? "border-[#1557ff] bg-[#1557ff] text-white"
                    : "border-slate-200 bg-white text-slate-600"
                )}
              >
                Bắt đầu trống
              </button>
            </div>

            <SegmentedControl value={industryFilter} values={allIndustries} onChange={setIndustryFilter} className="mt-4" />

            <div className="mt-4 space-y-3">
              {filteredSamples.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => setSelectedSample(sample.id)}
                  className={cn(
                    "w-full rounded-lg border p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/40",
                    selectedSample === sample.id ? "border-[#1557ff] bg-blue-50" : "border-slate-200 bg-white"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-[#07122f]">{sample.name}</p>
                      <p className="mt-1 text-xs font-bold text-[#20b26b]">{sample.industry} - {sample.level}</p>
                    </div>
                    {selectedSample === sample.id ? (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1557ff] text-white">
                        <Check size={14} />
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{sample.description}</p>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-black text-[#07122f]">Template chuyên nghiệp</h2>
              <p className="mt-1 text-sm text-slate-500">Preview dùng chính dữ liệu CV mẫu bạn đang chọn.</p>
            </div>
            <SegmentedControl value={styleFilter} values={allStyles} onChange={setStyleFilter} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTemplates.map((template) => {
              const isLocked = template.premium && !isPro;
              const isSelected = selectedTemplate === template.id;
              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={cn(
                    "group overflow-hidden rounded-lg border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md",
                    isSelected ? "border-[#1557ff] ring-2 ring-blue-100" : "border-slate-200"
                  )}
                >
                  <div className="relative bg-[#eef4ff] p-4">
                    <MiniCVPreview templateId={template.id} sampleId={selectedSample ?? template.previewSampleId} compact />
                    {isLocked ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/72 backdrop-blur-[1px]">
                        <span className="inline-flex items-center gap-2 rounded-md bg-[#1557ff] px-3 py-2 text-xs font-black text-white">
                          <Lock size={14} /> Pro
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-black text-[#07122f]">{template.name}</p>
                        <p className="mt-1 text-sm text-slate-500">{template.description}</p>
                      </div>
                      {isSelected ? (
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#20b26b] text-white">
                          <Check size={14} />
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {template.recommendedFor.slice(0, 3).map((item) => (
                        <span key={item} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-600">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </section>

      <div className="sticky bottom-4 z-20 mt-8 flex justify-center">
        <div className="flex w-full max-w-2xl items-center justify-between gap-3 rounded-lg border border-blue-100 bg-white/95 p-3 shadow-2xl shadow-blue-200/60 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[#1557ff]">
              <FileText size={20} />
            </span>
            <div>
              <p className="text-sm font-black text-[#07122f]">{selectedTemplateMeta.name}</p>
              <p className="text-xs font-semibold text-slate-500">{selectedSampleMeta?.name ?? "CV trống"}</p>
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1557ff] px-5 text-sm font-black text-white disabled:opacity-60"
          >
            {creating ? <Loader2 size={17} className="animate-spin" /> : <ArrowRight size={17} />}
            Tạo CV
          </button>
        </div>
      </div>
    </div>
  );
}

function SegmentedControl({
  value,
  values,
  onChange,
  className,
}: {
  value: string;
  values: string[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full max-w-full min-w-0 gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-1", className)}>
      {values.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={cn(
            "whitespace-nowrap rounded-md px-3 py-2 text-xs font-black transition",
            value === item ? "bg-[#1557ff] text-white" : "text-slate-600 hover:bg-slate-50"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function MiniCVPreview({
  templateId,
  sampleId,
  compact = false,
}: {
  templateId: string;
  sampleId?: string | null;
  compact?: boolean;
}) {
  const template = templates[templateId as TemplateId] ?? templates.classic;
  const TemplateComponent = template.component;
  const cv = makePreviewCV(templateId, sampleId);
  const scale = compact ? 0.18 : 0.21;

  return (
    <div className={cn("mx-auto overflow-hidden rounded-md bg-white shadow-sm", compact ? "h-[220px] w-[164px]" : "h-[258px] w-[194px]")}>
      <div
        className="pointer-events-none origin-top-left"
        style={{
          width: "210mm",
          transform: `scale(${scale})`,
        }}
      >
        <TemplateComponent cv={cv} />
      </div>
    </div>
  );
}
