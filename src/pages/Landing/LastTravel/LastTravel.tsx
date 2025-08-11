import React from 'react';
import TravelList from './TravelList';
import TravelPic from "../../../assets/images/travel.png";

function LastTravel() {
  return (
    <div className="px-6 py-8">
      <span className="text-2xl  flex justify-center font-bold text-[#11354D]">آخرین سفرها</span>

      <div className="flex items-center mt-[50px] ">
        {/* تصویر - یک سوم عرض */}
        <div className="w-1/3 flex justify-center">
          <img
            src={TravelPic}
            alt="Traveler"
            className="w-[300px] h-auto object-contain"
          />
        </div>

        {/* متن یا محتوا - دو سوم عرض */}
        <div className="w-2/3 rounded-xl p-6 text-white text-xl overflow-x-auto">
          <TravelList/>
        </div>
      </div>
    </div>
  );
}

export default LastTravel;
