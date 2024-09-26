import { useState } from "react";
import expenses from "../data/Data";
import { Frequency } from "../models/Expense";

const NewExpense = () => {
  const [formData, setFormData] = useState({
    label: "",
    amount: 0,
    owner: "User",
    frequency: [Frequency.Monthly, Frequency.Yearly],
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
    console.log("form submitted", formData);
    reset()
  };

  const reset = () => {
    setFormData({
        label: "",
        amount: 0,
        owner: "User",
        frequency: [Frequency.Monthly, Frequency.Yearly],
        category: "",
      })
  }

  return (
    <form className="formDiv" onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input name="label" onChange={handleChange} value={formData.label} />
      </label>
      <label>
        Amount:
        <input name="amount" onChange={handleChange} value={formData.amount} />
      </label>
      <label>
        Owner:
        <input name="user" onChange={handleChange} value={formData.owner} />
      </label>
      <label>
        Frequency:
        <input
          name="frequency"
          onChange={handleChange}
          value={formData.frequency[0]}
        />
      </label>
      <label>
        Category:
        <input
          name="category"
          onChange={handleChange}
          value={formData.category}
        />
      </label>
      <label></label>
      <button onClick={reset}>Clear</button>
      <button type='submit'>Add</button>
    </form>
  );
};

export default NewExpense;
