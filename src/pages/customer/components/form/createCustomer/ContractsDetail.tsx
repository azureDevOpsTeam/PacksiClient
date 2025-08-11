import React from "react";
import { Form, Formik } from "formik";
import TextField from "../../../../../components/tools/textField/TextField";
import * as Yup from "yup";

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
const validationSchema = Yup.object().shape({
  contractNumber: Yup.string(),
  fromDate: Yup.date().nullable(),
  toDate: Yup.date().nullable(),

  serviceTime_1: Yup.string(),
  servicePrice_1: Yup.string().when("serviceTime_1", {
    is: (val: string) => !!val && val.trim() !== "",
    then: (schema) => schema.required("قیمت الزامی است"),
    otherwise: (schema) => schema.notRequired(),
  }),

  serviceTime_2: Yup.string(),
  servicePrice_2: Yup.string().when("serviceTime_2", {
    is: (val: string) => !!val && val.trim() !== "",
    then: (schema) => schema.required("قیمت الزامی است"),
    otherwise: (schema) => schema.notRequired(),
  }),

  serviceTime_3: Yup.string(),
  servicePrice_3: Yup.string(),
  serviceTime_4: Yup.string(),
  servicePrice_4: Yup.string(),
  serviceTime_5: Yup.string(),
  servicePrice_5: Yup.string(),
  serviceTime_6: Yup.string(),
  servicePrice_6: Yup.string(),
});
  const submitHandler = (values: any, { resetForm }: any) => {

  };
  const initialValues = {
    name: "",
    brandName: "",
    email: "",
    landlineNumber: "",
    nationalID: "",
    registrationNumber: "",
    economicCode: "",
    ceoName: "",
    contactNumber: "",
    postalCode: "",
    address: "",
  };

function ContractsDetail() {

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={submitHandler}
    >
      {({ values }) => (
        <Form className="w-full">
          <div className="bg-white p-6 rounded-2xl  w-full max-w-4xl">
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
        </Form>
      )}
    </Formik>
  );
  
}

export default ContractsDetail;
