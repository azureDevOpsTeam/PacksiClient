import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface DetailButtonProps {
  onFirstClick?: () => void;
  onSecondClick?: () => void;
  firstText?: string;
  secondText?: string;
  onThirdClick?: () => void;
  ThirdText?: string;
}

const DetailButton: React.FC<DetailButtonProps> = ({
  onFirstClick,
  onSecondClick,
  firstText,
  secondText,
  onThirdClick,
  ThirdText,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const handleClickOutside = (e: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
      const buttonRect = buttonRef.current?.getBoundingClientRect();
      if (buttonRect) {
       setTooltipPosition({
         top: buttonRect.top + window.scrollY - 8,
         left: buttonRect.left + window.scrollX - 50, // کمی به سمت چپ
       });

      }
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTooltip]);

  const handleButtonClick = () => {
    setShowTooltip((prev) => !prev);
  };

  const Tooltip = (
    <div
      ref={tooltipRef}
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        transform: "translateY(-100%)",
      }}
      className="absolute z-[9999] bg-white text-gray-900 text-sm font-medium px-3 py-2 rounded-lg shadow-lg border border-gray-200 w-max"
    >
      <div className="absolute -bottom-[6px] left-[calc(50%-6px)] w-3 h-3 bg-white border-l border-t border-gray-200 rotate-[225deg]" />
      {firstText && (
        <p
          className="text-center cursor-pointer font-semibold"
          onClick={onFirstClick}
        >
          {firstText}
        </p>
      )}
      {secondText && (
        <p
          className="text-center cursor-pointer font-semibold mt-[8px]"
          onClick={onSecondClick}
        >
          {secondText}
        </p>
      )}
      {ThirdText && (
        <p
          className="text-center cursor-pointer font-semibold mt-[8px]"
          onClick={onThirdClick}
        >
          {ThirdText}
        </p>
      )}
    </div>
  );

  return (
    <div className="inline-block">
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="p-2 relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="5"
          height="16"
          viewBox="0 0 5 16"
          fill="none"
        >
          <path
            d="M3.68756 2.0625C3.68756 1.40666 3.1559 0.875 2.50006 0.875C1.84422 0.875 1.31256 1.40666 1.31256 2.0625C1.31256 2.71834 1.84422 3.25 2.50006 3.25C3.1559 3.25 3.68756 2.71834 3.68756 2.0625Z"
            stroke="#111928"
            strokeWidth="1.3"
          />
          <path
            d="M3.68756 8C3.68756 7.34416 3.1559 6.8125 2.50006 6.8125C1.84422 6.8125 1.31256 7.34416 1.31256 8C1.31256 8.65584 1.84422 9.1875 2.50006 9.1875C3.1559 9.1875 3.68756 8.65584 3.68756 8Z"
            stroke="#111928"
            strokeWidth="1.3"
          />
          <path
            d="M3.68756 13.9375C3.68756 13.2817 3.1559 12.75 2.50006 12.75C1.84422 12.75 1.31256 13.2817 1.31256 13.9375C1.31256 14.5933 1.84422 15.125 2.50006 15.125C3.1559 15.125 3.68756 14.5933 3.68756 13.9375Z"
            stroke="#111928"
            strokeWidth="1.3"
          />
        </svg>
      </button>
      {showTooltip && ReactDOM.createPortal(Tooltip, document.body)}
    </div>
  );
};

export default DetailButton;
