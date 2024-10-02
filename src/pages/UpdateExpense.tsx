import { useState } from "react";
import { Expense, Frequency } from "../models/Expense";

interface UpdateModalProps {
  onClose: () => void;
  item: Expense;
  expenseSvc: ExpenseService;
}

interface ExpenseService {
  getExpenses(): Expense[];
  updateExpense(expense: Expense): void;
}

// modal content / update expense form
const UpdateExpense = ({ onClose, item, expenseSvc }: UpdateModalProps) => {
  const [formData, setFormData] = useState({
    id: item.id,
    label: item.label,
    amount: item.amount,
    owner: item.owner,
    frequency: item.frequency,
    category: item.category,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    expenseSvc.updateExpense(formData);
    reset();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseInt(value) : value,
    }));
  };

  const reset = () => {
    setFormData({
      id: 0,
      label: "",
      amount: 0,
      owner: "User",
      frequency: Frequency.Monthly,
      category: "",
    });
  };

  return (
    // <div>
    //     updating the expense
    //     <button> Update</button>
    //     <button onClick={onClose}> Cancel </button>
    // </div>
    <form onSubmit={handleSubmit}>
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

      <button onClick={onClose}> Cancel </button>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateExpense;
