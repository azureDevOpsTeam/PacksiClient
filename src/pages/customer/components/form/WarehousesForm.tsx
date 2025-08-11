import React from "react";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import { ReactComponent as LocationIcon } from "../../../../components/icons/svg/locationIcon.svg";
import Loading from "../../../../components/tools/loading/Loading";
import { GetCustomer } from "../../../../setting/ApiUrl";
import useStore from "../../../../store/zustand/store";

function WarehousesForm() {
  const SelectedItem = useStore((state) => state.SelectedItem);

  const apiDetails = {
    url: GetCustomer,
    method: HttpMethod.POST,
    body: SelectedItem ? { customerId: SelectedItem } : {},
  };

  const { data: GetCustomerData, isLoading } = useReactQuery(apiDetails);

  const warehouses = GetCustomerData?.data?.customerWarehouses || [];

  if (isLoading) {
    return (
      <div className="border border-[#E5E7EB] rounded-[16px] px-4 py-6 flex justify-center items-center h-[150px]">
        <Loading />
      </div>
    );
  }

  if (!isLoading && warehouses.length === 0) {
    return (
      <div className="border border-[#E5E7EB] rounded-[16px] px-4 py-6 flex justify-center items-center h-[150px]">
        <span className="text-gray-500 font-semibold">
          انباری برای این مشتری ثبت نشده است.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {warehouses.map((warehouse: any, index: number) => (
        <div
          key={index}
          className="border border-[#E5E7EB] rounded-[16px] px-4 py-3"
        >
          <div className="flex justify-start mb-3">
            <span className="font-semibold">{warehouse?.name || "-"}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span className="font-semibold">نام نماینده</span>
            <span className="font-semibold text-[#111928]">
              {warehouse?.representativeName || "-"}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span className="font-semibold">شماره موبایل</span>
            <span className="font-semibold text-[#111928]">
              {warehouse?.representativeMobileNo || "-"}
            </span>
          </div>

          <div className="flex justify-start items-start gap-2 mt-4">
            <LocationIcon className="mt-[2px]" />
            <span className="text-[#111928] font-semibold">
              {GetCustomerData?.data?.address || "-"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WarehousesForm;
