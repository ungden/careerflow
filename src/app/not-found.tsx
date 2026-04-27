import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-32 bg-[#f8f9fb]">
        <div className="max-w-lg text-center space-y-8">
          <h1
            className="text-8xl font-extrabold text-[#1557ff] tracking-tighter"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            404
          </h1>
          <h2
            className="text-3xl font-bold text-[#191c1e] tracking-tight"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Trang không tồn tại
          </h2>
          <p className="text-[#434654] text-lg leading-relaxed">
            Xin lỗi, trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
          </p>
          <Link
            href="/"
            className="inline-block kinetic-gradient text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition-all"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Về trang chủ
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
