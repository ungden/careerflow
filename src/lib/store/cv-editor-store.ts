import { create } from "zustand";
import type {
  CVData,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Language,
  Certification,
  Project,
} from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

interface CVEditorState {
  cv: CVData | null;
  activeSection: string;
  isSaving: boolean;
  lastSavedAt: Date | null;
  isDirty: boolean;

  // Actions
  loadCV: (id: string) => Promise<void>;
  initNewCV: (templateId: string) => Promise<string | null>;
  setActiveSection: (section: string) => void;
  setTemplate: (templateId: string) => void;

  // Personal info
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (index: number, data: Partial<Experience>) => void;
  removeExperience: (index: number) => void;

  // Education
  addEducation: () => void;
  updateEducation: (index: number, data: Partial<Education>) => void;
  removeEducation: (index: number) => void;

  // Skills
  addSkill: () => void;
  updateSkill: (index: number, data: Partial<Skill>) => void;
  removeSkill: (index: number) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (index: number, data: Partial<Language>) => void;
  removeLanguage: (index: number) => void;

  // Certifications
  addCertification: () => void;
  updateCertification: (index: number, data: Partial<Certification>) => void;
  removeCertification: (index: number) => void;

  // Projects
  addProject: () => void;
  updateProject: (index: number, data: Partial<Project>) => void;
  removeProject: (index: number) => void;

  // Save
  saveCV: () => Promise<void>;
}

let saveTimeout: NodeJS.Timeout | null = null;

const debouncedSave = (saveFn: () => Promise<void>) => {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => saveFn(), 800);
};

const emptyPersonalInfo: PersonalInfo = {
  full_name: "",
  title: "",
  email: "",
  phone: "",
  address: "",
  date_of_birth: "",
  summary: "",
  photo_url: "",
  website: "",
  linkedin: "",
  github: "",
};

