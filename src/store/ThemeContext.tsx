import { createContext, useState } from "react";
import { ReactNode } from "react";

const ThemeContext = createContext('')

export function ThemeContextProvider({children}: {children: ReactNode}) {
    const [theme, setTheme] = useState('light')

    function toggleTheme () {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
        </ThemeContext.Provider>
    )

}

export default ThemeContext