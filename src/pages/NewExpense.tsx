import { useState } from "react";
import { Frequency, Expense } from "../models/Expense";

interface NewExpenseProps {
  expenseSvc: ExpenseService;
}

interface ExpenseService {
    getExpenses(): Expense[]
    createExpense(expense: Expense): void
}

const NewExpense = ({ expenseSvc }: NewExpenseProps) => {
  const [formData, setFormData] = useState({
    label: "",
    amount: 0,
    owner: "User",
    frequency: Frequency.Monthly,
    category: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    expenseSvc.createExpense(formData);
    reset();
  };

  const reset = () => {
    setFormData({
      label: "",
      amount: 0,
      owner: "User",
      frequency: Frequency.Monthly,
      category: "",
    });
  };

  return (
    <form className="formDiv" onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input name="label" onChange={handleChange} value={formData.label} />
      </label>
      <br />

      <label>
        Amount:
        <input name="amount" onChange={handleChange} value={formData.amount} />
      </label>
      <br />

      <label>
        Owner:
        <input name="user" onChange={handleChange} value={formData.owner} />
      </label>
      <br />

      <label>Frequency:</label>
      <input
        name="frequency"
        onChange={handleChange}
        value={Frequency.Monthly}
        type="radio"
        defaultChecked={true}
      />
      <label>Monthly</label>

      <input
        name="frequency"
        onChange={handleChange}
        value={Frequency.Yearly}
        type="radio"
      />
      <label>Yearly</label>
      <br />

      <label>
        Category:
        <input
          name="category"
          onChange={handleChange}
          value={formData.category}
        />
      </label>
      <br />

      <button onClick={reset}>Clear</button>
      <button type="submit">Add</button>
    </form>
  );
};

export default NewExpense;
