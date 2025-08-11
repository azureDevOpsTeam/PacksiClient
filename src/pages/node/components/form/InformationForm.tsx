import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import ToggleSwitch from "../../../../components/tools/toggle-switch/ToggleSwitch";
import { ReactComponent as ZoneIcon } from "../../../../components/icons/svg/zoneIcon.svg";
import { ReactComponent as NodeIcon } from "../../../../components/icons/svg/nodeIcon.svg";
import { ReactComponent as MicrohubIcon } from "../../../../components/icons/svg/microhubIcone.svg";
import { ReactComponent as TickIcon } from "../../../../components/icons/svg/tickIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../../components/icons/svg/deleteIcon.svg";
import { ReactComponent as RedDeleteIcon } from "../../../../components/icons/svg/redDeleteIcon.svg";
import { ReactComponent as EditIcon } from "../../../../components/icons/svg/editIcon.svg";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import { InformationValidationSchema } from "../../../../components/validationSchema/nodeValidation/NodeValidation";
import {
  useReactMutation,
  useReactQuery,
} from "../../../../components/hooks/query/useReactQuery";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { NodeEdit, NodeDelete, GetNode } from "../../../../setting/ApiUrl";
import Modal from "../../../../components/tools/modal/madal";
import useStore from "../../../../store/zustand/store";
import Loading from "../../../../components/tools/loading/Loading";

function InformationForm() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const { setToggledFalse } = useStore();
  const { SelectedItem } = useStore();
  const refetch = useStore((state) => state.refetch);

  const GetNodeData = {
    url: GetNode,
    method: HttpMethod.POST,
    body: {
        id: SelectedItem?.id,
    },
  };

  const {
    data: NodeData,
    isLoading,
    isError,
    error,
  } = useReactQuery(GetNodeData);

  const saveApiDetails = { url: NodeEdit, method: HttpMethod.PUT };
  const {
    mutate: editMutate,
    isLoading: editLoading,
    data: savedata,
  } = useReactMutation(saveApiDetails);

  const deleteApiDetails = { url: NodeDelete, method: HttpMethod.DELETE };
  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    data: deletedata,
    error: deleteError,
  } = useReactMutation(deleteApiDetails);

  const submitHandler = (values: any) => {
    editMutate(values);
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
    } else if (deletedata?.status !== 200 && deletedata?.status !== undefined) {
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
  // useEffect(() => {
  //   if (deletedata?.status === 200) {
  //     CreateToast(ToastType.SUCCESS, "دیتا با موفقیت حذف شد");
  //     refetch?.();
  //     setEditable(false);
  //     setToggledFalse();
  //   } else if (deletedata?.status !== 200 && deletedata?.status !== undefined) {
  //     setEditable(false);
  //     CreateToast(ToastType.ERROR, "خطا در حذف رکورد");
  //   }
  // }, [deletedata?.status]);

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
          validationSchema={InformationValidationSchema}
          enableReinitialize={true}
          initialValues={{
            name: NodeData?.data?.title || "",
            isActive: NodeData?.data?.isActive || true,
            address: NodeData?.data?.address || "",
            latitude: NodeData?.data?.latitude || "",
            longitude: NodeData?.data?.longitude || "",
            id: NodeData?.data?.id || "",
          }}
          onSubmit={submitHandler}
        >
          {() => (
            <Form className="w-full gap-[8px] flex flex-col pt-2">
              <div className="absolute bg-white pr-1 left-[16px] flex items-center gap-2 top-[16px] h-8">
                <DeleteIcon className="cursor-pointer" 
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
              <div className="w-full flex-wrap flex items-center gap-4 justify-center">
                <div className="min-w-[200px] flex-1 ">
                  <TextField
                    className="border border-gray-300"
                    name="name"
                    placeholder="نام نود"
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
              {/* <div className="w-full flex-wrap flex items-center gap-4 justify-center">
                <div className="min-w-[200px] flex-1">
                  <TextField
                    className="border border-gray-300"
                    name="zone"
                    placeholder="زون تحت پوشش"
                    icon={<ZoneIcon className="w-4 h-4 opacity-75" />}
                    readonly={!editable}
                  />
                </div>
                 <div className="relative min-w-[200px] flex-1"> 
                  <TextField
                    className="border border-gray-300"
                    name="microhubName"
                    placeholder="نام میکروهاب"
                    icon={<MicrohubIcon className="w-4 h-4 opacity-75" />}
                    readonly={!editable}
                  /> 

                  <div
                    className="min-w-[70px] absolute top-3 left-3 h-6 px-3 py-1 rounded-lg border justify-center items-center gap-1 inline-flex"
                    style={{
                      backgroundColor: "#FDF6B2",
                      borderColor: "#8e4b1090",
                    }}
                  >
                    <div
                      className="text-right text-xs font-bold leading-none"
                      style={{ color: "#8e4b10db" }}
                    >
                      ثابت
                    </div>
                  </div> 
                </div>
              </div> */}
            </Form>
          )}
        </Formik>
      )}
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
