import React, { useState ,useEffect,useMemo} from "react";
import TableCell from "../../../../../components/tools/table/TableCell";
import ScanModal from "../../../../../components/tools/modal/ScannModal";
import ReturnedIcon from "../../../../../components/icons/components/ReturnedIcon";
import DetailButton from "../../../../../components/tools/button/DetailButton";
import ButtonSheet from "../../components/ButtonSheet";
import { ReactComponent as TaskManagmentIcon } from "../../../../../components/icons/svg/taskManagementIcon.svg";
import { useNavigate } from "react-router-dom";
import Tag from "../../../../../components/tools/tags/Tag";
import {
GetParcelsReport
} from "../../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../../models/enums/HttpMethod";
import {
  useReactQuery,
} from "../../../../../components/hooks/query/useReactQuery";
import NumberCounter from "../../../../../components/tools/counter/NumberCounter";
import AcceptanceIcon from "../../../../../components/icons/components/AcceptanceSvg";
import DeliveryIcon from "../../../../../components/icons/components/DeliverySvg";
import DynamicTable from "../../../../../components/tools/table/DynamicTable";

interface TaskDetailFormProps {
  activeButton: any;
  onActiveChange: (value: "acceptance" | "delivery" | "return") => void;
  searchQuery: any;
}
const TaskDetailForm: React.FC<TaskDetailFormProps> = ({
  activeButton,
  onActiveChange,
  searchQuery,
}) => {

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [barcodeModalVisible, setBarcodeModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [internalActiveButton, setInternalActiveButton] = useState(activeButton);
  const [errorModal,setErrorModal]=useState(false);
  const [selectedData, setSelectedData] = useState([]);



    const scanApiDetail = useMemo(
      () => ({
        url: GetParcelsReport,
        method: HttpMethod.POST,
        body: {
          pageNumber: currentPage,
          pageSize: 5,
          servicetypeId: 0,
          microhub: 0,
          from: null,
          to: null,
          statusId: 0,
          type: internalActiveButton === "acceptance" ? 1 : 2,
        },
      }),
      [currentPage, internalActiveButton]
    );
  


    const {
      data,
      isLoading,
      isError: scanIsError,
      error: scanError,
    } = useReactQuery(scanApiDetail);
  useEffect(() => {
    setInternalActiveButton(activeButton);
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


  // #region OnClick func
  const handleErrorModalClick=()=>{
    setErrorModal(false)
    setVisible(true)
  }

  const handleBarcodeAssignmentClick = (value: any) => {
    setBarcodeModalVisible(true);
  };
  const handleRowClick=(rows:any)=>{
   setSelectedData(rows)
  
  }
  // #endregion

  // #region TransformedData
  const transformedData = data?.data?.reports?.map((item: any) => ({
    original: item,
    id: item.parcelId,
    customerName: <TableCell>{item.customerName}</TableCell>,    parcelNumber: <TableCell>{item.parcelNumber}</TableCell>,
    customer: <TableCell>{item.customer}</TableCell>,
    serviceType: (
      <Tag
        categoryName="orderType"
        id={item.serviceTypeId}
        className="custom-class"
      />
    ),
    parcel: (
      <NumberCounter
        value1={item.totalParcelCount}
        value2={item.scannedCount}
      />
    ),
    receptionTime: <TableCell>{"۱۴۰۳/۱۱/۱۸-۱۶:۰۸"}</TableCell>,
    recepterMicrohub: <TableCell>{item.recepterMicrohub}</TableCell>,
    status: (
      <Tag
        categoryName="parcelStatus"
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

  return (
    <div className="w-full bg-white p-6 mt-[25px] rounded-[25px]">
      <ButtonSheet
        selectedRowData={selectedData}
        totalCount={data?.data?.totalCount}
        internalActiveButton={internalActiveButton}
      />

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
            <span className="pt-2"> تحویل (خروجی)</span>
          </button>
        </div>
      </div>

      <div className="mt-6 h-[520px]">
        {!data?.data?.isSuccess && data?.data?.reports?.length === 0 ? (
          <>
            <TaskManagmentIcon className="mx-auto my-auto" />
            <div className="flex flex-col justify-center items-center font-bold mt-[35px]">
              <span>موردی یافت نشد</span>
              <span>هنوز تسکی برای شما اختصاص داده نشده</span>
            </div>
          </>
        ) : (
          <DynamicTable
            showIndex={true}
            rowKey="id"
            onRowSelect={(rows: any) => handleRowClick(rows)}
            selectionMode="multiple"
            onPageChange={setCurrentPage}
            isLoading={isLoading}
            totalPage={data?.data?.totalCount}
            currentPageNumber={currentPage}
            pagination={true}
            rowClassName={"border-2 border-solid border-[#E5E7EB]"}
            className={"mt-[24px]"}
            headers={[
              { key: "ID", label: "ID", hidden: true },
              { key: "customerName", label: "مشتری", sortable: true },
              { key: "parcelNumber", label: "شماره مرسوله", sortable: false },
              { key: "serviceType", label: "نوع سرویس", sortable: true },
              {
                key: "recepterMicrohub",
                label: "میکروهاب پذیرش",
                sortable: true,
              },
              { key: "receptionTime", label: "زمان پذیرش", sortable: false },
              {
                key: "status",
                label: "وضعیت",
                sortable: false,
              },
            ]}
            data={transformedData}
          />
        )}
      </div>

      {visible && (
        <ScanModal
          // onConfirm={onConfirmClick}
          title="اسکن کد"
          onCancel={cancelDelete}
          confirmText="تایید بارکد"
          cancelText="بیخیال"
        />
      )}
      {barcodeModalVisible && (
        <ScanModal
          // onConfirm={onBarcodeConfirmClick}
          title="تخصیص بارکد"
          onCancel={barcodeCancelDelete}
          confirmText="تایید بارکد"
          cancelText="بیخیال"
        />
      )}
    </div>
  );
};

export default TaskDetailForm;
