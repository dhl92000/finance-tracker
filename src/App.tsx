import { useState } from 'react'
import "./App.css";
import { expenseSvc, expenses, summarizer, summary } from "./data/Data";
//import { Expense, ExpenseService, ExpenseSummarizer, Frequency} from './models/Expense'
import CategoryItem from "./components/CategoryItem";
import NewExpense from "./pages/NewExpense";

function App() {
  
  return (
    <>
      <div>
        <h1>Finance Tracker</h1>
      </div>
    <NewExpense/>
      <div className="summaryDiv">
        <h3>Categories</h3>
        {summary.summaries.map((item, index) => (
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
    </>
  );
}

export default App;
