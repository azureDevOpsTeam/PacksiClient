import React , {useEffect} from "react";
import { Formik, Form } from "formik";
import MultiDatePicker from "../../../components/tools/datepicker/MultiDatePicker";
import { CreateToast } from "../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../models/enums/ToastType";
import {ReactComponent as FileIcon} from "../../icons/svg/fileIcon.svg";
import { HttpMethod } from "../../../models/enums/HttpMethod";
import { useReactMutation } from "../../hooks/query/useReactQuery";
import { CreateContract } from "../../../setting/ApiUrl";
import TextField from "../textField/TextField";
import useStore from "../../../store/zustand/store";

const services = [
  {
    id: 1,
    name: "بافر حمل",
    time: "۸ ساعت",
    price: "۱۵,۰۰۰ تومان",
    removable: true,
  },
  {
    id: 2,
    name: "بافر",
    time: "۸ ساعت",
    price: "۶,۵۰۰ تومان",
    removable: true,
  },
  { id: 3, name: "پودو", time: "۲۴ ساعت", price: "۱۰,۰۰۰ تومان" },
  { id: 4, name: "بازگشت از مبدا", time: "۲۴ ساعت", price: "۱۰,۰۰۰ تومان" },
  { id: 5, name: "عودت", time: "۲۴ ساعت", price: "۱۰,۰۰۰ تومان" },
  { id: 6, name: "نگهداشت (رسوبی)", time: "۲۴ ساعت", price: "۱۰,۰۰۰ تومان" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  customerId:number;
};



const CreateContractModal: React.FC<Props> = ({
  isOpen,
  onClose,
  customerId,
}) => {
const refetch = useStore((state)=>(state.refetch))
const handleSubmitButtonClick = (values: any) => {
  const contractDetailsInput = services
    .map((service) => {
      const time = values[`serviceTime_${service.id}`];
      const price = values[`servicePrice_${service.id}`];

      if (!time && !price) return null; // حذف سرویس‌هایی که هردو مقدار ندارند

      return {
        serviceTypeId: service.id,
        maximumServiceTime: time ? Number(time) : 0,
        price: price ? Number(price) : 0,
      };
    })
    .filter(Boolean); // حذف nullها

  const payload = {
    customerId,
    cooperationStartDate: values.fromDate,
    cooperationEndDate: values.toDate,
    contractDetailsInput,
  };

  Mutate(payload);
};



    const saveApiDetails = { url: CreateContract, method: HttpMethod.POST };
    const {
      mutate: Mutate,
      isLoading: Loading,
      data: data,
    } = useReactMutation(saveApiDetails);
    useEffect(() => {
      if (data?.data) {
        if (data.data.isSuccess) {
          CreateToast(
            ToastType.SUCCESS,
            data.data.message || "قرارداد با موفقیت ثبت شد"
          );
          refetch?.();
          onClose();
        } else {
          CreateToast(
            ToastType.ERROR,
            data.data.message || "خطایی رخ داده است"
          );
        }
      }
    }, [data]);
  if (!isOpen) return null;

  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[28px] shadow-md p-8 relative">
        {/* Close button */}
        <div className="flex flex-row justify-between">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-gray-600 hover:text-red-500 text-xl"
          >
            ×
          </button>
          <div className="flex flex-row gap-2">
            <FileIcon />
            <span className="font-bold"> قرارداد جدید</span>
          </div>
        </div>

        <Formik
          initialValues={{
            fromDate: null,
            toDate: null,
            ...services.reduce((acc, service) => {
              acc[`serviceTime_${service.id}`] = "";
              acc[`servicePrice_${service.id}`] = "";
              return acc;
            }, {} as any),
          }}
          onSubmit={handleSubmitButtonClick}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <Form className="w-full">
              <div className="flex flex-col xl:flex-row gap-6">
                <TextField
                  name="contractNumber"
                  value={values.contractNumber}
                  // onChange={(e:any) => setFieldValue("contractNumber",e.target.value)}
                  innerClassName="border border-[#E5E7EB]"
                  placeholder="شماره قرارداد"
                  label="شماره قرارداد"
                  // error={touched.contractNumber && errors.contractNumber}
                />
                <MultiDatePicker
                  label="تاریخ ثبت قرارداد"
                  name="registrationDate"
                  value={values.registrationDate}
                  setFieldValue={setFieldValue}
                  // error={touched.registrationDate && errors.registrationDate}
                />
              </div>
              <div className="flex flex-col xl:flex-row gap-6 items-center justify-center py-4">
                <MultiDatePicker
                  label="آغاز همکاری"
                  name="fromDate"
                  value={values.fromDate}
                  setFieldValue={setFieldValue}
                />
                <MultiDatePicker
                  label="پایان همکاری"
                  name="toDate"
                  value={values.toDate}
                  setFieldValue={setFieldValue}
                />
              </div>

              <div className="bg-white p-6 rounded-2xl mt-6">
                <div className="grid grid-cols-3 text-sm mb-4 px-3 font-bold text-[#073054]">
                  <div className="text-right pr-2">نوع سرویس</div>
                  <div className="text-center">حداکثر زمان سرویس‌دهی</div>
                  <div className="text-left pl-2">قیمت (هر مرسوله)</div>
                </div>
                <div className="flex flex-col gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="grid grid-cols-3 gap-4 items-center px-3 rounded-[16px] text-sm border border-[#E5E7EB]"
                    >
                      <div className="text-right font-semibold pr-2">
                        {service.name}
                      </div>

                      <TextField
                        name={`serviceTime_${service.id}`}
                        placeholder=" ۲۴ ساعت"
                        className="border border-gray-300 rounded-[10px]"
                        innerClassName="h-[30px] rounded-[10px]"
                      />
                      <TextField
                        name={`servicePrice_${service.id}`}
                        placeholder=" ۱۰,۰۰۰ تومان"
                        className="border border-gray-300 my-3 rounded-[10px]"
                        innerClassName="h-[30px] rounded-[10px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={Loading}
                className={`text-white font-semibold py-3 px-[42px] rounded-[12px] ${
                  Loading ? "bg-[#E5E7EB] cursor-not-allowed" : "bg-[#FF866A]"
                }`}
              >
                {Loading ? "در حال ثبت..." : "تایید و ثبت اطلاعات"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateContractModal;
