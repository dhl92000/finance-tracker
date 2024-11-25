import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {}
})

export function ThemeContextProvider({children}: {children: ReactNode}) {
    
    const [theme, setTheme] = useState('light')


    useEffect(() => {
        // const savedTheme = localStorage.getItem('theme') as Theme | null;
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    function toggleTheme () {
        // console.log('toggling')
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    const themeContext = {
        theme: theme,
        toggleTheme: toggleTheme
    }


    return (
        <ThemeContext.Provider value={themeContext}>
        {children}
        </ThemeContext.Provider>
    )

}

export default ThemeContext