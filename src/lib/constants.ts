export const INDUSTRIES = [
  "Công nghệ thông tin",
  "Tài chính - Ngân hàng",
  "Marketing - Truyền thông",
  "Bán hàng - Kinh doanh",
  "Giáo dục - Đào tạo",
  "Y tế - Dược phẩm",
  "Xây dựng - Bất động sản",
  "Sản xuất - Vận hành",
  "Nhân sự - Hành chính",
  "Thiết kế - Sáng tạo",
  "Luật - Pháp lý",
  "Logistics - Vận tải",
  "Du lịch - Nhà hàng - Khách sạn",
  "Nông nghiệp",
  "Khác",
] as const;

export const LOCATIONS = [
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Bình Dương",
  "Đồng Nai",
  "Khánh Hòa",
  "Quảng Ninh",
  "Remote",
  "Khác",
] as const;

export const JOB_TYPES = [
  { value: "full-time", label: "Toàn thời gian" },
  { value: "part-time", label: "Bán thời gian" },
  { value: "contract", label: "Hợp đồng" },
  { value: "internship", label: "Thực tập" },
  { value: "remote", label: "Làm việc từ xa" },
] as const;

export const EXPERIENCE_LEVELS = [
  { value: "intern", label: "Thực tập sinh" },
  { value: "junior", label: "Junior (0-2 năm)" },
  { value: "mid", label: "Mid-level (2-5 năm)" },
  { value: "senior", label: "Senior (5-8 năm)" },
  { value: "lead", label: "Lead (8+ năm)" },
  { value: "manager", label: "Quản lý" },
] as const;

export const SKILL_LEVELS = [
  { value: 1, label: "Cơ bản" },
  { value: 2, label: "Trung bình" },
  { value: 3, label: "Khá" },
  { value: 4, label: "Giỏi" },
  { value: 5, label: "Chuyên gia" },
] as const;

export const LANGUAGE_PROFICIENCY = [
  "Cơ bản",
  "Giao tiếp được",
  "Thành thạo",
  "Bản ngữ",
] as const;

export const CV_TEMPLATES = [
  { id: "classic", name: "Classic", premium: false, description: "Chuyên nghiệp, phổ thông" },
  { id: "modern", name: "Modern", premium: false, description: "Hiện đại, sáng tạo" },
  { id: "minimal", name: "Minimal", premium: true, description: "Tối giản, tinh tế" },
  { id: "creative", name: "Creative", premium: true, description: "Nổi bật, ấn tượng" },
  { id: "executive", name: "Executive", premium: true, description: "Trang trọng, cao cấp" },
  { id: "milano", name: "Milano", premium: true, description: "Editorial magazine style" },
  { id: "tokyo", name: "Tokyo", premium: true, description: "Zen minimalist, tinh tế" },
  { id: "berlin", name: "Berlin", premium: true, description: "Bold graphic, mạnh mẽ" },
  { id: "dubai", name: "Dubai", premium: true, description: "Luxury premium, sang trọng" },
  { id: "seoul", name: "Seoul", premium: true, description: "Tech startup, năng động" },
] as const;

export const APP_NAME = "YourCV";
export const APP_DESCRIPTION = "Tạo CV chuyên nghiệp, tìm việc dễ dàng";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
