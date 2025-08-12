import React, { useState, useEffect } from "react";
import { SignUp } from "../../../../setting/ApiUrl";
import { useReactMutation } from "../../../../components/hooks/query/useReactQuery";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { ReactComponent as EyeIcon } from "../../../../components/icons/svg/EyeIcon.svg";
import { ReactComponent as CloseEyeIcon } from "../../../../components/icons/svg/EyeCloseIcon.svg";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import TextField from "../../../../components/tools/textField/TextField";
import { Formik } from "formik";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [prefixes, setPrefixes] = useState<{ value: string; label: string }[]>(
    []
  );
  const [loadingPrefixes, setLoadingPrefixes] = useState(false);

  useEffect(() => {
    setLoadingPrefixes(true);
    setTimeout(() => {
      setPrefixes([
        { value: "+98", label: "+98" },
        { value: "+1", label: "+1" },
        { value: "+44", label: "+44" },
      ]);
      setLoadingPrefixes(false);
    }, 500);
  }, []);

  const blockCustomerApiDetail = {
    url: SignUp,
    method: HttpMethod.POST,
  };

  const { mutate: submitSignUp, isLoading: isSubmitting } = useReactMutation(
    blockCustomerApiDetail
  );

return (
  <div className="flex items-center justify-center  px-4 ">
    <div className="w-full max-w-2xl min-h-[400px] p-10 rounded-2xl">
      <h1 className="text-2xl font-bold mb-2 text-gray-800 text-right">
        ثبت‌نام
      </h1>
      <p className="mb-6 text-sm text-gray-500 text-right">
        برای ثبت‌نام، اطلاعات زیر را وارد کنید
      </p>
      <Formik
        initialValues={{
          displayName: "",
          phoneNumber: "",
          phonePrefix: "",
          email: "",
          password: "",
          inviteCode: "",
        }}
        enableReinitialize
        onSubmit={(values) => {
          submitSignUp(values);
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="space-y-5 text-right">
            {/* Grid of fields */}
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="نام نمایشی"
                name="displayName"
                placeholder="نام را وارد کنید"
                className="rounded-[10px]"
                innerClassName=" rounded-[10px] border bg-gray-100 border-gray-100"
              />

              <AutoComplete
                label="پیش شماره"
                name="phonePrefix"
                options={prefixes}
                placeholder="پیش شماره"
                inputClassName="bg-gray-100"
                innerClassName=" rounded-[10px] border bg-gray-100 border-gray-100"
                readonly={true}
                onChange={(value: any) => setFieldValue("phonePrefix", value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 min-w-[400px]">
              <TextField
                label="شماره تلفن"
                name="phoneNumber"
                placeholder="شماره تلفن را وارد کنید"
                className="rounded-[10px]"
                innerClassName=" rounded-[10px] border bg-gray-100 border-gray-100"
              />

              <TextField
                label="ایمیل"
                name="email"
                placeholder="ایمیل را وارد کنید"
                className="rounded-[10px]"
                innerClassName=" rounded-[10px] border bg-gray-100 border-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="کد دعوت"
                name="inviteCode"
                placeholder="کد دعوت"
                className="rounded-[10px]"
                innerClassName=" rounded-[10px] border bg-gray-100 border-gray-100"
              />

              <TextField
                label="رمز عبور"
                name="password"
                innerClassName=" rounded-[10px] border bg-gray-100 border-gray-100"
                type="password"
                placeholder="رمز عبور را وارد کنید"
              />
            </div>

            <p className="text-xs text-gray-500 leading-5">
              با ساخت حساب کاربری، شما با{" "}
              <span className="text-blue-500 hover:underline cursor-pointer">
                قوانین
              </span>{" "}
              و{" "}
              <span className="text-blue-500 hover:underline cursor-pointer">
                حریم خصوصی
              </span>{" "}
              موافقت می‌کنید.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition disabled:opacity-50"
            >
              {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  </div>
);

}

export default SignUpForm;
