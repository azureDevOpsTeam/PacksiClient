
import React,{useEffect,useState} from "react";
import { Form, Formik } from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import ToggleSwitch from "../../../../components/tools/toggle-switch/ToggleSwitch";
import Counter from "../../../../components/tools/counter/Counter";
import { ReactComponent as CallIcon } from "../../../../components/icons/svg/callIcon.svg";
import { ReactComponent as TraficJamIcon } from "../../../../components/icons/svg/traffic-jam.svg";
import { ReactComponent as Address } from "../../../../components/icons/svg/elements.svg";
import { ReactComponent as VehicleIcon } from "../../../../components/icons/svg/vehicleIcon.svg";
import { ReactComponent as PlateIcon } from "../../../../components/icons/svg/platIcon.svg";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import {
  ZoneDropDown,
  FleetCreate,
  FleetType,
  GetUsersDropDown,
  GetTaxiLinesDropDown,
} from "../../../../setting/ApiUrl";
import TextArea from "../../../../components/tools/textArea/TextArea";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import { IDropDown } from "../../../../models/viewModels/common/IDropDown";
import { useReactQuery,useReactMutation } from "../../../../components/hooks/query/useReactQuery";
import FlexContainer from "../../../../components/tools/grid/FlexContainer";
import Button from "../../../../components/tools/button/Button";
import Loading from "../../../../components/tools/loading/Loading";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { NewFormValidationSchema } from "../../../../components/validationSchema/fleetValidation/FleetValidation";


const fleetServiceDropDown =[
  {label:'اختصاصی' ,value:1},
  {label:'اشتراکی',value:2}
]
const NewForm = () => {
     const [fleetService ,setFleetService]=useState();
     const ZoneApiDetails = {
          url: ZoneDropDown,
          method: HttpMethod.GET,
       
        };
      const GetTaxiLinesDropDownApiDetail={
        url:GetTaxiLinesDropDown,
        method:HttpMethod.GET
      }
               const {
                 data: TaxiLinesDropDownData,
                 isLoading: TaxiLinesLoading,
               } = useReactQuery(GetTaxiLinesDropDownApiDetail);

        const FleetTypeApiDetails = {
        url: FleetType,
        method:HttpMethod.GET
      };

       const UserApiDetails = {
         url: GetUsersDropDown,
         method: HttpMethod.POST,
         body: {
           listByRole: 0,
         },
       };
       
         const {
           data: UserDropDownData,
           isLoading: userLoading,
           isError,
           error,
           refetch,
         } = useReactQuery(UserApiDetails);

  const { data: fleetTypeData, isLoading:fleetTypeLoading } = useReactQuery(FleetTypeApiDetails);

  const ZoneData = useReactQuery(ZoneApiDetails);
  const zoneDropDown= ZoneData?.data?.data
  const TaxiLineDropDown =TaxiLinesDropDownData?.data
  const fleetTypeDropDown = fleetTypeData?.data

  const saveApiDetails = { url: FleetCreate, method: HttpMethod.POST };
  const { mutate, isLoading ,data } = useReactMutation(
    saveApiDetails,
  );
 const submitHandler = (values: any, { resetForm }: any) => {
   const finalData: any = {
     isActive: values.isActive,
     fleetTypeId: values.fleetTypeId,
     fleetServiceId: values.fleetServiceId,
     userId: values.userId,
     licensePlate: values.licensePlate,
     vehicleModel: values.vehicleModel,
   };
   if (values.fleetServiceId === 1) {
     finalData.zoneId = values.zoneId;
   } else if (values.fleetServiceId === 2) {
     finalData.taxiLineId = values.taxiLineId;
   }

   mutate(finalData);
   resetForm();
 };


     useEffect(() => {
       if (data?.data) {
         if (data.data.isSuccess) {
           CreateToast(
             ToastType.SUCCESS,
             data.data.message || "قرارداد با موفقیت ثبت شد"
           );

         } else {
           CreateToast(
             ToastType.ERROR,
             data.data.message || "خطایی رخ داده است"
           );
         }
       }
     }, [data]);

  return (
    <div>
      <h2 className="text-xl text-gray-900 pb-16 font-bold">ناوگان جدید</h2>
      <Formik
        initialValues={{
          taxiLineId:null,
          name: null,
          licensePlate: null,
          vehicleModel: null,
          fleetServiceId: null,
          fleetTypeId: null,
          isActive: true,
          userId: null,
          counter: null,
          zoneId: null,
        }}
        onSubmit={submitHandler}
        // validationSchema={NewFormValidationSchema}
      >
        {({ setFieldValue, values }) => (
          <Form className="w-full">
            <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
              <TextField
                name="name"
                placeholder=""
                label="نام ناوگان"
                icon={<TraficJamIcon />}
              />
              <ToggleSwitch name="isActive" label="وضعیت فعالیت" />
            </div>

            <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
              <AutoComplete
                name="fleetServiceId"
                options={fleetServiceDropDown}
                label="نوع"
                icon={<TraficJamIcon />}
                onChange={(selected: any) => setFleetService(selected.value)}
              />
              <Counter name="counter" label="ظرفیت" />
            </div>
            <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
              {fleetService === 1 ? (
                <AutoComplete
                  name="zoneId"
                  options={zoneDropDown}
                  label="زون تحت پوشش"
                  icon={<TraficJamIcon />}
                />
              ) : (
                <AutoComplete
                  name="taxiLineId"
                  options={TaxiLineDropDown}
                  label="خط تاکسی"
                  icon={<TraficJamIcon />}
                />
              )}

              <AutoComplete
                name="fleetTypeId"
                options={fleetTypeDropDown}
                label="وسیله نقلیه"
                icon={<TraficJamIcon />}
              />
            </div>
            <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
              <AutoComplete
                name="userId"
                options={UserDropDownData?.data}
                label="نام پرسنل"
                icon={<TraficJamIcon />}
                onChange={(values: any) => {
                  setFieldValue("userId", values.value);
                  setFieldValue("phoneNumber", values.phoneNumber);
                }}
              />
              <TextField
                name={"phoneNumber"}
                placeholder=""
                label="شماره تماس"
                innerClassName="bg-gray-200 rounded-[13px]"
                icon={<CallIcon className={"w-4 h-4 opacity-75"} />}
                readonly={true}
              />
            </div>
            <div className="xl:grid xl:grid-cols-2 gap-8 mt-4">
              <TextField
                name="vehicleModel"
                placeholder="مدل خودرو"
                label="مدل خودرو"
                icon={<VehicleIcon />}
              />
              <TextField
                name="licensePlate"
                placeholder="پلاک خودرو"
                label="پلاک خودرو"
                icon={<PlateIcon />}
              />
            </div>
            <FlexContainer className="justify-end mt-12 pb-12">
              <Button className="mt-2 width-auto" type="submit">
                {false ? <Loading size="sm" /> : "تایید و ایجاد ناوگان"}{" "}
              </Button>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewForm;
