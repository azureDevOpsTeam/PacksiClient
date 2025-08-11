import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import ToggleSwitch from "../../../../components/tools/toggle-switch/ToggleSwitch";
import { ReactComponent as ZoneIcon } from "../../../../components/icons/svg/zoneIcon.svg";
import { ReactComponent as NodeIcon } from "../../../../components/icons/svg/nodeIcon.svg";
import { ReactComponent as MicrohubIcon } from "../../../../components/icons/svg/microhubIcone.svg";
import { ReactComponent as TickIcon } from "../../../../components/icons/svg/tickIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../../components/icons/svg/deleteIcon.svg";
import {ReactComponent as RedDeleteIcon} from "../../../../components/icons/svg/redDeleteIcon.svg";
import { ReactComponent as EditIcon } from "../../../../components/icons/svg/editIcon.svg";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import {ReactComponent as UserIcon} from "../../../../components/icons/svg/user.svg";
import { ToastType } from "../../../../models/enums/ToastType";
import { ReactComponent as RoleIcon } from "../../../../components/icons/svg/roleIcon.svg";
import { InformationValidationSchema } from "../../../../components/validationSchema/nodeValidation/NodeValidation";
import { useReactMutation ,useReactQuery} from "../../../../components/hooks/query/useReactQuery";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import {
  NodeEdit,
  NodeDelete,
  GetUser,
  UpdateUser,
  GetRoles,
} from "../../../../setting/ApiUrl";
import Modal from "../../../../components/tools/modal/madal";
import useStore from "../../../../store/zustand/store";
import Loading from "../../../../components/tools/loading/Loading";

function InformationForm() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const { setToggledFalse } = useStore();
  const { SelectedItem } = useStore();
  const refetch = useStore((state) => state.refetch);

  const apiDetails = {
    url: GetUser,
    method: HttpMethod.POST,
    body: SelectedItem?.length ? { id: SelectedItem[0]?.userId || "" } : {},
  };
  
  const RoleApiDetails = {
    url: GetRoles,
    method: HttpMethod.GET,
  };
    const {
      data: GetRolesData,
    } = useReactQuery(RoleApiDetails);
  const { data:GetUserData, isLoading, isError, error} =
    useReactQuery(apiDetails);
  

  const RoleDropDown = GetRolesData?.data?.length
    ? GetRolesData.data.map((item: any) => ({
        value: item?.roleId,
        label: item?.persianTitle,
      }))
    : [];


  const saveApiDetails = { url: UpdateUser, method: HttpMethod.PUT };
  const {
    mutate: editMutate,
    isLoading: editLoading,
    data: savedata,
  } = useReactMutation(saveApiDetails);
  const initialValues = {
    id: SelectedItem?.length ? SelectedItem[0]?.userId || "" : "",  
    password:'',
    firstName: GetUserData?.data?.firstName || "",
    lastName: GetUserData?.data?.lastName || "",
    phoneNumber: GetUserData?.data?.phoneNumber || "",
    isActive: GetUserData?.data?.isActive || "",
    email: GetUserData?.data?.email || "",
    roleName: GetUserData?.data?.roleName || "",
    roleIds: [GetUserData?.data?.roleName],
    nationalCode: GetUserData?.data?.nationalCode || "",
    userName:GetUserData?.data?.userName  || ""
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
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      isActive: values.isActive,
      email: values.email,
      roleIds: [values.roleIds],
      nationalCode: values.nationalCode,
      userName: values.userName,
      password: values.password,

      // می‌توانید تغییرات دلخواه خود را اینجا اعمال کنید
    };    editMutate(formattedValues);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

