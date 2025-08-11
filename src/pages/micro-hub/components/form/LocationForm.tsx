import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import { ReactComponent as TickIcon } from "../../../../components/icons/svg/tickIcon.svg";
import { ReactComponent as TraficJamIcon } from "../../../../components/icons/svg/traffic-jam.svg";
import { ReactComponent as DeleteIcon } from "../../../../components/icons/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../../../../components/icons/svg/editIcon.svg";
import { ReactComponent as Address } from "../../../../components/icons/svg/elements.svg";
import TextArea from "../../../../components/tools/textArea/TextArea";
import useStore from "../../../../store/zustand/store";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import Loading from "../../../../components/tools/loading/Loading";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import {
  HubEdit,
  HubDelete,
  GetNodeData,
  UpdateNodeData,
} from "../../../../setting/ApiUrl";
import {
  useReactMutation,
  useReactQuery,
} from "../../../../components/hooks/query/useReactQuery";

function LocationForm() {
  const { setToggledFalse } = useStore();
  const [visible, setVisible] = useState(true);
  const refetch = useStore((state) => state.refetch);
  const SelectedItem = useStore((state) => state.SelectedItem);
  const saveApiDetails = { url: HubEdit, method: HttpMethod.PUT };

 const NodeDataApiDetails = {
   url: GetNodeData,
   method: HttpMethod.POST,
   body: { nodeDataId: SelectedItem?.id },
 };

 const {
   data: NodeData,
   isLoading: NodeDataLoading,
   isError: NodeDataIsError,
   error: NodeDataError,
   refetch: NodeDataRefetch,
 } = useReactQuery(NodeDataApiDetails);

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
      CreateToast(ToastType.SUCCESS, "دیتا با موفقیت ویرایش  شد");
      setVisible(true);
      refetch?.();
      setToggledFalse();
    } else if (savedata?.status !== 200 && savedata?.status !== undefined) {
      CreateToast(ToastType.ERROR, "خطا در ویرایش رکورد");
      setVisible(true);
    }
  }, [savedata?.status]);

  ////updateData//////
  const editApiDetails = { url: UpdateNodeData, method: HttpMethod.PUT };
  const {
    mutate: editMutate,
    isLoading: editLoading,
    data: editdata,
  } = useReactMutation(editApiDetails);
  
 
   const submitHandler = (values: any, { resetForm }: any) => {

     mutate(values);
   };
  return (
    <div>
      {NodeList && (
        <Formik
          enableReinitialize={true}
          initialValues={{
            isActive: NodeData?.data?.isActive || false,
            nodeId: NodeData?.data?.nodeId,
            counter: NodeData?.data?.counter || 0,
            nodeType: NodeData?.data?.nodeType || "",
            zoneId: NodeData?.data?.zoneId,
            address: NodeData?.data?.address,
            latitude: NodeData?.data?.latitude,
            longitude: NodeData?.data?.longitude,
          }}
          onSubmit={submitHandler}
        >
          <Form className="w-full gap-[16px] flex flex-col">
            <div
              className={
                " absolute left-[16px] flex items-center gap-2 top-[16px] h-8 "
              }
            >
              <DeleteIcon className={"cursor-pointer"} />
              
                <EditIcon
                  className="cursor-pointer"
                  
                />
            
            </div>
            <div
              className={
                "w-full flex-wrap flex items-center gap-4 justify-center"
              }
            >
              <div className={"min-w-[200px] flex-1"}>
                <TextArea
                  innerClassName="bg-gray-200 rounded-[13px]"
                  className={"border border-gray-300 rounded-[13px]"}
                  placeholder="ادرس"
                  name="address"
                  icon={<Address />}
                  readonly={true}
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
                  innerClassName="bg-gray-200 rounded-[13px]"
                  className={"border border-gray-300"}
                  name="latitude"
                  placeholder="طول"
                  icon={<TraficJamIcon />}
                  readonly={true}
                />
              </div>
              <div className={"min-w-[200px] flex-1"}>
                <TextField
                  innerClassName="bg-gray-200 rounded-[13px]"
                  className={"border border-gray-300"}
                  name="longitude"
                  placeholder="عرض"
                  icon={<TraficJamIcon />}
                  readonly={true}
                />
              </div>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
}

export default LocationForm;
