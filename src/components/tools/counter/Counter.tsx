import React from "react";
import { useField, useFormikContext } from "formik";
import { FieldTheme } from "../../../models/enums/FieldTheme";

interface IncrementDecrementProps {
    name: string;
    label?: string;
    help?: string;
    error?: string;
    icon?: React.ReactNode;
    min?: number;
    max?: number;
    step?: number;
    readonly?: boolean;
    className?: string;
    hasBorder?: boolean;
    theme?: FieldTheme;
}

const Counter: React.FC<IncrementDecrementProps> = ({
                                                        name,
                                                        label,
                                                        help,
                                                        error,
                                                        icon,
                                                        min = 0,
                                                        max = 100,
                                                        hasBorder = false,
                                                        step = 1,
                                                        readonly = false,
                                                        className = "",
                                                        theme = FieldTheme.Primary,
                                                    }) => {
    const [field, meta, helpers] = useField(name);
    const { setFieldValue } = useFormikContext();

    const increment = () => {
        if (readonly) return;
        const newValue = Math.min((field.value || 0) + step, max);
        helpers.setValue(newValue);
        setFieldValue(name, newValue);
    };

    const decrement = () => {
        if (readonly) return;
        const newValue = Math.max((field.value || 0) - step, min);
        helpers.setValue(newValue);
        setFieldValue(name, newValue);
    };

    return (
      <div className={`form-control w-full ${className}`}>
        {label && (
          <label className="label text-gray-900 font-semibold text-sm">
            {label}
          </label>
        )}
        <div className="flex items-center">
          <button
            type="button"
            onClick={increment}
            className={`flex-none w-[42px] h-[42px] flex justify-center items-center rounded-[8px] font-semibold bg-white text-[#6B7280]
              ${
                !readonly
                  ? "hover:bg-[#6B728090] hover:text-white hover:cursor-pointer"
                  : "cursor-default"
              }
              ${hasBorder ? "border border-gray-300" : ""}
            `}
            disabled={(field.value || 0) >= max || readonly}
          >
            +
          </button>
          <input
            {...field}
            type="number"
            value={field.value || 0}
            readOnly={readonly} // 👈 به جای disabled
            className={`grow mx-1 input w-full text-base
            bg-white
            ${readonly ? "cursor-not-allowed bg-white" : ""}
            text-gray-700 font-medium rounded-[8px] h-[42px]
            focus:outline-none focus:ring-0 focus:border-transparent
            ${error ? "input-error" : ""}
            ${hasBorder ? "border border-gray-300" : "border-none"}
          `}
          />

          <button
            type="button"
            onClick={decrement}
            className={`flex-none w-[42px] h-[42px] flex justify-center items-center rounded-[8px] font-semibold bg-white text-[#6B7280]
              ${
                !readonly
                  ? "hover:bg-[#6B728090] hover:text-white hover:cursor-pointer"
                  : "cursor-default"
              }
              ${hasBorder ? "border border-gray-300" : ""}
            `}
            disabled={(field.value || 0) <= min || readonly}
          >
            -
          </button>
        </div>
        {error ? (
          <p className="text-error text-sm mt-1">{meta.error}</p>
        ) : (
          help && <p className="text-gray-500 text-sm mt-1">{help}</p>
        )}
      </div>
    );
};

export default Counter;
