import React, { useEffect  ,useState } from "react";
import MultiDatePicker from "../../../../../components/tools/datepicker/MultiDatePicker";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import { ReactComponent as EmptyContract } from "../../../../../components/icons/svg/emptyContractsIcon.svg";
import TextField from "../../../../../components/tools/textField/TextField";
import useContractsStore from "../../../../../store/zustand/useContractsStore";

export const services = [
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

interface ContractsFormValues {
  isChecked?: boolean;
  contractNumber: string;
  registrationDate: Date | null;
  fromDate: Date | null;
  toDate: Date | null;
  [key: string]: any;
}

interface ContractsFormProps {
  isChecked: boolean;
  values: ContractsFormValues;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  errors: FormikErrors<ContractsFormValues>;
  touched: FormikTouched<ContractsFormValues>;
}


const ContractsForm = ({ isChecked }: { isChecked: boolean }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<any>();

  if (isChecked) {
    return (
      <div className="w-full h-[85vh] flex flex-col items-start gap-8 p-8 bg-white rounded-[28px] shadow-md">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col xl:flex-row gap-6">
            <TextField
              name="contractNumber"
              innerClassName="border border-[#E5E7EB]"
              placeholder=""
              label="شماره قرارداد"
            />
            <MultiDatePicker
              label="تاریخ ثبت قرارداد"
              name="registrationDate"
              value={values.registrationDate}
              setFieldValue={setFieldValue}
              error={
                touched.registrationDate &&
                typeof errors.registrationDate === "string"
                  ? errors.registrationDate
                  : undefined
              }
            />
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            <MultiDatePicker
              label="آغاز همکاری"
              name="fromDate"
              value={values.fromDate}
              setFieldValue={setFieldValue}
              error={
                touched.registrationDate &&
                typeof errors.registrationDate === "string"
                  ? errors.registrationDate
                  : undefined
              }
            />
            <MultiDatePicker
              label="پایان همکاری"
              name="toDate"
              value={values.toDate}
              setFieldValue={setFieldValue}
              error={
                touched.registrationDate &&
                typeof errors.registrationDate === "string"
                  ? errors.registrationDate
                  : undefined
              }
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl w-full max-w-4xl">
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
                  placeholder="۲۴ ساعت"
                  className="border border-gray-300 rounded-[10px]"
                  innerClassName="h-[30px] rounded-[10px]"
                />
                <TextField
                  name={`servicePrice_${service.id}`}
                  placeholder="۱۰,۰۰۰ تومان"
                  className="border border-gray-300 my-3 rounded-[10px]"
                  innerClassName="h-[30px] rounded-[10px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // در صورتی که تیک نخورده باشد (مشتری قرارداد ندارد)
  return (
    <div className="w-full h-[80vh] flex items-center justify-center bg-gray-100 rounded-[28px] shadow-inner">
      <EmptyContract />
    </div>
  );
};

export default ContractsForm;
