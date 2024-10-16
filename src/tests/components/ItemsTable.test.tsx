import { it, expect, describe } from 'vitest'
import '@testing-library/jest-dom/vitest'
import {render, screen} from '@testing-library/react'
import ItemsTable from '../../pages/ItemsTable'
import { expenses } from '../../data/Data'
import { MockExpenseService } from '../../models/Expense'
const expenseSvc = new MockExpenseService(expenses)

describe('ItemsTable', () => {
    it('ItemsTable renders without crashing', () => {
       // const expenseSvc = new MockExpenseService(expenses)
        render(<ItemsTable allExpenses={expenses} expenseSvc={expenseSvc} setAllExpenses={() => {}} />);
    })

    it('renders Add New button', () => {
       // const expenseSvc = new MockExpenseService(expenses)
        render(<ItemsTable allExpenses={expenses} expenseSvc={expenseSvc} setAllExpenses={() => {}} />);
        const addButton = screen.getByText('Add New')
        expect(addButton).toBeInTheDocument()
    })

    it('renders both Expense and Income tabs', () => {
        render(<ItemsTable allExpenses={expenses} expenseSvc={expenseSvc} setAllExpenses={() => {}} />);
        const expensesTab = screen.getByText('Expenses')
        const incomeTab = screen.getByText('Income')
        expect(expensesTab).toBeInTheDocument()
        expect(incomeTab).toBeInTheDocument()
    })

    it('renders correct number of expenses in ItemsTable', () => {
        render(<ItemsTable allExpenses={expenses} expenseSvc={expenseSvc} setAllExpenses={() => {}} />);
        const rows = screen.queryAllByRole('row')
        expect(rows.length).toEqual(expenses.length + 1)
    })

    it('renders delete icon for each row', () => {
        render(<ItemsTable allExpenses={expenses} expenseSvc={expenseSvc} setAllExpenses={() => {}} />);
        const deleteIcons = screen.queryAllByTestId('delete-icon')
        expect(deleteIcons).toHaveLength(expenses.length )
    })

    it('renders edit icon for each row', () => {
        render(<ItemsTable allExpenses={expenses} expenseSvc={expenseSvc} setAllExpenses={() => {}} />);
        const editIcons = screen.queryAllByTestId('edit-icon')
        expect(editIcons).toHaveLength(expenses.length )
    })

    

})