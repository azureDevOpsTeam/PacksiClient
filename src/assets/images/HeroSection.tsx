import React from 'react';
import planeImage from "../../assets/images/travelerPerson.png";

function HeroSection() {
  return (
    <div
  style={{ backgroundImage: "url('src/assets/images/back-banner-lighter.png')" }}
    className="relative  mx-[80px] h-[450px]  flex flex-row-reverse items-center overflow-hidden rounded-[24px] px-8 py-4">
      
      {/* بخش تصویر و دایره سفید */}
      <div className="relative w-1/2 h-full flex items-end justify-center">
        {/* نیم‌دایره سفید در پایین راست */}
      

        {/* تصویر که روی نیم‌دایره بیفته */}
        <img
          src={planeImage}
          alt="Traveler"
          className="relative z-10 w-[680px] max-w-full h-auto object-contain"
        />
      </div>

      {/* متن در سمت چپ */}
      <div className="w-1/2 text-right z-10 pr-8">
        <h2 className="text-3xl font-bold mb-4 text-[#11354D]">بویمانس</h2>
        <p className="text-[#333] leading-relaxed text-lg">
          اینجا یک متن نمونه است. برای اینکه بهتر بتوانید متن داخل باکس را ببینید و فرم نهایی را درک کنید،
          از محتوای ساختگی استفاده شده است. در طراحی نهایی جایگزین با محتوای واقعی خواهد شد.
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
