import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useField } from "formik";
import { ReactComponent as CalIcon } from "../../icons/svg/calenderIcon.svg";

interface Props {
  value: any;
  setFieldValue: (field: string, value: any) => void;
  label?: string;
  name: string;
  error?: string | false;
}

const MultiDatePicker = ({
  value,
  setFieldValue,
  label = "تاریخ",
  name,
  
}: Props) => {
  const [, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-semibold text-gray-700 px-1 py-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-500 pointer-events-none">
          <CalIcon />
        </span>
        <DatePicker
          value={value}
          onChange={(date) => {
            setFieldValue(name, date ? date.toDate().toISOString() : null);
          }}
          placeholder="تا تاریخ"
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          inputClass={`pl-10 pr-4 border rounded-[12px] py-2 text-[#073054] text-base font-medium w-full ${
            hasError ? "border-red-500" : "border-gray-300"
          }`}
          containerClassName="w-full"
        />
      </div>
      {hasError && (
        <div className="text-sm text-red-600 mt-1 px-1">{meta.error}</div>
      )}
    </div>
  );
};

export default MultiDatePicker;
