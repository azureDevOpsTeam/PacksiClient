import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { ReactComponent as CallIcon } from "../../../../components/icons/svg/callIcon.svg";
import { ReactComponent as UserIcon } from "../../../../components/icons/svg/user.svg";
import { ReactComponent as DeleteIcon } from "../../../../components/icons/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../../../../components/icons/svg/editIcon.svg";
import { ReactComponent as StarIcon } from "../../../../components/icons/svg/starIcon.svg";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import Loading from "../../../../components/tools/loading/Loading";
import { ToastType } from "../../../../models/enums/ToastType";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ReactComponent as AddPersonnelIcon } from "../../../../components/icons/svg/addPersonnelRedIcon.svg";
import { ReactComponent as TickIcon } from "../../../../components/icons/svg/tickIcon.svg";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import {
  GetNodeData,
  GetUsersDropDown,
  UpdateUser,
  UpdateNodeData,
} from "../../../../setting/ApiUrl";
import useStore from "../../../../store/zustand/store";
import TextField from "../../../../components/tools/textField/TextField";
import {
  useReactQuery,
  useReactMutation,
} from "../../../../components/hooks/query/useReactQuery";

function PersonnelForm() {
  const [editable, setEditable] = useState<boolean>(false);
  const { setToggledFalse } = useStore();
  const refetch = useStore((state) => state.refetch);
  const [users, setUsers] = useState<any[]>([]);
  const { SelectedItem } = useStore();

  const saveApiDetails = { url: UpdateNodeData, method: HttpMethod.PUT };
  const {
    mutate: editMutate,
    isLoading: editLoading,
    data: savedata,
  } = useReactMutation(saveApiDetails);

  const NodeDataApiDetails = {
    url: GetNodeData,
    method: HttpMethod.POST,
    body: { nodeDataId: SelectedItem?.id },
  };

  const UserDropDown = {
    url: GetUsersDropDown,
    method: HttpMethod.POST,
    body: { listByRole: 0 },
  };

  const { data: UserdropDownData } = useReactQuery(UserDropDown);
  const { data: NodeData } = useReactQuery(NodeDataApiDetails);

  const NodeDataUsers: any[] = NodeData?.data?.nodeDataPerson || [];

  // مقداردهی اولیه state users با داده‌های دریافتی از API
  useEffect(() => {
    if (NodeDataUsers?.length > 0) {
      setUsers(NodeDataUsers);
    }
  }, [NodeDataUsers]);

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

  const allUsers = users.length > 0 ? users : NodeDataUsers;
  const initialValues = allUsers.reduce((acc, user) => {
    const phoneNumber = UserdropDownData?.data
      ? UserdropDownData.data.find(
          (userData: any) => userData.value === user.userId
        )?.phoneNumber || ""
      : "";
    acc[`user-${user.userId}`] = user.userId;
    acc[`phoneNumber-${user.userId}`] = phoneNumber;
    acc[`isResponsible-${user.userId}`] = user.isResponsible || false;
    return acc;
  }, {} as Record<string, any>);

  const submitHandler = (values: any) => {
    const formatedData = {
      id: NodeData?.data?.id,
      nodeId: NodeData?.data?.nodeId,
      isActive: NodeData?.data?.isActive,
      people: users,
      nodeTypeDetails: NodeData?.data?.nodeDataDetails,
    };

    editMutate(formatedData);
  };


  const handleSupervisorChange = (userId: number | string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        isResponsible: user.userId === userId,
      }))
    );
  };
  
  const addNewUser = () => {
    const newUser = {
      userId: `new-${Date.now()}`, 
      isResponsible: false,
    };
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={submitHandler}
      >
        {({ setFieldValue, values }) => (
          <Form className="w-full gap-[16px] flex flex-col">
            <div className="absolute left-[16px] flex items-center gap-2 top-[16px] h-8">
              <DeleteIcon className="cursor-pointer" />
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
            <div className="w-full flex-wrap flex items-center justify-center gap-4">
              {users.map((user) => {
                const fieldName = `user-${user.userId}`;
                const fieldPhoneNumber = `phoneNumber-${user.userId}`;
                return (
                  <div key={user.userId} className="flex flex-wrap gap-4">
                    {/* AutoComplete */}
                    <div className="relative min-w-[270px] flex-1">
                      <AutoComplete
                        inputClassName="rounded-[13px]"
                        className="border border-gray-300 rounded-[13px]"
                        name={fieldName}
                        value={values[fieldName] || ""}
                        options={UserdropDownData?.data || []}
                        placeholder={`انتخاب پرسنل برای ${
                          user.name || "کاربر"
                        }`}
                        icon={<UserIcon className="w-4 h-4 opacity-75" />}
                        readonly={!editable}
                        onChange={(selectedValue: any) => {
                          setFieldValue(fieldName, selectedValue.value);
                          if (UserdropDownData?.data) {
                            const selectedUser = UserdropDownData.data?.find(
                              (userData: any) =>
                                userData.label === selectedValue.label
                            );
                            if (selectedUser) {
                              setFieldValue(
                                `phoneNumber-${user.userId}`,
                                selectedUser.phoneNumber || ""
                              );
                              if (String(user.userId).startsWith("new-")) {
                                setUsers((prevUsers) =>
                                  prevUsers.map((u) => {
                                    if (u.userId === user.userId) {
                                      return {
                                        ...u,
                                        userId: selectedUser.value,
                                      };
                                    }
                                    return u;
                                  })
                                );
                              }
                              const previousResponsibleUser = users.find(
                                (user) => user.isResponsible === true
                              );
                              if (
                                previousResponsibleUser &&
                                selectedUser.value !==
                                  previousResponsibleUser.userId
                              ) {
                                setFieldValue(
                                  `isResponsible-${previousResponsibleUser.userId}`,
                                  false
                                );
                              }
                              setFieldValue(
                                `isResponsible-${selectedUser.value}`,
                                true
                              );
                            }
                          }
                        }}
                      />

                      <div
                        onClick={() => {
                          if (editable) {
                            handleSupervisorChange(user.userId);
                            setFieldValue(`isResponsible-${user.userId}`, true);
                          }
                        }}
                        className="absolute top-3 left-3 h-6 px-3 py-1 rounded-lg border justify-center items-center gap-1 inline-flex cursor-pointer"
                        style={{
                          backgroundColor: "#FDF6B2",
                          borderColor: "#8e4b1090",
                        }}
                      >
                        <div
                          className="text-right text-xs font-bold leading-none"
                          style={{ color: "#8e4b10db" }}
                        >
                          {user.isResponsible ? (
                            <span className="flex items-center">
                              <StarIcon /> سوپروایزر
                            </span>
                          ) : (
                            "سوپروایزر"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="min-w-[120px] flex-1">
                      <TextField
                        name={fieldPhoneNumber}
                        placeholder="شماره تماس"
                        innerClassName="bg-gray-200 rounded-[13px]"
                        icon={<CallIcon className="w-4 h-4 opacity-75" />}
                        readonly={true}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {editable && (
              <button
                type="button"
                onClick={addNewUser}
                className="flex w-full h-[46px] items-center justify-center rounded-[12px] border border-[#FF7959] mt-[10px] mx-[1px]"
              >
                <AddPersonnelIcon />
                <span className="text-[#FF7959] text-sm font-bold">
                  اضافه کردن پرسنل
                </span>
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PersonnelForm;
