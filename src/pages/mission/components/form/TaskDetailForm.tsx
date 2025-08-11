import React, { useState ,useEffect,useRef} from "react";
import TableCell from "../../../../components/tools/table/TableCell";
import DetailButton from "../../../../components/tools/button/DetailButton";
import SharedFleet from "../../../../components/icons/components/SharedFleet";
import ExclusiveFleet from "../../../../components/icons/components/ExclusiveFleet";
import NewMission from "../modal/NewMission";
import {ReactComponent as TaskManagmentIcon} from "../../../../components/icons/svg/taskManagementIcon.svg"
import ScanData from "../modal/scanData";
import { useNavigate } from "react-router-dom";
import Tag from "../../../../components/tools/tags/Tag";
import {
  ScanAcceptance,
  BarcodeAssignment,
  GetMission,
  ScanDelivery,
  ScanReturn,
} from "../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import {
  useReactQuery,
  useReactMutation,
} from "../../../../components/hooks/query/useReactQuery";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import {ReactComponent as PlusIcon} from "../../../../components/icons/svg/pluseWhiteIcon.svg";
import DynamicTable from "../../../../components/tools/table/DynamicTable";
import BarcodeScannerListener from "../../../../components/tools/scanner/BarcodeScannerListener";
import { boolean, number, string } from "yup";
interface TaskDetailFormProps {
  activeButton: any;
  onActiveChange: (value: "shared" | "exclusive"  ) => void;
  searchQuery: any;
}
 export const scannedDataType ={
  parcelBarcode :string,
  bundleBarcode:string,
  scannedParcelCount:number,
  totalParcelCount:number,
  isSuccess:boolean,
  description:string,
  message:string
}

