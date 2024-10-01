import "./App.css";
import { MockExpenseService, ExpenseSummarizer } from "./models/Expense";
import { expenses } from "./data/Data";
import CategoryItem from "./components/CategoryItem";
import NewExpense from "./pages/NewExpense";
import ExpenseItem from "./components/ExpenseItem";
import { useEffect, useState } from "react";

function App() {
  // CRUD service that takes an array of expenses
  const expenseSvc = new MockExpenseService(expenses);

  // expense summarizing class that is used to return a summary
  const expenseSummarizer = new ExpenseSummarizer();

  const [allExpenses, setAllExpenses] = useState(expenseSvc.getExpenses())
  // use the summarizer on the expenses to return a summary
  const summary = expenseSummarizer.summarizeExpenses(expenseSvc.getExpenses())

  return (
    <>
      <div>
        <h1>Finance Tracker</h1>
      </div>

      {/* Move to own for creating expenses page */}
      <NewExpense expenseSvc={expenseSvc} setAllExpenses={setAllExpenses}/>

      <div className="summaryDiv">
        <h3>Categories</h3>
        {expenseSummarizer.summarizeExpenses(expenseSvc.getExpenses()).byCategory.map((item, index) => (
          <CategoryItem
            key={index}
            itemCategory={item.category}
            itemSum={item.sum}
            itemPercentage={item.percentage}
          />
        ))}
        <p>Total Monthly Expenses: ${summary.totalMonthlySum}</p>
        <p>Total Annual Expenses: ${summary.totalAnnualSum}</p>
      </div>

      <div>
        {allExpenses.map((item, index) => (
          <ExpenseItem key={index} name={item.label} />
        ))}
      </div>
    </>
  );
}

export default App;
