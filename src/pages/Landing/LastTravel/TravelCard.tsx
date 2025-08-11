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
<div className="bg-[#E6F4F9] text-[#11354D] rounded-2xl shadow-md px-6 py-4 w-[600px] max-w-[1000px] font-sans">

      <div className="flex justify-between items-start">
        <div>
          <p className="text-2xl font-bold">{from.code}</p>
          <p className="text-sm text-gray-600">{from.city}</p>
          <p className="text-sm text-gray-600">{from.airport}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{to.code}</p>
          <p className="text-sm text-gray-600">{to.city}</p>
          <p className="text-sm text-gray-600">{to.airport}</p>
        </div>
      </div>

      <div className="flex items-center justify-between my-4 relative">
        <div className="w-3 h-3 bg-[#0078A8] rounded-full" />
        <div className="flex-1 border-t border-dashed border-gray-400 mx-2 relative">
          <div className="absolute left-1/2 -top-3 transform -translate-x-1/2 text-center whitespace-nowrap">
            <div className="text-sm font-semibold">{duration}</div>
            <div className="text-xs text-gray-500">{flightType}</div>
            ✈️
          </div>
        </div>
        <div className="w-3 h-3 bg-[#0078A8] rounded-full" />
      </div>

      <div className="flex justify-between mt-4">
        <div>
          <p className="text-sm text-gray-500">Depart</p>
          <p className="text-sm font-semibold">{from.date}</p>
          <p className="text-lg font-bold">{from.time}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Arrive</p>
          <p className="text-sm font-semibold">{to.date}</p>
          <p className="text-lg font-bold">{to.time}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="text-xs font-bold text-[#11354D]">
          <span className="text-red-600">{airline}</span>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{price}</p>
          <p className="text-xs text-gray-500">Per Adult</p>
        </div>
      </div>
    </div>
  );
}
