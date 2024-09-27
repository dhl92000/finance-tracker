import { Expense, Frequency } from "../models/Expense";

export const expenses = [
  new Expense("Groceries", 200, "User", Frequency.Monthly, "Food"),
  new Expense("Dining Out", 100, "User", Frequency.Monthly, "Food"),
  new Expense("Gym Membership", 50, "User", Frequency.Monthly, "Health"),
];
