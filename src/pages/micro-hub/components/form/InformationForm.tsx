import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import ToggleSwitch from "../../../../components/tools/toggle-switch/ToggleSwitch";
import Counter from "../../../../components/tools/counter/Counter";
import {  HubDelete } from "../../../../setting/ApiUrl";
import { ReactComponent as TraficJamIcon } from "../../../../components/icons/svg/traffic-jam.svg";
import TickSvg from "../../../../components/icons/components/TickSvg";
import { ReactComponent as DeleteIcon } from "../../../../components/icons/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../../../../components/icons/svg/editIcon.svg";
import { ReactComponent as MicroHubIcon } from "../../../../components/icons/svg/microhubIcone.svg";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import useStore from "../../../../store/zustand/store";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { ToastType } from "../../../../models/enums/ToastType";
import {
  useReactQuery,
  useReactMutation,
} from "../../../../components/hooks/query/useReactQuery";
import Loading from "../../../../components/tools/loading/Loading";
import { ReactComponent as TickIcon } from "../../../../components/icons/svg/tickIcon.svg";
import {
  GetNodeData,
  NodeDropDown,
  ZoneDropDown,
  GetNodeTypesDropDown,
  UpdateNodeData,
  NodeDataServiceData,
} from "../../../../setting/ApiUrl";
interface ServiceItem {
  serviceId: any;
  serviceName: any;
  capacity: any;
}

function InformationForm() {

  const [editable, setEditable] = useState(false);
  const { setToggledFalse } = useStore();
  const { SelectedItem } = useStore();
  const [serviceData, setServiceData] = useState<ServiceItem[]>([]);
  const refetch = useStore((state) => state.refetch);

  const NodeDropDownApiDetail = {
    url: NodeDropDown,
    method: HttpMethod.GET,
  };

  const ZoneDropApiDetail ={
    url:ZoneDropDown,
    method:HttpMethod.GET,
  }
 const {data:ZoneDropDownData}= useReactQuery(ZoneDropApiDetail)
 const { data: NodeTypeDropDownData } = useReactQuery(NodeDropDownApiDetail);
  const nodeTypesApiDetail = {
    url: GetNodeTypesDropDown,
    method: HttpMethod.GET,
    body: {
      listByRole: 0,
    },
  };

 const { data: NodeTypesDropDownData } = useReactQuery(nodeTypesApiDetail);
  
 const nodeDropDown = NodeTypeDropDownData?.data;
 const zoneDropDown = ZoneDropDownData?.data;

 const NodeDataApiDetails = {
   url: GetNodeData,
   method: HttpMethod.POST,
   body: {'nodeDataId':SelectedItem?.id},
 };


   const NodeDataServiceDropDownApi = {
     url: NodeDataServiceData,
     method: HttpMethod.GET,
     // body: {
     //   listByRole: 0,
     // },
   };
   const { data: NodeDataServiceDropDownData } = useReactQuery(
     NodeDataServiceDropDownApi
   );
 
 const {
   data: NodeData,
   isLoading,
   isError,
   error,
   refetch: NodeDataRefetch,
 } = useReactQuery(NodeDataApiDetails);

   const handleAddToList = (values:any) => {


const newItem = {
  serviceId: values.serviceId,
  serviceName:
    NodeDataServiceDropDownData?.data?.find(
      (item: any) => item.value === values.serviceId
    )?.label || "", // فقط متن عنوان
  capacity: values.capacity,

};
  setServiceData((prev) => [...prev, newItem]);}


const initialValues = {
  isActive: NodeData?.data?.isActive || false,
  nodeId: NodeData?.data?.nodeId,
  capacity: NodeData?.data?.capacity || 0,
  zoneId: NodeData?.data?.zoneId,
};

  const saveApiDetails = { url: UpdateNodeData, method: HttpMethod.PUT };
  const {
    mutate: editMutate,
    isLoading: editLoading,
    data: savedata,
  } = useReactMutation(saveApiDetails);

  const deleteApiDetails = { url: HubDelete, method: HttpMethod.DELETE };
  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    data: deletedata,
    error: deleteError,
  } = useReactMutation(deleteApiDetails);

  const submitHandler = (values: any) => {
   
      const formatedData = {
        id: NodeData?.data?.id,
        nodeId: values.nodeId,
        nodeTypeId: values.nodeTypeId,
        isActive: values.isActive,
        people: NodeData?.data?.nodeDataPerson,
        nodeTypeDetails:  serviceData.map(
    (item: { serviceId: number; capacity: number }) => ({
      serviceId: item.serviceId,
      capacity: item.capacity,
    })
  ),
      };
    editMutate(formatedData);

  };

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

    if (deletedata?.status === 200) {
      CreateToast(ToastType.SUCCESS, "دیتا با موفقیت حذف شد");
      refetch?.(); // بروزرسانی لیست
      setEditable(false);
      setToggledFalse();
    } else if (deletedata?.status !== 200 && deletedata?.status !== undefined) {
      CreateToast(ToastType.ERROR, "خطا در حذف رکورد");
      setEditable(false);
    }
  }, [deletedata?.status]);

  useEffect(() => {
    if (deleteError) {
    
      CreateToast(ToastType.ERROR, "خطا در حذف رکورد");
    }
  }, [deleteError]);

