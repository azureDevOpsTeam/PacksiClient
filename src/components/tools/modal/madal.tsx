import React, { useRef } from "react";

interface ModalProps {
  title: any;
  titleIcon?: React.ReactNode;
  message?: React.ReactNode;

  positionClassName?: string;
  modalClassName?: string;
  widthClassName?: string; // ➕ برای کنترل عرض مودال

  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;

  confirmButtonColor?: string;
  confirmButtonTextColor?: string;
  cancelButtonTextColor?: string;
  cancelButtonColor?: string;
  buttonClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  confirmButtonTextColor = "text-white",
  cancelButtonTextColor = "text-[#C81E1E]",
  cancelButtonColor = "bg-[#C81E1E]",
  confirmButtonColor = "bg-[#FDE8E8]",
  title,
  titleIcon,
  message,

  positionClassName = "fixed inset-0 flex items-center backdrop-blur-[4px] bg-[#00000099] justify-center z-50",
  modalClassName = "p-5 rounded-[28px] shadow bg-white border",
  widthClassName = "w-96", // ➕ مقدار پیش‌فرض عرض

  buttonClassName = "text-gray-500 hover:text-gray-700",
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
      <div
        ref={modalRef}
        className={`${modalClassName} ${widthClassName}`}
        role="document"
      >
        <div className="flex items-start gap-2">
          {titleIcon && <span className="shrink-0 mt-1">{titleIcon}</span>}
          <h5
            className="text-lg font-medium text-[#374151] break-words"
            id="modal-title"
          >
            {title}
          </h5>
        </div>
        {message && (
          <div className="mt-2 p-3">
            <p
              className="text-sm text-gray-700 font-bold"
              id="modal-description"
            >
              {message}
            </p>
          </div>
        )}

        <div className="mt-5 flex justify-start gap-2">
          {onConfirm && (
            <button
              className={`px-8 py-3 text-sm hover:scale-95 active:scale-100 transition-all font-bold ${confirmButtonTextColor} ${confirmButtonColor} rounded-[12px]`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          )}
          {onCancel && (
            <button
              className={`px-4 py-3 text-sm hover:scale-95 active:scale-100 transition-all font-bold ${cancelButtonTextColor} ${cancelButtonColor} rounded-[12px]`}
              onClick={onCancel}
            >
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
