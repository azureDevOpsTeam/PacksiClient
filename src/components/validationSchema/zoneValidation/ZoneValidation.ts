import * as Yup from "yup";

export const NewFormValidationSchema = Yup.object({
  name: Yup.string()
    .required("نام اجباری است")
    .min(2, "نام زون باید حداقل ۲ کاراکتر باشد"),
  nodes: Yup.array()
    .min(3, "حداقل ۳ نود باید انتخاب کنید.") // بررسی حداقل ۳ مقدار
    .required("انتخاب حداقل ۳ نود الزامی است."),
});
