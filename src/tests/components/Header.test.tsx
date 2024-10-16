import '@testing-library/jest-dom/vitest'
import { it, expect, describe } from 'vitest'
import {render, screen} from '@testing-library/react'
// components and data
import Header from '../../components/Header';

describe('Header displays', () => {
    it('Header displays', () => {
        render(<Header/>)
        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
       // expect(heading).toHaveTextContent(/Finance Tracker/)
       // screen.debug()
    })
})