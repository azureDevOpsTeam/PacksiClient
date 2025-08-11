import React from "react";

function SearchBox() {
  return (
    <div className="relative z-30 flex justify-center w-full">
      <div className="bg-white shadow-lg rounded-[16px] px-6 py-4 flex gap-4 items-center w-[80%] -mt-10">
        <input
          type="text"
          placeholder="مقصد خود را وارد کنید..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#11354D]"
        />
        <button className="px-6 py-2 bg-[#11354D] text-white rounded-[12px] hover:bg-[#0d2538] transition-all">
          جستجو
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
