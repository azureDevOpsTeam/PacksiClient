import * as Yup from "yup";

export const CustomerValidationSchema = Yup.object().shape({
  name: Yup.string().required("نام شرکت الزامی است"),
  brandName: Yup.string().required("نام برند الزامی است"),
  email: Yup.string()
    .email("ایمیل وارد شده معتبر نیست")
    .required("ایمیل الزامی است"),
  landlineNumber: Yup.string()
    .matches(/^[0-9]{8,12}$/, "شماره تلفن ثابت معتبر نیست")
    .required("شماره تلفن ثابت الزامی است"),
  nationalID: Yup.string()
    .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .required("کد ملی الزامی است"),
  registrationNumber: Yup.string().required("شماره ثبت الزامی است"),
  economicCode: Yup.string().required("شماره اقتصادی الزامی است"),
  ceoName: Yup.string().required("نام مدیر عامل الزامی است"),
  contactNumber: Yup.string()
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    .required("شماره موبایل الزامی است"),
  postalCode: Yup.string()
    .matches(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد")
    .required("کد پستی الزامی است"),
  address: Yup.string().required("آدرس الزامی است"),
});


const services = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

// ساخت شیء ولیدیشن قرارداد
const ContractValidationShape: Record<string, any> = {
  contractNumber: Yup.string().required("شماره قرارداد الزامی است"),
  registrationDate: Yup.date().nullable().required("تاریخ ثبت الزامی است"),
  fromDate: Yup.date().nullable().required("تاریخ آغاز الزامی است"),
  toDate: Yup.date().nullable().required("تاریخ پایان الزامی است"),
};

services.forEach((service) => {
  const timeField = `serviceTime_${service.id}`;
  const priceField = `servicePrice_${service.id}`;

  if (service.id === 5 || service.id === 6) {
    ContractValidationShape[priceField] = Yup.number()
      .typeError("قیمت باید عدد باشد")
      .when(timeField, {
        is: (val: any) => val !== "" && val != null,
        then: (schema) => schema.required("وارد کردن قیمت الزامی است"),
        otherwise: (schema) => schema.notRequired(),
      });
  } else {
    ContractValidationShape[priceField] = Yup.number()
      .typeError("قیمت باید عدد باشد")
      .notRequired();
  }

  ContractValidationShape[timeField] = Yup.string().notRequired();
});


export const CombinedValidationSchema = Yup.object()
  .shape({
    ...CustomerValidationSchema.fields,
    ...ContractValidationShape,
  })
  .test(
    "at-least-one-main-service",
    "حداقل یکی از سرویس‌های پودو، بافر یا بافر حمل باید انتخاب و مقداردهی شود.",
    (values: any) => {
      const requiredServiceIds = [1, 2, 3]; // بافر حمل، بافر، پودو
      return requiredServiceIds.some((id) => {
        const time = values[`serviceTime_${id}`];
        const price = values[`servicePrice_${id}`];
        return time && price;
      });
    }
  )
  .test(
    "mandatory-fields-if-reservoir-used",
    "در صورت انتخاب سرویس رسوبی، فیلدهای تاریخ ثبت، شروع و پایان باید پر شوند.",
    (values: any) => {
      const time = values[`serviceTime_6`];
      const price = values[`servicePrice_6`];

      if (time || price) {
        return values.registrationDate && values.fromDate && values.toDate;
      }
      return true;
    }
  );
