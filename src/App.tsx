import "./App.css";
import {
  Expense,
  MockExpenseService,
  ExpenseSummarizer,
} from "./models/Expense";
import { expenses } from "./data/Data";
import CategoryItem from "./components/CategoryItem";
import NewExpense from "./pages/NewExpense";
import ExpenseItem from "./components/ExpenseItem";
import { useState, useCallback } from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

function App() {
  // CRUD service that takes an array of expenses
  const expenseSvc = new MockExpenseService(expenses);

  // expense summarizing class that is used to return a summary
  const expenseSummarizer = new ExpenseSummarizer();

  const [allExpenses, setAllExpenses] = useState(expenseSvc.getExpenses());
  // use the summarizer on the expenses to return a summary
  const summary = expenseSummarizer.summarizeExpenses(expenseSvc.getExpenses());

  const columns = [
    {
      key: "label",
      label: "ITEM",
    },
    {
      key: "amount",
      label: "AMOUNT",
    },
    {
      key: "frequency",
      label: "FREQUENCY",
    },
    {
      key: "category",
      label: "CATEGORY",
    },
    {
      key: "owner",
      label: "OWNER",
    },
  ];

  const renderCell = useCallback((item: Expense, columnKey: keyof Expense) => {
    const cellValue = item[columnKey as keyof Expense];
    switch (columnKey) {
      case "frequency":
        if (cellValue === "1") {
          return "Yearly";
        } else {
          return "Monthly";
        }
        break;
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className="mainHeader">
        <h1>Finance Tracker</h1>
      </div>
      
      <div className="appBody">
        <div className="expensesDiv">
          {/* {allExpenses.map((item) => (
          <ExpenseItem
            key={item.id}
            item={item}
            expenseSvc={expenseSvc}
            setAllExpenses={setAllExpenses}
          />
        ))} */}
          <Table aria-label="Complete expenses table">
            <TableHeader columns={columns}>
              {columns.map((column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>

            {/* if columnKey is equal to 1, display "Monthly" , if 12, "Yearly" */}
            <TableBody>
              {allExpenses.map((row) => (
                <TableRow key={row.id}>
                  {(columnKey) => (
                    // <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                    <TableCell>{renderCell(row, columnKey)}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Move to own for creating expenses page */}
        {/* <NewExpense expenseSvc={expenseSvc} setAllExpenses={setAllExpenses} /> */}

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
      </div>
    </>
  );
}

export default App;
