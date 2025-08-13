import React from 'react';
import FooterPic from '../../../assets/images/Footer.png';

// آیکون‌ها
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.4.4.6.2 1.1.5 1.5 1 .4.4.8.9 1 1.5.2.5.3 1.2.4 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.4-.2.6-.5 1.1-1 1.5-.4.4-.9.8-1.5 1-.5.2-1.2.3-2.4.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.4-.4-.6-.2-1.1-.5-1.5-1-.4-.4-.8-.9-1-1.5-.2-.5-.3-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.4.2-.6.5-1.1 1-1.5.4-.4.9-.8 1.5-1 .5-.2 1.2-.3 2.4-.4C8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7 .1 5.7.2 4.8.4 4 .7c-.9.3-1.6.7-2.3 1.4-.7.7-1.1 1.4-1.4 2.3C.1 5.2 0 6.1 0 7.4 0 8.7 0 9.1 0 12s0 3.3.1 4.6c.1 1.3.3 2.2.6 3.1.3.9.7 1.6 1.4 2.3.7.7 1.4 1.1 2.3 1.4.9.3 1.8.5 3.1.6 1.3.1 1.7.1 4.6.1s3.3 0 4.6-.1c1.3-.1 2.2-.3 3.1-.6.9-.3 1.6-.7 2.3-1.4.7-.7 1.1-1.4 1.4-2.3.3-.9.5-1.8.6-3.1.1-1.3.1-1.7.1-4.6s0-3.3-.1-4.6c-.1-1.3-.3-2.2-.6-3.1-.3-.9-.7-1.6-1.4-2.3C21.6.8 20.9.4 20 .1c-.9-.3-1.8-.5-3.1-.6C15.3 0 14.9 0 12 0z" />
    <path d="M12 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zM18.4 4.6a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 0 3.5 1.1 1 2.5 1s2.48 1 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 5-2.7 5.3 0 6.3 3.5 6.3 8.1V24h-5v-7.5c0-1.8 0-4-2.5-4s-2.8 1.9-2.8 3.8V24h-5V8z" />
  </svg>
);

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M9.99 16.2l-.39 5.6c.56 0 .8-.24 1.1-.52l2.6-2.5 5.4 3.9c1 .55 1.6.26 1.9-.9l3.4-16.2c.35-1.6-.6-2.3-1.6-1.9L1.5 9.5c-1.5.6-1.5 1.5-.3 1.9l5.6 1.7 13-8.2c.6-.4 1.1-.2.7.2l-10.5 11z" />
  </svg>
);

function FooterSection() {
  return (
    <div className="w-full">
      {/* بک‌گراند بالای فوتر - تصویر تکراری */}
      <div
        className="w-full h-24 bg-repeat-x bg-center"
        style={{ 
          backgroundImage: `url(${FooterPic})`,
          backgroundSize: 'auto 100%'
        }}
      />

      {/* فوتر اصلی - Full Width */}
       <footer className="w-full text-white py-12" style={{backgroundColor: '#1d2b36'}}>
         <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* برند - در بالا */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">PacksiClient</h2>
              <p className="text-gray-300 text-base leading-relaxed mb-6">
                ارائه‌دهنده بهترین خدمات حمل و نقل، آموزش رانندگی و اجاره املاک با تمرکز بر کیفیت، امنیت و تجربه کاربری بی‌نظیر.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-blue-600/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-500/30">
                  <span className="text-blue-300 text-sm font-semibold">🚗 حمل و نقل</span>
                </div>
                <div className="bg-emerald-600/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-emerald-500/30">
                  <span className="text-emerald-300 text-sm font-semibold">🎓 آموزش رانندگی</span>
                </div>
                <div className="bg-purple-600/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-purple-500/30">
                  <span className="text-purple-300 text-sm font-semibold">🏠 اجاره املاک</span>
                </div>
              </div>
            </div>

            {/* لینک‌ها و شبکه‌های اجتماعی - در موبایل کنار هم */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* فضای خالی برای lg */}
              <div className="hidden lg:block lg:col-span-2"></div>

              {/* لینک‌های مفید */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-white">لینک‌های مفید</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"><span>📋</span> درباره ما</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"><span>📞</span> تماس با ما</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"><span>❓</span> سوالات متداول</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"><span>📜</span> قوانین و مقررات</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"><span>🔒</span> حریم خصوصی</a></li>
                </ul>
              </div>

              {/* شبکه‌های اجتماعی */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-white">ما را دنبال کنید</h3>
                <div className="space-y-4">
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-pink-400 transition-all duration-300 group">
                    <div className="bg-pink-600/20 p-2 rounded-lg group-hover:bg-pink-600/40 transition-all duration-300">
                      <InstagramIcon />
                    </div>
                    <span className="font-medium">Instagram</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-all duration-300 group">
                    <div className="bg-blue-600/20 p-2 rounded-lg group-hover:bg-blue-600/40 transition-all duration-300">
                      <LinkedInIcon />
                    </div>
                    <span className="font-medium">LinkedIn</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-all duration-300 group">
                    <div className="bg-cyan-600/20 p-2 rounded-lg group-hover:bg-cyan-600/40 transition-all duration-300">
                      <TelegramIcon />
                    </div>
                    <span className="font-medium">Telegram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* خط جداکننده و کپی‌رایت */}
            <div className="border-t border-gray-700/50 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-400 text-sm text-center md:text-right">
                  © {new Date().getFullYear()} PacksiClient. تمامی حقوق محفوظ است.
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    آنلاین و فعال
                  </span>
                  <span>ساخته شده با ❤️ در ایران</span>
                </div>
              </div>
            </div>
         </div>
       </footer>
    </div>
  );
}

export default FooterSection;