const confirmDelete = () => {
  if (SelectedItem?.id) {
    const id = SelectedItem.id;
    deleteMutate({ id });
    setShowDeleteModal(false);
  } else {
    CreateToast(ToastType.ERROR, "آیتم انتخابی یا شناسه آن وجود ندارد");
  }
};



     useEffect(() => {
         if (deleteLoading) {
              return;
            }
         if (deletedata?.status === 200) {
              CreateToast(ToastType.SUCCESS, "دیتا با موفقیت حذف شد");
              refetch?.();
              setEditable(false);
              setToggledFalse();
          } else if (
              deletedata?.status !== 200 &&
              deletedata?.status !== undefined
            ) {
              CreateToast(ToastType.ERROR, "خطا در حذف رکورد");
            }
          }, [deleteLoading, deleteError, deletedata]);


  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

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
      <Formik
        validateOnBlur={true}
        validateOnChange={true}
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={submitHandler}
      >
        {() => (
          <Form className="w-full gap-[8px] flex flex-col">
            <div className="absolute bg-white pr-1 left-[16px] flex items-center gap-2 top-[16px] h-8">
              <DeleteIcon className="cursor-pointer" onClick={handleDelete} />
              {editable ? (
                <button
                  type="submit"
                  className="bg-[#31C48D] flex items-center gap-1 text-white rounded-lg px-3 h-[30px]"
                >
                  <TickIcon
                    className={`cursor-pointer ${editLoading ? "hidden" : ""}`}
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
            <div className="w-full flex-wrap flex items-center gap-4 justify-center">
              <div className="min-w-[200px] flex-1 ">
                <TextField
                  className="border border-gray-300"
                  name="firstName"
                  placeholder="نام"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>

              <div className="min-w-[200px] flex-1">
                <TextField
                  className="border border-gray-300"
                  name="lastName"
                  placeholder="نام خانوادگی"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>
            </div>
            <div className="w-full flex-wrap flex items-center gap-4 justify-center">
              <div className="min-w-[200px] flex-1 ">
                <TextField
                  className="border border-gray-300"
                  name="phoneNumber"
                  placeholder="شماره تلفن"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>
              <div className="min-w-[200px] flex-1">
                <ToggleSwitch
                  className="border border-gray-300 rounded-full"
                  name="isActive"
                  readonly={!editable}
                />
              </div>
            </div>
            <div className="w-full flex-wrap flex items-center gap-4 justify-center">
              <div className="min-w-[200px] flex-1 ">
                <TextField
                  className="border border-gray-300"
                  name="email"
                  placeholder="ایمیل"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>

              <div className="min-w-[200px] flex-1">
                <AutoComplete
                  className="border border-gray-300 rounded-[13px]"
                  name="roleIds"
                  placeholder="نقش"
                  options={RoleDropDown}
                  readonly={!editable}
                  icon={<RoleIcon className="w-4 h-4 opacity-75" />}
                />
                {/* <TextField
                    className="border border-gray-300"
                    name="roleName"
                    placeholder="نقش"
                    icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                    readonly={!editable}
                  /> */}
              </div>
            </div>
            <div className="w-full flex-wrap flex items-center gap-4 justify-center">
              <div className="min-w-[200px] flex-1">
                <TextField
                  className="border border-gray-300"
                  name="nationalCode"
                  placeholder="کد ملی"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>
              <div className="min-w-[200px] flex-1">
                <TextField
                  className="border border-gray-300"
                  name="password"
                  placeholder="پسورد"
                  icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                  readonly={!editable}
                />
              </div>
            </div>
            <div className="min-w-[200px] flex-1">
              <TextField
                className="border border-gray-300"
                name="userName"
                placeholder="نام کاربری"
                icon={<UserIcon className="w-4 h-4 opacity-75" />}
                readonly={!editable}
              />
            </div>
          </Form>
        )}
      </Formik>

      {showDeleteModal && (
        <Modal
          title="حذف نود"
          titleIcon={<RedDeleteIcon />}
          message="
          با حذف کردن نود همه اطلاعات آن حذف خواهد شد.
آیا طمینان از حذف نود دارید؟ 
          "
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          confirmText="حذف کردن"
          cancelText="منصرف شدم"
        />
      )}
    </div>
  );
}

export default InformationForm;
