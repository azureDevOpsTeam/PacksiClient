import { Form, Formik } from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import ToggleSwitch from "../../../../components/tools/toggle-switch/ToggleSwitch";
import { ReactComponent as Address } from "../../../../components/icons/svg/elements.svg";
import { ReactComponent as TickIcon } from "../../../../components/icons/svg/tickIcon.svg";
import { ReactComponent as ZoneIcon } from "../../../../components/icons/svg/zoneIcon.svg";
import { ReactComponent as NodeIcon } from "../../../../components/icons/svg/nodeIcon.svg";
import { ReactComponent as UserIcon } from "../../../../components/icons/svg/user.svg";
import { ReactComponent as AddPersonnelIcon } from "../../../../components/icons/svg/addPersonnelRedIcon.svg";
import { ReactComponent as CallIcon } from "../../../../components/icons/svg/callIcon.svg";
import TextArea from "../../../../components/tools/textArea/TextArea";
import TickSvg from "../../../../components/icons/components/TickSvg";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import FlexContainer from "../../../../components/tools/grid/FlexContainer";
import Button from "../../../../components/tools/button/Button";
import {
  NodeDropDown,
  GetUsersDropDown,
  GetNodeTypesDropDown,
  CreateNodeData,
  NodeDataServiceData,
} from "../../../../setting/ApiUrl";
import {
  useReactQuery,
  useReactMutation,
} from "../../../../components/hooks/query/useReactQuery";
import { NewFormValidationSchema } from "../../../../components/validationSchema/hubValidation/HubValidation";

