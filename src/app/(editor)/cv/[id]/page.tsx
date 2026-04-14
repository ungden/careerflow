"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCVEditorStore } from "@/lib/store/cv-editor-store";
import { PreviewContainer } from "@/components/cv-preview/preview-container";
import { PersonalInfoForm } from "@/components/cv-editor/sections/personal-info-form";
import { ExperienceForm } from "@/components/cv-editor/sections/experience-form";
import { EducationForm } from "@/components/cv-editor/sections/education-form";
import { SkillsForm } from "@/components/cv-editor/sections/skills-form";
import { LanguagesForm } from "@/components/cv-editor/sections/languages-form";
import { ProjectsForm } from "@/components/cv-editor/sections/projects-form";
import { Input } from "@/components/ui/input";
import { templates, type TemplateId } from "@/components/cv-preview/templates/template-registry";
import { PublishDialog } from "@/components/cv-editor/publish-dialog";
import { toast } from "sonner";

const sections = [
  { id: "personal", label: "Cá nhân", icon: "person" },
  { id: "experience", label: "Kinh nghiệm", icon: "work" },
  { id: "education", label: "Học vấn", icon: "school" },
  { id: "skills", label: "Kỹ năng", icon: "psychology" },
  { id: "languages", label: "Ngoại ngữ", icon: "translate" },
  { id: "projects", label: "Dự án", icon: "folder" },
];

export default function CVEditorPage() {
  const params = useParams();
  const cvId = params.id as string;

  const {
    cv,
    loadCV,
    activeSection,
    setActiveSection,
    isSaving,
    lastSavedAt,
    setTemplate,
    saveCV,
  } = useCVEditorStore();

  const [loading, setLoading] = useState(true);
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [editingTitle, setEditingTitle] = useState(false);

  useEffect(() => {
    loadCV(cvId)
      .then(() => setLoading(false))
      .catch(() => {
        toast.error("Không thể tải CV");
        setLoading(false);
      });
  }, [cvId, loadCV]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f8f9fb]">
        <div className="w-8 h-8 border-2 border-[#003d9b] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f8f9fb]">
        <p className="text-[#434654]">CV không tồn tại</p>
      </div>
    );
  }

  const handleExportPDF = async () => {
    await saveCV();
    window.open(`/api/cv/pdf?id=${cv.id}`, "_blank");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "personal": return <PersonalInfoForm />;
      case "experience": return <ExperienceForm />;
      case "education": return <EducationForm />;
      case "skills": return <SkillsForm />;
      case "languages": return <LanguagesForm />;
      case "projects": return <ProjectsForm />;
      default: return <PersonalInfoForm />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#f8f9fb]">
      {/* Top Nav — Stitch style */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)]">
        <div className="max-w-full mx-auto flex justify-between items-center h-20 px-8">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-black tracking-tighter text-blue-800" style={{ fontFamily: "var(--font-headline)" }}>CareerFlow</span>
            <nav className="hidden md:flex gap-6">
              <span className="text-blue-700 font-bold border-b-2 border-blue-700 pb-1 text-sm tracking-tight" style={{ fontFamily: "var(--font-headline)" }}>Tạo CV</span>
              <a className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-semibold tracking-tight" href="/viec-lam" style={{ fontFamily: "var(--font-headline)" }}>Việc làm</a>
              <a className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-semibold tracking-tight" href="/ung-vien" style={{ fontFamily: "var(--font-headline)" }}>Ứng viên</a>
              <a className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-semibold tracking-tight" href="/cong-cu" style={{ fontFamily: "var(--font-headline)" }}>Tools</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* Save status */}
            <span className="text-xs text-[#434654] hidden sm:block">
              {isSaving ? "Đang lưu..." : lastSavedAt ? "Đã lưu" : ""}
            </span>
            {/* Template selector */}
            <select
              value={cv.template_id}
              onChange={(e) => setTemplate(e.target.value)}
              className="h-10 text-sm rounded-xl border-none bg-[#f3f4f6] px-4 focus:ring-1 focus:ring-[#003d9b] font-medium"
            >
              {Object.entries(templates).map(([id, tmpl]) => (
                <option key={id} value={id}>{tmpl.name}</option>
              ))}
            </select>
            <button
              onClick={handleExportPDF}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#d4e0f8] text-[#3b475b] hover:opacity-90 transition-all"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Tải PDF
            </button>
            <PublishDialog />
          </div>
        </div>
      </header>

      {/* Main Editor */}
      <main className="pt-20 flex-1 flex overflow-hidden">
        {/* Left: Form Editor */}
        <section className={`w-full md:w-1/2 lg:w-[45%] h-full bg-[#f3f4f6] flex flex-col overflow-hidden ${mobileView === "preview" ? "hidden md:flex" : "flex"}`}>
          <div className="p-8 pb-4">
            {editingTitle ? (
              <Input
                className="text-3xl font-extrabold bg-transparent border-none p-0 h-auto focus-visible:ring-0"
                style={{ fontFamily: "var(--font-headline)" }}
                value={cv.title}
                onChange={(e) =>
                  useCVEditorStore.setState((s) => ({
                    cv: s.cv ? { ...s.cv, title: e.target.value } : null,
                    isDirty: true,
                  }))
                }
                onBlur={() => { setEditingTitle(false); saveCV(); }}
                onKeyDown={(e) => { if (e.key === "Enter") { setEditingTitle(false); saveCV(); } }}
                autoFocus
              />
            ) : (
              <h1
                className="text-3xl font-extrabold text-[#191c1e] tracking-tight cursor-pointer hover:text-[#003d9b] transition-colors"
                style={{ fontFamily: "var(--font-headline)" }}
                onClick={() => setEditingTitle(true)}
              >
                {cv.title}
              </h1>
            )}
            <p className="text-[#434654] text-sm mt-1">Thông tin được lưu tự động trong quá trình chỉnh sửa.</p>
          </div>

          {/* Section tabs */}
          <div className="flex gap-1 px-8 mb-4 overflow-x-auto pb-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? "bg-white text-[#003d9b] shadow-sm"
                    : "text-[#434654] hover:bg-white/50"
                }`}
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Form content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-8 pb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              {renderSection()}
            </div>
          </div>
        </section>

        {/* Right: Preview */}
        <section className={`flex-1 h-full bg-[#e1e2e4] ${mobileView === "edit" ? "hidden md:flex" : "flex"} items-center justify-center overflow-hidden`}>
          <PreviewContainer />
        </section>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-[#c3c6d6]/10 px-8 py-3 flex justify-around items-center z-50">
        <button
          onClick={() => setMobileView("edit")}
          className={`flex flex-col items-center gap-1 ${mobileView === "edit" ? "text-[#003d9b]" : "text-[#434654] opacity-60"}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          <span className="text-[10px] font-bold">Chỉnh sửa</span>
        </button>
        <button
          onClick={() => setMobileView("preview")}
          className={`flex flex-col items-center gap-1 ${mobileView === "preview" ? "text-[#003d9b]" : "text-[#434654] opacity-60"}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          <span className="text-[10px] font-bold">Xem trước</span>
        </button>
        <button
          onClick={handleExportPDF}
          className="flex flex-col items-center gap-1 text-[#434654] opacity-60"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <span className="text-[10px] font-bold">Tải về</span>
        </button>
      </div>
    </div>
  );
}
