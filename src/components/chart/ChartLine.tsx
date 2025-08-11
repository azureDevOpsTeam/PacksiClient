import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';


interface DataPoint {
    name: string;
    value: number;
}


interface LineChartProps {
    data?: DataPoint[];
}

const ChartLine: React.FC<LineChartProps> = ({data}:any) => {
    const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className=" text-white p-2 rounded text-[20px] font-bold ">
                    <p>{payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-full ">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#ffffff"
                        strokeWidth={2}
                        dot={{
                            stroke: 'white',
                            fill: 'white',
                            r: 5
                        }}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: 'transparent' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartLine;