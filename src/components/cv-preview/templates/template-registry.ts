import { ClassicTemplate } from "./classic";
import { ModernTemplate } from "./modern";
import { MinimalTemplate } from "./minimal";
import { CreativeTemplate } from "./creative";
import { ExecutiveTemplate } from "./executive";
import { MilanoTemplate } from "./milano";
import { TokyoTemplate } from "./tokyo";
import { BerlinTemplate } from "./berlin";
import { DubaiTemplate } from "./dubai";
import { SeoulTemplate } from "./seoul";

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
  milano: {
    component: MilanoTemplate,
    name: "Milano",
    premium: true,
    description: "Editorial magazine style",
  },
  tokyo: {
    component: TokyoTemplate,
    name: "Tokyo",
    premium: true,
    description: "Zen minimalist, tinh tế",
  },
  berlin: {
    component: BerlinTemplate,
    name: "Berlin",
    premium: true,
    description: "Bold graphic, mạnh mẽ",
  },
  dubai: {
    component: DubaiTemplate,
    name: "Dubai",
    premium: true,
    description: "Luxury premium, sang trọng",
  },
  seoul: {
    component: SeoulTemplate,
    name: "Seoul",
    premium: true,
    description: "Tech startup, năng động",
  },
} as const;

export type TemplateId = keyof typeof templates;
