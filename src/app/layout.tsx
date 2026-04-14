import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import { CookieBanner } from "@/components/cookie-banner";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const manrope = Manrope({
  variable: "--font-headline",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CareerFlow - Kiến tạo sự nghiệp tương lai",
    template: "%s | CareerFlow",
  },
  description:
    "Tạo CV chuyên nghiệp, publish online, và kết nối với nhà tuyển dụng hàng đầu. Nền tảng kiến tạo sự nghiệp cho người Việt.",
  keywords: [
    "CV",
    "tạo CV",
    "tìm việc",
    "tuyển dụng",
    "việc làm",
    "career",
    "CareerFlow",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${manrope.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <CookieBanner />
        <Toaster position="top-right" richColors />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}
