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
    <SkeletonDiv
      loading={deliveredShipments?.isLoading}
      className="min-w-[300px] shadow h-[117px] backdrop-blur-[4px] flex flex-col items-center mx-auto justify-between bg-[#fafaf599] !rounded-[16px] !z-10 mt-[30px]"
    >
      <div className="p-[24px] w-full">
        <div className="self-start text-[#111928] text-sm font-bold">
          تحویل شد ها:
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <div className="justify-center self-start items-center gap-2.5 inline-flex">
            <div>
              <span className="text-[#FF7959] text-2xl font-bold">
                {deliveredShipments.data?.data?.distributed}
              </span>
              <span className="text-[#111928] text-xs font-bold">
                {" "}
                تحویل شده{" "}
              </span>
            </div>
            <div className="text-right text-[#111928] text-2xl font-bold">
              /
            </div>
            <div className="text-right">
              <span className="text-[#FF7959] text-2xl font-bold">
                {deliveredShipments.data?.data?.total}
              </span>
              <span className="text-[#111928] text-xs font-bold">
                {" "}
                کل مرسوله ها{" "}
              </span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-[#FF7959] text-2xl font-bold">{281}</span>
            <span className="text-[#111928] text-xs font-bold">
              {" "}
              مرسوله آماده توزیع{" "}
            </span>
          </div>
        </div>
      </div>
    </SkeletonDiv>
  );
}

export default MapOverlay;
