// components/TravelCard.tsx
import React from 'react';

type TravelCardProps = {
  from: {
    code: string;
    city: string;
    airport: string;
    date: string;
    time: string;
  };
  to: {
    code: string;
    city: string;
    airport: string;
    date: string;
    time: string;
  };
  duration: string;
  flightType: string;
  airline: string;
  price: string;
};

export default function TravelCard({
  from,
  to,
  duration,
  flightType,
  airline,
  price,
}: TravelCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 text-[#11354D] rounded-3xl shadow-xl hover:shadow-2xl px-4 py-4 w-[320px] min-w-[320px] max-w-[320px] font-sans border border-white/40 backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-cyan-200/15 to-transparent rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>
      
      {/* Airport codes and cities */}
       <div className="relative z-10 flex justify-between items-start mb-4">
         <div className="text-center">
           <div className="bg-gradient-to-r from-[#11354D] to-[#1e5a7a] text-white px-3 py-1 rounded-xl shadow-lg transition-transform duration-300">
             <p className="text-lg font-bold">{from.code}</p>
           </div>
           <p className="text-xs font-semibold text-gray-700 mt-1">{from.city}</p>
           <p className="text-xs text-gray-500 truncate max-w-[80px]">{from.airport}</p>
         </div>
         
         <div className="text-center">
           <div className="bg-gradient-to-r from-[#1e5a7a] to-[#2a6f95] text-white px-3 py-1 rounded-xl shadow-lg transition-transform duration-300">
             <p className="text-lg font-bold">{to.code}</p>
           </div>
           <p className="text-xs font-semibold text-gray-700 mt-1">{to.city}</p>
           <p className="text-xs text-gray-500 truncate max-w-[80px]">{to.airport}</p>
         </div>
       </div>

      {/* Flight path */}
       <div className="relative flex items-center justify-between my-4">
         <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-lg animate-pulse" />
         <div className="flex-1 relative mx-2">
           <div className="border-t-2 border-dashed border-gray-300 group-hover:border-blue-400 transition-colors duration-300 animate-dash"></div>
           <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 text-center">
             <div className="bg-white/90 backdrop-blur-sm rounded-xl px-2 py-1 shadow-lg border border-white/40">
               <div className="text-xs font-bold text-[#11354D]">{duration}</div>
               <div className="text-xs text-gray-600">{flightType}</div>
               <div className="text-sm transform group-hover:scale-125 transition-transform duration-300">✈️</div>
             </div>
           </div>
         </div>
         <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full shadow-lg animate-pulse" />
       </div>

       {/* Departure and arrival times */}
       <div className="flex justify-between mt-4 mb-4">
         <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2 shadow-md border border-white/30 transition-transform duration-300">
           <p className="text-xs text-gray-500 uppercase tracking-wide">خروج</p>
           <p className="text-xs font-semibold text-gray-700">{from.date}</p>
           <p className="text-sm font-bold text-[#11354D]">{from.time}</p>
         </div>
         <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2 shadow-md border border-white/30 text-right transition-transform duration-300">
           <p className="text-xs text-gray-500 uppercase tracking-wide">ورود</p>
           <p className="text-xs font-semibold text-gray-700">{to.date}</p>
           <p className="text-sm font-bold text-[#11354D]">{to.time}</p>
         </div>
       </div>

      {/* Airline and price */}
      <div className="flex justify-between items-center mt-4">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-xl shadow-lg transition-transform duration-300">
          <p className="text-xs font-bold">{airline}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
            {price}
          </p>
          <p className="text-xs text-gray-500">تومان</p>
        </div>
      </div>
    </div>
  );
}
