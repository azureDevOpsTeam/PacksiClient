import React from "react";

const NodeSvg = ({
                     strokeColor = "#111928",
                     strokeWidth = 1.5,
                     className
                 }: {
    strokeColor?: string
    strokeWidth?: number
    className?: string
}) => {
    return (
        <svg
            className={className}
            width="14"
            height="21"
            viewBox="0 0 14 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="elements">
                <circle
                    id="Ellipse 1540"
                    cx="7"
                    cy="5.5"
                    r="4"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                />
                <path
                    id="Vector 4237"
                    d="M7 9.5L7 16.5"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
                <path
                    id="Vector 4653"
                    d="M10.847 14.5C12.4943 16.613 13.3179 17.6695 12.8865 18.506C12.8466 18.5832 12.7999 18.6578 12.7469 18.729C12.1723 19.5 10.6875 19.5 7.71777 19.5H6.28223C3.31251 19.5 1.82765 19.5 1.25311 18.729C1.20005 18.6578 1.15339 18.5832 1.11355 18.506C0.68206 17.6695 1.50571 16.613 3.15301 14.5"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

export default NodeSvg;
