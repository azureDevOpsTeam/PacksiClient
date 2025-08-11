
import {ReactComponent as ArrowIcon} from "../../../../../components/icons/svg/backArrowIcon.svg"
import React, { useState, useMemo } from "react";
import { useReactQuery } from "../../../../../components/hooks/query/useReactQuery";
import { GetParcel } from "../../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../../models/enums/HttpMethod";


const RouteForm = (id:any) => {
   const [currentPage, setCurrentPage] = useState(1);
   const apiDetails = useMemo(
     () => ({
       url: GetParcel,
       method: HttpMethod.POST,
       body: {
         pageNumber: currentPage,
         pageSize: 5,
         id: id.id,
       },
     }),
     [currentPage]
   );
      const { data, isLoading, isError, error, refetch } =
        useReactQuery(apiDetails);
        const sortedPathData = [...data?.data.routes].sort(
          (a, b) => a.stepOrder - b.stepOrder
        );
  return (
    <>
      <div className="absolute left-[16px] flex items-center gap-2 top-[16px] h-8">
        <button className="border-[1px] border-[#FF7959] flex items-center gap-1 rounded-[8px] px-3 py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <g id="elements">
              <path
                id="Vector"
                d="M5 1L5 9M9 5L1 5"
                stroke="#FF7959"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <span className="text-[#FF7959] font-bold">گزارش مشکل</span>
        </button>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <span className="font-bold">تی نکست</span>
          <span className="text-[#FF7959]"> {data?.data?.barcode}</span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="h-6 px-3 py-1 rounded-lg border justify-center items-center cursor-pointer"
            style={{ backgroundColor: "#E1EFFE", borderColor: "#A4CAFE" }}
          >
            <div
              className="text-right text-xs font-bold leading-none"
              style={{ color: "#1A56DB" }}
            >
              <span>ون</span>
            </div>
          </div>
          <div
            className="h-6 px-3 py-1 rounded-lg border justify-center items-center cursor-pointer"
            style={{ backgroundColor: "#E1EFFE", borderColor: "#A4CAFE" }}
          >
            <div
              className="text-right text-xs font-bold leading-none"
              style={{ color: "#1A56DB" }}
            >
              
              <span>ثبت سفارش</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg">
        {sortedPathData?.map((item, index) => (
  
          <div key={index} className="relative flex items-center">
            <div
              className={`px-4 py-2 rounded-[8px] ${item.stepDone ? `text-[#FF7959] border border-[#FFC9BD]  bg-[#FFE4DE]`:'text-[#374151] border border-[#D1D5DB] bg-[#F3F4F6]'}  `}
            >
              {item.name}
            </div>
            {index < sortedPathData.length - 1 && (
              <div className="mx-2 text-gray-500">
                <ArrowIcon />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RouteForm;