const  TaskDetailForm: React.FC<TaskDetailFormProps> = ({
  activeButton,
  onActiveChange,
  searchQuery,
}) => {
  const [completeConfirmModal, setCompleteConfirmModal] = useState(false);
  const [ConfirmModal, setConfirmModal] = useState(false);
  const navigate = useNavigate();
  const triggeredByConfirm = useRef(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [barcodeModalVisible, setBarcodeModalVisible] = useState(false);
  const [scanValue, setScanValue] = useState("");
  const [scannedDataModal, setScannedDataModal]=useState(false);
  const [scannedData, setScannedData] = useState<(typeof scannedDataType)[]>(
    []
  );
  const [visible, setVisible] = useState(false);
  const [internalActiveButton, setInternalActiveButton] =
    useState(activeButton);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    setInternalActiveButton(activeButton);
    setScannedData([]);
  }, [activeButton]);

  /////function///////
  const cancelDelete = () => {
    setVisible(false);
  };
  const barcodeCancelDelete = () => {
    setBarcodeModalVisible(false);
  };
  const handleButtonClick = (id: string) => {
    navigate(`/bundleDetail/${id}`, {
      state: { showButton: true },
    });
  };

  //// Api Request ////
  // #region BarcodeAssignmentApi

  const BarcodeAssignmentApiDetail = {
    url: BarcodeAssignment,
    method: HttpMethod.POST,
    // body: {
    //   barcode: scanBarcodeValue,
    //   bundleId: selectedRow,
    // },
  };
  const { mutate: BarcodeMutate, data: BarcodeData } = useReactMutation(
    BarcodeAssignmentApiDetail
  );
  const { data: BarcodeAssignmentData } = useReactQuery(
    BarcodeAssignmentApiDetail
  );

  // #endregion
  // #region Get Jobs Request
  const apiDetails = {
    url: GetMission,
    method: HttpMethod.POST,
    body: {
      model: {
        fleetId: 0,
        zoneId: 0,
        timeWindowId: 0,
        statusId: 0,
      },
    },
  };
  const { data, isLoading, isError, error, refetch } =
    useReactQuery(apiDetails);
  console.log("data", data);
  // #endregion
  // #region scanApi Request
  const scanApiDetail = {
    url: ScanAcceptance,
    method: HttpMethod.POST,
    // body: {
    //   barcode: scanValue,
    // },
  };
  const deliveryScanApiDetail = {
    url: ScanDelivery,
    method:HttpMethod.POST
  };
    const returnScanApiDetail = {
      url: ScanReturn,
      method: HttpMethod.POST,
    };
  const { mutate: returnScanMutate, data: ReturnScanData } =
    useReactMutation(returnScanApiDetail);

  const{
    mutate:deliveryScanMutate,
    isLoading:deliveryLoading,
    data:deliveryScanData,
  } = useReactMutation(deliveryScanApiDetail);

  const {
    mutate: scanMutate,
    isLoading: scanLoading,
    data: scanData,
  } = useReactMutation(scanApiDetail);

  // #endregion
  // #region closeBundle request

  // #endregion
  useEffect(() => {
    if (data?.data?.["shared"]?.length === 0 && data?.data?.isSuccess) {
      if (data?.data?.["exclusive"]?.length === 0 && data?.data?.isSuccess) {
      } else {
        setInternalActiveButton("exclusive");
        onActiveChange?.("exclusive");
      }
    }
  }, [data]);

  // useEffect(() => {
  //   if (triggeredByConfirm.current && BarcodeAssignmentData?.data) {
  //     if (BarcodeAssignmentData.data.isSuccess === false && scanValue !== "") {
  //       CreateToast(ToastType.ERROR, BarcodeAssignmentData.data.message);
  //       setBarcodeModalVisible(false);
  //     } else if (BarcodeAssignmentData.data.isSuccess === true) {
  //       CreateToast(ToastType.SUCCESS, BarcodeAssignmentData.data.message);
  //       setBarcodeModalVisible(false);
  //       refetch();
  //     }
  //     triggeredByConfirm.current = false;
  //   }
  // }, [BarcodeAssignmentData]);

  useEffect(() => {
    if (triggeredByConfirm.current && scanData?.data && !scannedDataModal) {
      if (
        (scanData.data.isSuccess === false ||
          deliveryScanData?.data.isSuccess === false ||
          ReturnScanData?.data.isSuccess === false) &&
        scanValue !== ""
      ) {
        setErrorModal(true);
        setVisible(false);
      } else if (scanData.data.isSuccess === true) {
        if (scanData?.data?.scannedCount === scanData?.data?.totalCount) {
          setCompleteConfirmModal(true);

        } else {
          setConfirmModal(true);

        }
        // CreateToast(ToastType.SUCCESS, scanData.data.message);
        setVisible(false);
        refetch();
      }
      triggeredByConfirm.current = false;

    }
  }, [scanData]);

  // #region OnClick func
  const handleErrorModalClick = () => {
    setErrorModal(false);
    setVisible(true);
  };

  const handleBarcodeAssignmentClick = (value: any) => {
    setBarcodeModalVisible(true);
  };

  const onBarcodeConfirmClick = (value: any) => {
    BarcodeMutate(
      { barcode: value.myField, bundleId: selectedRow },
      {
        onSuccess: (data) => {
          if (data?.data?.isSuccess) {
            CreateToast(
              ToastType.SUCCESS,
              data.data?.message || "Bundle closed successfully."
            );
            refetch();
          } else {
            CreateToast(
              ToastType.ERROR,
              data?.data?.message || "Failed to close bundle."
            );
          }
        },
      }
    );
    setBarcodeModalVisible(false);
  };
  const onConfirmClick = (value: any) => {
  if (activeButton === "acceptance") {
    scanMutate(
      {
        barcode: value.myField,
      },
      {
        onSuccess: (data) => {
          if (data?.data?.isSuccess) {
            setScannedData((prev) => [
              ...prev,
              {
                parcelBarcode: data?.data?.parcelBarcode,
                bundleBarcode: data?.data?.bundleBarcode,
                scannedParcelCount: data?.data?.scannedCount,
                totalParcelCount: data?.data.totalCount,
                isSuccess: data?.data?.isSuccess,
                description:data?.data?.description,
                message: data?.data?.message,
              },
            ]);
            setVisible(false)
            // setScannedDataModal(true);
            refetch();
          } else {
            //  CreateToast(
            //    ToastType.ERROR,
            //    data?.data?.message || "Failed to close bundle."
            //  );
          }
        },
      }
    );
  } 

  else if (activeButton === "delivery") {
    deliveryScanMutate(
      {
        barcode: value.myField,
      },
      {
        onSuccess: (data) => {
          if (data?.data?.isSuccess) {
            setScannedData((prev) => [
              ...prev,
              {
                parcelBarcode: data?.data?.parcelBarcode,
                bundleBarcode: data?.data?.bundleBarcode,
                description: data?.data?.description,
                scannedParcelCount: data?.data?.scannedCount,
                totalParcelCount: data?.data.totalCount,
                isSuccess: data?.data?.isSuccess,
                message: data?.data?.message,
              },
            ]);

                  setVisible(false);
                  // setScannedDataModal(true);
                  refetch();
          } else {
            //  CreateToast(
            //    ToastType.ERROR,
            //    data?.data?.message || "Failed to close bundle."
            //  );
          }
        },
      }
    );
  }
    setScanValue(value.myField.trim());
    triggeredByConfirm.current = true;
  };

  const onRowClick = (value: any) => {
    setSelectedRow(value[0]?.bundleId);

  };

  // #endregion

  // #region TransformedData
  const transformedData = data?.data?.map((item: any) => ({
    original: item,
    id: item.id,
    missionCode: <TableCell>{item.missionCode}</TableCell>,
    driver: <TableCell>{item.driver}</TableCell>,
    startDate: <TableCell>{item.startDate}</TableCell>,
    endDate: (
      <TableCell>{item.startDate}</TableCell>
      // <Tag
      //   categoryName="orderType"
      //   id={item.orderType?.id}
      //   className="custom-class"
      // />
    ),
    taxiLine: <TableCell>{item.taxiLine}</TableCell>,
    timeWindow: (
      <TableCell>{item.timeWindow}</TableCell>
      // <NumberCounter
      //   value1={item.totalParcelCount}
      //   value2={item.scannedCount}
      // />
    ),
    deliverTimeWindowTitle: (
      <TableCell>{item.deliverTimeWindowTitle}</TableCell>
    ),
    status: (
      <Tag
        categoryName="missionStatus"
        id={item.statusId}
        className="custom-class"
      />
    ),

    button:
      activeButton === "acceptance" ? (
        <DetailButton
          onFirstClick={() => handleButtonClick(item.bundleId)}
          onSecondClick={() => handleBarcodeAssignmentClick(item.bundleId)}
          firstText={"مشاهده باندل"}
          secondText={"تخصیص بارکد"}
        />
      ) : (
        <DetailButton
          onFirstClick={() => handleButtonClick(item.bundleId)}
          firstText={"مشاهده باندل"}
        />
      ),
  }));
  // #endregion

  const handleScan = (code: string) => {
    if (activeButton === "acceptance") {

      scanMutate(
        {
          barcode: code,
        },
        {
          onSuccess: (data) => {
            if (data?.data?.isSuccess) {
              setScannedData((prev) => [
                ...prev,
                {
                  parcelBarcode: data?.data?.parcelBarcode,
                  bundleBarcode: data?.data?.bundleBarcode,
                  scannedParcelCount: data?.data?.scannedCount,
                  totalParcelCount: data?.data.totalCount,
                  isSuccess: data?.data?.isSuccess,
                  description: data?.data?.description,
                  message: data?.data?.message,
                },
              ]);
            
                setVisible(false);
                refetch();
                // setScannedDataModal(true);
              
            } else {
              //  CreateToast(
              //    ToastType.ERROR,
              //    data?.data?.message || "Failed to close bundle."
              //  );
            }
          },
        }
      );
    }
 
    else if (activeButton === "exclusive") {

      deliveryScanMutate(
        {
          barcode: code,
        },
        {
          onSuccess: (data) => {
            if (data?.data?.isSuccess) {
              setScannedData((prev) => [
                ...prev,
                {
                  parcelBarcode: data?.data?.parcelBarcode,
                  bundleBarcode: data?.data?.bundleBarcode,
                  scannedParcelCount: data?.data?.scannedCount,
                  totalParcelCount: data?.data.totalCount,
                  isSuccess: data?.data?.isSuccess,
                  description: data?.data?.description,
                  message: data?.data?.message,
                },
              ]);
              setScannedDataModal(true);
            } else {
              //  CreateToast(
              //    ToastType.ERROR,
              //    data?.data?.message || "Failed to close bundle."
              //  );
            }
          },
        }
      );
    }
    setScanValue(code);
    triggeredByConfirm.current = true;
  };
  console.log("scannedDataModal", scannedDataModal);
  return (
    <div className="w-full bg-white p-6 mt-[25px] rounded-[25px]">
      {/* {(activeButton === "acceptance" || activeButton === "return") && ( */}
      <BarcodeScannerListener onScan={handleScan} />
      {/* )} */}

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <button
            className={`flex flex-col items-center px-4 py-2 rounded-md ${
              activeButton === "exclusive"
                ? "text-[#FF7959]"
                : "text-gray-700 bg-white"
            }`}
            onClick={() => onActiveChange("exclusive")}
          >
            <ExclusiveFleet
              strokeColor={activeButton === "exclusive" ? "#FF7959" : "#6B7280"}
            />
            <span className="pt-2">ناوگان انحصاری</span>
          </button>
          <button
            className={`flex flex-col items-center px-4 py-2 rounded-md ${
              activeButton === "shared"
                ? "text-[#FF7959]"
                : "text-gray-700 bg-white"
            }`}
            onClick={() => onActiveChange("shared")}
          >
            <SharedFleet
              strokeColor={activeButton === "shared" ? "#FF7959" : "#6B7280"}
            />
            <span className="pt-2">ناوگان اشتراکی</span>
          </button>
        </div>

        <button
          onClick={() => setScannedDataModal(true)}
          // onClick={() => setScannedDataModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-[#FF7959] rounded-[12px]"
        >
          <PlusIcon />
          <span>ماموریت جدید</span>
        </button>
      </div>

      <div className="mt-6 h-[520px]">
        {!data?.data?.isSuccess && data?.data?.["shared"]?.length === 0 ? (
          <>
            <TaskManagmentIcon className="mx-auto my-auto" />
            <div className="flex flex-col justify-center items-center font-bold mt-[35px]">
              <span>موردی یافت نشد</span>
              <span>هنوز تسکی برای شما اختصاص داده نشده</span>
            </div>
          </>
        ) : (
          <DynamicTable
            rowKey="bundleId"
            onRowSelect={onRowClick}
            isLoading={isLoading}
            pagination={false}
            rowClassName={"border-2 border-solid border-[#E5E7EB]"}
            className={"mt-[24px]"}
            headers={[
              { key: "id", label: "ID", hidden: true },
              { key: "missionCode", label: "کد ماموریت", sortable: true },
              { key: "driver", label: " راننده", sortable: false },
              { key: "startDate", label: "زمان شروع", sortable: true },
              { key: "endDate", label: "زمان پایان", sortable: true },
              { key: "taxiLine", label: "خط تاکسی", sortable: false },
              {
                key: "timeWindow",
                label: "پنجره زمانی",
                sortable: false,
              },
              { key: "status", label: "وضعیت", sortable: false },
              { key: "button", label: "", sortable: false },
            ]}
            data={transformedData}
            selectionMode={"single"}
          />
        )}
      </div>
      {scannedDataModal && (
        <NewMission
          activeButton={activeButton}
          isOpen={scannedDataModal}
          onClose={() => setScannedDataModal(false)}
          data={scannedData}
        />
      )}
    </div>
  );
};

export default TaskDetailForm;
