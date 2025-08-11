import * as Yup from "yup";

export const NewFormValidationSchema = Yup.object({
 
    email: Yup.string()
      .email("ایمیل معتبر نمی باشد")
      .required("وارد کردن ایمیل اجباری می باشد"),
    password: Yup.string()
      .required("وارد کردن کلمه عبور اجباری می باشد")
      .min(8, "کلمه عبور حداقل 8 کاراکتر باشد")
      .matches(/[A-Z]/, "کلمه عبور باید حداقل یک حرف بزرگ داشته باشد")
      .matches(/[a-z]/, "کلمه عبور باید حداقل یک حرف کوچک داشته باشد")
      .matches(/\d/, "کلمه عبور باید حداقل یک عدد داشته باشد")
      .matches(/[\W_]/, "کلمه عبور باید حداقل یک علامت خاص داشته باشد"),

  firstName: Yup.string().required("نام اجباری است"),
  lastName: Yup.string().required("نام خانوادگی اجباری است"),
  phoneNumber: Yup.string().required("شماره تلفن اجباری است"),
  userName: Yup.string().required("نام کاربری  اجباری است"),
  nationalCode: Yup.string().required("کد ملی اجباری است"),
});

export const InformationFormValidation = Yup.object({
  fleetName: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("وسیله نقلیه را انتخاب کنید."),
  zoneId: Yup.number().required("زون را انتخاب کنید"),
});

export const LocationValidationSchema = Yup.object({
  latitude: Yup.string()
    .required("مختصات اجباری است")
    .min(2, "نام نود باید حداقل ۲ کاراکتر باشد"),
  longitude: Yup.string()
    .required("مختصات اجباری است"),
 address: Yup.string().required("آدرس اجباری است"),
});