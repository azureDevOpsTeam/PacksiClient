import React,{useState,useEffect} from 'react';
import {Form, Formik} from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import {ReactComponent as NodeIcon} from "../../../../components/icons/svg/nodeIcon.svg";
import {ReactComponent as DeleteIcon} from "../../../../components/icons/svg/deleteIcon.svg";
import {ReactComponent as EditIcon} from "../../../../components/icons/svg/editIcon.svg";
import { ReactComponent as TickIcon } from "../../../../components/icons/svg/tickIcon.svg";
import Loading from "../../../../components/tools/loading/Loading";
import { ReactComponent as RedDeleteIcon } from "../../../../components/icons/svg/redDeleteIcon.svg";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import Modal from "../../../../components/tools/modal/madal";

import {useReactMutation , useReactQuery} from "../../../../components/hooks/query/useReactQuery";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { NodeEdit, NodeDelete, GetTaxiLine  } from "../../../../setting/ApiUrl";
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

             const GetNodeData = {
               url: GetTaxiLine,
               method: HttpMethod.POST,
               body: { id: SelectedItem?.id },
             };

             const {
               data: NodeData,
               isLoading: GetTaxiLineLoading,

               error: GetTaxiLineError,
             } = useReactQuery(GetNodeData);

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
              lineName: NodeData?.data?.lineName || "",
              isActive: NodeData?.data?.isActive || true,
              firstNodeName: NodeData?.data?.firstNodeName || "",
              secondNodeName: NodeData?.data?.secondNodeName || "",
              id: SelectedItem?.id || "",
            }}
            onSubmit={submitHandler}
          >
            <Form className="w-full gap-[16px] flex flex-col pt-2">
              {/* <div
                className={
                  "absolute bg-white pr-1 left-[16px] flex items-center gap-2 top-[16px] h-8 "
                }
              >
                <DeleteIcon className="cursor-pointer" />
                  <EditIcon
                    className="cursor-pointer"
                    onClick={() => setVisible(false)}
                  />
              </div> */}
              <div
                className={
                  "w-full flex-wrap flex items-center gap-4 justify-center"
                }
              >
                <div className={"min-w-[200px] flex-1"}>
                  <TextField
                    className="border border-gray-300"
                    name="firstNodeName"
                    placeholder="میکروهاب 1"
                    readonly={true}
                  />
                </div>
                <div className={"min-w-[200px] flex-1"}>
                  <TextField
                    className="border border-gray-300"
                    name="secondNodeName"
                    placeholder="میکروهاب 2"
                    readonly={true}
                  />
                </div>
              </div>
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