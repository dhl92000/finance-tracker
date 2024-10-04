import "./App.css";
import {
  Expense,
  MockExpenseService,
  ExpenseSummarizer,
} from "./models/Expense";
import { expenses } from "./data/Data";
import CategoryItem from "./components/CategoryItem";
import Header from "./components/Header";
import ItemsTable from "./pages/ItemsTable";
// import NewExpense from "./pages/NewExpense";
// import ExpenseItem from "./components/ExpenseItem";
import { useState, useCallback } from "react";


function App() {
  // CRUD service that takes an array of expenses
  const expenseSvc = new MockExpenseService(expenses);

  // expense summarizing class that is used to return a summary
  const expenseSummarizer = new ExpenseSummarizer();

  const [allExpenses, setAllExpenses] = useState(expenseSvc.getExpenses());
  // use the summarizer on the expenses to return a summary
  const summary = expenseSummarizer.summarizeExpenses(expenseSvc.getExpenses());





  return (
    <>
      <Header/>
      <ItemsTable allExpenses={allExpenses} expenseSvc={expenseSvc} setAllExpenses={setAllExpenses}/>

        <div className="summaryDiv">
          <h3>Summary</h3>
          {expenseSummarizer
            .summarizeExpenses(expenseSvc.getExpenses())
            .byCategory.map((item, index) => (
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
