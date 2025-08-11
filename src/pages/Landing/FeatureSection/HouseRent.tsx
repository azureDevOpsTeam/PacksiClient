import React from 'react';
import HouseRentPic from '../../../assets/images/HouseRentPic.png';

function HouseRent() {
  return (
    <div className='flex flex-col lg:flex-row-reverse justify-between items-center mt-8 mx-[60px] p-6 rounded-xl  mb-[60px]'>
      <img 
        src={HouseRentPic} 
        alt="اجاره کوتاه‌مدت اتاق" 
        className='w-full lg:w-1/3 rounded-lg object-cover mb-6 lg:mb-0'
      />
      <div className='w-full lg:w-1/2 lg:pr-8 text-right'>
        <h2 className='text-3xl font-extrabold text-[#11354D] mb-4'>اجاره کوتاه‌مدت اتاق</h2>
        <p className='text-gray-700 text-lg leading-relaxed mb-6'>
          <span className='font-extrabold block mb-2'>چه برای یک شب سفر باشه، چه چند هفته اقامت کاری،</span>
          اینجا می‌تونی راحت و سریع اتاق مناسب خودت رو پیدا کنی. بدون واسطه، مستقیم با میزبان هماهنگ کن و با خیال راحت رزرو انجام بده. از اتاق‌های ساده و اقتصادی تا فضاهای لوکس و خاص، انتخاب با توست. ما اینجاییم تا اقامتت راحت، به‌صرفه و بی‌دغدغه باشه.
        </p>
        <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300'>
          رزرو اتاق
        </button>
      </div>
    </div>
  );
}

export default HouseRent;
