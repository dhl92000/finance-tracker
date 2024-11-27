import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";

// type Theme = 'light' | 'dark'

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
        console.log(document.documentElement.classList)
        // if there are any light/dark classes initially, we remove it
        // then add class of 'theme' ?
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
        console.log(localStorage)
    }, [theme]);

    function toggleTheme () {
        // console.log('toggling')
        // console.log(document.documentElement.classList)
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