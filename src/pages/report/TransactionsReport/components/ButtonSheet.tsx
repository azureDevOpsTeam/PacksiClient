import React, { useState } from "react";
import { buttons } from "../../../../assets/mock/mockData";
import { ReactComponent as PrinterIcon } from "../../../../components/icons/svg/printerIcon.svg";
import { ReactComponent as PdfIcon } from "../../../../components/icons/svg/pdfIcon.svg";
import { ReactComponent as ExcelIcon } from "../../../../components/icons/svg/excelIcon.svg";
import ExportToExcel from "../../../../components/tools/fileUpload/ExportToExcel";
import FilterButtons from "../../../../components/tools/button/FilterButtons";
import { useReactMutation } from "../../../../components/hooks/query/useReactQuery";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { GetParcelsReport } from "../../../../setting/ApiUrl";

interface ButtonSheetProps {
  totalCount: number;
  internalActiveButton: string;
  selectedRowData: any[];
}

const ButtonSheet: React.FC<ButtonSheetProps> = ({
  totalCount,
  internalActiveButton,
  selectedRowData,
}) => {
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({});
  const [excelDataReady, setExcelDataReady] = useState<boolean>(false);

  const updateOrderData = {
    url: GetParcelsReport,
    method: HttpMethod.POST,
  };

  const {
    mutate: fetchReport,
    isLoading,
    data,
  } = useReactMutation(updateOrderData);

  const handleFilterButtonClick = (button: {
    id: string;
    value: any;
    label: string;
    category: string;
  }) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [button.category]: button.value,
    }));
  };

  const handleExportToExcel = () => {
    if (selectedRowData?.length > 0) {
      setExcelDataReady(true); // مستقیماً خروجی ردیف‌های انتخاب‌شده را بزن
    } else {
      fetchReport({
        pageNumber: 1,
        pageSize: totalCount,
        servicetypeId: 0,
        microhub: 0,
        from: null,
        to: null,
        statusId: 0,
        type: internalActiveButton === "acceptance" ? 1 : 2,
      });
      setExcelDataReady(true);
    }
  };

  return (
    <>
      <div className="flex flex-row my-4 justify-center items-center">
        <FilterButtons
          buttons={buttons.parcel}
          onButtonClick={handleFilterButtonClick}
        />
        <div className="flex flex-row gap-4">
          <button onClick={handleExportToExcel} disabled={isLoading}>
            <ExcelIcon />
          </button>
          <button>
            <PdfIcon />
          </button>
          <button>
            <PrinterIcon />
          </button>
        </div>
      </div>

      {excelDataReady && (
        <ExportToExcel
          data={
            Array.isArray(selectedRowData) && selectedRowData.length > 0
              ? selectedRowData
              : data?.data?.reports || []
          }
           fileName="گزارش_مرسوله"
        columns={[
          { label: "نام مشتری", key: "customerName" },
          { label: "شماره مرسوله", key: "parcelNumber" },
          { label: "میکروهاب پذیرش", key: "receptionMicrohub" },
          { label: "زمان پذیرش", key: "receptionTime" },
          { label: "وضعیت", key: "status" },
          { label: "نوع سرویس", key: "serviceType" },
        ]}
        />
      )}
    </>
  );
};

export default ButtonSheet;
