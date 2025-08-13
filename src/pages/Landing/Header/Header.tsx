import React from 'react';
import AirPlane from '../../../assets/images/airplane.png';
import SearchBox from './SearchBox';
import Logo from '../../../assets/images/packsi-Logo.png';
import cloudySky from "../../../assets/images/pexels-konevi-3789871.jpg";
import Lottie from 'lottie-react';
import worldmapAnimation from '../../../assets/lottie/worldmap.json';

interface HeaderProps {
  screenHeight: number;
  isLargeScreen: boolean;
}

function Header({ screenHeight, isLargeScreen }: HeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between w-full px-[65px] py-4 mt-4">
        <div className="flex items-center gap-2">
          <img src={Logo} className="h-[50px]" alt="Logo" />
        </div>

        <div className="flex gap-4 font-semibold">
          <NavButton label="خانه" />
          <NavButton label="درباره ما" />
          <NavButton label="تماس با ما" />
        </div>

        <button className="flex flex-row items-center gap-2 px-4 py-2 rounded-[16px] bg-[#11354D] text-white hover:bg-[#0d2538] transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current"
          >
            <g id="User">
              <g>
                <path d="M17.438,21.937H6.562a2.5,2.5,0,0,1-2.5-2.5V18.61c0-3.969,3.561-7.2,7.938-7.2s7.938,3.229,7.938,7.2v.827A2.5,2.5,0,0,1,17.438,21.937ZM12,12.412c-3.826,0-6.938,2.78-6.938,6.2v.827a1.5,1.5,0,0,0,1.5,1.5H17.438a1.5,1.5,0,0,0,1.5-1.5V18.61C18.938,15.192,15.826,12.412,12,12.412Z" />
                <path d="M12,9.911a3.924,3.924,0,1,1,3.923-3.924A3.927,3.927,0,0,1,12,9.911Zm0-6.847a2.924,2.924,0,1,0,2.923,2.923A2.926,2.926,0,0,0,12,3.064Z" />
              </g>
            </g>
          </svg>
          ورود / ثبت‌نام
        </button>
      </div>

      {isLargeScreen ? (
        <div className="relative mb-[30px] mx-[50px]" style={{ height: `${Math.min(screenHeight * 0.6, 650)}px`, maxHeight: '800px' }}>
          <div
            className="relative h-full bg-cover bg-center rounded-[24px]"
            style={{ backgroundImage: `url(${cloudySky})` }}
          >
            <div className="absolute inset-0 bg-black opacity-40 rounded-[24px]"></div>

            <div className="absolute top-1/2 left-4 md:left-16 transform -translate-y-1/2 text-white max-w-[calc(100%-2rem)] md:max-w-[600px] z-10">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-30 shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">
                  با ما، هر سفر فرصتی برای کسب درآمد است
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-justify mb-6">
                  کافیست در مسیر سفر، بارهای کوچک و مطمئن دیگران را همراه ببرید و بخشی یا تمام هزینه‌های سفر را جبران کنید.
                  ما با بستری امن، پشتیبانی ۲۴ ساعته، پرداخت مطمئن و ثبت سفارش آسان، سفری لذت‌بخش و سودآور برایتان فراهم کرده‌ایم.
                </p>
              </div>
              
              {/* کادر ویژه برای متن "هر سفر، یک فرصت طلایی" */}
              <div className="mt-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-4 border border-amber-400/40 shadow-xl">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-amber-300 drop-shadow-lg">
                  هر سفر، یک فرصت طلایی
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-amber-100">
                  با پکسی، هر سفری که می‌روید می‌تواند منبع درآمد شما باشد. فقط کافی است بارهای کوچک و امن را همراه ببرید.
                </p>
              </div>
            </div>

            <img
              className="absolute right-0 -mr-[80px] top-1/2 -translate-y-1/2 z-20 w-[600px] max-w-[600px]"
              src={AirPlane}
              alt="Airplane"
            />

            {/* جعبه جستجو زیر بک‌گراند */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-40px] w-full flex justify-center z-30">
              <SearchBox />
            </div>
          </div>
        </div>
      ) : (
         <>
           {/* نمایش Lottie فقط در حالت sm */}
           <div className="block sm:hidden relative mb-[30px] mx-[50px] flex items-center justify-center">
             <div className="w-full h-full max-w-[800px] max-h-[600px]">
               <Lottie 
                 animationData={worldmapAnimation} 
                 loop={true}
                 autoplay={true}
                 style={{ width: '100%', height: '100%' }}
               />
             </div>
             
             {/* جعبه جستجو زیر انیمیشن */}
             <div className="absolute left-1/2 -translate-x-1/2 bottom-[-40px] w-full flex justify-center z-30">
               <SearchBox />
             </div>
           </div>
           
           {/* نمایش Header اصلی در حالت‌های بزرگ‌تر از sm */}
           <div className="hidden sm:block relative mb-[30px] mx-[50px]" style={{ height: `${Math.min(screenHeight * 0.6, 650)}px`, maxHeight: '800px' }}>
             <div
               className="relative h-full bg-cover bg-center rounded-[24px]"
               style={{ backgroundImage: `url(${cloudySky})` }}
             >
               <div className="absolute inset-0 bg-black opacity-40 rounded-[24px]"></div>

               <div className="absolute top-1/2 left-4 md:left-16 transform -translate-y-1/2 text-white max-w-[calc(100%-2rem)] md:max-w-[600px] z-10">
                 <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-30 shadow-2xl">
                   <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">
                     با ما، هر سفر فرصتی برای کسب درآمد است
                   </h2>
                   <p className="text-base md:text-lg leading-relaxed text-justify mb-6">
                     کافیست در مسیر سفر، بارهای کوچک و مطمئن دیگران را همراه ببرید و بخشی یا تمام هزینه‌های سفر را جبران کنید.
                     ما با بستری امن، پشتیبانی ۲۴ ساعته، پرداخت مطمئن و ثبت سفارش آسان، سفری لذت‌بخش و سودآور برایتان فراهم کرده‌ایم.
                   </p>
                 </div>
                 
                 {/* کادر ویژه برای متن "هر سفر، یک فرصت طلایی" */}
                 <div className="mt-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-4 border border-amber-400/40 shadow-xl">
                   <h3 className="text-lg md:text-xl font-bold mb-2 text-amber-300 drop-shadow-lg">
                     هر سفر، یک فرصت طلایی
                   </h3>
                   <p className="text-sm md:text-base leading-relaxed text-amber-100">
                     با پکسی، هر سفری که می‌روید می‌تواند منبع درآمد شما باشد. فقط کافی است بارهای کوچک و امن را همراه ببرید.
                   </p>
                 </div>
               </div>

               <img
                 className="absolute right-0 -mr-[80px] top-1/2 -translate-y-1/2 z-20 w-[600px] max-w-[600px]"
                 src={AirPlane}
                 alt="Airplane"
               />

               {/* جعبه جستجو زیر بک‌گراند */}
               <div className="absolute left-1/2 -translate-x-1/2 bottom-[-40px] w-full flex justify-center z-30">
                 <SearchBox />
               </div>
             </div>
           </div>
         </>
       )}

    </>
  );
}

function NavButton({ label }: { label: string }) {
  return (
    <button className="font-semibold relative px-4 py-2 text-[#11354D] group rounded-[16px] overflow-hidden transition-all duration-300 hover:bg-[#11354D] hover:text-white">
      {label}
    </button>
  );
}

export default Header;
