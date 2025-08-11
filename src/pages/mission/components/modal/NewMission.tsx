import React ,{useState ,useEffect} from "react";
import TableCell from "../../../../components/tools/table/TableCell";
import { Formik, Form } from "formik";
import DynamicTable from "../../../../components/tools/table/DynamicTable";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import { useReactQuery , useReactMutation } from "../../../../components/hooks/query/useReactQuery";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import {
  GetFreeMission,
  FleetSharedDropDown,
  AssignToFleet,
} from "../../../../setting/ApiUrl";
import Loading from "../../../../components/tools/loading/Loading";

export type ScannedDataType = {
  parcelBarcode: string;
  bundleBarcode: string;
  scannedParcelCount: number;
  totalParcelCount: number;
  isSuccess: boolean;
  message: string;
};

interface ScanDataProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  activeButton: string;
}

function NewMission({ isOpen, onClose, data, activeButton }: ScanDataProps) {
  const [selectedData, setSelectedData] = useState<number[]>([]); // یا هر نوع مناسب

  const apiDetails = {
    url: GetFreeMission,
    method: HttpMethod.GET,
  };

  const FleetSharedApiDetails = {
    url: FleetSharedDropDown,
    method: HttpMethod.GET,
  };
  const AssignToFleetApiDetail = {
    url: AssignToFleet,
    method: HttpMethod.POST,
  };

  const {
    mutate: Mutate,
    isLoading: BlockLoading,
    data: AssignToFleetData,
  } = useReactMutation(AssignToFleetApiDetail);

  const { data: FleetSharedData } = useReactQuery(FleetSharedApiDetails);
  console.log("FleetSharedData", FleetSharedData);
    useEffect(() => {
      if (AssignToFleetData?.data?.isSuccess) {
        CreateToast(ToastType.SUCCESS, AssignToFleetData?.data?.message);
        refetch?.();

        // onClose();
      } else {
        // setEditable(false);
        CreateToast(ToastType.ERROR, AssignToFleetData?.data?.message);
        
        // onClose();
      }
    }, [AssignToFleetData]);
  const {
    data: FreeMission,
    isLoading,
    isError,
    error,
    refetch,
  } = useReactQuery(apiDetails);
  console.log("FreeMission", FreeMission);
  const transformedData = FreeMission?.data?.map((item: any) => ({
    original: item,
    id: item.jobId,
    bundleCode: item.bundleCode,
    customerName: <TableCell>{item.customerName}</TableCell>,
    taxiLine: <TableCell>{item.taxiLine}</TableCell>,
    timeWindow: <TableCell>{item.timeWindow}</TableCell>,
  }));
  if (!isOpen) return null;

const handleRowClick = (rows: any[]) => {
  const rowIds = rows.map((r: any) => r.jobId); // فقط استخراج jobId
  setSelectedData(rowIds); // بدون استفاده از prev
};
  console.log("selectedData", selectedData);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 relative w-[780px] max-w-[780px]">
        <div className="flex flex-row-reverse justify-between items-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <div className="flex flex-row gap-3 items-center">
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M17 17C15.6193 17 14.5 15.8807 14.5 14.5C14.5 13.1193 15.6193 12 17 12C18.3807 12 19.5 13.1193 19.5 14.5C19.5 15.8807 18.3807 17 17 17ZM17 17C19.4853 17 21.5 19.0147 21.5 21.5M17 17C14.5147 17 12.5 19.0147 12.5 21.5"
                stroke="#FF7959"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 7.5C5.61929 7.5 4.5 6.38071 4.5 5C4.5 3.61929 5.61929 2.5 7 2.5C8.38071 2.5 9.5 3.61929 9.5 5C9.5 6.38071 8.38071 7.5 7 7.5ZM7 7.5C9.48528 7.5 11.5 9.51472 11.5 12M7 7.5C4.51472 7.5 2.5 9.51472 2.5 12"
                stroke="#FF7959"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 15.5C3.5 18.2643 5.73571 20.5 8.5 20.5L8 18.5"
                stroke="#FF7959"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.5 8.5C18.5 5.73571 16.2643 3.5 13.5 3.5L14 5.5"
                stroke="#FF7959"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className="text-xl font-bold">اطلاعات مأموریت جدید</h2>
          </div>
        </div>

        <span className="my-[34px] block text-center">
          لطفا باندل‌های مورد نظر را انتخاب سپس از لیست ناوگان یک مورد را انتخاب
          کنید.
        </span>

        <Formik
          initialValues={{ fleetId: null }}
          onSubmit={(values) => {
            Mutate({
              jobId: selectedData,
              fleetId: values.fleetId,
            });
            console.log("Form submitted with values:", values);
            // انجام عملیات نهایی مثل ارسال به سرور
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              {transformedData?.length > 0 ? (
                <DynamicTable
                  showIndex={true}
                  isLoading={isLoading}
                  rowKey="id"
                  onRowSelect={handleRowClick}
                  selectionMode="multiple"
                  totalPage={data?.data?.totalCount}
                  pagination={false}
                  rowClassName={"border-2 border-solid border-[#E5E7EB]"}
                  className={"mt-[24px]"}
                  headers={[
                    { key: "id", label: "ID", hidden: true },
                    { key: "bundleCode", label: "کد باندل", sortable: true },
                    {
                      key: "customerName",
                      label: "نام مشتری",
                      sortable: false,
                    },
                    { key: "taxiLine", label: "خط تاکسی", sortable: true },
                    { key: "timeWindow", label: "پنجره زمانی", sortable: true },
                  ]}
                  data={transformedData}
                />
              ) : (
                <div className="text-center text-gray-500 font-semibold mt-10">
                  دیتایی برای تخصیص یافت نشد.
                </div>
              )}

              <AutoComplete
                onChange={(selected: any) =>
                  setFieldValue("fleetId", selected.value)
                }
                inputClassName="rounded-[13px] border border-gray-300"
                className=" rounded-[13px] mt-[34px] mb-[50px]"
                name="fleetId"
                options={FleetSharedData?.data}
                label="ناوگان اشتراکی"

                // icon={<TraficJamIcon />}
                // onChange={(selected: any) => setFleetService(selected.value)}
              />
              <div className="flex justify-start ">
                <button
                  type="submit"
                  disabled={BlockLoading}
                  className="px-[42px] py-3 bg-[#FF866A] hover:bg-[#FFA18B] text-white rounded-[16px] font-medium"
                >
                  {BlockLoading ? <Loading /> : " ایجاد ماموریت و تخصیص"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default NewMission;
