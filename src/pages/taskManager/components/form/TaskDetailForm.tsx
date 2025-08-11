import React, { useState ,useEffect,useRef} from "react";
import TableCell from "../../../../components/tools/table/TableCell";
import ScanModal from "../../../../components/tools/modal/ScannModal";
import {ReactComponent as WarningIcon} from "../../../../components/icons/svg/YellowWarningIcon.svg";
import DetailButton from "../../../../components/tools/button/DetailButton";
import ReturnedIcon from "../../../../components/icons/components/ReturnedIcon";
import ScanSvg from "../../../../components/icons/components/ScanSvg";
import {ReactComponent as TaskManagmentIcon} from "../../../../components/icons/svg/taskManagementIcon.svg"
import ScanData from "../modal/scanData";
import { useNavigate } from "react-router-dom";
import Tag from "../../../../components/tools/tags/Tag";
import {
  GetAllJobs,
  ScanAcceptance,
  BarcodeAssignment,
  ScanDelivery,
  ScanReturn,
} from "../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import {
  useReactQuery,
  useReactMutation,
} from "../../../../components/hooks/query/useReactQuery";
import NumberCounter from "../../../../components/tools/counter/NumberCounter";
import AcceptanceIcon from "../../../../components/icons/components/AcceptanceSvg";
import DeliveryIcon from "../../../../components/icons/components/DeliverySvg";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import { ReactComponent as ScannIcon } from "../../../../components/icons/svg/scannIcon.svg";
import DynamicTable from "../../../../components/tools/table/DynamicTable";
import Modal from "../../../../components/tools/modal/madal";
import BarcodeScannerListener from "../../../../components/tools/scanner/BarcodeScannerListener";
import { boolean, number, string } from "yup";
interface TaskDetailFormProps {
  activeButton: any;
  onActiveChange: (value: "acceptance" | "delivery" | "return") => void;
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
    url: GetAllJobs(searchQuery),
    method: HttpMethod.POST,
    model: {
      fleetId: 0,
      zoneId: 0,
      timeWindowId: 0,
      statusId: 0,
    },
  };
  const { data, isLoading, isError, error, refetch } =
    useReactQuery(apiDetails);
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
    if (data?.data?.["acceptance"]?.length === 0 && data?.data?.isSuccess) {
      if (data?.data?.["delivery"]?.length === 0 && data?.data?.isSuccess) {
      } else {
        setInternalActiveButton("delivery");
        onActiveChange?.("delivery");
      }
    }
  }, [data]);

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
            setScannedDataModal(true);
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
  else if (activeButton === "return") {

    returnScanMutate(
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
                description: data?.data?.description,
                message: data?.data?.message,
              },
            ]);
                setVisible(false);
                setScannedDataModal(true);
                refetch();
          } else {
            // CreateToast(
            //   ToastType.ERROR,
            //   data?.data?.message || "Failed to close bundle."
            // );
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
                  setScannedDataModal(true);
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
  const transformedData = data?.data?.[activeButton]?.map((item: any) => ({
    original: item,
    bundleId: item.bundleId,
    barcode: <TableCell>{item.barcode}</TableCell>,
    orderId: <TableCell>{item.orderId}</TableCell>,
    customer: <TableCell>{item.customer}</TableCell>,
    orderTypeTitle: (
      <Tag
        categoryName="orderType"
        id={item.orderType?.id}
        className="custom-class"
      />
    ),
    parcel: (
      <NumberCounter
        value1={item.totalParcelCount}
        value2={item.scannedCount}
      />
    ),
    deliverTimeWindowTitle: (
      <TableCell>{item.deliverTimeWindowTitle}</TableCell>
    ),
    bundleStatusTitle: (
      <Tag
        categoryName="bundleStatus"
        id={item.bundleStatus.id}
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
    else if (activeButton === "return") {
      returnScanMutate(
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
              // CreateToast(
              //   ToastType.ERROR,
              //   data?.data?.message || "Failed to close bundle."
              // );
            }
          },
        }
      );
    } 
    else if (activeButton === "delivery") {

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

  return (
    <div className="w-full bg-white p-6 mt-[25px] rounded-[25px]">
      {/* {(activeButton === "acceptance" || activeButton === "return") && ( */}
      <BarcodeScannerListener onScan={handleScan} />
      {/* )} */}

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <button
            className={`flex flex-col items-center px-4 py-2 rounded-md ${
              activeButton === "acceptance"
                ? "text-[#FF7959]"
                : "text-gray-700 bg-white"
            }`}
            onClick={() => onActiveChange("acceptance")}
          >
            <AcceptanceIcon
              color={activeButton === "acceptance" ? "#FF7959" : "#6B7280"}
            />
            <span className="pt-2"> پذیرش (ورودی)</span>
          </button>
          <button
            className={`flex flex-col items-center px-4 py-2 rounded-md ${
              activeButton === "delivery"
                ? "text-[#FF7959]"
                : "text-gray-700 bg-white"
            }`}
            onClick={() => onActiveChange("delivery")}
          >
            <DeliveryIcon
              color={activeButton === "delivery" ? "#FF7959" : "#6B7280"}
            />
            <span className="pt-2"> تحویل (خروجی)</span>
          </button>
          <button
            className={`flex flex-col items-center px-4 py-2 rounded-md ${
              activeButton === "return"
                ? "text-[#FF7959]"
                : "text-gray-700 bg-white"
            }`}
            onClick={() => onActiveChange("return")}
          >
            <ReturnedIcon
              strokeColor={activeButton === "return" ? "#FF7959" : "#6B7280"}
              strokeWidth={1.5}
            />
            <span className="pt-2">مرجوعی</span>
          </button>
        </div>

        <button
          onClick={() => setVisible(true)}
          // onClick={() => setScannedDataModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-[#FF7959] rounded-[12px]"
        >
          <ScannIcon />
          <span>ورود دستی بارکد</span>
        </button>
      </div>

      <div className="mt-6 h-[540px]">
        {!data?.data?.isSuccess && data?.data?.["acceptance"]?.length === 0 ? (
          <>
            <TaskManagmentIcon className="mx-auto my-auto" />
            <div className="flex flex-col justify-center items-center font-bold mt-[35px]">
              <span>موردی یافت نشد</span>
              <span>هنوز تسکی برای شما اختصاص داده نشده</span>
            </div>
          </>
        ) : (
          <div className=" max-h-[520px]">
            <DynamicTable
              rowKey="bundleId"
              onRowSelect={onRowClick}
              isLoading={isLoading}
              pagination={false}
              rowClassName={"border-2 border-solid border-[#E5E7EB]"}
              className={"mt-[24px]"}
              headers={[
                { key: "bundleId", label: "ID", hidden: true },
                { key: "barcode", label: "کد باندل", sortable: true },
                { key: "orderId", label: "شماره سفارش", sortable: false },
                { key: "customer", label: "مشتری", sortable: true },
                { key: "orderTypeTitle", label: "نوع سرویس", sortable: true },
                { key: "parcel", label: "مرسوله ها", sortable: false },
                {
                  key: "deliverTimeWindowTitle",
                  label: "پنجره زمانی",
                  sortable: false,
                },
                { key: "bundleStatusTitle", label: "وضعیت", sortable: false },
                { key: "button", label: "", sortable: false },
              ]}
              data={transformedData}
              selectionMode={"single"}
            />
          </div>
        )}
      </div>

      {visible && (
        <ScanModal
          loading={
            activeButton === "acceptance" || "return"
              ? scanLoading
              : deliveryLoading
          }
          onConfirm={onConfirmClick}
          titleIcon={<ScanSvg strokeColor="#FF7959" />}
          title="ورود دستی بارکد"
          onCancel={cancelDelete}
          confirmText="تایید پذیرش"
          cancelText="بیخیال"
        />
      )}
      {barcodeModalVisible && (
        <ScanModal
          onConfirm={onBarcodeConfirmClick}
          title="تخصیص بارکد"
          onCancel={barcodeCancelDelete}
          confirmText="تایید بارکد"
          cancelText="بیخیال"
        />
      )}
      {/* {ConfirmModal && (
        <Modal
          titleIcon={<AcceptanceIcon color={"#FF866A"} />}
          cancelButtonTextColor="bg-[#FF866A]"
          confirmButtonColor="bg-[#FF866A]"
          cancelButtonColor="bg-[#FFF2ED]"
          onConfirm={() => setConfirmModal(false)}
          title="پذیرش مرسوله"
          onCancel={() => setConfirmModal(false)}
          confirmText="تایید پذیرش"
          cancelText="بیخیال"
          message={
            <>
              <span className="font-bold">
                مرسوله {scanData?.data?.parcelId}
              </span>{" "}
              در
              <span className="font-bold">
                {" "}
                باندل {scanData?.data?.barcode}{" "}
              </span>{" "}
              قرار می‌گیرد.
              <br />
              مرسوله‌های پذیرش شده:{" "}
              <span className="text-black">
                {" "}
                {scanData?.data?.scannedCount}
              </span>
              /
              <span className={"text-[#F05252]"}>
                {scanData?.data?.scannedCount}
              </span>
            </>
          }
        />
      )} */}
      {/* {completeConfirmModal && (
        <Modal
          titleIcon={<AcceptanceIcon color={"#046C4E"} />}
          cancelButtonTextColor="bg-[#046C4E]"
          confirmButtonColor="bg-[#046C4E]"
          cancelButtonColor="bg-[#DEF7EC]"
          onConfirm={() => setCompleteConfirmModal(false)}
          title="پذیرش مرسوله"
          onCancel={() => setCompleteConfirmModal(false)}
          confirmText="تایید پذیرش"
          cancelText="بیخیال"
          message={
            <>
              <span className="font-bold">
                مرسوله {scanData?.data?.parcelId}
              </span>{" "}
              در
              <span className="font-bold">
                {" "}
                باندل {scanData?.data?.barcode}{" "}
              </span>{" "}
              قرار می‌گیرد.
              <br />
              مرسوله‌های پذیرش شده:{" "}
              <span className="text-black">
                {" "}
                {scanData?.data?.scannedCount}
              </span>
              /
              <span className={`text-[#0E9F6E]`}>
                {scanData?.data?.scannedCount}
              </span>
              <br />
              <span className="font-bold text-[#0E9F6E]">باندل تکمیل شد.</span>
            </>
          }
        />
      )} */}
      {errorModal && (
        <Modal
          titleIcon={<WarningIcon />}
          cancelButtonTextColor="bg-[#FACA15]"
          confirmButtonColor="bg-[#FACA15]"
          cancelButtonColor="bg-[#FDFDEA]"
          onConfirm={handleErrorModalClick}
          title="هشدار"
          onCancel={() => setErrorModal(false)}
          confirmText="تلاش مجدد"
          cancelText="بیخیال"
          message={scanData?.data?.message}
        />
      )}
      {scannedDataModal && (
        <ScanData
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
