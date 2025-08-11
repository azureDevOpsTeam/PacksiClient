import { useEffect } from "react";
import * as XLSX from "xlsx";

type ColumnMapping = {
  label: string; // نام ستون در فایل
  key: string;   // کلید داخل داده
};

const ExportToExcel = ({
  data,
  fileName,
  columns,
}: {
  data: any[];
  fileName: string;
  columns: ColumnMapping[];
}) => {
  useEffect(() => {
    if (!data || data.length === 0 || columns.length === 0) return;

    const filteredData = data.map((row) => {
      const rowData: Record<string, any> = {};
      columns.forEach(({ label, key }) => {
        rowData[label] = row[key];
      });
      return rowData;
    });

    const headers = columns.map((col) => col.label);

    const ws = XLSX.utils.json_to_sheet(filteredData, {
      header: headers,
      skipHeader: false,
    });

    (ws as any)["!rtl"] = true;
    (ws as any)["!cols"] = columns.map(() => ({ wch: 25 }));
    (ws as any)["!autofilter"] = {
      ref: `A1:${String.fromCharCode(64 + columns.length)}1`,
    };

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "گزارش");

    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [data, fileName, columns]);

  return null;
};

export default ExportToExcel;
