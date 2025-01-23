import '@testing-library/jest-dom/vitest'
import { it, expect, describe } from 'vitest'
import {render, screen} from '@testing-library/react'
// components and data
import Header from '../../components/Header';
import { useContext } from "react";
import ThemeContext from "../../store/ThemeContext";

describe('Header displays', () => {
    const themeCtx = useContext(ThemeContext);
    it('Header displays', () => {
        render(<Header theme={themeCtx.theme} toggleTheme={themeCtx.toggleTheme}/>)
        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
       // expect(heading).toHaveTextContent(/Finance Tracker/)
       // screen.debug()
    })
})