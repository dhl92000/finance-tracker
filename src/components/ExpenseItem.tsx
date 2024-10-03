import { createPortal } from "react-dom";
import UpdateExpense from "../pages/UpdateExpense";
import { useState } from "react";
import { Expense } from "../models/Expense";

interface expenseItemProps {
  key: number;
  item: Expense;
  setAllExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  expenseSvc: ExpenseService;
}

interface ExpenseService {
  getExpenses(): Expense[];
  updateExpense(expense: Expense): void;
  deleteExpense(expense: Expense): void;
}

// props destructured here {}, prop type defined above
const ExpenseItem = ({
  key,
  item,
  expenseSvc,
  setAllExpenses,
}: expenseItemProps) => {
  const [showModal, setShowModal] = useState(false);

  const deleteExpense = () => {
    expenseSvc.deleteExpense(item);
    const data = expenseSvc.getExpenses();
    setAllExpenses([...data]);
  };

  return (
    <>
      <div className="expenseItemDiv" key={key}>
        <h2>{item.label}</h2>
        <button onClick={() => setShowModal(true)}>Edit</button>
        <button onClick={deleteExpense}>Delete</button>
      </div>

      {showModal &&
        createPortal(
          <UpdateExpense
            onClose={() => setShowModal(false)}
            item={item}
            expenseSvc={expenseSvc}
          />,
          document.body
        )}
    </>
  );
};

export default ExpenseItem;
