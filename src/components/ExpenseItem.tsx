import { createPortal } from "react-dom";
import UpdateExpense from "../pages/UpdateExpense";
import { useState } from "react";
import { Expense } from "../models/Expense";

interface expenseItemProps {
  key: number;
  item: Expense
  expenseSvc: ExpenseService
}

interface ExpenseService {
    getExpenses(): Expense[]
    updateExpense(expense: Expense): void
}

// when I press edit button, I want a modal to pop up
// modal has: form with all the expense fields and 'update' button

// props destructured here {}, prop type defined above
const ExpenseItem = ({  key, item, expenseSvc }: expenseItemProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="expenseItemDiv" key={key}>
        <h2>{item.label}</h2>
        <button onClick={() => setShowModal(true)}>Edit</button>
      </div>

      {showModal &&
        createPortal(
          <UpdateExpense onClose={() => setShowModal(false)} item={item} expenseSvc={expenseSvc}/>,
          document.body
        )}
    </>
  );
};

export default ExpenseItem;
