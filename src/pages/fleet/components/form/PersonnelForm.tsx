import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import useStore from "../../../../store/zustand/store";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import TextField from "../../../../components/tools/textField/TextField";
import { ReactComponent as CallIcon } from "../../../../components/icons/svg/callIcon.svg";
import { ReactComponent as UserIcon } from "../../../../components/icons/svg/user.svg";
import { ReactComponent as TraficJamIcon } from "../../../../components/icons/svg/traffic-jam.svg";
import { ReactComponent as DeleteIcon } from "../../../../components/icons/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../../../../components/icons/svg/editIcon.svg";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import Loading from "../../../../components/tools/loading/Loading";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import { ReactComponent as TickIcon } from "../../../../components/icons/svg/tickIcon.svg";
import {
  FleetEdit,
  FleetDelete,
  GetFleet,
  ZoneDropDown,
  UserDropDown,
} from "../../../../setting/ApiUrl";

import {
  useReactMutation,
  useReactQuery,
} from "../../../../components/hooks/query/useReactQuery";

function PersonnelForm() {
  const { SelectedItem } = useStore();
  const refetch = useStore((state) => state.refetch);
  const [editable, setEditable] = useState(false);
  const { setToggledFalse } = useStore();

  ////UserDropDownData/////////
  const userApiDetail = {
    url: UserDropDown,
    method: HttpMethod.GET,
  };

  const { data: UserDropDownData } = useReactQuery(userApiDetail);
  const userDropDown = UserDropDownData?.data
    ? UserDropDownData.data?.map((item: any) => ({
        label: item.fullName,
        value: item.id,
        phoneNumber: item.phoneNumber,
      }))
    : []; 
  /////sendSelectedFleetIDToApi///////
  
  const GetFleetData = {
    url: GetFleet,
    method: HttpMethod.POST,
    body: { id: SelectedItem?.id },
  };

  const {
    data: FleetData,
    isLoading: FleetLoading,
    isError: FleetIsError,
    error,
  } = useReactQuery(GetFleetData);

  const submitHandler = (values: any) => {
    editMutate(values);
  };

    const initialValues = {
      zoneId: FleetData?.data?.user?.id || 3,
      phoneNumber: FleetData?.data?.user?.phoneNumber,
      username: FleetData?.data?.user?.userName || "",
    };
  /////DeleteRecord///////
  const deleteApiDetails = { url: FleetDelete, method: HttpMethod.DELETE };
  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    data: deletedata,
    error: deleteError,
  } = useReactMutation(deleteApiDetails);

  const handleDelete = () => {
    if (SelectedItem?.id) {
      const confirmDelete = window.confirm(
        "آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟"
      );
      if (confirmDelete) {
        const id = SelectedItem.id;
     
        deleteMutate({ id });
      }
    } else {
      CreateToast(ToastType.ERROR, "آیتم انتخابی یا شناسه آن وجود ندارد");
    }
  };

  useEffect(() => {
    if (deletedata?.status === 200) {
      CreateToast(ToastType.SUCCESS, "دیتا با موفقیت حذف شد");
      refetch?.();
      setEditable(false);
      setToggledFalse();
    } else if (deletedata?.status !== 200 && deletedata?.status !== undefined) {
      setEditable(false);
      CreateToast(ToastType.ERROR, "خطا در حذف رکورد");
    }
  }, [deletedata?.status]);

  /////EditRecord///////
  const saveApiDetails = { url: FleetEdit, method: HttpMethod.PUT };
  const {
    mutate: editMutate,
    isLoading: editLoading,
    data: savedata,
  } = useReactMutation(saveApiDetails);

  useEffect(() => {
    if (savedata?.status === 200) {
      CreateToast(ToastType.SUCCESS, "دیتا با موفقیت ویرایش شد");
      refetch?.();
      setEditable(false);
      setToggledFalse();
    } else if (savedata?.status !== 200 && savedata?.status !== undefined) {
      setEditable(false);
      CreateToast(ToastType.ERROR, "خطا در ویرایش رکورد");
    }
  }, [savedata?.status]);
