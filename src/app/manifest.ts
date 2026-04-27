import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YourCV — AI CV Review + AI Recruiting",
    short_name: "YourCV",
    description:
      "Nền tảng AI cho ứng viên Việt: review CV, JD match, ứng tuyển 1-click. Cho HR: AI shortlist, pipeline, interview kit.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fbff",
    theme_color: "#1557ff",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["productivity", "business", "education"],
    lang: "vi",
    dir: "ltr",
  };
}
