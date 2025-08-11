import React, {useState,useEffect} from 'react';
import Loading from "../../../../components/tools/loading/Loading";
import {Form, Formik} from "formik";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import TextField from "../../../../components/tools/textField/TextField";
import ToggleSwitch from "../../../../components/tools/toggle-switch/ToggleSwitch";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import TextArea from "../../../../components/tools/textArea/TextArea";
import FlexContainer from "../../../../components/tools/grid/FlexContainer";
import Button from "../../../../components/tools/button/Button";
import {ReactComponent as UserIcon} from "../../../../components/icons/svg/user.svg";
import {ReactComponent as PhoneIcon} from "../../../../components/icons/svg/call.svg";
import {ReactComponent as RoleIcon} from "../../../../components/icons/svg/roleIcon.svg";
import {ReactComponent as NodeIcon} from "../../../../components/icons/svg/nodeIcon.svg";
import { GetRoles, CreateUser } from "../../../../setting/ApiUrl";
import useStore from "../../../../store/zustand/store";
import {
  useReactMutation,
  useReactQuery,
} from "../../../../components/hooks/query/useReactQuery";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { NewFormValidationSchema } from '../../../../components/validationSchema/personnelValidation/PersonnelValidation';
import FileUpload from "../../../../components/tools/fileUpload/FileUpload";

function NewForm() {
    const { setToggledFalse } = useStore();
    const [selectedValues, setSelectedValues] = useState<Record<string, any>>(
      {}
    );
    const initialValues = {
      firstName: "",
      lastName: "",
      isActive: false,
      password:'',
      email:'',
      nationalCode:'',
      roleIds:[],
      phoneNumber: "",
      userName: "",
    };

      const handleButtonClick = (button: {
        id: string;
        value: any;
        label: string;
        category: string;
      }) => {
        setSelectedValues((prevValues) => ({
          ...prevValues,
          [button.category]: button.value,
        }));
        setToggledFalse();
      };
  const apiDetails = {
    url: GetRoles,
    method: HttpMethod.GET,
  };
    const saveApiDetail = {
      url: CreateUser,
      method: HttpMethod.POST,
    
    };


    const {
      mutate: saveMutate,
      isLoading: saveLoading,
      data: savedata,
    } = useReactMutation(saveApiDetail);
  useEffect(() => {
    if (savedata?.data?.isSuccess === true) {
      CreateToast(ToastType.SUCCESS, "دیتا با موفقیت ثبت شد");
    } else if (savedata?.data?.isSuccess !== true && savedata?.status !== undefined) {
      CreateToast(ToastType.ERROR, savedata?.data?.message);
    }
  }, [savedata?.status]);
  const {
    data: GetRolesData,
    isLoading,
    isError,
    error,
  } = useReactQuery(apiDetails);

  const RoleDropDown = GetRolesData?.data?.length
    ? GetRolesData.data?.map((item: any) => ({
        value: item?.roleId,
        label: item?.persianTitle,
      }))
    : [];

    const submitHandler = (values: any, { resetForm }: any) => {
      const formatedData = {
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
        password: values.password,
        email: values.email,
        phoneNumber: values.phoneNumber,
        nationalCode: values.nationalCode,
        isActive: values.isActive,
        roleIds: [values.roleIds],
      };
      saveMutate(formatedData);
      resetForm();
    };
    return (
      <div>
        <h2 className="text-xl text-gray-900 pb-16 font-bold">پرسنل جدید</h2>
        <Formik
          enableReinitialize
          validationSchema={NewFormValidationSchema}
          initialValues={initialValues}
          onSubmit={submitHandler}
        >
          {({ values }) => (
            <Form className="w-full">
              <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
                <div className="min-w-[200px] flex-1 ">
                  <TextField
                    name="firstName"
                    placeholder=""
                    label="نام "
                    icon={<UserIcon className="w-4 h-4 opacity-75" />}
                  />
                </div>
                <div className="min-w-[200px] flex-1 ">
                  <TextField
                    name="lastName"
                    placeholder=""
                    label="نام خانوادگی"
                    icon={<UserIcon className="w-4 h-4 opacity-75" />}
                  />
                </div>
              </div>
              <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
                <div className="min-w-[200px] flex-1 ">
                  <TextField
                    name="phoneNumber"
                    placeholder=""
                    label="شماره تماس"
                    icon={<PhoneIcon className="w-4 h-4 opacity-75" />}
                  />
                </div>
                <div className="min-w-[200px] flex-1 ">
                  <ToggleSwitch name="isActive" label="وضعیت فعالیت" />
                </div>
              </div>
              <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
                <div className="min-w-[200px] flex-1 ">
                  <AutoComplete
                    name="roleIds"
                    options={RoleDropDown}
                    label="نقش"
                    icon={<RoleIcon className="w-4 h-4 opacity-75" />}
                  />
                </div>
                <div className="min-w-[200px] flex-1 ">
                  <TextField
                    name="userName"
                    placeholder=""
                    label="نام کاربری"
                    icon={<UserIcon className="w-4 h-4 opacity-75" />}
                  />
                </div>
              </div>
              <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
                <div className="min-w-[200px] flex-1 ">
                  <TextField
                    name="email"
                    placeholder=""
                    label="ایمیل"
                    icon={<NodeIcon className="w-4 h-4 opacity-65" />}
                  />
                </div>
                <div className="min-w-[200px] flex-1 ">
                  <TextField
                    name="password"
                    placeholder=""
                    label="پسورد"
                    icon={<UserIcon className="w-4 h-4 opacity-75" />}
                  />
                </div>
              </div>
              <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
                <div className="min-w-[200px] flex-1 ">
                  <TextField
                    name="nationalCode"
                    placeholder=""
                    label="کد ملی"
                    icon={<NodeIcon className="w-4 h-4 opacity-65" />}
                  />
                </div>
              </div>
              <FlexContainer className="justify-end mt-12 pb-12">
                <Button className="mt-2 width-auto" type="submit">
                  {false ? <Loading size="sm" /> : "تایید و ایجاد پرسنل"}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </div>
    );
}

export default NewForm;