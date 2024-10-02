import { Expense, Frequency } from "../models/Expense";

export const expenses = [
  new Expense(0, "Groceries", 200, "User", Frequency.Monthly, "Food"),
  new Expense(1, "Dining Out", 100, "User", Frequency.Monthly, "Food"),
  new Expense(2, "Gym Membership", 50, "User", Frequency.Monthly, "Health"),
];
