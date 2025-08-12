import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ChevronLeftIcon } from "../../../../components/icons/svg/ChevronLeftIcon.svg";
import { LoginService } from "../Login.Service";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import { Formik, Form } from "formik";
import TextField from "../../../../components/tools/textField/TextField";

function LoginForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values: any) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const loginRequest = {
        userName: values.userName,
        password: values.password,
        phonePrefix: "+98",
        validationMethod: 1,
        securityCode: 0,
      };

      const response: any = await LoginService(loginRequest);

      if (response?.data?.requestStatus?.name === "Successful") {
        navigate("/Home");
      } else {
        CreateToast(
          ToastType.ERROR,
          response?.message ?? "عملیات با موفقیت انجام نشد"
        );
      }
    } catch (error) {
      CreateToast(ToastType.ERROR, "خطا در ارسال درخواست");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-right">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-lg sm:text-xl dark:text-white/90">
              ورود به حساب کاربری
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              شماره تلفن و رمز عبور خود را وارد کنید.
            </p>
          </div>

          <div className="relative py-3 sm:py-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
          </div>

          <Formik
            initialValues={{ userName: "", password: "" }}
            onSubmit={submitHandler}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form className="space-y-6">
                <TextField
                  label="شماره تلفن"
                  name="userName"
                  placeholder="مثلاً 09193559930"
                  className="rounded-[10px]"
                  innerClassName=" rounded-[10px] border bg-gray-100 border-gray-100"
                />

                <TextField
                  label="رمز عبور"
                  name="password"
                  type="password"
                  placeholder="رمز عبور را وارد کنید"
                  className="rounded-[10px]"
                  innerClassName=" rounded-[10px] border bg-gray-100 border-gray-100"
                />

                <div className="flex items-center justify-between flex-row-reverse">
                  <div className="flex items-center gap-3">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="block font-normal text-gray-700 text-sm dark:text-white"
                    >
                      من را وارد نگه دار
                    </label>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-black hover:text-black dark:text-white"
                  >
                    رمز عبور را فراموش کرده‌اید؟
                  </Link>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 rounded-md text-white ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isLoading ? "در حال ورود..." : "ورود"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              حساب کاربری ندارید؟{" "}
              <Link
                to="/SignUp"
                className="text-black hover:text-black dark:text-white"
              >
                ثبت‌نام کنید
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
