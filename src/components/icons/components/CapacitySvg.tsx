import React from "react";

const CapacitySvg = ({ strokeColor = "#111928", strokeWidth = 1.5 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="23"
      viewBox="0 0 18 23"
      fill="none"
    >
      <ellipse
        cx="9"
        cy="4.5"
        rx="8"
        ry="3"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <path
        d="M17 11.5C17 13.1569 13.4183 14.5 9 14.5C4.58172 14.5 1 13.1569 1 11.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <path
        d="M17 4.5V18.5C17 20.1569 13.4183 21.5 9 21.5C4.58172 21.5 1 20.1569 1 18.5V4.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <path
        d="M5 7.5V9.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M5 14.5V16.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CapacitySvg;
