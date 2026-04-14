export interface PersonalInfo {
  full_name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  summary: string;
  photo_url: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface Experience {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
  location: string;
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
  description: string;
  gpa: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Project {
  name: string;
  description: string;
  url: string;
  technologies: string[];
}

export interface CVData {
  id: string;
  user_id: string;
  title: string;
  template_id: string;
  is_primary: boolean;
  personal_info: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  projects: Project[];
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: "candidate" | "employer" | "admin";
  subscription_tier: "free" | "pro";
  subscription_expires_at: string | null;
  slug: string | null;
  is_published: boolean;
  locale: string;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  website: string | null;
  description: string | null;
  industry: string | null;
  company_size: string | null;
  location: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  company_id: string;
  posted_by: string;
  title: string;
  slug: string;
  description: string;
  requirements: string | null;
  benefits: string | null;
  industry: string;
  job_type: string;
  experience_level: string | null;
  location: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_visible: boolean;
  is_active: boolean;
  expires_at: string | null;
  views_count: number;
  applications_count: number;
  created_at: string;
  updated_at: string;
  company?: Company;
}

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  cv_id: string;
  cover_letter: string | null;
  status: "pending" | "viewed" | "shortlisted" | "rejected" | "hired";
  created_at: string;
  updated_at: string;
  job?: Job;
  cv?: CVData;
}
