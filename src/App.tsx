import "./App.css";
import { MockExpenseService, ExpenseSummarizer } from "./models/Expense";
import { expenses } from "./data/Data";
import Header from "./components/Header";

import ItemsTable from "./pages/ItemsTable";
import Summary from "./components/Summary";
import ThemeContext from "./store/ThemeContext";
// import { ThemeContextProvider } from "./store/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";

function App() {
  // CRUD service that takes an array of expenses
  const expenseSvc = new MockExpenseService(expenses);

  // expense summarizing class that is used to return a summary
  const expenseSummarizer = new ExpenseSummarizer();

  const [allExpenses, setAllExpenses] = useState(expenseSvc.getExpenses());
  // use the summarizer on the expenses to return a summary
  const summary = expenseSummarizer.summarizeExpenses(expenseSvc.getExpenses());

  const themeCtx = useContext(ThemeContext);

  const [categoryColors, setCategoryColors] = useState({})

  useEffect(() => {
    const colors = [
      'bg-mint1',
      'bg-mint2',
      'bg-mint3',
      'bg-yellow1',
      'bg-yellow2',
      'bg-yellow3',
    ];
    const colorMap: { [key: string]: string } = {};
    summary.byCategory.forEach((category, index) => {
      colorMap[category.category] = colors[index % colors.length];
    });

    setCategoryColors(colorMap);
  }, [summary.byCategory]);

  return (
    <div>
      <Header theme={themeCtx.theme} toggleTheme={themeCtx.toggleTheme} />
      <Divider className="my-4 md:my-4" />
      <div className="md:flex gap-4">
        <ItemsTable
          allExpenses={allExpenses}
          expenseSvc={expenseSvc}
          setAllExpenses={setAllExpenses}
          categoryColors={categoryColors}
        />
        <Summary summary={summary} categoryColors={categoryColors}/>
      </div>
    </div>
  );
}

export default App;
