import { log } from "node:console";
import { HttpMethod } from "../../../models/enums/HttpMethod";
import { HttpStatus } from "../../../models/enums/HttpStatus";
import {
  ILoginRequest,
  ILoginResponse,
  IForgetPassRequest
} from "../../../models/viewModels/api/user/LoginViewModels";
import { DefaultApiHeader } from "../../../services/api/ApiHeader";
import { SetUserToken } from "../../../services/api/ApiToken";
import Api from "../../../services/api/CallApi";
import { LoginRequest ,ForgotPassword } from "../../../setting/ApiUrl";
import * as Yup from "yup";

export const LoginService = async (loginInfo: ILoginRequest) => {
  const result = await Api<ILoginResponse>(
    LoginRequest,
    loginInfo,
    DefaultApiHeader,
    HttpMethod.POST
  );

  if (result.status === HttpStatus.OK) {
    await SetUserToken(result.data?.token ?? "");
  }
  return result;
};

export const ForgotPasswordService = async (
  forgotInfo: IForgetPassRequest
  
) => {
  const result = await Api<IForgetPassRequest>(
    ForgotPassword,
    forgotInfo,
    DefaultApiHeader,
    HttpMethod.POST
  );
  //  if (result.status === HttpStatus.OK) {
  //    await SetUserToken(result.data?.token ?? "");
  //  }
   return result;
};
export const ValidationSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(/^(\+98|0)?9\d{9}$/, "شماره تلفن نامعتبر است") // Validate phone number format
    .required("شماره تلفن الزامی است"),
  password: Yup.string().required("کلمه عبور الزامی است"),
});
