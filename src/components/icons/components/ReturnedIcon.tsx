import React from 'react'

function ReturnedIcon({ strokeColor = "black", strokeWidth = 1.5 }) {
   return (
     <>
       <svg
         width="25"
         height="24"
         viewBox="0 0 25 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
       >
         <circle
           cx="12.5"
           cy="12"
           r="10"
           stroke={strokeColor}
           stroke-width={strokeWidth}
           stroke-linejoin="round"
         />
         <path
           d="M12.25 7.5H15.625C17.489 7.5 19 9.01104 19 10.875C19 12.739 17.489 14.25 15.625 14.25H7"
           stroke={strokeColor}
           stroke-width={strokeWidth}
           stroke-linecap="round"
           stroke-linejoin="round"
         />
         <path
           d="M9.24998 12C9.24998 12 7.00001 13.6571 7 14.25C6.99999 14.843 9.25 16.5 9.25 16.5"
           stroke={strokeColor}
           stroke-width={strokeWidth}
           stroke-linecap="round"
           stroke-linejoin="round"
         />
       </svg>
     </>
   );
}

export default ReturnedIcon
