import { Expense, Frequency } from "../models/Expense";

export const expenses = [
  new Expense(0, "Groceries", 200, "User", Frequency.Monthly, "food"),
  new Expense(1, "Dining Out", 100, "User", Frequency.Monthly, "food"),
  new Expense(2, "Gym Membership", 1000, "User", Frequency.Yearly, "health"),
];
