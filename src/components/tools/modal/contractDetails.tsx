import React, { useState ,useEffect} from "react";
import {ReactComponent as FileIcon } from "../../icons/svg/fileIcon.svg";
import { Formik, Form } from "formik";
import Modal from "../../../components/tools/modal/madal";
import { HttpMethod } from "../../../models/enums/HttpMethod";
import { CreateToast } from "../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../models/enums/ToastType";
import { useReactMutation } from "../../hooks/query/useReactQuery";
import BlockIconSvg from "../../icons/components/BlockIconSvg";
import { SetContractStatus } from "../../../setting/ApiUrl";
import ToggleSwitch from "../toggle-switch/ToggleSwitch";

interface ContractDetailsModalProps {
  isActive:boolean;
  isOpen: boolean;
  onClose: () => void;
  contractId: number;
  data: {
    serviceTypeTitle: number;
    maximumServiceTime: number;
    price: number;
  }[];
  registrationDate:string;
  contractNumber: string | number;
  cooperationStartDate: string;
  cooperationEndDate: string;
}



const ContractDetailsModal: React.FC<ContractDetailsModalProps> = ({
  contractId,
  isActive,
  registrationDate,
  isOpen,
  onClose,
  data,
  contractNumber,
  cooperationStartDate,
  cooperationEndDate,
}) => {

     const [ToggleValue, setToggleValue] = useState(isActive);
     const [isStatusChange,setStatusChange] =useState(false);
         const blockCustomerApiDetail = {
           url: SetContractStatus,
           method: HttpMethod.PUT,
         };
         const {
           mutate: Mutate,
           isLoading: BlockLoading,
           data: StatusData,
         } = useReactMutation(blockCustomerApiDetail);
         
           useEffect(() => {
             if (StatusData?.status === 200) {
               CreateToast(ToastType.SUCCESS, StatusData?.data?.message);
               setStatusChange(false);
               // refetch?.();
               // setEditable(false);
               // setToggledFalse();
             } else if (
               StatusData?.status !== 200 &&
               StatusData?.status !== undefined
             ) {
               // setEditable(false);
               CreateToast(ToastType.ERROR, StatusData?.data?.message);
             }
           }, [StatusData?.status]);
  if (!isOpen) return null;

 const handleErrorModalClick = () => {
   Mutate({
     contractId: contractId,
     isActive: ToggleValue,
   });
 };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <Formik
        initialValues={{ isActive: isActive }}
        enableReinitialize
        onSubmit={(values: any) => {
          setToggleValue(values);
        }}
      >
        {() => (
          <Form>
            <div className="bg-white rounded-[28px] p-6 w-full max-w-[700px] shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 ml-auto">
                  <FileIcon />
                  <h2 className="text-lg font-semibold">
                    قرارداد شماره {contractNumber}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-red-500 font-bold"
                >
                  X
                </button>
              </div>

              {/* اطلاعات اولیه */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-[#E5E7EB] px-4 py-3 rounded-[12px] flex justify-between">
                  <span className="text-[#6B7280] font-semibold text-sm">
                    تاریخ ثبت قرارداد:
                  </span>
                  <span className="text-black font-semibold text-sm">
                    {registrationDate || "-"}
                  </span>
                </div>

                <ToggleSwitch
                  name="isActive"
                  className="border rounded-[18px]"
                  onChange={(val) => {
                    setToggleValue(val);
                    setStatusChange(true);
                  }}
                />

                <div className="border border-[#E5E7EB] px-4 py-3 rounded-[12px] flex justify-between">
                  <span className="text-[#6B7280] font-semibold text-sm">
                    تاریخ شروع:
                  </span>
                  <span className="text-black font-semibold text-sm">
                    {cooperationStartDate || "-"}
                  </span>
                </div>

                <div className="border border-[#E5E7EB] px-4 py-3 rounded-[12px] flex justify-between">
                  <span className="text-[#6B7280] font-semibold text-sm">
                    تاریخ پایان:
                  </span>
                  <span className="text-black font-semibold text-sm">
                    {cooperationEndDate || "-"}
                  </span>
                </div>
              </div>

              {/* جدول سرویس‌ها */}
              <div className="hidden sm:flex font-semibold text-sm text-gray-500 px-2">
                <div className="w-1/3 font-semibold text-black">سرویس</div>
                <div className="w-1/3 font-semibold text-black">
                  حداکثر زمان خدمت
                </div>
                <div className="w-1/3 font-semibold text-black">
                  قیمت (هر مرسوله)
                </div>
              </div>

              <div className="space-y-3 mt-2">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-[16px] p-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0"
                  >
                    <div className="w-full sm:w-1/3 flex gap-1">
                      <span className="font-semibold">
                        {item.serviceTypeTitle}
                      </span>
                    </div>
                    <div className="w-full sm:w-1/3 flex gap-1">
                      <span className="sm:hidden text-sm text-gray-500">
                        حداکثر زمان خدمت:
                      </span>
                      <span className="font-semibold">
                        {item.maximumServiceTime}
                      </span>
                      <span className="text-black font-semibold">ساعت</span>
                    </div>
                    <div className="w-full sm:w-1/3 flex gap-1">
                      <span className="sm:hidden text-sm text-gray-500">
                        قیمت:
                      </span>
                      <span className="font-semibold">
                        {item.price.toLocaleString()}
                      </span>
                      <span className="text-sm">تومان</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {isStatusChange && (
        <Modal
          titleIcon={<BlockIconSvg />}
          widthClassName="w-[500px]"
          cancelButtonTextColor={isActive ? "text-[#C81E1E]" : "text-[#046C4E]"}
          confirmButtonColor={isActive ? "bg-[#C81E1E]" : "bg-[#046C4E]"}
          cancelButtonColor={isActive ? "bg-[#FDE8E8]" : "bg-[#DEF7EC]"}
          onConfirm={handleErrorModalClick}
          title={
            isActive ? (
              <>
                قرارداد شماره{" "}
                <span className="font-semibold">{contractNumber}</span> غیر فعال
                خواهد شد. آیا از غیر فعال کردن این قرارداد اطمینان دارید؟
              </>
            ) : (
              <>
                قرارداد شماره{" "}
                <span className="font-semibold">{contractNumber}</span> غیر فعال
                خواهد شد. آیا از فعال کردن این قرارداد اطمینان دارید؟
              </>
            )
          }
          onCancel={() => setStatusChange(false)}
          confirmText="بله، مطمئن هستم"
          cancelText="بیخیال"
          // message={savedata?.data?.message}
        />
      )}
    </div>
  );
};

export default ContractDetailsModal;