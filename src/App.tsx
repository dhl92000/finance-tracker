import "./App.css";
import { MockExpenseService, ExpenseSummarizer } from "./models/Expense";
import { expenses } from "./data/Data";

import Header from "./components/Header";
import ItemsTable from "./pages/ItemsTable";
import Summary from "./components/Summary";
import { useState } from "react";
import {Divider} from "@nextui-org/react";

function App() {

  // CRUD service that takes an array of expenses
  const expenseSvc = new MockExpenseService(expenses);

  // expense summarizing class that is used to return a summary
  const expenseSummarizer = new ExpenseSummarizer();

  const [allExpenses, setAllExpenses] = useState(expenseSvc.getExpenses());
  // use the summarizer on the expenses to return a summary
  const summary = expenseSummarizer.summarizeExpenses(expenseSvc.getExpenses());

  return (
    <div >
      <Header />

      <Divider className="my-4 md:my-4" />
      <div className="md:flex gap-4">
        <ItemsTable
          allExpenses={allExpenses}
          expenseSvc={expenseSvc}
          setAllExpenses={setAllExpenses}
        />
        <Summary summary={summary} />
      </div>
    </div>
  );
}

export default App;
