import React from 'react'

function TickSvg({ strokeColor = "#6B7280", strokeWidth = 1.5 }) {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="elements">
        <path
          id="Vector 6663"
          d="M1.5 5L3.25 6.75L8.5 1.25"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default TickSvg
