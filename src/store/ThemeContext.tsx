import { createContext, useState } from "react";
import { ReactNode } from "react";

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {}
})

export function ThemeContextProvider({children}: {children: ReactNode}) {
    
    const [theme, setTheme] = useState('light')

    function toggleTheme () {
        console.log('toggling')
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