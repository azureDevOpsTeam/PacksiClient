import React from 'react';
import {useTheme} from "./ThemeContext";


const ThemeToggler: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            style={{
                padding: '10px 20px',
                margin: '10px',
                backgroundColor: theme === 'light' ? '#4CAF50' : '#8BC34A',
                color: theme === 'light' ? '#FFFFFF' : '#000000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
            }}
        >
            تغییر به {theme === 'light' ? 'تم تاریک' : 'تم روشن'}
        </button>
    );
};

export default ThemeToggler;
