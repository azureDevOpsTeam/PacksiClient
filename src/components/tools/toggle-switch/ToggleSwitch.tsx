import React from "react";
import { useField } from "formik";
import { IDropDown } from "../../../models/viewModels/common/IDropDown";

interface ToggleSwitchProps {
  name: string;
  label?: string;
  options?: IDropDown[];
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
  readonly?: boolean;
  onChange?: (value: boolean) => void; // ✅ اضافه‌شده
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  name,
  label,
  options = [
    { value: "true", label: "فعال" },
    { value: "false", label: "غیرفعال" },
  ],
  activeColor = "#FF7959",
  inactiveColor = "transparent",
  readonly = false,
  className = "",
  onChange, // ✅ دریافت prop
}) => {
  const [field, meta, helpers] = useField(name);

  const handleClick = (value: string) => {
    if (readonly) return;
    const booleanValue = value === "true";
    helpers.setValue(booleanValue);
    helpers.setTouched(true);
    onChange?.(booleanValue); // ✅ فراخوانی if موجود در JS modern
  };

  return (
    <div className={`form-control w-full ${className}`}>
      {label && (
        <label className="label text-gray-900 font-semibold text-sm mb-0">
          {label}
        </label>
      )}
      <div
        className={`h-[52px] p-1 bg-white rounded-[28px] justify-between items-center inline-flex ${
          readonly ? "hover:cursor-default" : ""
        }`}
      >
        {options.map((option) => {
          const isActive = field.value?.toString() === option.value;
          return (
            <div
              key={option.value}
              className={`grow shrink min-w-[100px] hover:scale-[99%] active:scale-100 transition-all basis-0 h-[42px] px-3 py-1.5 rounded-[28px] justify-center items-center gap-2.5 flex ${
                isActive ? `bg-[${activeColor}]` : `bg-[${inactiveColor}]`
              }`}
              onClick={() => handleClick(option.value)}
            >
              <div
                className={`text-right text-sm font-bold ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              >
                {option.label}
              </div>
            </div>
          );
        })}
      </div>
      {meta.touched && meta.error && (
        <p className="text-error text-sm mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default ToggleSwitch;
