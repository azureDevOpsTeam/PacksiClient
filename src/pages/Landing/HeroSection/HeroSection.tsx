import React from 'react';
import planeImage from "../../../assets/images/bussiness.png";

function HeroSection() {
  return (
    <div
      className="relative mx-[80px] mt-[150px] bg-[#b8c5d2] flex flex-col md:flex-row-reverse items-center overflow-hidden rounded-[24px] px-6 md:px-8 py-8 md:py-4"
    >
      {/* تصویر */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
        <img
          src={planeImage}
          alt="Traveler"
          className="relative z-10 w-[280px] sm:w-[350px] md:w-[400px] max-w-full h-auto object-contain"
        />
      </div>

      {/* متن */}
      <div className="w-full md:w-1/2 text-center md:text-right z-10 px-2 md:pr-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#11354D] whitespace-nowrap">
          هر سفر، یک فرصت طلایی
        </h2>
        <p className="text-[#333] leading-relaxed text-base sm:text-lg">
          به‌عنوان مسافر، می‌توانی بارهای کوچک دیگران را به مقصد برسانی و هزینه سفرت را جبران کنی.
          پکسی پلی است بین تو و فرستندگان کالا تا هم تو درآمد کسب کنی و هم ارسال‌ها سریع‌تر و ارزان‌تر انجام شوند.
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
