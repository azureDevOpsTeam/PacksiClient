import React from "react";

const CartableSvg = ({ strokeColor = "#111928", strokeWidth = 1.5 }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 16.5C2 14.1611 2 12.9917 2.53647 12.1379C2.81621 11.6927 3.19267 11.3162 3.63789 11.0365C4.49167 10.5 5.66111 10.5 8 10.5H16C18.3389 10.5 19.5083 10.5 20.3621 11.0365C20.8073 11.3162 21.1838 11.6927 21.4635 12.1379C22 12.9917 22 14.1611 22 16.5C22 18.8389 22 20.0083 21.4635 20.8621C21.1838 21.3073 20.8073 21.6838 20.3621 21.9635C19.5083 22.5 18.3389 22.5 16 22.5H8C5.66111 22.5 4.49167 22.5 3.63789 21.9635C3.19267 21.6838 2.81621 21.3073 2.53647 20.8621C2 20.0083 2 18.8389 2 16.5Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 10.5C20 9.09987 20 8.3998 19.7275 7.86502C19.4878 7.39462 19.1054 7.01217 18.635 6.77248C18.1002 6.5 17.4001 6.5 16 6.5H8C6.59987 6.5 5.8998 6.5 5.36502 6.77248C4.89462 7.01217 4.51217 7.39462 4.27248 7.86502C4 8.3998 4 9.09987 4 10.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 6.5C18 4.61438 18 3.67157 17.4142 3.08579C16.8284 2.5 15.8856 2.5 14 2.5H10C8.11438 2.5 7.17157 2.5 6.58579 3.08579C6 3.67157 6 4.61438 6 6.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 14.5C15 15.6046 14.1046 16.5 13 16.5H11C9.89543 16.5 9 15.6046 9 14.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CartableSvg;
