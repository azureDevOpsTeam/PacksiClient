import * as Yup from "yup";

export const NewFormValidationSchema = Yup.object({
  name: Yup.string()
    .required("نام اجباری است")
    .min(2, "نام نود باید حداقل ۲ کاراکتر باشد"),
  fleetTypeId: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("وسیله نقلیه را انتخاب کنید."),
  
  userId: Yup.number().required("پرسنل را انتخاب کنید"),
  zoneId: Yup.number().required("زون را انتخاب کنید"),
  vehicleModel: Yup.string().required("مدل را انتخاب کنید"),
  licensePlate: Yup.string().required("پلاک را وارد کنید"),
});

export const InformationFormValidation = Yup.object({
});

export const LocationValidationSchema = Yup.object({
  latitude: Yup.string()
    .required("مختصات اجباری است")
    .min(2, "نام نود باید حداقل ۲ کاراکتر باشد"),
  longitude: Yup.string()
    .required("مختصات اجباری است"),
 address: Yup.string().required("آدرس اجباری است"),
});