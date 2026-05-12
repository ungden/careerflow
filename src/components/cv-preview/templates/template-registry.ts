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
    description: "Chuyên nghiệp, dễ đọc",
    category: "Corporate",
    tags: ["ATS", "Truyền thống", "Một cột"],
    recommendedFor: ["Tài chính", "Sales", "Data"],
    previewSampleId: "finance-analyst",
  },
  modern: {
    component: ModernTemplate,
    name: "Modern",
    premium: false,
    description: "Hiện đại, rõ cấu trúc",
    category: "Modern",
    tags: ["Sidebar", "Tech", "Phổ biến"],
    recommendedFor: ["Công nghệ", "Marketing", "Nhân sự"],
    previewSampleId: "it-product-engineer",
  },
  minimal: {
    component: MinimalTemplate,
    name: "Minimal",
    premium: true,
    description: "Tối giản, tinh tế",
    category: "Minimal",
    tags: ["Tối giản", "Sáng", "Cao cấp"],
    recommendedFor: ["Nhân sự", "Tài chính", "Operations"],
    previewSampleId: "hr-talent",
  },
  creative: {
    component: CreativeTemplate,
    name: "Creative",
    premium: true,
    description: "Nổi bật, ấn tượng",
    category: "Creative",
    tags: ["Portfolio", "Màu sắc", "Marketing"],
    recommendedFor: ["Thiết kế", "Marketing", "Content"],
    previewSampleId: "design-product",
  },
  executive: {
    component: ExecutiveTemplate,
    name: "Executive",
    premium: true,
    description: "Trang trọng, cao cấp",
    category: "Executive",
    tags: ["Senior", "Leadership", "Corporate"],
    recommendedFor: ["Sales", "Vận hành", "Tài chính"],
    previewSampleId: "operations-manager",
  },
  milano: {
    component: MilanoTemplate,
    name: "Milano",
    premium: true,
    description: "Editorial magazine style",
    category: "Editorial",
    tags: ["Editorial", "Tinh tế", "Portfolio"],
    recommendedFor: ["Marketing", "Thiết kế", "Brand"],
    previewSampleId: "marketing-growth",
  },
  tokyo: {
    component: TokyoTemplate,
    name: "Tokyo",
    premium: true,
    description: "Zen minimalist, thoáng",
    category: "Minimal",
    tags: ["Zen", "Sạch", "Tinh gọn"],
    recommendedFor: ["Design", "Finance", "Data"],
    previewSampleId: "design-product",
  },
  berlin: {
    component: BerlinTemplate,
    name: "Berlin",
    premium: true,
    description: "Bold graphic, mạnh mẽ",
    category: "Bold",
    tags: ["Bold", "Impact", "Senior"],
    recommendedFor: ["Công nghệ", "Vận hành", "Sales"],
    previewSampleId: "it-product-engineer",
  },
  dubai: {
    component: DubaiTemplate,
    name: "Dubai",
    premium: true,
    description: "Luxury premium, sang trọng",
    category: "Luxury",
    tags: ["Luxury", "Executive", "Premium"],
    recommendedFor: ["Sales", "Vận hành", "Executive"],
    previewSampleId: "sales-b2b",
  },
  seoul: {
    component: SeoulTemplate,
    name: "Seoul",
    premium: true,
    description: "Tech startup, năng động",
    category: "Startup",
    tags: ["Startup", "Tech", "Data"],
    recommendedFor: ["Công nghệ", "Data", "Product"],
    previewSampleId: "data-analyst",
  },
} as const;

export type TemplateId = keyof typeof templates;