useEffect(() => {
  setEditable(false);
}, [SelectedItem]);

  useEffect(() => {
    if (deleteError) {
      CreateToast(ToastType.ERROR, "خطا در حذف رکورد");
    }
  }, [deleteError]);

  return (
    <div>
      {SelectedItem && (
        <Formik
          validateOnBlur={true}
          validateOnChange={true}
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={submitHandler}
        >
          {({ setFieldValue, values }) => (
            <Form className="w-full gap-[16px] flex flex-col">
              <div
                className={
                  " absolute left-[16px] flex items-center gap-2 top-[16px] h-8 "
                }
              >
                <DeleteIcon
                  className={"cursor-pointer"}
                  // onClick={handleDelete}
                />
                {editable ? (
                  <button
                    type="submit"
                    className="bg-[#31C48D] flex items-center gap-1 text-white rounded-lg px-3 h-[30px]"
                  >
                    <TickIcon
                      className={`cursor-pointer ${
                        editLoading ? "hidden" : ""
                      }`}
                    />
                    <span className="text-[12px] font-semibold leading-[16px]">
                      {editLoading ? <Loading size="sm" /> : "ذخیره اطلاعات"}
                    </span>
                  </button>
                ) : (
                  <EditIcon
                    className="cursor-pointer"
                    onClick={() => setEditable(true)}
                  />
                )}
              </div>
              <div
                className={
                  "w-full flex-wrap flex items-center gap-4 justify-center"
                }
              >
                <div className={"min-w-[200px] flex-1"}>
                  <AutoComplete
                    inputClassName={"rounded-[13px]"}
                    className={"border border-gray-300 rounded-[13px]"}
                    name="zoneId"
                    options={userDropDown}
                    value={values.zoneId}
                    placeholder="پرسنل"
                    icon={<TraficJamIcon className={"w-4 h-4 opacity-65"} />}
                    readonly={!editable}
                    onChange={(selectedUser: any) => {
                      if (Array.isArray(userDropDown) && selectedUser) {
                        const selectedUserData = userDropDown?.find(
                          (user) => user.value === selectedUser.value
                        );
                        setFieldValue("zoneId", selectedUser.value);
                        setFieldValue(
                          "phoneNumber",
                          selectedUserData?.phoneNumber || ""
                        );
                      } else {
                        console.error(
                          "userDropDown is undefined or not an array, or selectedUser is undefined"
                        );
                      }
                    }}
                  />
                </div>
                <div className={"min-w-[200px] flex-1"}>
                  <TextField
                    className={"border border-gray-300"}
                    value={values?.phoneNumber}
                    name="phoneNumber"
                    placeholder="شماره تلفن"
                    icon={<CallIcon className={"w-4 h-4 opacity-65"} />}
                    readonly={!editable}
                  />
                </div>
              </div>
              <div
                className={
                  "w-full flex-wrap flex items-center gap-4 justify-center border rounded-lg p-2 border-gray-300"
                }
              >
                <div
                  className={
                    "flex-1 flex items-center justify-between flex-wrap gap-2"
                  }
                >
                  <div
                    className={
                      "flex flex-col items-center justify-center gap-[8px]"
                    }
                  >
                    <div
                      className={
                        "flex items-center justify-start self-start px-1 gap-[6px]"
                      }
                    >
                      <div
                        className={
                          "w-10 h-10 rounded-full flex items-center text-white font-bold justify-center bg-[#FF7959]"
                        }
                      >
                        N
                      </div>
                      <div
                        className={
                          "flex flex-col items-center gap-[5px] justify-center"
                        }
                      >
                        <div className="text-right self-start text-[#111928] text-sm font-bold leading-[21px]">
                          {FleetData?.data?.user?.fullName}
                        </div>
                        <div className="text-right self-start text-[#FF7959] text-sm font-bold leading-[14px]">
                          ناوگان
                        </div>
                      </div>
                    </div>
                    <div className={"self-start "}>
                      <div className={"min-w-[200px] "}>
                        <TextField
                          className={"border border-gray-300"}
                          name="username"
                          placeholder="نام کاربری"
                          icon={<UserIcon className={"w-4 h-4 opacity-75"} />}
                          readonly={!editable}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center self-start justify-between gap-[8px]">
                    <div
                      className={`min-w-[70px] h-6 px-3 py-1 rounded-lg border justify-center items-center gap-1 inline-flex`}
                      style={{
                        backgroundColor: "#FDF6B2",
                        borderColor: "#8e4b1090",
                      }}
                    >
                      <div
                        className="text-right text-xs font-bold leading-none"
                        style={{ color: "#8e4b10" }}
                      >
                        {FleetData?.data?.fleetType?.title}
                      </div>
                    </div>
                    <div
                      className={`min-w-[70px] h-6 px-3 py-1 rounded-lg border justify-center items-center gap-1 inline-flex`}
                      style={{
                        backgroundColor: "#DEF7EC",
                        borderColor: "#046c4e90",
                      }}
                    >
                      <div
                        className="text-right text-xs font-bold leading-none"
                        style={{ color: "#046c4e" }}
                      >
                        {FleetData?.data?.isActive ? "فعال" : "غیرفعال"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*<FlexContainer className="justify-end">*/}
              {/*    <Button className="mt-2 width-auto" type="submit">*/}
              {/*        {isLoading ? <Loading size="sm" /> : "تایید و ایجاد ناوگان"}{" "}*/}
              {/*    </Button>*/}
              {/*</FlexContainer>*/}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default PersonnelForm;
