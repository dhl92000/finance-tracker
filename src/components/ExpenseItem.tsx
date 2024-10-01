interface expenseItemProps {
    key: number
    name: string
}

const ExpenseItem = ({name, key}: expenseItemProps) => {
    return (
        <div key={key}>
            <h2>{name}</h2>
        </div>
    )
}

export default ExpenseItem