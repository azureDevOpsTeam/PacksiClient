import React,{useState,useEffect} from 'react';
import {Form, Formik} from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import {ReactComponent as NodeIcon} from "../../../../components/icons/svg/nodeIcon.svg";
import {ReactComponent as DeleteIcon} from "../../../../components/icons/svg/deleteIcon.svg";
import {ReactComponent as EditIcon} from "../../../../components/icons/svg/editIcon.svg";
import { ReactComponent as TickIcon } from "../../../../components/icons/svg/tickIcon.svg";
import { ReactComponent as Address } from "../../../../components/icons/svg/elements.svg";
import TextArea from "../../../../components/tools/textArea/TextArea";
import Loading from "../../../../components/tools/loading/Loading";
import { ReactComponent as RedDeleteIcon } from "../../../../components/icons/svg/redDeleteIcon.svg";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import Modal from "../../../../components/tools/modal/madal";

import {useReactMutation} from "../../../../components/hooks/query/useReactQuery";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { NodeEdit, NodeDelete } from "../../../../setting/ApiUrl";
import useStore from "../../../../store/zustand/store";

function LocationForm() {
          const [showDeleteModal, setShowDeleteModal] = useState(false);
          const { setToggledFalse } = useStore();
          const [visible, setVisible] = useState(true);
          const { SelectedItem } = useStore();
          const refetch = useStore((state) => state.refetch);
          const saveApiDetails = { url: NodeEdit, method: HttpMethod.PUT };
          const {
            mutate,
            isLoading,
            isError,
            data: savedata,
            error,
          } = useReactMutation(
            saveApiDetails,

          );

           const deleteApiDetails = {
             url: NodeDelete,
             method: HttpMethod.DELETE,
           };
           const {
             mutate: deleteMutate,
             isLoading: deleteLoading,
             data: deletedata,
             error: deleteError,
           } = useReactMutation(deleteApiDetails);

            const handleDelete = () => {
              setShowDeleteModal(true);
            };

          const confirmDelete = () => {
            if (SelectedItem?.id) {
              const id = SelectedItem.id;
              deleteMutate({ id });
              setShowDeleteModal(false);
            } else {
              CreateToast(
                ToastType.ERROR,
                "آیتم انتخابی یا شناسه آن وجود ندارد"
              );
            }
          };


          useEffect(() => {
            if (deleteLoading) {
              return;       
            }
              if (deletedata?.status === 200) {
              CreateToast(ToastType.SUCCESS, "دیتا با موفقیت حذف شد");
              refetch?.();
              setVisible(false);
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
        CreateToast(ToastType.SUCCESS, "دیتا با موفقیت ویرایش  شد");
        setVisible(true);
        refetch?.();
        setToggledFalse();
      } else if (savedata?.status !== 200 && savedata?.status !== undefined) {
         setVisible(true);
        CreateToast(ToastType.ERROR, "خطا در ویرایش رکورد");
      }
    }, [savedata?.status]);
      useEffect(() => {
        setVisible(true);
      }, [SelectedItem]);
       const submitHandler = (values: any, { resetForm }: any) => {
          
         mutate(values);
       };
    return (
      <div>
        {NodeList && (
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: SelectedItem?.title,
              isActive: SelectedItem?.isActive,
              zoneId: SelectedItem?.fourthHeadValue,
              address: SelectedItem?.firstHeadValue,
              latitude: SelectedItem?.latitude,
              longitude: SelectedItem?.longitude,
              id: SelectedItem?.id,
              zone: SelectedItem?.redTitle,
              microhubName: SelectedItem?.secondHeadValue,
            }}
            onSubmit={submitHandler}
          >
            <Form className="w-full gap-[16px] flex flex-col pt-2">
              <div
                className={
                  "absolute bg-white pr-1 left-[16px] flex items-center gap-2 top-[16px] h-8 "
                }
              >
                <DeleteIcon className="cursor-pointer" />

                {visible ? (
                  <EditIcon
                    className="cursor-pointer"
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <button
                    type="submit"
                    className="bg-[#31C48D] flex items-center gap-1 text-white rounded-lg px-3 h-[30px]"
                  >
                    <TickIcon
                      className={`cursor-pointer ${isLoading ? "hidden" : ""}`}
                    />
                    <span className="text-[12px] font-semibold leading-[16px]">
                      {isLoading ? <Loading size="sm" /> : "ذخیره اطلاعات"}
                    </span>
                  </button>
                )}
              </div>
              <div
                className={
                  "w-full flex-wrap flex items-center gap-4 justify-center"
                }
              >
                <div className={"min-w-[200px] flex-1"}>
                  <TextArea
                    className={"border border-gray-300 rounded-[13px]"}
                    placeholder="ادرس"
                    name="address"
                    icon={<Address />}
                    readonly={visible}
                  />
                </div>
              </div>
              <div
                className={
                  "w-full flex-wrap flex items-center gap-4 justify-center"
                }
              >
                <div className={"min-w-[200px] flex-1"}>
                  <TextField
                    innerClassName={"text-[#046C4E] "}
                    className={"border border-[#0E9F6E] bg-[#F3FAF7]"}
                    name="longitude"
                    placeholder="طول"
                    icon={<div>طول:</div>}
                    readonly={visible}
                  />
                </div>
                <div className={"min-w-[200px] flex-1"}>
                  <TextField
                    innerClassName={"text-[#046C4E]"}
                    className={"border border-[#0E9F6E] bg-[#F3FAF7]"}
                    name="latitude"
                    placeholder="عرض"
                    icon={<div>عرض:</div>}
                    readonly={visible}
                  />
                </div>
              </div>
              {/*<FlexContainer className="justify-end">*/}
              {/*    <Button className="mt-2 width-auto" type="submit">*/}
              {/*        {isLoading ? <Loading size="sm" /> : "تایید و ایجاد ناوگان"}{" "}*/}
              {/*    </Button>*/}
              {/*</FlexContainer>*/}
            </Form>
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

export default LocationForm;