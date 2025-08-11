import React from "react";

interface ProgressBarProps {
  value: number; // مقدار پیشرفت (0 تا 100)
  max?: number; // مقدار حداکثر (پیش‌فرض: 100)
  color?: string; // رنگ نوار
  bgColor?: string; // رنگ پس‌زمینه
  height?: string; // ارتفاع نوار
  borderRadius?: string; // شعاع بوردر
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = "bg-red-500",
  bgColor = "bg-gray-200",
  height = "h-6",
  borderRadius = "rounded-lg",
}) => {
  // محاسبه درصد پیشرفت
  const progress = Math.min((value / max) * 100, 100);

  return (
    <div className="relative w-full">
      {/* سایه بالا */}
      <div className="absolute -top-1 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="8"
          viewBox="0 0 208 8"
          fill="none"
        >
          <path
            d="M202.143 0.983927H5.77615C2.92835 0.983927 0.619263 2.78351 0.619263 5.00282V7.49072C0.619263 5.27078 2.92835 3.47183 5.77615 3.47183H202.143C204.991 3.47183 207.3 5.27078 207.3 7.49072V5.00282C207.3 2.78351 204.991 0.983927 202.143 0.983927Z"
            fill="white"
          />
        </svg>
      </div>

      {/* نوار پیشرفت */}
      <div
        className={`relative w-full ${height} ${bgColor} ${borderRadius} overflow-hidden`}
      >
        <div
          className={`${color} ${borderRadius} h-full`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* مقدار درصد در مرکز */}
      {/* <span className="absolute inset-0 flex items-center justify-center text-black font-bold text-lg">
        {Math.round(progress)}%
      </span> */}

      {/* سایه پایین */}
      <div className="absolute -bottom-1 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="8"
          viewBox="0 0 208 8"
          fill="none"
        >
          <path
            d="M202.143 4.64504H5.77615C2.92835 4.64504 0.619263 2.84484 0.619263 0.625529V3.11471C0.619263 5.33402 2.92835 7.13232 5.77615 7.13232H202.143C204.991 7.13232 207.3 5.33402 207.3 3.11471V0.625529C207.3 2.84484 204.991 4.64504 202.143 4.64504Z"
            fill="#BDBCBC"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProgressBar;
