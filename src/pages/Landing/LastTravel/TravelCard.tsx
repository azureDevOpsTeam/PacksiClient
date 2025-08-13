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
    <div className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl shadow-2xl hover:shadow-cyan-500/25 px-6 py-8 w-[320px] min-w-[320px] max-w-[320px] h-[450px] font-sans border border-slate-700/50 backdrop-blur-sm transition-all duration-500 cursor-pointer overflow-hidden hover:scale-[1.02] hover:border-cyan-400/50">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>
      
      {/* Floating particles */}
      <div className="absolute top-4 left-4 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
      <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-6 right-6 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
      
      {/* Airport cities and names */}
      <div className="relative z-10 flex justify-between items-start mb-8">
        <div className="text-center group/airport">
          <p className="text-lg font-bold text-cyan-300 group-hover/airport:text-cyan-200 transition-colors">{from.city}</p>
          <p className="text-sm text-slate-400 truncate max-w-[120px] group-hover/airport:text-slate-300 transition-colors mt-2 hidden sm:block">{from.airport}</p>
        </div>
        
        <div className="text-center group/airport">
          <p className="text-lg font-bold text-blue-300 group-hover/airport:text-blue-200 transition-colors">{to.city}</p>
          <p className="text-sm text-slate-400 truncate max-w-[120px] group-hover/airport:text-slate-300 transition-colors mt-2 hidden sm:block">{to.airport}</p>
        </div>
      </div>

      {/* Flight path with enhanced animation - Centered */}
      <div className="relative flex items-center justify-between my-8">
        <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-lg shadow-emerald-400/50 animate-pulse group-hover:shadow-emerald-400/75 transition-all duration-300" />
        <div className="flex-1 relative mx-3">
          <div className="h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 rounded-full animate-pulse opacity-30"></div>
          
          {/* Airplane on the line - positioned to the right */}
          <div className="absolute right-8 -top-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-400 group-hover:text-cyan-300">
              <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor"/>
            </svg>
          </div>
          
          {/* Flight info text - positioned below the line */}
          <div className="absolute left-1/2 top-4 transform -translate-x-1/2 text-center">
            <div className="text-xs font-bold text-cyan-300">{duration} non-stop</div>
          </div>
        </div>
        <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg shadow-purple-400/50 animate-pulse group-hover:shadow-purple-400/75 transition-all duration-300" />
      </div>

      {/* Departure and arrival times with glassmorphism - Above airline buttons */}
      <div className="absolute bottom-20 left-6 right-6 flex justify-center gap-4">
        <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-600/30 transition-all duration-300 group-hover:border-emerald-400/50 group-hover:bg-slate-800/80 w-32 text-center">
          <p className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">خروج</p>
          <p className="text-xs font-semibold text-slate-300 mt-1">{from.date}</p>
          <p className="text-lg font-bold text-white">{from.time}</p>
        </div>
        <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-600/30 transition-all duration-300 group-hover:border-purple-400/50 group-hover:bg-slate-800/80 w-32 text-center">
          <p className="text-xs text-purple-400 uppercase tracking-wider font-semibold">ورود</p>
          <p className="text-xs font-semibold text-slate-300 mt-1">{to.date}</p>
          <p className="text-lg font-bold text-white">{to.time}</p>
        </div>
      </div>

      {/* Airline buttons - Two at bottom (left and right) */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-300 group-hover:shadow-orange-500/40 group-hover:scale-105">
          <p className="text-xs font-bold tracking-wide">{airline}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 group-hover:shadow-blue-500/40 group-hover:scale-105">
          <p className="text-xs font-bold tracking-wide">{airline}</p>
        </div>
      </div>
      
      {/* Subtle border glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}