useEffect(() => {
  if (
    Array.isArray(NodeData?.data?.nodeDataDetails) &&
    NodeData?.data?.nodeDataDetails.length > 0
  ) {
    const updated = NodeData?.data.nodeDataDetails.map((item:any) => {
      const match = NodeDataServiceDropDownData?.data?.find(
        (service:any) => service.value === item.serviceId
      );
      return {
        ...item,
        serviceName: match?.label || "", // اگر پیدا نشد، رشته خالی بذار
      };
    });

    setServiceData(updated);
  }
}, [NodeData?.data?.nodeDataDetails, NodeDataServiceDropDownData]);



const handleRemove = (idToRemove: string) => {
  setServiceData((prev) =>
    prev.filter((item) => item.serviceId !== idToRemove)
  );
};
const selectedServiceIds = serviceData.map((item) => item.serviceId);

const filteredOptions = NodeDataServiceDropDownData?.data?.filter(
  (item:any) => !selectedServiceIds.includes(item.value)
);
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
                  "absolute left-[16px] flex items-center gap-2 top-[16px] h-8 "
                }
              >
                <DeleteIcon className={"cursor-pointer"} />
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
                    inputClassName="rounded-[13px]"
                    className="border border-gray-300 rounded-[13px]"
                    name="nodeId"
                    options={nodeDropDown}
                    placeholder="ند"
                    icon={<MicroHubIcon className="w-4 h-4 opacity-75" />}
                    readonly={!editable}
                  />
                </div>
                <div className="min-w-[200px] flex-1">
                  <ToggleSwitch
                    className={"border border-gray-300 rounded-full"}
                    name="isActive"
                    readonly={!editable}
                  />
                </div>
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
                    value={values.zoneId}
                    options={zoneDropDown}
                    placeholder="زون تحت پوشش"
                    icon={<TraficJamIcon />}
                    readonly={!editable}
                  />
                </div>
              </div>
              <div
                className={
                  "w-full flex-wrap flex items-center gap-4 justify-center"
                }
              >
                <div className={"min-w-[200px] flex-1"}>
                  <AutoComplete
                    inputClassName="rounded-[13px]"
                    className="border border-gray-300 rounded-[13px] w-full"
                    name="serviceId"
                    options={filteredOptions}
                    placeholder="نوع"
                    icon={<TraficJamIcon />}
                    readonly={!editable}
                  />
                  {/* <TextField
                    className={"border border-gray-300"}
                    name="nodeTypeId"
                    placeholder="نوع"
                    icon={<TraficJamIcon />}
                    readonly={!editable}
                  /> */}
                </div>
                <div className="min-w-[200px] flex-1">
                  <div className="flex flex-row items-center gap-2">
                    <Counter
                      hasBorder={true}
                      name="capacity"
                      readonly={!editable}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddToList(values)}
                      disabled={!editable}
                      className="border border-gray-300 w-[42px] h-[42px] flex justify-center items-center rounded-[8px] font-semibold bg-white text-[#6B7280] hover:bg-[#6B728090] hover:text-[#FFF]"
                    >
                      <TickSvg strokeColor="#6B7280" />
                    </button>
                  </div>
                </div>
              </div>

              {serviceData.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-2 py-1"
                >
                  <div className="flex justify-between items-center w-full gap-2">
                    <span className="font-semibold text-[#6B7280]">
                      {item.serviceName} :
                    </span>
                    <span className="font-semibold">{item.capacity}</span>
                  </div>
                  {editable && (
                    <button
                      type="button"
                      onClick={() => handleRemove(item.serviceId)}
                      className="text-gray-400 hover:text-gray-700 font-bold px-2"
                    >
                      ×
                    </button>
                  )}
                  {/* دکمه حذف */}
                </div>
              ))}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default InformationForm;
