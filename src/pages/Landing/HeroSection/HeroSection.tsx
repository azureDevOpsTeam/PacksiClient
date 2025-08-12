import React from 'react';
import planeImage from "../../../assets/images/bussiness.png";

interface HeroSectionProps {
  screenHeight: number;
  isLargeScreen: boolean;
}

function HeroSection({ screenHeight, isLargeScreen }: HeroSectionProps) {
  // محاسبه ارتفاع و اندازه تصویر براساس نمایشگر
  const sectionHeight = isLargeScreen 
    ? Math.min(screenHeight * 0.4, 800) // حداکثر 800px برای نمایشگرهای بزرگ
    : 'auto';
  
  const imageSize = isLargeScreen 
    ? 'w-[300px] sm:w-[320px] md:w-[350px]' // اندازه کوچکتر برای نمایشگرهای بزرگ
    : 'w-[280px] sm:w-[350px] md:w-[400px]';

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="relative mt-[50px] bg-gradient-to-br from-[#e8f4f8] via-[#d1e7f0] to-[#b8c5d2] flex flex-col md:flex-row-reverse items-center overflow-hidden rounded-[32px] shadow-2xl border border-white/20 backdrop-blur-sm px-6 md:px-12 py-10 md:py-8"
        style={isLargeScreen ? { height: `${sectionHeight}px` } : {}}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-cyan-200/20 to-transparent rounded-full blur-2xl"></div>
        
        {/* تصویر */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl transform scale-110"></div>
            <img
              src={planeImage}
              alt="Traveler"
              className={`relative z-10 ${imageSize} max-w-full h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300`}
            />
          </div>
        </div>

        {/* متن */}
        <div className="w-full md:w-1/2 text-center md:text-right z-10 px-2 md:pr-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#11354D] via-[#1e5a7a] to-[#2a6f95] bg-clip-text drop-shadow-lg leading-tight">
            هر سفر، یک فرصت طلایی
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <p className="text-[#2c3e50] leading-relaxed text-lg sm:text-xl font-medium text-justify">
              به‌عنوان مسافر، می‌توانی بارهای کوچک دیگران را به مقصد برسانی و هزینه سفرت را جبران کنی.
              پکسی پلی است بین تو و فرستندگان کالا تا هم تو درآمد کسب کنی و هم ارسال‌ها سریع‌تر و ارزان‌تر انجام شوند.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
