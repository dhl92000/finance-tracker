import {
  Expense,
  ExpenseService,
  ExpenseSummarizer,
  Frequency,
} from "../models/Expense";

const expense1 = new Expense(
  "Groceries",
  200,
  "User",
  Frequency.Monthly,
  "Food"
);

const expense2 = new Expense(
  "Dining Out",
  100,
  "User",
  Frequency.Monthly,
  "Food"
);
const expense3 = new Expense(
  "Gym Membership",
  50,
  "User",
  Frequency.Monthly,
  "Health"
);

// controller
export const expenseSvc = new ExpenseService([expense1, expense2, expense3]);
export const expenses = expenseSvc.getExpenses();
export const summarizer = new ExpenseSummarizer();
export const summary = summarizer.summarizeExpenses(expenses);

//console.log(summary)
