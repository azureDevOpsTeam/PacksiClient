/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#4CAF50",
          secondary: "#FFEB3B",
          background: "#F9F5F2",
          text: "#111928",
        },
        dark: {
          primary: "#8BC34A",
          secondary: "#FF9800",
          background: "#1e0101",
          text: "#FFFFFF",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        yekanbakh: ["YekanBakh", "sans-serif"],
      },
      colors: {
        customGreen: "#0E9F6E",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar"),
    function ({ addBase }) {
      addBase({
        /* تنظیمات عمومی اسکرول بار */
        "*": {
          scrollbarWidth: "none", // برای فایرفاکس
          scrollbarColor: "#888 #f1f1f1", // رنگ اسکرول و پس‌زمینه
        },
        "*::-webkit-scrollbar": {
          width: "10px",
          height: "10px",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "10px", // شعاع گوشه‌ها
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: "#555",
          borderRadius: "10px", // دوباره تعریف در حالت هاور
        },
        "*::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "10px", // شعاع برای پس‌زمینه
        },
      });
    },
  ],
};
