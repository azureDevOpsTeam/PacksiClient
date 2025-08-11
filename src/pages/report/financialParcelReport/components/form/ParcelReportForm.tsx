import React, { useState ,useEffect,useMemo} from "react";
import TableCell from "../../../../../components/tools/table/TableCell";
import ScanModal from "../../../../../components/tools/modal/ScannModal";
import { ReactComponent as TaskManagmentIcon } from "../../../../../components/icons/svg/taskManagementIcon.svg";
import { useNavigate } from "react-router-dom";
import Tag from "../../../../../components/tools/tags/Tag";
import {
  GetFinancialParcelReport,
  GetCustomersDropDown,
} from "../../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../../models/enums/HttpMethod";
import {
  useReactMutation,
  useReactQuery,
} from "../../../../../components/hooks/query/useReactQuery";
import Filter from "../../../../../components/tools/filters/Filter";
import DynamicTable from "../../../../../components/tools/table/DynamicTable";
import { Label } from "recharts";
import { date } from "yup";

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
    const [selectedValues, setSelectedValues] = useState<Record<string, any>>(
      {}
    );
  const [visible, setVisible] = useState(false);
  const [internalActiveButton, setInternalActiveButton] = useState(activeButton);
    type FilterType = "normal" | "dropDown" | "date";
    interface OptionType {
      value: string | number | boolean;
      label: string;
    }
 
  interface FilterItem {
    value?: number;
    label?: string;
    icon?: React.ReactNode;
    multiSelect?: boolean;
    category?: string;
    type: FilterType; // ✅ تایپ محدود
    options?: OptionType[];
    url?: string | undefined;
  }
   const apiDetails = {
     url: GetCustomersDropDown,
     method: HttpMethod.GET,
   };

   const { data: customerData, isLoading: CustomerLoading } =
     useReactQuery(apiDetails);
const filters: Record<string, FilterItem> = {
  all: {
    label: "همه",
    category: "status",
    type: "normal", // ✅ دقیقا یکی از نوع‌های مجاز
  },
  customer: {
    value: 1,
    label: "مشتری",
    category: "customer",
    multiSelect: false,
    type: "dropDown", // ✅ مجاز
    options: customerData?.data,
  },
  serviceType: {
    value: 2,
    label: "سرویس",
    category: "serviceType",
    multiSelect: false,
    type: "dropDown",
    options: [
      { value: 1, label: "بافرحمل" },
      { value: 2, label: "بافر" },
      { value: 3, label: "پودو" },
      { value: 4, label: "دارک استور" },
    ],
  },
  date: {
    value: 3,
    label: "تاریخ",
    category: "data",
    multiSelect: false,
    type: "date",

  },
  status: {
    value: 1,
    label: "وضعیت",
    category: "isActive",
    multiSelect: false,
    type: "dropDown", // ✅ مجاز
    options: [
      { value: true, label: "فعال" },
      { value: false, label: "غیرفعال" },
    ],
  },
  // date: {
  //   value: 7,
  //   label: "تاریخ",
  //   category: "date",
  //   type: "date", // ✅ مجاز
  // },
};

const removeZeroFields = (obj: Record<string, any>) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== 0 || null) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
};
 console.log("selectedValues", selectedValues);
const scanApiDetail = {
  url: GetFinancialParcelReport,
  method: HttpMethod.POST,
  // body: {
  //   pageNumber: currentPage,
  //   pageSize: 5,
  //   ...filteredValues,
  // },
};


    const {
      data,
      mutate,
      isLoading,
      isError: scanIsError,
      error: scanError,
    } = useReactMutation(scanApiDetail);

  useEffect(() => {
    const filteredValues = removeZeroFields(selectedValues || {});
    mutate({ pageNumber: currentPage, pageSize: 5, ...filteredValues });
  }, [selectedValues, currentPage]);
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

