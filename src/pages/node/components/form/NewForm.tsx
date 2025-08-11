import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Form, Formik } from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import ToggleSwitch from "../../../../components/tools/toggle-switch/ToggleSwitch";
import { ReactComponent as Address } from "../../../../components/icons/svg/elements.svg";
import { ReactComponent as MicrohubIcon } from "../../../../components/icons/svg/microhubIcone.svg";
import { ReactComponent as ZoneIcon } from "../../../../components/icons/svg/zoneIcon.svg";
import { ReactComponent as NodeIcon } from "../../../../components/icons/svg/nodeIcon.svg";
import TextArea from "../../../../components/tools/textArea/TextArea";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import FlexContainer from "../../../../components/tools/grid/FlexContainer";
import Button from "../../../../components/tools/button/Button";
import Loading from "../../../../components/tools/loading/Loading";
import useStore from "../../../../store/zustand/store";
import {
  useReactQuery,
  useReactMutation,
} from "../../../../components/hooks/query/useReactQuery";
import {
  ZoneDropDown,
  NodeCreate,
} from "../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import LocationUpdater from "./LocationUpdater"; // وارد کردن کامپوننت LocationUpdater

export interface IDropDown {
  value: string;
  label: string;
}

const NewForm = React.memo(() => {
  const initialValues = {
    title: "",
    isActive: true,
    zoneId: 1,
    address: "",
  };


  const saveApiDetails = { url: NodeCreate, method: HttpMethod.POST };

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

  const submitHandler = (values: any, { resetForm }: any) => {
   
    mutate(values);
    resetForm();
  };

  return (
    <div>
      <h2 className="text-xl text-gray-900 pb-16 font-bold">نود جدید</h2>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={submitHandler}
      >
        {() => (
          <Form className="w-full">
            <LocationUpdater />
            <TextField
              name="title"
              placeholder=""
              label="نام نود"
              icon={<NodeIcon className="w-4 h-4 opacity-75" />}
            />
            <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
              <div className="w-full flex items-center justify-between gap-2">
                <TextField
                  name="longitude"
                  placeholder=""
                  label="طول جغرافیایی"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                />
                <TextField
                  name="latitude"
                  placeholder=""
                  label="عرض جغرافیایی"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                />
              </div>
              <ToggleSwitch name="isActive" label="وضعیت فعالیت" />
            </div>
            <TextArea
              placeholder="متن خود را اینجا بنویسید ..."
              className="mt-4"
              label="آدرس"
              name="address"
              icon={<Address />}
            />
            <FlexContainer className="justify-end mt-12 pb-12">
              <Button className="mt-2 width-auto" type="submit">
                {isLoading ? <Loading size="sm" /> : "تایید و ایجاد نود"}
              </Button>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default NewForm;
