import { notFound } from "next/navigation";
import { AppPage, pageRoutes } from "@/components/cvai/cvai-app";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return pageRoutes.map((route) => ({ slug: route.split("/") }));
}

export default async function V2DynamicPage({ params }: Props) {
  const { slug } = await params;
  const route = slug.join("/");

  if (route === "guidelines") {
    // handled by /v2/guidelines/page.tsx
    notFound();
  }

  if (!pageRoutes.includes(route)) {
    notFound();
  }

  return <AppPage route={route} />;
}
