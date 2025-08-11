import React from 'react'

function ExclusiveFleet({ strokeColor = "#111928", strokeWidth = 1.5 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M22.5 21V9.61065C22.5 8.28771 22.5 7.62624 22.1561 7.11395C21.8123 6.60167 21.2034 6.35601 19.9856 5.86468L13.9856 3.44396C13.252 3.14799 12.8852 3 12.5 3C12.1148 3 11.748 3.14799 11.0144 3.44396L5.01444 5.86468C3.79663 6.35601 3.18773 6.60167 2.84387 7.11395C2.5 7.62624 2.5 8.28771 2.5 9.61065V21"
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.5 19V21M8.5 19V21"
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 14L8.24254 13.0299C8.60632 11.5747 8.78821 10.8472 9.33073 10.4236C9.87325 10 10.6232 10 12.1231 10H12.8769C14.3768 10 15.1267 10 15.6693 10.4236C16.2118 10.8472 16.3937 11.5747 16.7575 13.0299L17 14"
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.5 14H7.5C6.94772 14 6.5 14.4477 6.5 15V18C6.5 18.5523 6.94772 19 7.5 19H17.5C18.0523 19 18.5 18.5523 18.5 18V15C18.5 14.4477 18.0523 14 17.5 14Z"
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 16.4902V16.5002"
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 16.4902V16.5002"
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ExclusiveFleet
