import React from 'react';
import logoImage from '../../../assets/images/packsi-Logo.png';

function FooterSection() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: {
      title: 'خدمات ما',
      links: [
        { name: 'حمل بار مسافر', href: '#services' },
        { name: 'آموزش رانندگی', href: '#services' },
        { name: 'اجاره کوتاه‌مدت', href: '#services' },
        { name: 'خدمات شخصی', href: '#services' }
      ]
    },
    company: {
      title: 'شرکت',
      links: [
        { name: 'درباره ما', href: '#about' },
        { name: 'تماس با ما', href: '#contact' },
        { name: 'فرصت‌های شغلی', href: '#' },
        { name: 'اخبار و مقالات', href: '#' }
      ]
    },
    support: {
      title: 'پشتیبانی',
      links: [
        { name: 'مرکز راهنمایی', href: '#' },
        { name: 'سوالات متداول', href: '#' },
        { name: 'گزارش مشکل', href: '#' },
        { name: 'پشتیبانی آنلاین', href: '#' }
      ]
    },
    legal: {
      title: 'قوانین',
      links: [
        { name: 'شرایط استفاده', href: '#' },
        { name: 'حریم خصوصی', href: '#' },
        { name: 'قوانین و مقررات', href: '#' },
        { name: 'سیاست بازگشت', href: '#' }
      ]
    }
  };

  const socialLinks = [
    { icon: '📱', name: 'تلگرام', href: '#', color: 'hover:text-[#39c1ad]' },
    { icon: '📘', name: 'اینستاگرام', href: '#', color: 'hover:text-[#2f97cc]' },
    { icon: '🐦', name: 'توییتر', href: '#', color: 'hover:text-[#33b8bf]' },
    { icon: '💼', name: 'لینکدین', href: '#', color: 'hover:text-[#39c1ad]' },
    { icon: '📺', name: 'یوتیوب', href: '#', color: 'hover:text-[#2f97cc]' },
    { icon: '💬', name: 'واتساپ', href: '#', color: 'hover:text-[#33b8bf]' }
  ];

  const contactInfo = [
    { icon: '📍', text: 'تهران، خیابان ولیعصر، پلاک ۱۲۳' },
    { icon: '📞', text: '۰۲۱-۱۲۳۴۵۶۷۸' },
    { icon: '📧', text: 'info@packsi.com' },
    { icon: '🌐', text: 'www.packsi.com' }
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12344d] to-[#0e2544]"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#39c1ad]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#2f97cc]/5 rounded-full blur-3xl"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-[#39c1ad] rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-[#33b8bf] rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-[#2f97cc] rounded-full animate-ping"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#39c1ad] to-[#33b8bf] rounded-xl flex items-center justify-center mr-3">
                  <img src={logoImage} alt="Packsi Logo" className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">پکسی</h3>
                  <p className="text-[#39c1ad] text-sm font-medium">Packsi Platform</p>
                </div>
              </div>
              
              <p className="text-[#c2d9e1] leading-relaxed mb-6">
                پکسی پلتفرمی نوآورانه برای تسهیل زندگی روزمره و ایجاد فرصت‌های جدید است. 
                ما با ارائه خدمات متنوع و با کیفیت، تجربه‌ای بهتر از زندگی دیجیتال ارائه می‌دهیم.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center text-[#c2d9e1] hover:text-[#39c1ad] transition-colors duration-300">
                    <span className="text-lg ml-3">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h4 className="text-lg font-bold text-white mb-6 relative">
                  {section.title}
                  <div className="absolute bottom-0 right-0 w-8 h-0.5 bg-gradient-to-l from-[#39c1ad] to-[#33b8bf] rounded-full"></div>
                </h4>
                
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-[#c2d9e1] hover:text-[#39c1ad] transition-colors duration-300 text-sm flex items-center group"
                      >
                        <span className="w-2 h-2 bg-[#39c1ad]/50 rounded-full ml-2 group-hover:bg-[#39c1ad] transition-colors duration-300"></span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-[#39c1ad]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  عضویت در خبرنامه
                </h4>
                <p className="text-[#c2d9e1] leading-relaxed">
                  از آخرین اخبار، به‌روزرسانی‌ها و پیشنهادات ویژه ما مطلع شوید
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="flex-1 px-4 py-3 bg-[#12344d]/50 border border-[#39c1ad]/30 rounded-xl text-white placeholder-[#c2d9e1]/50 focus:border-[#39c1ad] focus:outline-none focus:ring-2 focus:ring-[#39c1ad]/20 transition-all duration-300"
                />
                <button className="bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap">
                  عضویت
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-[#39c1ad]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-[#c2d9e1] text-sm ml-4">ما را دنبال کنید:</span>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-[#12344d]/50 border border-[#39c1ad]/30 rounded-lg flex items-center justify-center text-[#c2d9e1] ${social.color} hover:border-[#39c1ad] hover:bg-[#39c1ad]/10 transform hover:scale-110 transition-all duration-300`}
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-[#c2d9e1] text-sm">
                  © {currentYear} پکسی. تمامی حقوق محفوظ است.
                </p>
                <p className="text-[#c2d9e1]/70 text-xs mt-1">
                  طراحی و توسعه با ❤️ توسط تیم پکسی
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 w-12 h-12 bg-gradient-to-r from-[#39c1ad] to-[#33b8bf] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
          title="بازگشت به بالا"
        >
          <span className="text-xl transform rotate-180">↓</span>
        </button>
      </div>
    </footer>
  );
}

export default FooterSection;