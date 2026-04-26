import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const isProd = process.env.VERCEL_ENV === "production" || baseUrl.includes("yourcv.net");
  if (!isProd) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/cv/", "/nha-tuyen-dung/", "/tin-nhan"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
