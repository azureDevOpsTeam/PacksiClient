import React from 'react';
import DrivingTrainingPic from "../../../assets/images/DrivingTraining.png";

function DrivingTraining() {
  return (
    <div className='flex flex-col lg:flex-row justify-between items-center mt-8  mx-8 p-6 rounded-xl bg-white shadow-md'>
      <img 
        src={DrivingTrainingPic} 
        alt="Driving Training" 
        className='w-full lg:w-1/3 rounded-lg object-cover mb-6 lg:mb-0'
      />
      <div className='w-full lg:w-1/2 lg:pl-8 text-right'>
        <h2 className='text-3xl font-extrabold text-[#11354D] mb-4'>آموزش رانندگی</h2>
        <p className='text-gray-700 text-lg leading-relaxed mb-6'>
          <span className='font-extrabold block mb-2'>می‌خوای گواهینامه بگیری ولی نمی‌دونی از کجا شروع کنی؟</span>
          ما بهترین مربیان رانندگی رو بر اساس موقعیت و نیازت بهت معرفی می‌کنیم. از آموزش‌های پایه تا آمادگی برای امتحان، همه چیز با مربی‌های حرفه‌ای، صبور و مطمئن انجام میشه. فقط انتخاب کن، تماس بگیر و پشت فرمان بشین—راه رسیدن به گواهینامه از این ساده‌تر نمی‌شه.
        </p>
        <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300'>
          ثبت‌نام در دوره
        </button>
      </div>
    </div>
  );
}

export default DrivingTraining;
