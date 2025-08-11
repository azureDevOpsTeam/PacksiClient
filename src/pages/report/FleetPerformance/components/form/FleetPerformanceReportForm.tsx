import React, { useState, useEffect, useMemo } from "react";
import TableCell from "../../../../../components/tools/table/TableCell";
import ScanModal from "../../../../../components/tools/modal/ScannModal";
import DetailButton from "../../../../../components/tools/button/DetailButton";
import ButtonSheet from "../ButtonSheet";
import { ReactComponent as TaskManagmentIcon } from "../../../../../components/icons/svg/taskManagementIcon.svg";
import { useNavigate } from "react-router-dom";
import Tag from "../../../../../components/tools/tags/Tag";
import { GetFleetPerformansReport } from "../../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../../models/enums/HttpMethod";
import { useReactQuery } from "../../../../../components/hooks/query/useReactQuery";
import NumberCounter from "../../../../../components/tools/counter/NumberCounter";
import DynamicTable from "../../../../../components/tools/table/DynamicTable";

interface TaskDetailFormProps {
  activeButton: any;
  onActiveChange: (value: "acceptance" | "delivery" | "return") => void;
  searchQuery: any;
}

const FleetPerformanceReportForm: React.FC<TaskDetailFormProps> = ({
  activeButton,
  onActiveChange,
  searchQuery,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [barcodeModalVisible, setBarcodeModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [internalActiveButton, setInternalActiveButton] =
    useState(activeButton);

  const [selectedData, setSelectedData] = useState([]);

  const scanApiDetail = useMemo(
    () => ({
      url: GetFleetPerformansReport,
      method: HttpMethod.POST,
      body: {
        pageNumber: currentPage,
        pageSize: 5,
        fleetIds: null,
        zoneId: 0,
        statusId: null,
        from: null,
        to: null,
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
  const handleRowSelect = (rows: any) => {
    setSelectedData(rows);
  };
  const handleBarcodeAssignmentClick = (value: any) => {
    setBarcodeModalVisible(true);
  };

  // #endregion

  // #region TransformedData
  const transformedData = data?.data?.reports?.map((item: any) => ({
    original: item,
    id: item.id,
    missionCode: item.missionCode,
    fullName: <TableCell>{item.fullName}</TableCell>,
    missionStartDatePersian: (
      <TableCell>{item.missionStartDatePersian}</TableCell>
    ),
    distributionTimeRange: <TableCell>{item.distributionTimeRange}</TableCell>,
    zone: <TableCell>{item.zone}</TableCell>,
    lastStatus: (
      <Tag
        categoryName="missionStatus"
        id={item.lastStatusType}
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
  // #endregion

  return (
    <div className="w-full bg-white p-6 mt-[25px] rounded-[25px]">
      <ButtonSheet
        selectedRowData={selectedData}
        totalCount={data?.data?.totalCount}
      />

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
            onRowSelect={handleRowSelect}
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
              { key: "fullName", label: "پرسنل ناوگان", sortable: true },
              { key: "missionCode", label: "کد ماموریت", sortable: false },
              {
                key: "distributionTimeRange",
                label: "بازه توزیع",
                sortable: true,
              },
              {
                key: "zone",
                label: "ناحیه",
                sortable: true,
              },
              {
                key: "lastStatus",
                label: "آخرین وضعیت ماموریت",
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

export default FleetPerformanceReportForm;
