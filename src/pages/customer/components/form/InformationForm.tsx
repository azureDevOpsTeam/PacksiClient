import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import { ReactComponent as NodeIcon } from "../../../../components/icons/svg/nodeIcon.svg";
import { ReactComponent as TickIcon } from "../../../../components/icons/svg/tickIcon.svg";
import BlockIconSvg from "../../../../components/icons/components/BlockIconSvg";
import { ReactComponent as EditIcon } from "../../../../components/icons/svg/editIcon.svg";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import {ReactComponent as UserIcon} from "../../../../components/icons/svg/user.svg";
import { ToastType } from "../../../../models/enums/ToastType";
import { useReactMutation ,useReactQuery} from "../../../../components/hooks/query/useReactQuery";

import { HttpMethod } from "../../../../models/enums/HttpMethod";
import {
  NodeDelete,
  UpdateCustomer,
  GetCustomer,
  BlockOrUnblockCustomer,
  GetRoles,
} from "../../../../setting/ApiUrl";
import Modal from "../../../../components/tools/modal/madal";
import useStore from "../../../../store/zustand/store";
import Loading from "../../../../components/tools/loading/Loading";

function InformationForm() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const { setToggledFalse } = useStore();
const SelectedItem = useStore((state) => state.SelectedItem);
 const [isBlocked, setIsBlocked] = useState(false);

 const handleClick = () => {
   setIsBlocked(true); // یا toggle اگر می‌خوای دوباره قابل تغییر باشه
 };


  const refetch = useStore((state) => state.refetch);

    const blockCustomerApiDetail = { url: BlockOrUnblockCustomer, method: HttpMethod.PUT };
    const {
      mutate: Mutate,
      isLoading: BlockLoading,
      data: data,
    } = useReactMutation(blockCustomerApiDetail);

const apiDetails = {
  url: GetCustomer,
  method: HttpMethod.POST,
  body: SelectedItem ? { customerId: SelectedItem } : {}, 
};
  
  const RoleApiDetails = {
    url: GetRoles,
    method: HttpMethod.GET,
  };
    const {
      data: GetRolesData,
    } = useReactQuery(RoleApiDetails);
  const { data:GetCustomerData, isLoading, isError,refetch:CustomerRefetch} =
    useReactQuery(apiDetails);
  const saveApiDetails = { url: UpdateCustomer, method: HttpMethod.PUT };
  const {

    mutate: editMutate,
    isLoading: editLoading,
    data: savedata,
  } = useReactMutation(saveApiDetails);
  const initialValues = {
    id: GetCustomerData?.data?.id,
    password: "",
    name: GetCustomerData?.data?.name || "",
    brandName: GetCustomerData?.data?.brandName || "",
    landlineNumber: GetCustomerData?.data?.landlineNumber || "",
    economicCode: GetCustomerData?.data?.economicCode || "",
    email: GetCustomerData?.data?.email || "",
    ceoName: GetCustomerData?.data?.ceoName || "",
    registrationNumber: GetCustomerData?.data?.registrationNumber,
    nationalID: GetCustomerData?.data?.nationalID || "",
    contactNumber: GetCustomerData?.data?.contactNumber || "",
    postalCode: GetCustomerData?.data?.postalCode || "",
    address: GetCustomerData?.data?.address,
  };
  const deleteApiDetails = { url: NodeDelete, method: HttpMethod.DELETE };
  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    data: deletedata,
    error: deleteError,
  } = useReactMutation(deleteApiDetails);

