import React, { ReactNode } from "react";

interface Props {
  type?: "submit" | "button" | "reset";
  children?: string | ReactNode;
  className?: string;
  disabled?:boolean;
}
const Button: React.FC<Props> = ({ type, children, className = ""  ,disabled}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`w-full px-4 py-3 bg-[#FF7959] text-center text-white text-sm  font-bold rounded-[12px]  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