const handleFilterChange = (values: {
  dropdownSelections: Record<string, (string | number)[]>;
  selectedDateRange: { dateFrom: string; dateTo: string } | null;
}) => {
  console.log("values", values);

  const { dropdownSelections, selectedDateRange } = values;

  const filtersPayload = {
    customerId: dropdownSelections["customer"]?.[0] ?? 0,
    orderTypeId: dropdownSelections["serviceType"]?.[0] ?? 0,
    statusId: dropdownSelections["isActive"]?.[0] ?? 0,
    dateFrom: selectedDateRange?.dateFrom ?? null,
    dateTo: selectedDateRange?.dateTo ?? null,
  };
  setSelectedValues(filtersPayload);
  console.log("filtersPayload:", filtersPayload);
  // call API, set state, etc...
};

  // #region OnClick func
  // const handleErrorModalClick=()=>{
  //   setErrorModal(false)
  //   setVisible(true)
  // }

  // const handleBarcodeAssignmentClick = (value: any) => {
  //   setBarcodeModalVisible(true);
  // };
  // const handleRowClick=(rows:any)=>{
  //  setSelectedData(rows)
  
  // }
  // #endregion

  // #region TransformedData
  const transformedData = data?.data?.items?.map((item: any) => ({
    original: item,
    id: item.orderId,
    parcelId:item.parcelId,
    orderId: item.orderId,
    customerName: <TableCell>{item.customerName}</TableCell>,
    parcelCount: <TableCell>{item.parcelCount}</TableCell>,
    basePrice: <TableCell>{item.basePrice}</TableCell>,
    orderType: (
      <Tag
        categoryName="orderType"
        id={item.orderType.id}
        className="custom-class"
      />
    ),
    parcelStatus: (
      <Tag
        categoryName="orderStatus"
        id={item.parcelStatus.id}
        className="custom-class"
      />
    ),
    receptionTime: <TableCell>{"۱۴۰۳/۱۱/۱۸-۱۶:۰۸"}</TableCell>,
    totalCost: <TableCell>{item.totalCost}</TableCell>,
    createDate: <TableCell>{item.createDate}</TableCell>,
    status: (
      <Tag
        categoryName="parcelStatus"
        id={item.statusId}
        className="custom-class"
      />
    ),

    // button:
    //   activeButton === "acceptance" ? (
    //     <DetailButton
    //       onFirstClick={() => handleButtonClick(item.bundleId)}
    //       onSecondClick={() => handleBarcodeAssignmentClick(item.bundleId)}
    //       firstText={"مشاهده باندل"}
    //       secondText={"تخصیص بارکد"}
    //     />
    //   ) : (
    //     <DetailButton
    //       onFirstClick={() => handleButtonClick(item.bundleId)}
    //       firstText={"مشاهده باندل"}
    //     />
    //   ),
  }));

  return (
    <div className="w-full bg-white p-6 mt-[25px] rounded-[25px]">
      <Filter filters={filters} onChange={handleFilterChange} />

      <div className="mt-6 h-[600px]">
        {!data?.data?.isSuccess && data?.data?.reports?.length === 0 ? (
          <>
            <TaskManagmentIcon className="mx-auto my-auto" />
            <div className="flex flex-col justify-center items-center font-bold mt-[35px]">
              <span>موردی یافت نشد</span>
              <span>گزارشی برای نمایش وجود ندارد</span>
            </div>
          </>
        ) : (
          <div className="">
            <DynamicTable
              showIndex={true}
              rowKey="id"
              onRowSelect={(rows: any) => console.log(rows)}
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
                { key: "parcelId", label: "شماره مرسوله", sortable: true },
                { key: "customerName", label: "مشتری", sortable: false },
                { key: "orderId", label: "شماره سفارش", sortable: true },
                {
                  key: "orderType",
                  label: "سرویس",
                  // sortable: true,
                },
                { key: "basePrice", label: "هزینه سرویس", sortable: false },
                {
                  key: "createDate",
                  label: "تاریخ",
                  sortable: false,
                }, 
                { key: "totalCost", label: "هزینه نهایی", sortable: false },
                { key: "parcelStatus", label: "آخرین وضعیت", sortable: false },
              ]}
              data={transformedData}
            />
          </div>
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
