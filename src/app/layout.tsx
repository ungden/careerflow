import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

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
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
