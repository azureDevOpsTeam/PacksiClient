import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts";

const CustomTooltip = ({active, payload}: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    backgroundColor: "#FF4D4D",
                    color: "#FFFFFF",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                }}
            >
                {`${payload[0].value}`}
            </div>
        );
    }
    return null;
};

const ChartBar = ({data}: any) => {
    const renderCircle = (props: any) => {
        const {x, y, value} = props;
        return (
            <g>
                {/* دایره */}
                <circle cx={x + 1.5} cy={y - 1} r={8} fill="#FF4D4D"/>

                <text
                    x={x + 1.5}
                    y={y + 1}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#FFFFFF"
                    fontWeight="bold"
                >
                    {value}
                </text>
            </g>
        );
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >

                    <XAxis
                        dataKey="name"
                        tick={{fontSize: 12, fill: "#666"}}
                        axisLine={{stroke: "#ccc"}}
                        tickLine={false}
                    />

                    <Tooltip
                        cursor={{fill: "rgba(255, 77, 77, 0.1)"}}
                        content={<CustomTooltip/>}
                    />

                    <Bar
                        dataKey="value"
                        fill="#D3D3D3"
                        barSize={3}
                        radius={[5, 5, 0, 0]}
                    >
                        <LabelList dataKey="value" content={renderCircle}/>
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartBar;