export const useCVEditorStore = create<CVEditorState>((set, get) => ({
  cv: null,
  activeSection: "personal",
  isSaving: false,
  lastSavedAt: null,
  isDirty: false,

  loadCV: async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("cvs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    set({ cv: data as CVData, isDirty: false });
  },

  initNewCV: async (templateId: string) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("cvs")
      .insert({
        user_id: user.id,
        title: "CV chưa đặt tên",
        template_id: templateId,
        personal_info: emptyPersonalInfo,
        experiences: [],
        education: [],
        skills: [],
        languages: [],
        certifications: [],
        projects: [],
      })
      .select()
      .single();

    if (error) throw error;
    set({ cv: data as CVData, isDirty: false });
    return data.id;
  },

  setActiveSection: (section) => set({ activeSection: section }),

  setTemplate: (templateId) => {
    set((state) => ({
      cv: state.cv ? { ...state.cv, template_id: templateId } : null,
      isDirty: true,
    }));
    debouncedSave(get().saveCV);
  },

  updatePersonalInfo: (data) => {
    set((state) => ({
      cv: state.cv
        ? {
            ...state.cv,
            personal_info: { ...state.cv.personal_info, ...data },
          }
        : null,
      isDirty: true,
    }));
    debouncedSave(get().saveCV);
  },

  // Experience
  addExperience: () => {
    const newExp: Experience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
      location: "",
    };
    set((state) => ({
      cv: state.cv
        ? { ...state.cv, experiences: [...state.cv.experiences, newExp] }
        : null,
      isDirty: true,
    }));
    debouncedSave(get().saveCV);
  },

  updateExperience: (index, data) => {
    set((state) => {
      if (!state.cv) return state;
      const experiences = [...state.cv.experiences];
      experiences[index] = { ...experiences[index], ...data };
      return { cv: { ...state.cv, experiences }, isDirty: true };
    });
    debouncedSave(get().saveCV);
  },

  removeExperience: (index) => {
    set((state) => {
      if (!state.cv) return state;
      const experiences = state.cv.experiences.filter((_, i) => i !== index);
      return { cv: { ...state.cv, experiences }, isDirty: true };
    });
    debouncedSave(get().saveCV);
  },

  // Education
  addEducation: () => {
    const newEdu: Education = {
      school: "",
      degree: "",
      field: "",
      start_date: "",
      end_date: "",
      description: "",
      gpa: "",
    };
    set((state) => ({
      cv: state.cv
        ? { ...state.cv, education: [...state.cv.education, newEdu] }
        : null,
      isDirty: true,
    }));
    debouncedSave(get().saveCV);
  },

  updateEducation: (index, data) => {
    set((state) => {
      if (!state.cv) return state;
      const education = [...state.cv.education];
      education[index] = { ...education[index], ...data };
      return { cv: { ...state.cv, education }, isDirty: true };
    });
    debouncedSave(get().saveCV);
  },

  removeEducation: (index) => {
    set((state) => {
      if (!state.cv) return state;
      const education = state.cv.education.filter((_, i) => i !== index);
      return { cv: { ...state.cv, education }, isDirty: true };
    });
    debouncedSave(get().saveCV);
  },

  // Skills
  addSkill: () => {
    const newSkill: Skill = { name: "", level: 3, category: "" };
    set((state) => ({
      cv: state.cv
        ? { ...state.cv, skills: [...state.cv.skills, newSkill] }
        : null,
      isDirty: true,
    }));
    debouncedSave(get().saveCV);
  },

  updateSkill: (index, data) => {
    set((state) => {
      if (!state.cv) return state;
      const skills = [...state.cv.skills];
      skills[index] = { ...skills[index], ...data };
      return { cv: { ...state.cv, skills }, isDirty: true };
    });
    debouncedSave(get().saveCV);
  },

  removeSkill: (index) => {
    set((state) => {
      if (!state.cv) return state;
      const skills = state.cv.skills.filter((_, i) => i !== index);
      return { cv: { ...state.cv, skills }, isDirty: true };
    });
    debouncedSave(get().saveCV);
  },

  // Languages
  addLanguage: () => {
    const newLang: Language = { name: "", proficiency: "Cơ bản" };
    set((state) => ({
      cv: state.cv
        ? { ...state.cv, languages: [...state.cv.languages, newLang] }
        : null,
      isDirty: true,
    }));
    debouncedSave(get().saveCV);
  },

  updateLanguage: (index, data) => {
    set((state) => {
      if (!state.cv) return state;
      const languages = [...state.cv.languages];
      languages[index] = { ...languages[index], ...data };
      return { cv: { ...state.cv, languages }, isDirty: true };
    });
    debouncedSave(get().saveCV);
  },

  removeLanguage: (index) => {
    set((state) => {
      if (!state.cv) return state;
      const languages = state.cv.languages.filter((_, i) => i !== index);
      return { cv: { ...state.cv, languages }, isDirty: true };
    });
    debouncedSave(get().saveCV);
  },

  // Certifications
  addCertification: () => {
    const newCert: Certification = { name: "", issuer: "", date: "", url: "" };
    set((state) => ({
      cv: state.cv
        ? {
            ...state.cv,
            certifications: [...state.cv.certifications, newCert],
          }
        : null,
      isDirty: true,
    }));
    debouncedSave(get().saveCV);
  },

  updateCertification: (index, data) => {
    set((state) => {
      if (!state.cv) return state;
      const certifications = [...state.cv.certifications];
      certifications[index] = { ...certifications[index], ...data };
      return { cv: { ...state.cv, certifications }, isDirty: true };
    });
    debouncedSave(get().saveCV);
  },

  removeCertification: (index) => {
    set((state) => {
      if (!state.cv) return state;
      const certifications = state.cv.certifications.filter(
        (_, i) => i !== index
      );
      return { cv: { ...state.cv, certifications }, isDirty: true };
    });
    debouncedSave(get().saveCV);
  },

  // Projects
  addProject: () => {
    const newProject: Project = {
      name: "",
      description: "",
      url: "",
      technologies: [],
    };
    set((state) => ({
      cv: state.cv
        ? { ...state.cv, projects: [...state.cv.projects, newProject] }
        : null,
      isDirty: true,
    }));
    debouncedSave(get().saveCV);
  },

  updateProject: (index, data) => {
    set((state) => {
      if (!state.cv) return state;
      const projects = [...state.cv.projects];
      projects[index] = { ...projects[index], ...data };
      return { cv: { ...state.cv, projects }, isDirty: true };
    });
    debouncedSave(get().saveCV);
  },

  removeProject: (index) => {
    set((state) => {
      if (!state.cv) return state;
      const projects = state.cv.projects.filter((_, i) => i !== index);
      return { cv: { ...state.cv, projects }, isDirty: true };
    });
    debouncedSave(get().saveCV);
  },

  // Save to Supabase
  saveCV: async () => {
    const { cv, isDirty } = get();
    if (!cv || !isDirty) return;

    set({ isSaving: true });
    const supabase = createClient();

    const { error } = await supabase
      .from("cvs")
      .update({
        title: cv.title,
        template_id: cv.template_id,
        personal_info: cv.personal_info,
        experiences: cv.experiences,
        education: cv.education,
        skills: cv.skills,
        languages: cv.languages,
        certifications: cv.certifications,
        projects: cv.projects,
        updated_at: new Date().toISOString(),
      })
      .eq("id", cv.id);

    if (!error) {
      set({ isSaving: false, lastSavedAt: new Date(), isDirty: false });
    } else {
      set({ isSaving: false });
    }
  },
}));
