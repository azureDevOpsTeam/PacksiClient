import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import ToggleSwitch from "../../../../components/tools/toggle-switch/ToggleSwitch";
import Counter from "../../../../components/tools/counter/Counter";
import { ReactComponent as TickIcon } from "../../../../components/icons/svg/tickIcon.svg";
import { ReactComponent as TraficJamIcon } from "../../../../components/icons/svg/traffic-jam.svg";
import { ReactComponent as ZoneIcon } from "../../../../components/icons/svg/zoneIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../../components/icons/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../../../../components/icons/svg/editIcon.svg";
import { ReactComponent as TruckIcon } from "../../../../components/icons/svg/truckIcon.svg";
import { ReactComponent as VehicleIcon } from "../../../../components/icons/svg/vehicleIcon.svg";
import { ReactComponent as PlateIcon } from "../../../../components/icons/svg/platIcon.svg";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import { ReactComponent as RedDeleteIcon } from "../../../../components/icons/svg/redDeleteIcon.svg";
import {
  useReactMutation,
  useReactQuery,
} from "../../../../components/hooks/query/useReactQuery";
import Modal from "../../../../components/tools/modal/madal";
import useStore from "../../../../store/zustand/store";
import Loading from "../../../../components/tools/loading/Loading";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import {
  FleetEdit,
  FleetDelete,
  GetFleet,
  ZoneDropDown,
  FleetType,
  GetTaxiLinesDropDown,
} from "../../../../setting/ApiUrl";
import { InformationFormValidation } from "../../../../components/validationSchema/fleetValidation/FleetValidation";

function InformationForm() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const { setToggledFalse } = useStore();
  const { SelectedItem } = useStore();
  const refetch = useStore((state) => state.refetch);
       const ZoneApiDetails = {
         url: ZoneDropDown,
         method: HttpMethod.GET,
       };
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
} = useReactQuery(GetFleetData, {
  enabled: !!SelectedItem?.id, // فقط وقتی id وجود داره
});
   const FleetTypeApiDetails = {
     url: FleetType,
     method: HttpMethod.GET,
   };
         const GetTaxiLinesDropDownApiDetail = {
           url: GetTaxiLinesDropDown,
           method: HttpMethod.GET,
         };
         const { data: TaxiLinesDropDownData, isLoading: TaxiLinesLoading } =
           useReactQuery(GetTaxiLinesDropDownApiDetail);
    
const ZoneData = useReactQuery(ZoneApiDetails);
  const TaxiLineDropDown = TaxiLinesDropDownData?.data;
const zoneDropDown = ZoneData?.data?.data;
  const { data: fleetTypeData, isLoading: fleetTypeLoading } =
    useReactQuery(FleetTypeApiDetails);
 const fleetTypeDropDown = fleetTypeData?.data;

  const submitHandler = (values: any) => {

    const formatedData = {
      id: FleetData?.data?.id,
      isActive: values.isActive,
      fleetTypeId: values.fleetType,
      zoneId: values.zoneId,
      userId: FleetData?.data?.user?.id,
      capacity: values.counter,
      licensePlate: values.licensePlate,
      vehicleModel: values.vehicleModel,
      taxiLineId:FleetData?.data?.taxiLineId,
      fleetServiceId: FleetData?.data?.fleetService.id,
    };
    editMutate(formatedData);
  };
const initialValues = {
  zoneId: FleetData?.data?.zone?.id,
  counter: FleetData?.data?.capacity,
fleetName: FleetData?.data?.name ? FleetData.data.name : null,

  fleetType: FleetData?.data?.fleetType?.id,
  isActive: FleetData?.data?.isActive,
  licensePlate: FleetData?.data?.licensePlate,
  vehicleModel: FleetData?.data?.vehicleModel,
  fleetServiceId: FleetData?.data?.fleetService.id,
  taxiLineId: FleetData?.data?.taxiLineId,
};
const fleetServiceDropDown = [
  { label: "اختصاصی", value: 1 },
  { label: "اشتراکی", value: 2 },
];
  const saveApiDetails = { url: FleetEdit, method: HttpMethod.PUT };
  const {
    mutate: editMutate,
    isLoading: editLoading,
    data: savedata,
  } = useReactMutation(saveApiDetails);

  const deleteApiDetails = { url: FleetDelete, method: HttpMethod.DELETE };
  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    data: deletedata,
    error: deleteError,
  } = useReactMutation(deleteApiDetails);


 const handleDelete = () => {
   setShowDeleteModal(true);
 };
  useEffect(() => {
    if (savedata?.data?.isSuccess) {
      CreateToast(ToastType.SUCCESS, savedata?.data?.message);
      refetch?.();
      setEditable(false);
      setToggledFalse();
    } else {
      setEditable(false);
      CreateToast(ToastType.ERROR, savedata?.data?.message);
    }
  }, [savedata?.status]);

  useEffect(() => {
    if (deletedata?.status === 200) {
      CreateToast(ToastType.SUCCESS, "دیتا با موفقیت حذف شد");
      refetch?.(); // بروزرسانی لیست
      setEditable(false);
      setToggledFalse();
    } else if (deletedata?.status !== 200 && deletedata?.status !== undefined) {
      setEditable(false);
      CreateToast(ToastType.ERROR, "خطا در حذف رکورد");
    }
  }, [deletedata?.status]);
