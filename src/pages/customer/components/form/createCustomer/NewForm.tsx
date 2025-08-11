import React, { useState, useEffect ,useRef} from "react";
import { Formik, Form, FormikProps } from "formik";
import { CreateToast } from "../../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../../models/enums/ToastType";
import TextField from "../../../../../components/tools/textField/TextField";
import { ReactComponent as Address } from "../../../../../components/icons/svg/elements.svg";
import useContractsStore from "../../../../../store/zustand/useContractsStore";
import TextArea from "../../../../../components/tools/textArea/TextArea";
import ContractsForm from "./ContractsForm";
import Button from "../../../../../components/tools/button/Button";
import FlexContainer from "../../../../../components/tools/grid/FlexContainer";
import { ReactComponent as UserIcon } from "../../../../../components/icons/svg/user.svg";
import { ReactComponent as PhoneIcon } from "../../../../../components/icons/svg/call.svg";
import { ReactComponent as NodeIcon } from "../../../../../components/icons/svg/nodeIcon.svg";
import { CombinedValidationSchema } from "../../../../../components/validationSchema/customerValidation/CustomerValidation";
import {
  GetRoles,
  CreateCustomer,
} from "../../../../../setting/ApiUrl";
import useStore from "../../../../../store/zustand/store";
import {
  useReactMutation,
  useReactQuery,
} from "../../../../../components/hooks/query/useReactQuery";
import { HttpMethod } from "../../../../../models/enums/HttpMethod";
import CustomCheckbox from "../../../../../components/tools/checkbox/CustomCheckBox";


