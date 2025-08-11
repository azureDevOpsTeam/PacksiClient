import React, { useState, useMemo } from "react";
import { useReactQuery } from "../../../../../components/hooks/query/useReactQuery";
import { GetParcel } from "../../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../../models/enums/HttpMethod";

function InformationForm(id:any) {
    const [currentPage, setCurrentPage] = useState(1);
   const apiDetails = useMemo(
     () => ({
       url: GetParcel,
       method: HttpMethod.POST,
       body: {
         //  pageNumber: currentPage,
         //  pageSize: 5,
         parcelId: Number(id.id),
       },
     }),
     [currentPage]
   );

   const { data, isLoading, isError, error, refetch } =
     useReactQuery(apiDetails);
  return (
    <div>
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
          <span className="font-bold">تی نکست </span>
          <span className="text-[#FF7959]">{data?.data?.barcode}</span>
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
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-6 justify-between">
          <div className="flex-1 flex justify-between">
            <span>ثبت سفارش:</span>
            <span className="text-gray-500">{data?.data?.createdDate}</span>
          </div>
          <div className="flex-1 flex justify-between">
            <span>تاریخ و بازه تحویل:</span>
            <span className="text-gray-500">
              {data?.data?.deliverTimeWindow}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-6 justify-between">
          <div className="flex-1 flex justify-between">
            <span>میکروهاب مقصد:</span>
            <span className="text-gray-500">{data?.data?.lastNodeName}</span>
          </div>
          <div className="flex-1 flex justify-between">
            <span>راننده:</span>
            <span className="text-gray-500">نازنین مسجدی</span>
          </div>
        </div>
        <div className="flex flex-row gap-6 justify-between">
          <div className="flex-1 flex justify-between">
            <span>ابعاد:</span>
            <span className="text-gray-500">
              {data?.data?.boxWidth} × {data?.data?.boxHeight} ×{" "}
              {data?.data?.boxLength}
            </span>
          </div>
          <div className="flex-1 flex justify-between">
            <span>وزن:</span>
            <span className="text-gray-500">۰.۵ کیلوگرم</span>
          </div>
        </div>
        <div className="flex flex-row gap-6 justify-between">
          <div className="flex-1 flex justify-between">
            <span>ارزش مرسوله:</span>
            <span className="text-gray-500">
              {data?.data?.boxValue
                ? Number(data.data.boxValue).toLocaleString("fa-IR")
                : "نامشخص"}{" "}
              تومان
            </span>
          </div>
          <div className="flex-1 flex justify-between">
            <span>نوع مرسوله:</span>
            <span className="text-gray-500">کالای دیجیتال</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationForm;
