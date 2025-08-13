import React, { ReactNode, useState } from "react";
import { useField, useFormikContext } from "formik";
import { FieldTheme } from "../../../models/enums/FieldTheme";
import { ReactComponent as EyeIcon } from "../../icons/svg/EyeIcon.svg";
import { ReactComponent as CloseEyeIcon } from "../../icons/svg/EyeCloseIcon.svg";

interface Props {
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  innerClassName?: string;
  help?: string | ReactNode;
  iconClassName?: string;
  value?: string;
  icon?: ReactNode;
  type?: string;
  readonly?: boolean;
  theme?: FieldTheme;
}

const TextField: React.FC<Props> = ({
  placeholder,
  label = "",
  className = "",
  innerClassName = "",
  iconClassName = "",
  help,
  icon,
  name,
  type = "text",
  readonly = false,
  theme = FieldTheme.Primary,
}) => {
  const [field, { error, touched }] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleClear = () => {
    setFieldValue(name, "");
  };

  const isPassword = type === "password";

  return (
    <div className={`form-control w-full ${className} rounded-[13px]`}>
      {label && (
        <label className="label text-gray-900 font-semibold text-sm">
          {label}
        </label>
      )}

      <div
        className={`flex items-center relative rounded-[13px] `}
      >
        {icon && (
          <div className={`p-2 absolute right-4 ${iconClassName}`}>{icon}</div>
        )}

        <input
          {...field}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className={`input w-full text-base text-[#6B7280] font-medium 
            rounded-[12px] h-[40px] mt-[7px] focus-within:outline-[0px]
            ${readonly ? "hover:cursor-default border-none" : ""}
            ${theme === FieldTheme.Primary ? "bg-[#FFF]" : "bg-[#F3F4F6]"}
            ${icon ? "pr-12" : "pr-[14px]"}
            text-right
            ${touched && error ? "input-error" : ""} ${innerClassName}`}
          disabled={readonly}
        />

        {/* دکمه نمایش/مخفی کردن پسورد */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <CloseEyeIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}

        {/* دکمه پاک کردن */}
        {field.value && !readonly && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
        )}
      </div>

      {touched && error ? (
        <p className="text-error text-sm mt-1">{error}</p>
      ) : help ? (
        <p className="text-gray-500 text-sm mt-1">{help}</p>
      ) : null}
    </div>
  );
};

export default TextField;
