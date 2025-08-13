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
    <div className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl shadow-2xl hover:shadow-cyan-500/25 w-[160px] min-w-[160px] max-w-[160px] h-[225px] px-3 py-4 sm:w-[320px] sm:min-w-[320px] sm:max-w-[320px] sm:h-[450px] sm:px-6 sm:py-8 font-sans border border-slate-700/50 backdrop-blur-sm transition-all duration-500 cursor-pointer overflow-hidden hover:scale-[1.02] hover:border-cyan-400/50">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 sm:w-32 sm:h-32"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-700 sm:w-24 sm:h-24"></div>
      
      {/* Floating particles */}
      <div className="absolute top-2 left-2 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-ping sm:top-4 sm:left-4 sm:w-1 sm:h-1"></div>
      <div className="absolute top-4 right-4 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse sm:top-8 sm:right-8 sm:w-1 sm:h-1"></div>
      <div className="absolute bottom-3 right-3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-bounce sm:bottom-6 sm:right-6 sm:w-1 sm:h-1"></div>
      
      {/* Airport cities and names */}
      <div className="relative z-10 flex justify-between items-start mb-4 sm:mb-8">
        <div className="text-center group/airport">
          <p className="text-sm font-bold text-cyan-300 group-hover/airport:text-cyan-200 transition-colors sm:text-lg">{from.city}</p>
          <p className="text-xs text-slate-400 truncate max-w-[60px] group-hover/airport:text-slate-300 transition-colors mt-2 hidden lg:block sm:text-sm sm:max-w-[120px]">{from.airport}</p>
        </div>
        
        <div className="text-center group/airport">
          <p className="text-sm font-bold text-blue-300 group-hover/airport:text-blue-200 transition-colors sm:text-lg">{to.city}</p>
          <p className="text-xs text-slate-400 truncate max-w-[60px] group-hover/airport:text-slate-300 transition-colors mt-2 hidden lg:block sm:text-sm sm:max-w-[120px]">{to.airport}</p>
        </div>
      </div>

      {/* Flight path with enhanced animation - Centered */}
      <div className="relative flex items-center justify-between my-4 sm:my-8">
        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-lg shadow-emerald-400/50 animate-pulse group-hover:shadow-emerald-400/75 transition-all duration-300 sm:w-4 sm:h-4" />
        <div className="flex-1 relative mx-1 sm:mx-3">
          <div className="h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 rounded-full animate-pulse opacity-30"></div>
          
          {/* Airplane on the line - positioned to the right */}
          <div className="absolute right-4 -top-2 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 sm:right-8 sm:-top-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-400 group-hover:text-cyan-300 sm:w-5 sm:h-5">
              <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor"/>
            </svg>
          </div>
          
          {/* Flight info text - positioned below the line */}
          <div className="absolute left-1/2 top-2 transform -translate-x-1/2 text-center sm:top-4">
            <div className="text-[10px] font-bold text-cyan-300 sm:text-xs">{duration} non-stop</div>
          </div>
        </div>
        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg shadow-purple-400/50 animate-pulse group-hover:shadow-purple-400/75 transition-all duration-300 sm:w-4 sm:h-4" />
      </div>

      {/* Departure and arrival times with glassmorphism - Above airline buttons */}
        <div className="absolute bottom-16 left-6 right-6 flex justify-center gap-2 sm:bottom-12 sm:left-3 sm:right-3 sm:gap-4">
        <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-2 shadow-lg border border-slate-600/30 transition-all duration-300 group-hover:border-emerald-400/50 group-hover:bg-slate-800/80 w-16 text-center sm:w-32 sm:p-3 sm:rounded-2xl">
          <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-semibold sm:text-xs">خروج</p>
          <p className="text-[8px] font-semibold text-slate-300 mt-0.5 sm:text-xs sm:mt-1">{from.date}</p>
          <p className="text-xs font-bold text-white sm:text-lg">{from.time}</p>
        </div>
        <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-2 shadow-lg border border-slate-600/30 transition-all duration-300 group-hover:border-purple-400/50 group-hover:bg-slate-800/80 w-16 text-center sm:w-32 sm:p-3 sm:rounded-2xl">
          <p className="text-[8px] text-purple-400 uppercase tracking-wider font-semibold sm:text-xs">ورود</p>
          <p className="text-[8px] font-semibold text-slate-300 mt-0.5 sm:text-xs sm:mt-1">{to.date}</p>
          <p className="text-xs font-bold text-white sm:text-lg">{to.time}</p>
        </div>
      </div>

      {/* Airline buttons - Two at bottom (left and right) */}
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center sm:bottom-6 sm:left-6 sm:right-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-lg shadow-lg shadow-orange-500/25 transition-all duration-300 group-hover:shadow-orange-500/40 group-hover:scale-105 sm:px-4 sm:py-2 sm:rounded-xl">
          <p className="text-[8px] font-bold tracking-wide sm:text-xs">{airline}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-lg shadow-lg shadow-blue-500/25 transition-all duration-300 group-hover:shadow-blue-500/40 group-hover:scale-105 sm:px-4 sm:py-2 sm:rounded-xl">
          <p className="text-[8px] font-bold tracking-wide sm:text-xs">{airline}</p>
        </div>
      </div>
      
      {/* Subtle border glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}