import useStore from "../../../../store/zustand/store";
import { useEffect, useState ,useRef } from "react";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import Counter from "../../../../components/tools/counter/Counter";
interface FinalData {
  nodeId: string;
  nodeTypeDataList: {
    nodeTypeId: number;
    capacity: number;
    nodeTypePersons: { userId: string; isResponsible: boolean }[];
  }[];
}
const NewForm = () => {
  const setCurrentLocation = useStore((state) => state.setCurrentLocation);
  const refetch =useStore((state) =>(state.refetch));
  const [selectedUserId, setSelectedUserId] = useState<
    (any)[]
  >([]);
// const [finalData, setFinalData] = useState<any>({
//   nodeId: "",
//   nodeTypeDataList: [],
// });
  const [NodeId, setNodeId] = useState("");
  const resetFormRef = useRef<() => void>(() => {});
  const [userDropDownData, setUserDropDownData] = useState<any[]>([]);
  const [nodeTypeDataList, setNodeTypeDataList] = useState<any[]>([]);
  const [count, setCount] = useState(1);

  const userApiDetail = {
    url: GetUsersDropDown,
    method: HttpMethod.POST,
    body: {
      listByRole: 0,
    },
  };

  const { data: UserDropDownData } = useReactQuery(userApiDetail);

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

    const nodeTypesApiDetail = {
      url: NodeDataServiceData,
      method: HttpMethod.GET,
    };

  const { data: NodeTypesDropDownData } = useReactQuery(nodeTypesApiDetail);
  



  useEffect(() => {
    if (UserDropDownData?.data) {
      const userDropDown = UserDropDownData?.data?.map((item: any) => ({
        label: item.label,
        value: item.value,
        phoneNumber: item.phoneNumber,
        isActive: true,
        isResponsible: false,
      }));
      setUserDropDownData(userDropDown);
    }
  }, [UserDropDownData]);

  const NodeDropDownApiDetail = {
    url:   NodeDropDown,
    method: HttpMethod.GET,
  };

  const { data: NodeTypeDropDownData } = useReactQuery(NodeDropDownApiDetail);



  const location = useStore((state) => state.location);

  const NodeDropDownData = NodeTypeDropDownData?.data.map((item: any) => ({
    label: item?.label,
    value: item?.id,
    latitude: item?.latitude,
    longitude: item?.longitude,
    address: item?.address,
  }));
             const ApiDetails = {
               url: CreateNodeData,
               method: HttpMethod.POST,
             };
             const {
               mutate: Mutate,
               isLoading: Loading,
               data: data,
               error: Error,
             } = useReactMutation(ApiDetails);

useEffect(() => {
  if (data?.data?.isSuccess) {
    CreateToast(ToastType.SUCCESS, data?.data?.message);
          refetch?.();
          resetFormRef.current?.();
          
  }
  else if (data?.data?.isSuccess === false) {
    CreateToast(ToastType.ERROR, data?.data?.message);
  }
}, [data]);
  const initialValues = {
    Capacity: "",
    NodeId: null,
    NodeTypeDetail: null,
    userId: null,
    phoneNumber: "",
    isActive: false,
    latitude: "",
    longitude: "",
    address: "",
  };

    const handleCreateUserClick = () => {
      setCount((prevCount) => prevCount + 1);
    };

const submitHandler = (values: any, { resetForm }: any) => {
  // ذخیره resetForm در ref برای استفاده بعدی
  resetFormRef.current = resetForm;

  const newUserIds = {
    nodeId: NodeId,
    nodeTypePersons: selectedUserId
      ?.filter((user) => typeof user !== "string")
      .map((user: { UserId: string; isResponsible: boolean }) => ({
        userId: user.UserId,
        isResponsible: user.isResponsible,
      })),
    nodeTypeDataList: nodeTypeDataList.map(
      (item: { NodeTypeDetailId: number; capacity: number }) => ({
        serviceId: item.NodeTypeDetailId,
        capacity: item.capacity,
      })
    ),
  };

  Mutate(newUserIds);

  // حذف resetForm() از اینجا
};

const handleAddToList = (values: any, setFieldValue: any) => {
  const newItem = {
    NodeTypeDetailId: values.NodeTypeDetail,
    NodeTypeDetailTitle:
      NodeDataServiceDropDownData?.data?.find(
        (item: any) => item.value === values.NodeTypeDetail
      )?.label || "",
    capacity: values.capacity,
  };

  setNodeTypeDataList((prev) => [...prev, newItem]);

  // Clear specific fields
  setFieldValue("NodeTypeDetail", null);
  setFieldValue("capacity", "");
};


  const handleUserSelect = (values: any, index: number) => {
    setUserDropDownData((prevData: any) =>
      prevData.map((user: any) =>
        user.value === values.value ? { ...user, isActive: false } : user
      )
    );
  };
 

  useEffect(() => {
    if (count > UserDropDownData?.data?.length) {
      CreateToast(
        ToastType.ERROR,
        "امکان ایجاد پرسنل بیش تر از تعداد پرسنل وجود ندارد"
      );
    }
  }, [count, UserDropDownData?.data?.length]);

  const handleRemove =(idToRemove:string)=>{
   setNodeTypeDataList((prev) =>
     prev.filter((item) => item.NodeTypeDetailId !== idToRemove)
   );
  }
  const selectedServiceIds = nodeTypeDataList.map(
    (item: any) => item.NodeTypeDetailId
  );

  const filteredOptions=NodeDataServiceDropDownData?.data.filter((item:any)=> !selectedServiceIds.includes(item.value))

  return (
    <div>
      <h2 className="text-xl text-gray-900 pb-16 font-bold">میکروهاب جدید</h2>

      <Formik
        enableReinitialize
        validationSchema={NewFormValidationSchema}
        initialValues={initialValues}
        onSubmit={submitHandler}
      >
        {({ setFieldValue, values }) => (
          <Form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            className="w-full"
          >
            <div className={"w-full flex items-center justify-between gap-2"}>
              <AutoComplete
                name="NodeId"
                options={NodeDropDownData}
                label="ند"
                icon={<NodeIcon className="w-4 h-4 opacity-75" />}
                onChange={(values: any) => {
                  setCurrentLocation([
                    {
                      id: values.value,
                      latitude: values.latitude,
                      longitude: values.longitude,
                      name: values.label,
                    },
                  ]);
                  setFieldValue("latitude", values.latitude);
                  setFieldValue("longitude", values.longitude);
                  setFieldValue("address", values.address);
                  setNodeId(values.value);
                }}
              />
              <ToggleSwitch name="isActive" label="وضعیت فعالیت" />
            </div>
            <div className={"w-full flex items-center justify-between gap-2"}>
              <AutoComplete
                name="NodeTypeDetail"
                options={filteredOptions}
                label="سرویس"
              />
              <Counter
                name="capacity"
                label="ظرفیت"
                readonly={values.NodeTypeDetail === 3 ? true : false}
              />
              <button
                type="button"
                onClick={() => handleAddToList(values, setFieldValue)}
                className="group flex-none mt-[36px] w-[42px] h-[42px] flex justify-center items-center rounded-[8px] font-semibold bg-white text-[#6B7280] border border-transparent hover:bg-[#F3FAF7] hover:border-[#0E9F6E] hover:text-white"
              >
                <TickSvg />
              </button>
              {/* <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleAddToList(values)}
                  className="px-3 py-1 mt-5 text-sm bg-white text-white rounded hover:bg-gray-50 transition"
                >
                  <TickSvg strokeColor="#6B7280" />
                </button>
              </div> */}
            </div>
            {nodeTypeDataList.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center px-2 py-1"
                >
                  {/* متن و عدد با فاصله بین‌شون */}
                  <div className="flex justify-between items-center w-full gap-2">
                    <span className="font-semibold text-[#6B7280]">
                      {item.NodeTypeDetailTitle} :
                    </span>
                    <span className="font-semibold">{item.capacity}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.NodeTypeDetailId)}
                    className="text-gray-400 hover:text-gray-700 font-bold px-2"
                  >
                    ×
                  </button>
                </div>
              );
            })}

            <div className={"w-full flex items-center justify-between gap-2"}>
              <TextField
                innerClassName="bg-gray-200 rounded-[13px]"
                name="longitude"
                placeholder=""
                label="طول جغرافیایی"
                icon={<NodeIcon className={"w-4 h-4 opacity-75"} />}
                readonly={true}
              />
              <TextField
                innerClassName="bg-gray-200 rounded-[13px]"
                name="latitude"
                placeholder=""
                label="عرض جغرافیایی"
                icon={<NodeIcon className={"w-4 h-4 opacity-75"} />}
                readonly={true}
              />
            </div>
            {/* <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
              <ToggleSwitch name="isActive" label="وضعیت فعالیت" />
            </div> */}
            <TextArea
              innerClassName="bg-gray-200 rounded-[13px]"
              placeholder="متن خود را اینجا بنویسید ..."
              className="mt-4 "
              label="آدرس"
              name="address"
              icon={<Address />}
              readonly={true}
            />
            {Array.from({ length: Math.min(count, 4) }).map((_, index) => (
              <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
                <AutoComplete
                  name={`userId${index + 1}`}
                  options={userDropDownData?.filter(
                    (user: any) => user.isActive
                  )}
                  label={index === 0 ? "مدیر میکروهاب" : "نام پرسنل"}
                  icon={<UserIcon className={"w-4 h-4 "} />}
                  onChange={(selected: any) => {
                    handleUserSelect(selected, index);
                    const fieldName = `userId${index + 1}`;
                    const phoneField = `phoneNumber_${index + 1}`;
                    setFieldValue(fieldName, selected.value);
                    const selectedUser = userDropDownData.find(
                      (user: any) => user.value === selected.value
                    );
                    setFieldValue(phoneField, selectedUser?.phoneNumber || "");

                    setSelectedUserId((prevState) => [
                      ...prevState,
                      {
                        UserId: selected.value,
                        isResponsible: index === 0 ? true : false,
                      },
                    ]);
                  }}
                />

                <TextField
                  name={`phoneNumber_${index + 1}`}
                  placeholder=""
                  label="شماره تماس"
                  innerClassName="bg-gray-200 rounded-[13px]"
                  icon={<CallIcon className={"w-4 h-4 opacity-75"} />}
                  readonly={true}
                />
              </div>
            ))}
            <button
              type="button"
              className={
                "flex gap-2 w-full h-[46px] items-center justify-center rounded-[12px] border border-[#FF7959] mt-[25px]"
              }
              onClick={handleCreateUserClick}
            >
              <AddPersonnelIcon />
              <span className={"text-[#FF7959] text-sm font-bold"}>
                اضافه کردن پرسنل
              </span>
            </button>
            <FlexContainer className="justify-end mt-[25px] pb-12">
              <Button className="mt-2 width-auto" type="submit">
                {"تایید و ایجاد میکروهاب"}
              </Button>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewForm;
