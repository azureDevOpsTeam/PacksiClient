import React, { useEffect, useRef, useState } from "react";
import { buttons } from "../../../../assets/mock/mockData";
import { ReactComponent as PrinterIcon } from "../../../../components/icons/svg/printerIcon.svg";
import { ReactComponent as PdfIcon } from "../../../../components/icons/svg/pdfIcon.svg";
import { ReactComponent as ExcelIcon } from "../../../../components/icons/svg/excelIcon.svg";
import ExportToExcel from "../../../../components/tools/fileUpload/ExportToExcel";
import FilterButtons from "../../../../components/tools/button/FilterButtons";
import { useReactMutation } from "../../../../components/hooks/query/useReactQuery";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { GetFleetPerformansReport } from "../../../../setting/ApiUrl";

interface ButtonSheetProps {
  totalCount: number;
  selectedRowData: any[];
}

const ButtonSheet: React.FC<ButtonSheetProps> = ({
  totalCount,
  selectedRowData,
}) => {
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({});
  const [excelDataReady, setExcelDataReady] = useState<boolean>(false);

  const updateOrderData = {
    url: GetFleetPerformansReport,
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

  // const handleExportToExcel = () => {
  //   hasExportedRef.current = false;

  //   if (selectedRowData?.length > 0) {
  //     setShouldExport(true);
  //   } else {
  //     fetchReport({
  //       pageNumber: 1,
  //       pageSize: totalCount,
  //       fleetIds: null,
  //       zoneId: 0,
  //       statusId: null,
  //       from: null,
  //       to: null,
  //     });
  //   }
  // };

  const handleExportToExcel = () => {
    if (selectedRowData?.length > 0) {
      setExcelDataReady(true); // مستقیماً خروجی ردیف‌های انتخاب‌شده را بزن
    } else {
     fetchReport({
       pageNumber: 1,
       pageSize: totalCount,
       fleetIds: null,
       zoneId: 0,
       statusId: null,
       from: null,
       to: null,
     });
      setExcelDataReady(true);
    }
  };

  return (
    <>
      <div className="flex flex-row my-4 justify-center items-center">
        <FilterButtons
          buttons={buttons.fleetReport}
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
            selectedRowData?.length > 0
              ? selectedRowData
              : data?.data?.reports || []
          }
          fileName="گزارش عملکرد ناوگان"
          columns={[
            { label: "پرسنل ناوگان", key: "fullName" },
            { label: "کد ماموریت", key: "missionCode" },
            { label: "بازه توزیع", key: "distributionTimeRange" },
            { label: "ناحیه", key: "zone" },
            { label: "آخرین وضعیت", key: "lastStatus" },
          ]}
        />
      )}
    </>
  );
};

export default ButtonSheet;
