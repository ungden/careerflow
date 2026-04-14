import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32">
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <div className="inline-flex items-center gap-2 bg-[#dae2ff] text-[#001848] px-4 py-2 rounded-full mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest">AI-Powered Career Platform</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#191c1e] mb-8 leading-[1.1]" style={{ fontFamily: "var(--font-headline)" }}>
                  Tạo CV chuyên nghiệp, <span className="text-[#003d9b] italic">có việc ngay</span> trong 1 nốt nhạc
                </h1>
                <p className="text-lg text-[#434654] mb-10 max-w-lg leading-relaxed">
                  Nền tảng kiến tạo sự nghiệp tương lai. Chúng tôi không chỉ giúp bạn tạo hồ sơ, chúng tôi mở ra cánh cửa đến với những cơ hội hàng đầu.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/cv/moi"
                    className="kinetic-gradient text-white px-10 py-5 rounded-xl font-extrabold text-lg flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] transition-transform"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Tạo CV miễn phí
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                  <Link
                    href="/viec-lam"
                    className="bg-white border-2 border-[#c3c6d6]/20 px-10 py-5 rounded-xl font-bold text-lg text-[#191c1e] hover:bg-[#f3f4f6] transition-colors text-center"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Khám phá việc làm
                  </Link>
                </div>
                <div className="mt-12 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100" />
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-200" />
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-300" />
                  </div>
                  <p className="text-sm text-[#434654] font-medium">+10,000 ứng viên đã thành công</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative">
                <div className="relative z-10 bg-white rounded-[32px] p-4 shadow-2xl border border-white/50">
                  <div className="rounded-[24px] w-full aspect-[4/3] bg-gradient-to-br from-[#dae2ff] to-[#f3f4f6] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-40 bg-white rounded-lg shadow-lg mx-auto mb-4 flex flex-col p-3 gap-1">
                        <div className="w-8 h-8 rounded-full bg-blue-100 mx-auto" />
                        <div className="w-full h-1.5 bg-slate-200 rounded mt-2" />
                        <div className="w-3/4 h-1.5 bg-slate-100 rounded" />
                        <div className="w-full h-6 bg-slate-50 rounded mt-2" />
                        <div className="w-full h-6 bg-slate-50 rounded" />
                      </div>
                      <p className="text-sm font-semibold text-[#434654]">CV Builder Preview</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#003d9b]/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#004e32]/5 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f3f4f6] -skew-x-12 origin-top-right -z-0" />
        </section>

        {/* Process Section: 3 Steps */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6" style={{ fontFamily: "var(--font-headline)" }}>
                Hành trình 3 bước đến thành công
              </h2>
              <p className="text-[#434654] max-w-2xl mx-auto text-lg">
                Quy trình tối giản giúp bạn tiết kiệm thời gian và tập trung vào những gì quan trọng nhất.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  step: "01",
                  title: "Tạo CV",
                  description: "Sử dụng kho template chuẩn Editorial để làm nổi bật kỹ năng và kinh nghiệm của bạn.",
                  hoverBg: "hover:bg-[#003d9b]",
                },
                {
                  step: "02",
                  title: "Publish Profile",
                  description: "Công khai hồ sơ chuyên nghiệp của bạn lên hệ thống để tiếp cận hàng nghìn nhà tuyển dụng.",
                  hoverBg: "hover:bg-[#004e32]",
                },
                {
                  step: "03",
                  title: "Nhận lời mời",
                  description: "Các cơ hội việc làm mơ ước sẽ chủ động tìm đến bạn dựa trên sự tương thích cao nhất.",
                  hoverBg: "hover:bg-[#535f73]",
                },
              ].map((item) => (
                <div key={item.step} className="group">
                  <div className={`bg-[#f3f4f6] rounded-[40px] p-10 h-full transition-all duration-500 ${item.hoverBg} hover:-translate-y-4`}>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-[#003d9b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <span className="text-6xl font-black text-[#c3c6d6]/20 mb-4 block group-hover:text-white/20">{item.step}.</span>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-white" style={{ fontFamily: "var(--font-headline)" }}>{item.title}</h3>
                    <p className="text-[#434654] group-hover:text-white/80 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketplace & Tools: Bento Grid */}
        <section className="py-32 bg-[#f8f9fb] overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6" style={{ fontFamily: "var(--font-headline)" }}>
                  Đặc quyền dành cho sự nghiệp của bạn
                </h2>
                <p className="text-[#434654] text-lg">
                  Không chỉ là CV, chúng tôi xây dựng một hệ sinh thái toàn diện để bạn phát triển không giới hạn.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Job Marketplace */}
              <div className="md:col-span-8 bg-white rounded-[40px] p-12 relative overflow-hidden shadow-sm">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-[#82f9be] text-[#005235] px-4 py-2 rounded-full mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest">Job Marketplace</span>
                  </div>
                  <h3 className="text-3xl font-extrabold mb-4 max-w-sm leading-tight" style={{ fontFamily: "var(--font-headline)" }}>
                    Kết nối với +2,000 doanh nghiệp hàng đầu
                  </h3>
                  <p className="text-[#434654] mb-12 max-w-sm">
                    Hàng ngàn tin tuyển dụng được xác thực mỗi ngày, lọc theo AI phù hợp với năng lực của bạn.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["Software Engineer", "Product Designer", "Data Analyst", "+12 ngành nghề"].map((tag) => (
                      <span key={tag} className="bg-[#f3f4f6] px-5 py-3 rounded-full text-sm font-semibold text-[#191c1e]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* AI Tools */}
              <div className="md:col-span-4 kinetic-gradient rounded-[40px] p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <svg className="w-12 h-12 mb-8 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
                  <h3 className="text-3xl font-extrabold mb-4" style={{ fontFamily: "var(--font-headline)" }}>AI Career Tools</h3>
                  <p className="text-white/80 mb-8 leading-relaxed">
                    Phân tích CV, dự đoán xu hướng lương và gợi ý lộ trình thăng tiến chuyên sâu.
                  </p>
                  <Link href="/cong-cu" className="block w-full bg-white text-[#003d9b] font-bold py-4 rounded-xl hover:bg-[#dae2ff] transition-colors text-center" style={{ fontFamily: "var(--font-headline)" }}>
                    Thử ngay
                  </Link>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              </div>
              {/* Widget 1 */}
              <div className="md:col-span-4 bg-[#f3f4f6] rounded-[40px] p-10 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-[#003d9b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-headline)" }}>Thống kê thị trường</h4>
                  <p className="text-[#434654] text-sm">Cập nhật biến động nhân sự và lương thưởng theo thời gian thực.</p>
                </div>
                <div className="mt-8 h-2 bg-[#e1e2e4] rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-[#003d9b] rounded-full" />
                </div>
              </div>
              {/* Widget 2 */}
              <div className="md:col-span-4 bg-[#f3f4f6] rounded-[40px] p-10 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-[#004e32]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-headline)" }}>Chứng chỉ nghề nghiệp</h4>
                  <p className="text-[#434654] text-sm">Khóa học ngắn hạn được công nhận bởi các đối tác chiến lược.</p>
                </div>
              </div>
              {/* Widget 3 */}
              <div className="md:col-span-4 bg-[#f3f4f6] rounded-[40px] p-10 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-[#535f73]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-headline)" }}>Cộng đồng Mentor</h4>
                  <p className="text-[#434654] text-sm">Kết nối trực tiếp với các chuyên gia trong ngành để được tư vấn 1-1.</p>
                </div>
                <div className="mt-8 flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-[#dae2ff] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#001848]">+50</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-8">
            <div className="kinetic-gradient rounded-[48px] p-16 md:p-24 text-center text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-8 max-w-4xl mx-auto tracking-tighter" style={{ fontFamily: "var(--font-headline)" }}>
                  Sẵn sàng để bắt đầu hành trình sự nghiệp mới?
                </h2>
                <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                  Tham gia cùng hàng nghìn chuyên gia đã thay đổi cuộc đời với CareerFlow.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link
                    href="/cv/moi"
                    className="bg-white text-[#003d9b] px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Bắt đầu miễn phí
                  </Link>
                  <Link
                    href="/viec-lam"
                    className="bg-[#0052cc]/20 border border-white/20 backdrop-blur-md text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white/10 transition-colors"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Liên hệ tư vấn
                  </Link>
                </div>
              </div>
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
