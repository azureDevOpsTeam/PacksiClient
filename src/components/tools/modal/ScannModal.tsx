import React, { useRef, ReactNode } from "react";
import { Formik, Form } from "formik";
import TextField from "../textField/TextField";

interface ModalProps {
  loading?:boolean;
  title: string;
  titleIcon?: React.ReactNode;
  children?: ReactNode; // اجازه دادن به هر محتوایی داخل مودال
  positionClassName?: string;
  modalClassName?: string;
  onConfirm?: (values: any) => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ScanModal: React.FC<ModalProps> = ({
  loading,
  title,
  titleIcon,
  children,
  positionClassName = "fixed inset-0 flex items-center justify-center backdrop-blur-[4px] bg-[#00000099] z-50",
  modalClassName = "w-[600px] p-5 rounded-[28px] shadow bg-white border",
  onConfirm,
  onCancel,
  confirmText = "تایید",
  cancelText = "انصراف",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onCancel?.();
    }
  };

  return (
    <div
      data-aos="fade"
      className={positionClassName}
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={handleOutsideClick}
    >
      <div ref={modalRef} className={modalClassName} role="document">
        <div className="flex items-center justify-between mb-4 gap-5 ">
          <div className="flex flex-row justify-between items-center gap-2">
            {titleIcon && <span>{titleIcon}</span>}
            <h3
              className="text-lg font-semibold text-gray-800"
              id="modal-title"
            >
              {title}
            </h3>
          </div>
          <button onClick={onCancel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M15 0.999939L1 14.9999"
                stroke="#111928"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 0.999939L15 14.9999"
                stroke="#111928"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* فرمی که مقدار را مدیریت می‌کند */}
        <Formik
          initialValues={{ myField: "" }}
          onSubmit={(values) => onConfirm?.(values)}
        >
          {({ setFieldValue, dirty, isValid }) => (
            <Form>
              <TextField
                name="myField"
                innerClassName="border border-[#E5E7EB]"
                label="لطفابارکد مرسوله یا باندل را وارد کنید ."
                placeholder="بارکد موجود را وارد کنید."
              />
              <div className="mt-5 flex justify-start gap-2">
                <button
                  type="submit"
                  className={`text-white font-semibold py-3 px-[42px] rounded-[12px] ${
                    loading ? "bg-[#E5E7EB] cursor-not-allowed" : "bg-[#FF866A]"
                  }`}
                  disabled={!dirty}
                >
                  {loading ? "در حال ثبت ..." :confirmText}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ScanModal;
