import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Form, Formik } from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import ToggleSwitch from "../../../../components/tools/toggle-switch/ToggleSwitch";
import { ReactComponent as NodeIcon } from "../../../../components/icons/svg/nodeIcon.svg";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import FlexContainer from "../../../../components/tools/grid/FlexContainer";
import Button from "../../../../components/tools/button/Button";
import Loading from "../../../../components/tools/loading/Loading";
import {
  useReactQuery,
  useReactMutation,
} from "../../../../components/hooks/query/useReactQuery";
import {
  CreateTaxiLine,
  GetExpressHubs,
} from "../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../models/enums/HttpMethod";


export interface IDropDown {
  value: string;
  label: string;
}

const NewForm = React.memo(() => {
  const initialValues = {
    lineName: "",
    isActive: true,
    firstNodeId: "",
    secondNodeId: "",
  };

    const apiDetails = 
       {
        url: GetExpressHubs,
        method: HttpMethod.GET,
      }

    const {
      data,
      isLoading: ExpressHubLoading,
      error: ExpressHubError,
      refetch,
    } = useReactQuery(apiDetails);
     const saveApiDetails = { url: CreateTaxiLine, method: HttpMethod.POST };

  const {
    mutate,
    isLoading,
    isError,
    data: savedata,
    error,
  } = useReactMutation(
    saveApiDetails,

  );

  useEffect(() => {
    if (savedata?.status === 200) {
      CreateToast(ToastType.SUCCESS, "دیتا با موفقیت ثبت شد");
    } else if (savedata?.status !== 200 && savedata?.status !== undefined) {
      CreateToast(ToastType.ERROR, "خطا در ثبت دیتا");
    }
  }, [savedata?.status]);
  
const dropDownData = data?.data?.map((item: any) => ({
  value: item.id,
  label: item.name,
}));

  const submitHandler = (values: any, { resetForm }: any) => {
   
    mutate(values);
    resetForm();
  };

return (
  <div className="relative min-h-screen pb-16">
    <h2 className="text-xl text-gray-900 pb-16 font-bold">خط تاکسی جدید</h2>
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={submitHandler}
    >
      {() => (
        <Form className="w-full">
          <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
            <TextField
              name="lineName"
              placeholder=""
              label="نام خط"
              icon={<NodeIcon className="w-4 h-4 opacity-75" />}
            />
            <ToggleSwitch name="isActive" label="وضعیت فعالیت" />
          </div>
          <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
            <AutoComplete
              name="firstNodeId"
              options={dropDownData}
              label="میکروهاب 1"
            />
            <AutoComplete
              name="secondNodeId"
              options={dropDownData}
              label="میکروهاب 2"
            />
          </div>
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
            <Button className="mt-2 width-auto px-6 py-3" type="submit">
              {isLoading ? <Loading size="sm" /> : "تایید و ایجاد خط تاکسی"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);
});

export default NewForm;
