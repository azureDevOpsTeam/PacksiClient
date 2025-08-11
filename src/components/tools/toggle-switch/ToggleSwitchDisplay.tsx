import React from "react";
import { IDropDown } from "../../../models/viewModels/common/IDropDown";

interface ToggleSwitchDisplayProps {
  label?: string;
  value: boolean;
  options?: IDropDown[];
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
}

const ToggleSwitchDisplay: React.FC<ToggleSwitchDisplayProps> = ({
  label,
  value,
  options = [
    { value: "true", label: "فعال" },
    { value: "false", label: "غیرفعال" },
  ],
  activeColor = "#FF7959",
  inactiveColor = "transparent",
  className = "",
}) => {
  const stringValue = value.toString();

  return (
    <div className={`form-control w-full ${className}`}>
   
      <div
        className={`h-[52px] p-1 bg-white rounded-[28px] justify-between items-center inline-flex border hover:cursor-default`}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={`grow shrink min-w-[100px] basis-0 h-[42px] px-3 py-1.5 rounded-[28px] justify-center items-center gap-2.5 flex ${
              stringValue === option.value
                ? `bg-[${activeColor}]`
                : `bg-[${inactiveColor}]`
            }`}
          >
            <div
              className={`text-right text-sm font-bold ${
                stringValue === option.value ? "text-white" : "text-gray-400"
              }`}
            >
              {option.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToggleSwitchDisplay;