const submitHandler = (values: any) => {
  const formattedValues = {
    id: GetCustomerData?.data?.id,
    name: values.name,
    ceoName: values.ceoName,
    brandName: values.brandName,
    economicCode: values.economicCode,
    registrationNumber: values.registrationNumber,
    address: values.address,
    contactNumber: values.contactNumber,
    email: values.email,
    nationalID: values.nationalID,
    landlineNumber: values.landlineNumber,
    postalCode: values.postalCode,
  };

  editMutate(formattedValues);
};

 const handleErrorModalClick=()=>{
Mutate({
  "customerId": GetCustomerData?.data?.id
})
  }
  
  useEffect(() => {
    const result = data?.data;
    if (!result) return;

    setIsBlocked(false);

    if (result.isSuccess) {
      CreateToast(ToastType.SUCCESS, result.message);
      CustomerRefetch?.();
      // setToggledFalse();
    } else {
      CreateToast(ToastType.ERROR, result.message);
    }
  }, [data]);
  useEffect(() => {
    setEditable(false);
  }, [SelectedItem]);

  useEffect(() => {
    const result = savedata?.data;
    if (!result) return;

    setEditable(false);

    if (result.isSuccess) {
      CreateToast(ToastType.SUCCESS, result.message);
      refetch?.();
      setToggledFalse();
    } else {
      CreateToast(ToastType.ERROR, result.message);
    }
  }, [savedata]);



  return (
    <div>
      <Formik
        validateOnBlur={true}
        validateOnChange={true}
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={submitHandler}
      >
        {() => (
          <Form className="w-full gap-[8px] flex flex-col">
            <div className="absolute bg-white pr-2 pl-2 left-[16px] top-[16px] h-8 flex items-center gap-2 rounded-md ">
              <button type="button" onClick={handleClick}>
                <BlockIconSvg
                  strokeColor={
                    GetCustomerData?.data?.isActive ? "#111928" : "red"
                  }
                />
              </button>

              {editable ? (
                <button
                  type="submit"
                  className="bg-[#31C48D] flex items-center gap-1 text-white rounded-lg px-3 h-[30px]"
                >
                  {!editLoading && <TickIcon className="cursor-pointer" />}
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

            <div className="w-full flex-wrap flex items-center gap-4 justify-center">
              <div className="min-w-[200px] flex-1 ">
                <TextField
                  className="border border-gray-300"
                  name="name"
                  placeholder="نام شرکت"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>

              <div className="min-w-[200px] flex-1">
                <TextField
                  className="border border-gray-300"
                  name="brandName"
                  placeholder="نام برند"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>
            </div>
            <div className="w-full flex-wrap flex items-center gap-4 justify-center">
              <div className="min-w-[200px] flex-1 ">
                <TextField
                  className="border border-gray-300"
                  name="landlineNumber"
                  placeholder="شماره ثابت"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>
              <div className="min-w-[200px] flex-1">
                <TextField
                  className="border border-gray-300"
                  name="email"
                  placeholder="ایمیل"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>
            </div>
            <div className="w-full flex-wrap flex items-center gap-4 justify-center">
              <div className="min-w-[200px] flex-1 ">
                <TextField
                  className="border border-gray-300"
                  name="registrationNumber"
                  placeholder="شماره ثبت"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={true}
                />
              </div>
              <div className="min-w-[200px] flex-1 ">
                <TextField
                  className="border border-gray-300"
                  name="economicCode"
                  placeholder="شماره اقتصادی"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={true}
                />
              </div>
            </div>
            <div className="w-full flex-wrap flex items-center gap-4 justify-center">
              <div className="min-w-[200px] flex-1">
                <TextField
                  className="border border-gray-300"
                  name="ceoName"
                  placeholder="مدیر عامل"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>
              <div className="min-w-[200px] flex-1">
                <TextField
                  className="border border-gray-300"
                  name="contactNumber"
                  placeholder="شماره موبایل"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>
            </div>
            <div className="w-full flex-wrap flex items-center gap-4 justify-center">
              <div className="min-w-[200px] flex-1">
                <TextField
                  className="border border-gray-300"
                  name="nationalID"
                  placeholder="کد ملی"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>
              <div className="min-w-[200px] flex-1">
                <TextField
                  className="border border-gray-300"
                  name="postalCode"
                  placeholder="کد پستی"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>
            </div>
            <div className="min-w-[200px] flex-1">
              <TextField
                className="border border-gray-300"
                name="address"
                placeholder="آدرس شرکت"
                icon={<UserIcon className="w-4 h-4 opacity-75" />}
                readonly={!editable}
              />
            </div>
          </Form>
        )}
      </Formik>
      {isBlocked && (
        <Modal
          titleIcon={<BlockIconSvg />}
          widthClassName="w-[500px]"
          cancelButtonTextColor={
            GetCustomerData?.data?.isActive
              ? "text-[#C81E1E]"
              : "text-[#046C4E]"
          }
          confirmButtonColor={
            GetCustomerData?.data?.isActive ? "bg-[#C81E1E]" : "bg-[#046C4E]"
          }
          cancelButtonColor={
            GetCustomerData?.data?.isActive ? "bg-[#FDE8E8]" : "bg-[#DEF7EC]"
          }
          onConfirm={handleErrorModalClick}
          title={
            GetCustomerData?.data?.isActive
              ? "با مسدودسازی مشتری، همه‌ی قراردادها غیر فعال می‌شوند.آیا از مسدود کردن این مشتری اطمینان دارید؟"
              : "با رفع مسدودی، دسترسی مشتری به حساب کاربری آزاد می‌شود.آیا از آزاد  کردن این مشتری اطمینان دارید؟"
          }
          onCancel={() => setIsBlocked(false)}
          confirmText="بله، مطمئن هستم"
          cancelText="بیخیال"
          // message={savedata?.data?.message}
        />
      )}
      {/* {isBlocked && GetCustomerData?.data?.isActive()} */}
    </div>
  );
}

export default InformationForm;
