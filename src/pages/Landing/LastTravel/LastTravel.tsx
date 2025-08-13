import React from 'react';
import TravelList from './TravelList';
import TravelPic from "../../../assets/images/travel.png";

function LastTravel() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="relative inline-block">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-[#11354D] via-[#1e5a7a] to-[#2a6f95] bg-clip-text drop-shadow-lg mb-4">
            پروازهای موجود
          </h2>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#11354D] to-[#2a6f95] rounded-full"></div>
        </div>
        <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
          بهترین پیشنهادات پرواز را برای سفر بعدی‌تان کشف کنید
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* تصویر - مخفی در موبایل */}
        <div className="hidden lg:flex w-full lg:w-1/3 justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl transform scale-110 group-hover:scale-125 transition-transform duration-500"></div>
            <img
              src={TravelPic}
              alt="Traveler"
              className="relative z-10 w-[280px] sm:w-[320px] lg:w-[350px] h-auto object-contain drop-shadow-2xl transform group-hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>

        {/* لیست سفرها */}
        <div className="w-full">
          <TravelList/>
        </div>
      </div>
    </div>
  );
}

export default LastTravel;
