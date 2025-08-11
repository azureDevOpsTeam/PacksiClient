import React, { useState } from "react";

type BlockIconSvgProps = {
  strokeColor?: string;
  strokeWidth?: string;
};

function BlockIconSvg({
  strokeColor = "#111928",
  strokeWidth = '1.5',
}: BlockIconSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
    >
      <path
        d="M3.99023 4.45837L14.6302 15.5417"
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.91 10C16.91 5.62778 13.5073 2.08337 9.30996 2.08337C5.11259 2.08337 1.70996 5.62778 1.70996 10C1.70996 14.3723 5.11259 17.9167 9.30996 17.9167C13.5073 17.9167 16.91 14.3723 16.91 10Z"
        stroke={strokeColor}
        stroke-width={strokeWidth}
      />
    </svg>
  );
}


export default BlockIconSvg;;