useEffect(() => {
  setEditable(false);
}, [SelectedItem]);
  useEffect(() => {
    if (deleteError) {
      CreateToast(ToastType.ERROR, "خطا در حذف رکورد");
    }
  }, [deleteError]);
  const confirmDelete = () => {
    if (SelectedItem?.id) {
      const id = SelectedItem.id;
      deleteMutate({ id });
      setShowDeleteModal(false);
    } else {
      CreateToast(ToastType.ERROR, "آیتم انتخابی یا شناسه آن وجود ندارد");
    }
  };

    const cancelDelete = () => {
      setShowDeleteModal(false);
    };
    console.log("FleetData?.data?.taxiLineId", FleetData?.data?.taxiLineId);
  return (
    <div>
      {SelectedItem && (
        <Formik
          validateOnBlur={true}
          validateOnChange={true}
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={InformationFormValidation}
          onSubmit={submitHandler}
        >
          {({ setFieldValue, values }) => (
            <Form className="w-full gap-[16px] flex flex-col">
              <div
                className={
                  " absolute left-[16px] flex items-center gap-2 top-[16px] h-8 "
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
                  <TextField
                    className={"border border-gray-300"}
                    name="fleetName"
                    placeholder="ناوگان"
                    innerClassName="bg-gray-200 rounded-[13px]"
                    icon={<TraficJamIcon />}
                    readonly={true}
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
                  "w-full flex-wrap flex items-center gap-4 justify-center "
                }
              >
                <div className={"min-w-[200px] flex-1"}>
                  <AutoComplete
                    name="fleetServiceId"
                    className={"border border-gray-300 rounded-[13px]"}
                    options={fleetServiceDropDown}
                    placeholder="نوع"
                    icon={<TraficJamIcon className={"w-4 h-4 opacity-75"} />}
                    readonly={true}
                  />
                </div>
                <div className={"min-w-[200px] flex-1"}>
                  <Counter
                    readonly={!editable}
                    hasBorder={true}
                    name="counter"
                  />
                  {/* <AutoComplete
                    name="fleetType"
                    className={"border border-gray-300 rounded-[13px]"}
                    options={fleetTypeDropDown}
                    placeholder="وسیله نقلیه"
                    icon={<TraficJamIcon className={"w-4 h-4 opacity-75"} />}
                    readonly={!editable}
                  /> */}
                </div>
                <div className="min-w-[200px] flex-1">
                  {FleetData?.data?.taxiLineId !==null ? (
                    <AutoComplete
                      name="taxiLineId"
                      className={"border border-gray-300 rounded-[13px]"}
                      options={TaxiLineDropDown}
                      placeholder="خط تاکسی"
                      icon={<TraficJamIcon className={"w-4 h-4 opacity-75"} />}
                      readonly={!editable}
                    />
                  ) : (
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
                  )}
                  {/* <AutoComplete
                    name="taxiLineId"
                    className={"border border-gray-300 rounded-[13px]"}
                    options={TaxiLineDropDown}
                    placeholder="خط تاکسی"
                    icon={<TraficJamIcon className={"w-4 h-4 opacity-75"} />}
                    readonly={!editable}
                  /> */}
                </div>
                <div className="min-w-[200px] flex-1">
                  <AutoComplete
                    name="fleetType"
                    className={"border border-gray-300 rounded-[13px]"}
                    options={fleetTypeDropDown}
                    placeholder="وسیله نقلیه"
                    icon={<TraficJamIcon className={"w-4 h-4 opacity-75"} />}
                    readonly={!editable}
                  />
                </div>
              </div>
              {/* <div
                className={
                  "w-full flex-wrap flex items-center gap-4 justify-center "
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
              </div> */}
              <div
                className={
                  "w-full flex-wrap flex items-center gap-4 justify-center"
                }
              >
                <div className={"min-w-[200px] flex-1"}>
                  <TextField
                    className={"border border-gray-300"}
                    name="vehicleModel"
                    placeholder="مدل خودرو"
                    icon={<VehicleIcon />}
                    readonly={!editable}
                  />
                </div>
                <div className={"min-w-[200px] flex-1"}>
                  <TextField
                    className={"border border-gray-300"}
                    name="licensePlate"
                    placeholder="پلاک خودرو"
                    icon={<PlateIcon />}
                    readonly={!editable}
                  />
                </div>
              </div>
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
