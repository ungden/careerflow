import { ClassicTemplate } from "./classic";
import { ModernTemplate } from "./modern";
import { MinimalTemplate } from "./minimal";
import { CreativeTemplate } from "./creative";
import { ExecutiveTemplate } from "./executive";

export const templates = {
  classic: {
    component: ClassicTemplate,
    name: "Classic",
    premium: false,
    description: "Chuyên nghiệp, phổ thông",
  },
  modern: {
    component: ModernTemplate,
    name: "Modern",
    premium: false,
    description: "Hiện đại, sáng tạo",
  },
  minimal: {
    component: MinimalTemplate,
    name: "Minimal",
    premium: true,
    description: "Tối giản, tinh tế",
  },
  creative: {
    component: CreativeTemplate,
    name: "Creative",
    premium: true,
    description: "Nổi bật, ấn tượng",
  },
  executive: {
    component: ExecutiveTemplate,
    name: "Executive",
    premium: true,
    description: "Trang trọng, cao cấp",
  },
} as const;

export type TemplateId = keyof typeof templates;
