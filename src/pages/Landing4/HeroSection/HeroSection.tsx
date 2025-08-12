import React, { useEffect, useState } from 'react';
import heroImage from '../../../assets/images/bussiness.png';
import travelImage from '../../../assets/images/travel.png';

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e2544] via-[#12344d] to-[#2b4d61]"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#39c1ad]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#33b8bf]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#2f97cc]/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-[#39c1ad] rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-[#33b8bf] rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-20 w-5 h-5 bg-[#2f97cc] rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-[#c2d9e1] rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`text-center lg:text-right transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-[#39c1ad] via-[#33b8bf] to-[#2f97cc] bg-clip-text text-transparent">
                هر سفر،
              </span>
              <span className="block text-white mt-2">
                یک فرصت طلایی
              </span>
            </h1>
            
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#39c1ad]/20 to-[#33b8bf]/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-[#12344d]/80 backdrop-blur-sm rounded-3xl p-6 border border-[#39c1ad]/30">
                <p className="text-[#c2d9e1] text-lg sm:text-xl leading-relaxed">
                  به‌عنوان مسافر، می‌توانی بارهای کوچک دیگران را به مقصد برسانی و هزینه سفرت را جبران کنی.
                  پکسی پلی است بین تو و فرستندگان کالا تا هم تو درآمد کسب کنی و هم ارسال‌ها سریع‌تر و ارزان‌تر انجام شوند.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <button className="group relative bg-gradient-to-r from-[#39c1ad] via-[#33b8bf] to-[#2f97cc] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[#39c1ad]/25 transform transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  <span>شروع سفر</span>
                  <span className="group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300">✈️</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group relative bg-transparent border-2 border-[#39c1ad] text-[#39c1ad] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#39c1ad] hover:text-white transition-all duration-300 hover:-translate-y-1">
                <span className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  <span>بیشتر بدانید</span>
                  <span className="group-hover:rotate-12 transition-transform duration-300">📋</span>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#39c1ad] mb-1">۱۰۰+</div>
                <div className="text-[#c2d9e1] text-sm">شهر فعال</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#33b8bf] mb-1">۵۰۰۰+</div>
                <div className="text-[#c2d9e1] text-sm">کاربر فعال</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#2f97cc] mb-1">۹۸%</div>
                <div className="text-[#c2d9e1] text-sm">رضایت کاربران</div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-[#39c1ad]/30 to-[#33b8bf]/30 rounded-3xl blur-2xl transform scale-110"></div>
                <div className="relative bg-gradient-to-br from-[#c2d9e1]/10 to-transparent rounded-3xl p-8 backdrop-blur-sm border border-[#39c1ad]/20">
                  <img
                    src={heroImage}
                    alt="Business Travel"
                    className="w-full h-auto max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Secondary Image */}
              <div className="absolute -bottom-10 -right-10 z-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2f97cc]/40 to-[#33b8bf]/40 rounded-2xl blur-xl"></div>
                  <div className="relative bg-[#12344d]/90 backdrop-blur-sm rounded-2xl p-4 border border-[#2f97cc]/30">
                    <img
                      src={travelImage}
                      alt="Travel"
                      className="w-24 h-24 object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-[#39c1ad] to-[#33b8bf] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white text-xl">🚀</span>
              </div>
              
              <div className="absolute top-1/2 -right-8 w-16 h-16 bg-gradient-to-br from-[#2f97cc] to-[#33b8bf] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-white text-2xl">💼</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#39c1ad] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#39c1ad] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;