function NewForm() {
  const { setToggledFalse } = useStore();
  const {setIsChecked} = useStore();
  const formikRef = useRef<FormikProps<any>>(null);
  const contractValues = useContractsStore((state) => state.contractValues);
  console.log("contractValues", contractValues);
  const [isCheckBoxChecked, setCheckBoxChecked] = useState(false);
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({});
  const initialValues = {
    registrationDate: null,
    bankAccountNumber:'',
    englishBrandName:'',
    fromDate: null,
    toDate: null,
    contractNumber: "",
    serviceTime_1: "",
    servicePrice_1: "",
    serviceTime_2: "",
    servicePrice_2: "",
    serviceTime_3: "",
    servicePrice_3: "",
    serviceTime_4: "",
    servicePrice_4: "",
    serviceTime_5: "",
    servicePrice_5: "",
    serviceTime_6: "",
    servicePrice_6: "",
    name: "",
    brandName: "",
    email: "",
    landlineNumber: "",
    nationalID: "",
    registrationNumber: "",
    ceoName: "",
    contactNumber: "",
    postalCode: "",
    address: "",
  };



    const handleCheckboxChange = (newChecked: boolean) => {
      setIsChecked(newChecked);
      setCheckBoxChecked(newChecked);
    };

  // const handleButtonClick = (button: {
  //   id: string;
  //   value: any;
  //   label: string;
  //   category: string;
  // }) => {
  //   setSelectedValues((prevValues) => ({
  //     ...prevValues,
  //     [button.category]: button.value,
  //   }));
  //   setToggledFalse();
  // };

  const customerApiDetail = {
    url: CreateCustomer,
    method: HttpMethod.POST,
  };

  const {
    mutate: customerMutate,
    isLoading: customerLoading,
    data: customerData,
    refetch
  } = useReactMutation(customerApiDetail);





  useEffect(() => {
    if (customerData?.data?.isSuccess === true) {
      CreateToast(ToastType.SUCCESS, "دیتا با موفقیت ثبت شد");
      refetch?.();
      formikRef.current?.resetForm();
    } else if (
      customerData?.data?.isSuccess !== true &&
      customerData?.status !== undefined
    ) {
      CreateToast(ToastType.ERROR, customerData?.data?.message);
    }
  }, [customerData?.status]);

const submitHandler = (values: any, { resetForm }: any) => {
  const contractDetailsInput = [];

  for (let i = 1; i <= 6; i++) {
    const time = values[`serviceTime_${i}`];
    const price = values[`servicePrice_${i}`];

    if (time && price) {
      contractDetailsInput.push({
        serviceTypeId: i,
        maximumServiceTime: Number(time),
        price: Number(price),
      });
    }
    delete values[`serviceTime_${i}`];
    delete values[`servicePrice_${i}`];
  }

  const customerContract = isCheckBoxChecked
    ? {
        contractNumber: values.contractNumber,
        registrationDate: values.registrationDate,
        cooperationStartDate: values.fromDate,
        cooperationEndDate: values.toDate,
        contractDetailsInput,
      }
    : null;
  delete values.contractNumber;
  delete values.registrationDate;
  delete values.fromDate;
  delete values.toDate;

  const finalValues = {
    ...values,
    customerContract,
  };

  console.log("finalValues", finalValues);
resetForm();
  customerMutate(finalValues);
};

return (
  <Formik
    innerRef={formikRef}
    enableReinitialize
    // validationSchema={CombinedValidationSchema}
    initialValues={initialValues}
    onSubmit={submitHandler}
  >
    {({ values, errors, touched, setFieldValue }) => (
      <Form className="w-full flex flex-col lg:flex-row gap-6">
        {/* فرم مشتری جدید */}
        <div className="w-full lg:w-1/2  p-4 rounded-xl">
          <h2 className="text-xl text-gray-900 font-bold mb-6">مشتری جدید</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* فیلدها */}
            <TextField
              name="ceoName"
              label="مدیر عامل"
              icon={<NodeIcon className="w-4 h-4" />}
            />
            <TextField
              name="contactNumber"
              label="شماره موبایل"
              icon={<UserIcon className="w-4 h-4" />}
            />
            <TextField
              name="name"
              label="نام شرکت"
              icon={<UserIcon className="w-4 h-4" />}
            />
            <TextField
              name="brandName"
              label="نام برند"
              icon={<UserIcon className="w-4 h-4" />}
            />
            <TextField
              name="englishBrandName"
              label="نام انگلیسی اختصاری"
              icon={<PhoneIcon className="w-4 h-4" />}
            />
            <TextField
              name="email"
              label="ایمیل"
              icon={<PhoneIcon className="w-4 h-4" />}
            />
            <TextField
              name="landlineNumber"
              label="تلفن ثابت"
              icon={<PhoneIcon className="w-4 h-4" />}
            />
            <TextField
              name="registrationNumber"
              label="شماره ثبت"
              icon={<PhoneIcon className="w-4 h-4" />}
            />{" "}
            <TextField
              name="companyNationalID"
              label="شماره ملی"
              icon={<PhoneIcon className="w-4 h-4" />}
            />{" "}
            <TextField
              name="nationalID"
              label="کد ملی"
              icon={<NodeIcon className="w-4 h-4" />}
            />
            <TextField
              name="postalCode"
              label="کد پستی"
              icon={<NodeIcon className="w-4 h-4" />}
            />
            <TextField
              name="bankAccountNumber"
              label="شماره شبا"
              icon={<UserIcon className="w-4 h-4" />}
            />
          </div>
          {/* TextArea */}
          <div className="mt-4">
            <TextArea
              innerClassName="bg-gray-200 rounded-[13px]"
              className="rounded-[13px]"
              placeholder="آدرس"
              name="address"
              icon={<Address />}
            />
          </div>{" "}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <TextField
              name="plaque"
              label="پلاک"
              icon={<NodeIcon className="w-4 h-4" />}
            />
            <TextField
              name="unit"
              label="واحد"
              icon={<UserIcon className="w-4 h-4" />}
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <CustomCheckbox
              checked={isCheckBoxChecked}
              onChange={handleCheckboxChange}
            />
            <span className="text-sm">این مشتری دارای قرارداد است.</span>
          </div>
          <FlexContainer className="justify-end mt-12 pb-6 flex-col items-end gap-2">
            <Button type="submit">تایید و ایجاد مشتری</Button>

            {(errors as any)["at-least-one-main-service"] && (
              <p className="text-red-500 text-sm text-right w-full">
                {(errors as any)["at-least-one-main-service"]}
              </p>
            )}
            {(errors as any)["mandatory-fields-if-reservoir-used"] && (
              <p className="text-red-500 text-sm text-right w-full">
                {(errors as any)["mandatory-fields-if-reservoir-used"]}
              </p>
            )}
          </FlexContainer>
        </div>

        <div className="w-full lg:w-1/2 mt-[50px]">
          <ContractsForm isChecked={isCheckBoxChecked} />
        </div>
      </Form>
    )}
  </Formik>
);

}

export default NewForm;
