import type { CVData, SampleCVData, SampleCVPreset } from "@/lib/types";

export const blankPersonalInfo: SampleCVData["personal_info"] = {
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

export const emptyCVData: SampleCVData = {
  personal_info: blankPersonalInfo,
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
};

export const sampleCvPresets: SampleCVPreset[] = [
  {
    id: "it-product-engineer",
    name: "Software Engineer",
    industry: "Công nghệ",
    level: "Mid-level",
    description: "CV kỹ sư phần mềm thiên về product, backend/frontend và số liệu tác động.",
    recommendedTemplateIds: ["modern", "seoul", "berlin"],
    data: {
      personal_info: {
        full_name: "Nguyễn Minh Anh",
        title: "Software Engineer",
        email: "minhanh.dev@email.com",
        phone: "090 123 4567",
        address: "TP. Hồ Chí Minh",
        date_of_birth: "",
        summary:
          "Software Engineer với 4 năm kinh nghiệm xây dựng sản phẩm web quy mô lớn bằng React, Next.js và Node.js. Mạnh về tối ưu hiệu năng, thiết kế API rõ ràng và phối hợp chặt với Product/Design để đưa tính năng từ ý tưởng đến production.",
        photo_url: "",
        website: "minhanh.dev",
        linkedin: "linkedin.com/in/minhanh",
        github: "github.com/minhanh",
      },
      experiences: [
        {
          company: "Fintech Nova",
          position: "Software Engineer",
          start_date: "2023-02",
          end_date: "",
          is_current: true,
          location: "TP. Hồ Chí Minh",
          description:
            "Phát triển dashboard thanh toán cho hơn 40.000 người dùng hoạt động mỗi tháng.\nTối ưu tốc độ tải trang chủ từ 3,2s xuống 1,4s bằng code splitting, cache strategy và image optimization.\nThiết kế API quản lý giao dịch giúp giảm 28% thời gian xử lý lỗi của team vận hành.",
        },
        {
          company: "Teko Solutions",
          position: "Frontend Developer",
          start_date: "2020-08",
          end_date: "2023-01",
          is_current: false,
          location: "Hà Nội",
          description:
            "Xây dựng component library dùng chung cho 5 sản phẩm nội bộ.\nTriển khai flow checkout mới, góp phần tăng 12% conversion trên mobile.\nPhối hợp QA viết regression checklist, giảm lỗi UI lặp lại trong mỗi sprint.",
        },
      ],
      education: [
        {
          school: "Đại học Bách Khoa Hà Nội",
          degree: "Cử nhân",
          field: "Khoa học máy tính",
          start_date: "2016",
          end_date: "2020",
          description: "Đồ án tốt nghiệp: hệ thống gợi ý sản phẩm theo hành vi người dùng.",
          gpa: "3.45/4.0",
        },
      ],
      skills: [
        { name: "React", level: 5, category: "Frontend" },
        { name: "Next.js", level: 5, category: "Frontend" },
        { name: "TypeScript", level: 4, category: "Engineering" },
        { name: "Node.js", level: 4, category: "Backend" },
        { name: "PostgreSQL", level: 4, category: "Database" },
      ],
      languages: [
        { name: "Tiếng Việt", proficiency: "Bản ngữ" },
        { name: "Tiếng Anh", proficiency: "Thành thạo" },
      ],
      certifications: [
        { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "2024-06", url: "" },
      ],
      projects: [
        {
          name: "Realtime Analytics Console",
          description: "Dashboard phân tích giao dịch realtime với phân quyền theo vai trò và cảnh báo bất thường.",
          url: "github.com/minhanh/analytics-console",
          technologies: ["Next.js", "Supabase", "Recharts"],
        },
      ],
    },
  },
  {
    id: "marketing-growth",
    name: "Growth Marketing",
    industry: "Marketing",
    level: "Mid-level",
    description: "Mẫu CV cho performance/growth marketer, nhấn mạnh ngân sách, kênh và kết quả.",
    recommendedTemplateIds: ["creative", "milano", "modern"],
    data: {
      personal_info: {
        full_name: "Trần Thảo Vy",
        title: "Growth Marketing Specialist",
        email: "thaovy.marketing@email.com",
        phone: "091 234 5678",
        address: "Hà Nội",
        date_of_birth: "",
        summary:
          "Growth Marketing Specialist với 5 năm kinh nghiệm triển khai paid media, CRM và lifecycle campaign cho thương mại điện tử. Từng quản lý ngân sách 1,2 tỷ/tháng, tối ưu CAC và tăng trưởng doanh thu theo từng cohort khách hàng.",
        photo_url: "",
        website: "thaovyportfolio.com",
        linkedin: "linkedin.com/in/thaovy",
        github: "",
      },
      experiences: [
        {
          company: "Tiki",
          position: "Growth Marketing Specialist",
          start_date: "2022-04",
          end_date: "",
          is_current: true,
          location: "Hà Nội",
          description:
            "Quản lý chiến dịch Meta, Google và TikTok Ads với ngân sách 1,2 tỷ/tháng.\nTăng ROAS trung bình từ 2,8 lên 4,1 trong 2 quý thông qua audience testing và creative iteration.\nXây dựng email automation cho nhóm khách hàng quay lại, đóng góp 18% doanh thu CRM.",
        },
        {
          company: "BeautyPlus Vietnam",
          position: "Performance Marketing Executive",
          start_date: "2019-09",
          end_date: "2022-03",
          is_current: false,
          location: "TP. Hồ Chí Minh",
          description:
            "Triển khai funnel acquisition cho app mobile, đạt 300.000 lượt cài đặt trong 9 tháng.\nTối ưu landing page và tracking event, giảm 22% chi phí mỗi lead đủ điều kiện.",
        },
      ],
      education: [
        {
          school: "Đại học Kinh tế Quốc dân",
          degree: "Cử nhân",
          field: "Marketing",
          start_date: "2015",
          end_date: "2019",
          description: "",
          gpa: "3.6/4.0",
        },
      ],
      skills: [
        { name: "Google Ads", level: 5, category: "Paid Media" },
        { name: "Meta Ads", level: 5, category: "Paid Media" },
        { name: "TikTok Ads", level: 4, category: "Paid Media" },
        { name: "GA4", level: 4, category: "Analytics" },
        { name: "CRM Automation", level: 4, category: "Lifecycle" },
      ],
      languages: [
        { name: "Tiếng Việt", proficiency: "Bản ngữ" },
        { name: "Tiếng Anh", proficiency: "Thành thạo" },
      ],
      certifications: [
        { name: "Google Ads Search Certification", issuer: "Google", date: "2024-03", url: "" },
      ],
      projects: [
        {
          name: "Holiday Growth Playbook",
          description: "Bộ framework creative testing và budget allocation cho mùa sale 11.11-12.12.",
          url: "",
          technologies: ["GA4", "Looker Studio", "Meta Ads"],
        },
      ],
    },
  },
  {
    id: "sales-b2b",
    name: "B2B Sales",
    industry: "Sales",
    level: "Senior",
    description: "CV sales chuyên nghiệp, tập trung pipeline, doanh số và năng lực chốt deal.",
    recommendedTemplateIds: ["executive", "classic", "dubai"],
    data: {
      personal_info: {
        full_name: "Phạm Hoàng Nam",
        title: "Senior B2B Sales Executive",
        email: "hoangnam.sales@email.com",
        phone: "093 456 7890",
        address: "TP. Hồ Chí Minh",
        date_of_birth: "",
        summary:
          "Senior B2B Sales Executive với 7 năm kinh nghiệm bán giải pháp SaaS cho nhóm khách hàng enterprise. Mạnh về outbound strategy, consultative selling, đàm phán hợp đồng và phát triển quan hệ khách hàng dài hạn.",
        photo_url: "",
        website: "",
        linkedin: "linkedin.com/in/hoangnam",
        github: "",
      },
      experiences: [
        {
          company: "Base.vn",
          position: "Senior B2B Sales Executive",
          start_date: "2021-01",
          end_date: "",
          is_current: true,
          location: "TP. Hồ Chí Minh",
          description:
            "Đạt 126% quota năm 2024 với tổng giá trị hợp đồng mới 18 tỷ đồng.\nXây dựng pipeline enterprise từ outbound và referral, duy trì win rate 31%.\nDẫn dắt onboarding cho 3 sales mới, chuẩn hóa discovery script và proposal template.",
        },
        {
          company: "Haravan",
          position: "Account Executive",
          start_date: "2017-06",
          end_date: "2020-12",
          is_current: false,
          location: "TP. Hồ Chí Minh",
          description:
            "Phụ trách nhóm khách hàng retail và F&B, tăng doanh thu upsell 35% YoY.\nPhối hợp Customer Success giảm churn nhóm account chiến lược từ 9% xuống 5%.",
        },
      ],
      education: [
        {
          school: "Đại học Ngoại thương",
          degree: "Cử nhân",
          field: "Kinh doanh quốc tế",
          start_date: "2013",
          end_date: "2017",
          description: "",
          gpa: "",
        },
      ],
      skills: [
        { name: "Enterprise Sales", level: 5, category: "Sales" },
        { name: "Negotiation", level: 5, category: "Sales" },
        { name: "CRM", level: 4, category: "Tools" },
        { name: "Pipeline Forecasting", level: 4, category: "Sales Ops" },
      ],
      languages: [
        { name: "Tiếng Việt", proficiency: "Bản ngữ" },
        { name: "Tiếng Anh", proficiency: "Giao tiếp được" },
      ],
      certifications: [],
      projects: [],
    },
  },
  {
    id: "finance-analyst",
    name: "Financial Analyst",
    industry: "Tài chính",
    level: "Mid-level",
    description: "Mẫu CV phân tích tài chính với báo cáo, mô hình dự báo và kiểm soát ngân sách.",
    recommendedTemplateIds: ["classic", "executive", "tokyo"],
    data: {
      personal_info: {
        full_name: "Lê Quốc Huy",
        title: "Financial Analyst",
        email: "quochuy.finance@email.com",
        phone: "094 567 8901",
        address: "Hà Nội",
        date_of_birth: "",
        summary:
          "Financial Analyst với 4 năm kinh nghiệm lập mô hình tài chính, phân tích P&L và hỗ trợ ban lãnh đạo ra quyết định ngân sách. Thành thạo Excel nâng cao, Power BI và báo cáo quản trị theo tháng/quý.",
        photo_url: "",
        website: "",
        linkedin: "linkedin.com/in/quochuy",
        github: "",
      },
      experiences: [
        {
          company: "Masan Consumer",
          position: "Financial Analyst",
          start_date: "2022-05",
          end_date: "",
          is_current: true,
          location: "Hà Nội",
          description:
            "Xây dựng mô hình forecast doanh thu và chi phí cho 6 ngành hàng, sai lệch thực tế dưới 5%.\nTự động hóa báo cáo P&L bằng Power Query, giảm 10 giờ thao tác thủ công mỗi tháng.\nPhân tích hiệu quả khuyến mãi, đề xuất cắt giảm 8% ngân sách kém hiệu quả.",
        },
        {
          company: "PwC Vietnam",
          position: "Audit Associate",
          start_date: "2019-08",
          end_date: "2022-04",
          is_current: false,
          location: "Hà Nội",
          description:
            "Tham gia kiểm toán báo cáo tài chính cho khách hàng FMCG và manufacturing.\nKiểm tra doanh thu, tồn kho và chi phí hoạt động theo chuẩn VAS/IFRS.",
        },
      ],
      education: [
        {
          school: "Học viện Tài chính",
          degree: "Cử nhân",
          field: "Tài chính doanh nghiệp",
          start_date: "2015",
          end_date: "2019",
          description: "",
          gpa: "3.5/4.0",
        },
      ],
      skills: [
        { name: "Financial Modeling", level: 5, category: "Finance" },
        { name: "Excel", level: 5, category: "Tools" },
        { name: "Power BI", level: 4, category: "Analytics" },
        { name: "Budgeting", level: 4, category: "Finance" },
      ],
      languages: [
        { name: "Tiếng Việt", proficiency: "Bản ngữ" },
        { name: "Tiếng Anh", proficiency: "Thành thạo" },
      ],
      certifications: [
        { name: "ACCA F1-F3", issuer: "ACCA", date: "2023-12", url: "" },
      ],
      projects: [],
    },
  },
  {
    id: "hr-talent",
    name: "Talent Acquisition",
    industry: "Nhân sự",
    level: "Mid-level",
    description: "CV tuyển dụng nhân sự, nhấn mạnh hiring funnel, stakeholder và employer branding.",
    recommendedTemplateIds: ["minimal", "modern", "seoul"],
    data: {
      personal_info: {
        full_name: "Đỗ Mai Linh",
        title: "Talent Acquisition Specialist",
        email: "mailinh.hr@email.com",
        phone: "096 678 9012",
        address: "TP. Hồ Chí Minh",
        date_of_birth: "",
        summary:
          "Talent Acquisition Specialist với 5 năm kinh nghiệm tuyển dụng tech và business roles cho môi trường tăng trưởng nhanh. Mạnh về sourcing, structured interview, candidate experience và phối hợp hiring manager.",
        photo_url: "",
        website: "",
        linkedin: "linkedin.com/in/mailinh",
        github: "",
      },
      experiences: [
        {
          company: "VNG Corporation",
          position: "Talent Acquisition Specialist",
          start_date: "2021-03",
          end_date: "",
          is_current: true,
          location: "TP. Hồ Chí Minh",
          description:
            "Tuyển 85 nhân sự/năm cho Product, Engineering, Data và Business team.\nRút ngắn time-to-hire trung bình từ 42 ngày xuống 29 ngày bằng talent pool và interview kit chuẩn hóa.\nPhối hợp Employer Branding tổ chức 6 webinar tuyển dụng, tạo hơn 1.200 lead ứng viên.",
        },
        {
          company: "Navigos Search",
          position: "Recruitment Consultant",
          start_date: "2018-07",
          end_date: "2021-02",
          is_current: false,
          location: "TP. Hồ Chí Minh",
          description:
            "Phụ trách nhóm khách hàng công nghệ và thương mại điện tử.\nDuy trì tỷ lệ offer acceptance 78% nhờ tư vấn kỳ vọng lương và văn hóa phù hợp.",
        },
      ],
      education: [
        {
          school: "Đại học Khoa học Xã hội và Nhân văn",
          degree: "Cử nhân",
          field: "Tâm lý học",
          start_date: "2014",
          end_date: "2018",
          description: "",
          gpa: "",
        },
      ],
      skills: [
        { name: "Sourcing", level: 5, category: "Recruiting" },
        { name: "Interview Design", level: 4, category: "Recruiting" },
        { name: "Stakeholder Management", level: 4, category: "HR" },
        { name: "Employer Branding", level: 4, category: "HR" },
      ],
      languages: [
        { name: "Tiếng Việt", proficiency: "Bản ngữ" },
        { name: "Tiếng Anh", proficiency: "Thành thạo" },
      ],
      certifications: [],
      projects: [],
    },
  },
  {
    id: "design-product",
    name: "Product Designer",
    industry: "Thiết kế",
    level: "Mid-level",
    description: "Mẫu CV designer, cân bằng portfolio, research, UI system và impact.",
    recommendedTemplateIds: ["creative", "milano", "tokyo"],
    data: {
      personal_info: {
        full_name: "Vũ Gia Hân",
        title: "Product Designer",
        email: "giahan.design@email.com",
        phone: "097 789 0123",
        address: "Đà Nẵng",
        date_of_birth: "",
        summary:
          "Product Designer với 4 năm kinh nghiệm thiết kế B2B SaaS và mobile app. Có thế mạnh về user research, information architecture, design system và phối hợp với engineering để ship giao diện chỉn chu.",
        photo_url: "",
        website: "giahan.design",
        linkedin: "linkedin.com/in/giahan",
        github: "",
      },
      experiences: [
        {
          company: "KiotViet",
          position: "Product Designer",
          start_date: "2022-01",
          end_date: "",
          is_current: true,
          location: "Remote",
          description:
            "Thiết kế lại flow quản lý kho cho merchant, giảm 24% thời gian hoàn tất tác vụ chính.\nXây dựng design tokens và component guidelines cho dashboard web.\nThực hiện 18 buổi phỏng vấn người dùng để ưu tiên roadmap cải tiến UX.",
        },
        {
          company: "Enlab Software",
          position: "UI/UX Designer",
          start_date: "2019-09",
          end_date: "2021-12",
          is_current: false,
          location: "Đà Nẵng",
          description:
            "Thiết kế landing page, dashboard và app mobile cho khách hàng US/EU.\nPhối hợp frontend tạo handoff checklist, giảm vòng sửa UI sau dev review.",
        },
      ],
      education: [
        {
          school: "Đại học Kiến trúc Đà Nẵng",
          degree: "Cử nhân",
          field: "Thiết kế đồ họa",
          start_date: "2015",
          end_date: "2019",
          description: "",
          gpa: "",
        },
      ],
      skills: [
        { name: "Figma", level: 5, category: "Design" },
        { name: "User Research", level: 4, category: "Research" },
        { name: "Design System", level: 4, category: "Design" },
        { name: "Prototyping", level: 4, category: "Design" },
      ],
      languages: [
        { name: "Tiếng Việt", proficiency: "Bản ngữ" },
        { name: "Tiếng Anh", proficiency: "Giao tiếp được" },
      ],
      certifications: [],
      projects: [
        {
          name: "Inventory UX Redesign",
          description: "Case study cải thiện flow kiểm kho cho cửa hàng bán lẻ nhiều chi nhánh.",
          url: "giahan.design/inventory-redesign",
          technologies: ["Figma", "Maze", "Design System"],
        },
      ],
    },
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    industry: "Data",
    level: "Junior-Mid",
    description: "CV phân tích dữ liệu, nhấn SQL, dashboard và insight kinh doanh.",
    recommendedTemplateIds: ["seoul", "modern", "classic"],
    data: {
      personal_info: {
        full_name: "Bùi Khánh Linh",
        title: "Data Analyst",
        email: "khanhlinh.data@email.com",
        phone: "098 890 1234",
        address: "Hà Nội",
        date_of_birth: "",
        summary:
          "Data Analyst với 3 năm kinh nghiệm phân tích dữ liệu vận hành, marketing và sản phẩm. Thành thạo SQL, Python, Power BI và kể chuyện bằng dữ liệu để hỗ trợ quyết định kinh doanh.",
        photo_url: "",
        website: "khanhlinhdata.com",
        linkedin: "linkedin.com/in/khanhlinh",
        github: "github.com/khanhlinh",
      },
      experiences: [
        {
          company: "Shopee Vietnam",
          position: "Data Analyst",
          start_date: "2022-07",
          end_date: "",
          is_current: true,
          location: "Hà Nội",
          description:
            "Xây dựng dashboard theo dõi funnel mua hàng cho category team, dùng bởi 30+ stakeholder mỗi tuần.\nPhân tích cohort khách hàng mới, phát hiện nhóm rủi ro churn và đề xuất chiến dịch giữ chân giúp tăng 9% repeat purchase.\nTự động hóa truy vấn SQL định kỳ, giảm 60% thời gian chuẩn bị báo cáo.",
        },
        {
          company: "MoMo",
          position: "Business Intelligence Intern",
          start_date: "2021-01",
          end_date: "2022-06",
          is_current: false,
          location: "Hà Nội",
          description:
            "Hỗ trợ phân tích hiệu quả campaign cashback và báo cáo daily active users.\nLàm sạch dữ liệu giao dịch, chuẩn hóa metric cho weekly business review.",
        },
      ],
      education: [
        {
          school: "Đại học Kinh tế Quốc dân",
          degree: "Cử nhân",
          field: "Hệ thống thông tin quản lý",
          start_date: "2017",
          end_date: "2021",
          description: "",
          gpa: "3.7/4.0",
        },
      ],
      skills: [
        { name: "SQL", level: 5, category: "Data" },
        { name: "Python", level: 4, category: "Data" },
        { name: "Power BI", level: 4, category: "BI" },
        { name: "A/B Testing", level: 3, category: "Experiment" },
      ],
      languages: [
        { name: "Tiếng Việt", proficiency: "Bản ngữ" },
        { name: "Tiếng Anh", proficiency: "Thành thạo" },
      ],
      certifications: [
        { name: "Google Data Analytics Certificate", issuer: "Google", date: "2023-09", url: "" },
      ],
      projects: [
        {
          name: "Customer Retention Dashboard",
          description: "Dashboard theo dõi cohort, churn risk và hiệu quả chiến dịch giữ chân khách hàng.",
          url: "github.com/khanhlinh/retention-dashboard",
          technologies: ["SQL", "Python", "Power BI"],
        },
      ],
    },
  },
  {
    id: "operations-manager",
    name: "Operations Manager",
    industry: "Vận hành",
    level: "Manager",
    description: "CV vận hành dành cho quản lý quy trình, SLA, chi phí và đội nhóm.",
    recommendedTemplateIds: ["executive", "dubai", "berlin"],
    data: {
      personal_info: {
        full_name: "Ngô Minh Quân",
        title: "Operations Manager",
        email: "minhquan.ops@email.com",
        phone: "099 901 2345",
        address: "Bình Dương",
        date_of_birth: "",
        summary:
          "Operations Manager với 8 năm kinh nghiệm quản lý kho, logistics và quy trình vận hành đa chi nhánh. Có năng lực xây dựng KPI, tối ưu chi phí, cải thiện SLA và dẫn dắt đội nhóm hơn 60 nhân sự.",
        photo_url: "",
        website: "",
        linkedin: "linkedin.com/in/minhquan",
        github: "",
      },
      experiences: [
        {
          company: "GHN Express",
          position: "Operations Manager",
          start_date: "2020-11",
          end_date: "",
          is_current: true,
          location: "Bình Dương",
          description:
            "Quản lý vận hành trung tâm phân loại xử lý trung bình 120.000 đơn/ngày.\nTối ưu layout kho và ca làm việc, giảm 14% chi phí overtime trong 6 tháng.\nCải thiện SLA giao hàng đúng hẹn từ 91% lên 96,5% thông qua dashboard vận hành realtime.",
        },
        {
          company: "Lazada Logistics",
          position: "Warehouse Supervisor",
          start_date: "2016-05",
          end_date: "2020-10",
          is_current: false,
          location: "Bình Dương",
          description:
            "Giám sát 35 nhân sự kho, phụ trách inbound, picking, packing và dispatch.\nTriển khai checklist an toàn và đào tạo nhân sự mới, giảm 30% lỗi vận hành lặp lại.",
        },
      ],
      education: [
        {
          school: "Đại học Giao thông Vận tải TP.HCM",
          degree: "Cử nhân",
          field: "Logistics và quản lý chuỗi cung ứng",
          start_date: "2012",
          end_date: "2016",
          description: "",
          gpa: "",
        },
      ],
      skills: [
        { name: "Process Optimization", level: 5, category: "Operations" },
        { name: "Warehouse Management", level: 5, category: "Operations" },
        { name: "SLA Management", level: 4, category: "Operations" },
        { name: "Team Leadership", level: 5, category: "Management" },
      ],
      languages: [
        { name: "Tiếng Việt", proficiency: "Bản ngữ" },
        { name: "Tiếng Anh", proficiency: "Giao tiếp được" },
      ],
      certifications: [
        { name: "Lean Six Sigma Yellow Belt", issuer: "6sigmastudy", date: "2022-08", url: "" },
      ],
      projects: [],
    },
  },
];

export function getSampleCvPreset(sampleId?: string | null) {
  if (!sampleId) return null;
  return sampleCvPresets.find((preset) => preset.id === sampleId) ?? null;
}

export function cloneSampleCVData(data: SampleCVData): SampleCVData {
  return JSON.parse(JSON.stringify(data)) as SampleCVData;
}

export function makePreviewCV(templateId: string, sampleId?: string | null): CVData {
  const preset = getSampleCvPreset(sampleId) ?? sampleCvPresets[0];
  const data = cloneSampleCVData(preset.data);

  return {
    id: "preview",
    user_id: "preview",
    title: `${preset.name} CV`,
    template_id: templateId,
    is_primary: false,
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
    ...data,
  };
}
