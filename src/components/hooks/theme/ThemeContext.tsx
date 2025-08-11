import React, {createContext, useState, useContext, ReactNode} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Toast from '../../tools/toast/Toast';
type Theme = 'light' | 'dark';

const lightTheme = {
    primary: '#4CAF50',
    secondary: '#FFEB3B',
    background: '#f9f2f2',
    paper: '#ffffff',
    border: {
        primary: '#e5e7eb',
        secondary: '#ff4b4b'
    },
    text: {
        primary: '#111928',
        secondary: '#ff4b4b',
        light: '#6b7280'
    },
    tile: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
};

const darkTheme = {
    primary: '#8BC34A',
    secondary: '#FF9800',
    background: '#8a6b6b',
    paper: '#4d4d4d',
    border: {
        primary: '#e5e7eb',
        secondary: '#ff4b4b'
    },
    text: {
        primary: '#ffffff',
        secondary: '#ff4b4b',
        light: '#c4cdde'
    },
    tile: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
};

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    colors: typeof lightTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');

    const colors = theme === 'light' ? lightTheme : darkTheme;

    return (
      <ThemeContext.Provider value={{ theme, setTheme, colors }}>
        <Toast />
        <Router>{children}</Router>
      </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
