import React from "react";
import ProgressBar from "../../../../components/icons/ProgressBar";
import { useFetch } from "../../../../components/hooks/fetch/useFetch";
import { DeliveredShipments } from "../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { AuthApiHeader } from "../../../../services/api/ApiHeader";
import SkeletonDiv from "../../../../components/tools/loading/SkeletonDiv";

function MapOverlay() {
  const deliveredShipments = useFetch(
    {
      key: "deliveredShipments",
      url: DeliveredShipments,
      method: HttpMethod.GET,
      headers: AuthApiHeader,
    },
    null
  );

  return (
    <div className={""}>
      <div role="tablist" className="tabs tabs-boxed  h-[46px] mt-[15px] ">
        <div
          role="tab"
          className="tab hover:scale-105 active:scale-100 transition-all shadow h-full mx-1 bg-[#FF7959] text-white border-[#FF7959]  border  font-bold"
        >
          رهگیری
        </div>
        <div
          role="tab"
          className="tab hover:scale-105 active:scale-100 transition-all shadow h-full mx-1 border-[#FF7959] text-[#FF7959] bg-[#fafaf599] backdrop-blur-[4px] border  font-bold"
        >
          ترافیک
        </div>
        <div
          role="tab"
          className="tab hover:scale-105 active:scale-100 transition-all shadow h-full mx-1 border-[#FF7959] text-[#FF7959] bg-[#fafaf599] backdrop-blur-[4px]   border font-bold"
        >
          نودهای شهری
        </div>
      </div>
      <SkeletonDiv
        loading={deliveredShipments?.isLoading}
        className={
          "min-w-[300px] shadow h-[117px] p-[24px] backdrop-blur-[4px] flex flex-col items-center mx-auto justify-between bg-[#fafaf599]  !rounded-[16px] !z-10 mt-[30px]"
        }
      >
        <div className="self-start text-[#111928] text-sm font-bold">
          مرسولات تحویل شده:
        </div>
        <div className="justify-center self-start items-center gap-2.5 inline-flex">
          <div>
            <span className="text-[#FF7959] text-2xl font-bold">
              {deliveredShipments.data?.data?.distributed}
            </span>
            <span className="text-[#111928] text-xs font-bold"> تحویل شده</span>
          </div>
          <div className="text-right text-[#111928] text-2xl font-bold">/</div>
          <div className="text-right">
            <span className="text-[#FF7959] text-2xl font-bold">
              {deliveredShipments.data?.data?.total}
            </span>
            <span className="text-[#111928] text-xs font-bold">
              {" "}
              کل مرسولات
            </span>
          </div>
        </div>
      </SkeletonDiv>
      {/*<div*/}
      {/*    className={'min-w-[300px] shadow mx-auto h-[180px] p-[24px] backdrop-blur-[4px] flex flex-col items-center justify-between bg-[#fafaf599] !rounded-[16px] !z-10 mt-[30px]'}>*/}
      {/*    <div className="self-stretch text-right text-[#111928] text-sm font-bold">بهینه‌سازی*/}
      {/*        ترافیک و مسیر:*/}
      {/*    </div>*/}
      {/*    <div className="self-stretch py-2.5 justify-center items-center gap-2.5 inline-flex">*/}
      {/*        <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">*/}
      {/*            <div*/}
      {/*                className="self-end text-gray-500 text-xs font-bold ">{trafficValue}%*/}
      {/*            </div>*/}
      {/*            <ProgressBar value={trafficValue} height={'h-[6px]'}/>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*    <div className="justify-end items-center gap-2 inline-flex">*/}
      {/*        <div*/}
      {/*            className="px-4 py-3 cursor-pointer rounded-xl border border-[#ff4b4b] justify-end items-center gap-2 flex">*/}
      {/*            <div className="text-right text-[#ff4b4b] text-sm font-bold">مشاهده همه</div>*/}
      {/*        </div>*/}
      {/*        <div*/}
      {/*            className="px-6 py-3 bg-[#ff4b4b] cursor-pointer rounded-xl justify-end items-center gap-2 flex">*/}
      {/*            <div className="text-right text-white text-sm font-bold">بهینه‌سازی</div>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</div>*/}
    </div>
  );
}

export default MapOverlay;
