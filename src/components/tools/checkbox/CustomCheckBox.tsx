import React, { useState } from "react";

interface CustomCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
}) => {
  const isControlled = typeof checked === "boolean";
  const [internalChecked, setInternalChecked] = useState(false);

  const finalChecked = isControlled ? checked : internalChecked;

  const toggle = () => {
    if (!isControlled) {
      setInternalChecked(!internalChecked);
    }
    onChange?.(!finalChecked);
  };

  return (
    <div
      onClick={toggle}
      className={`w-6 h-6 my-[25px] flex items-center justify-center cursor-pointer rounded-[10px] border-2 transition-all duration-300 ${
        finalChecked
          ? "bg-green-500 border-green-500"
          : " border-[#9CA3AF]"
      }`}
    >
      {finalChecked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M20.707 5.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L10 14.586l9.293-9.293a1 1 0 0 1 1.414 0z"
          />
        </svg>
      )}
    </div>
  );
};

export default CustomCheckbox;
