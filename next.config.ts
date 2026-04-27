import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/v2", destination: "/", permanent: true },
      { source: "/v2/jobs", destination: "/viec-lam", permanent: true },
      { source: "/v2/jobs/:slug", destination: "/viec-lam/:slug", permanent: true },
      { source: "/v2/candidate/dashboard", destination: "/dashboard", permanent: true },
      { source: "/v2/candidate/applications", destination: "/ung-tuyen", permanent: true },
      { source: "/v2/candidate/cv-library", destination: "/cv", permanent: true },
      { source: "/v2/candidate/jd-match", destination: "/cong-cu/jd-match", permanent: true },
      { source: "/v2/candidate/profile", destination: "/ho-so", permanent: true },
      { source: "/v2/candidate/upload-cv", destination: "/cv/moi", permanent: true },
      { source: "/v2/candidate/cv-review-report", destination: "/cong-cu/danh-gia-cv", permanent: true },
      { source: "/v2/company/jobs", destination: "/nha-tuyen-dung/tin-tuyen", permanent: true },
      { source: "/v2/company/pipeline", destination: "/nha-tuyen-dung/pipeline", permanent: true },
      { source: "/v2/company/dashboard", destination: "/nha-tuyen-dung/cong-ty", permanent: true },
      { source: "/v2/company/profile", destination: "/nha-tuyen-dung/cong-ty", permanent: true },
      { source: "/v2/login", destination: "/dang-nhap", permanent: true },
      { source: "/v2/pricing", destination: "/bang-gia", permanent: true },
      { source: "/v2/companies", destination: "/nha-tuyen-dung/cong-ty", permanent: true },
      { source: "/v2/:path*", destination: "/", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "zgbpkrvninhjhctxwbsp.supabase.co",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
