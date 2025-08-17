"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark";

type Colors = {
  border: {
    primary: string;
    secondary: string;
  };
  background: {
    primary: string;
    secondary: string;
  };
  paper: string;
  text: {
    primary: string;
    secondary: string;
    light: string;
  };
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  colors: Colors;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isInitialized, setIsInitialized] = useState(false);

  const getColors = (currentTheme: Theme): Colors => {
    if (currentTheme === "dark") {
      return {
        border: {
          primary: "#374151", // gray-700
          secondary: "#4b5563", // gray-600
        },
        background: {
          primary: "#1f2937", // gray-800
          secondary: "#111827", // gray-900
        },
        paper: "#374151", // gray-700
        text: {
          primary: "#f9fafb", // gray-50
          secondary: "#d1d5db", // gray-300
          light: "#9ca3af", // gray-400
        },
      };
    }
    return {
      border: {
        primary: "#e5e7eb", // gray-200
        secondary: "#d1d5db", // gray-300
      },
      background: {
        primary: "#ffffff", // white
        secondary: "#f9fafb", // gray-50
      },
      paper: "#ffffff", // white
      text: {
        primary: "#111827", // gray-900
        secondary: "#6b7280", // gray-500
        light: "#9ca3af", // gray-400
      },
    };
  };

  useEffect(() => {
    // This code will only run on the client side
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const initialTheme = savedTheme || "light"; // Default to light theme

    setTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: getColors(theme) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
