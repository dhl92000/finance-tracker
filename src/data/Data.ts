import { Expense, Frequency } from "../models/Expense";

export const expenses = [
  new Expense(0, "Groceries", 400, "User", Frequency.Monthly, "essential", 'bg-mint1'),
  new Expense(1, "Rent", 2200, "User", Frequency.Monthly, "rent", 'bg-yellow1'),
  new Expense(2, "Transit Pass", 156, "User", Frequency.Monthly, "essential", 'bg-mint1'),
  new Expense(4, "Utilities", 150, "User", Frequency.Monthly, "essential", 'bg-mint1'),
  new Expense(5, "Streaming Services", 30, "User", Frequency.Monthly, "entertainment", 'bg-mint2'),
  new Expense(6, "Dining Out", 200, "User", Frequency.Monthly, "entertainment", 'bg-mint2'),
  new Expense(7, "Fitness Membership", 75, "User", Frequency.Monthly, "fitness", 'bg-yellow2'),
  new Expense(8, "Internet", 75, "User", Frequency.Monthly, "essential", 'bg-mint1'),
  new Expense(9, "Insurance (Home/Car)", 150, "User", Frequency.Yearly, "essential", 'bg-mint1'),
  new Expense(10, "Childcare", 500, "User", Frequency.Monthly, "essential", 'bg-mint1'),
  new Expense(11, "Pet Expenses", 100, "User", Frequency.Monthly, "pet", 'bg-yellow3'),
  new Expense(12, "Pilates", 400, "User", Frequency.Monthly, "fitness", 'bg-mint3'),
];

