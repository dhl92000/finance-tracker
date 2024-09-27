import "./App.css";
import { MockExpenseService, ExpenseSummarizer } from "./models/Expense";
import CategoryItem from "./components/CategoryItem";
import NewExpense from "./pages/NewExpense";
import { expenses } from "./data/Data";
import { useState } from "react";

function App() {
  const expenseSvc = new MockExpenseService(expenses);
  const expenseSummarizer = new ExpenseSummarizer();
  const summary = expenseSummarizer.summarizeExpenses(expenseSvc.getExpenses());
  const [expenseSummary, setExpenseSummary] = useState(summary)

  return (
    <>
      <div>
        <h1>Finance Tracker</h1>
      </div>

      {/* Move to own for creating expenses page */}
      <NewExpense expenseSvc={expenseSvc} />

      <div className="summaryDiv">
        <h3>Categories</h3>
        {expenseSummary.byCategory.map((item, index) => (
          <CategoryItem
            key={index}
            itemCategory={item.category}
            itemSum={item.sum}
            itemPercentage={item.percentage}
          />
        ))}
        <p>Total Monthly Expenses: ${expenseSummary.totalMonthlySum}</p>
        <p>Total Annual Expenses: ${expenseSummary.totalAnnualSum}</p>
      </div>
    </>
  );
}

export default App;
