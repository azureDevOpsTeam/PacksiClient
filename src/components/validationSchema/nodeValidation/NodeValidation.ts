import * as Yup from "yup";

export const InformationValidationSchema = Yup.object({
  name: Yup.string()
    .required("نام اجباری است")
    .min(2, "نام نود باید حداقل ۲ کاراکتر باشد"),
});

export const LocationValidationSchema = Yup.object({
  latitude: Yup.string()
    .required("مختصات اجباری است")
    .min(2, "نام نود باید حداقل ۲ کاراکتر باشد"),
  longitude: Yup.string()
    .required("مختصات اجباری است"),
 address: Yup.string().required("آدرس اجباری است"),
});