import "./App.css";
import {
  Expense,
  MockExpenseService,
  ExpenseSummarizer,
} from "./models/Expense";
import { expenses } from "./data/Data";
import CategoryItem from "./components/CategoryItem";
import Header from "./components/Header";
// import NewExpense from "./pages/NewExpense";
// import ExpenseItem from "./components/ExpenseItem";
import { useState, useCallback } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Tabs, Tab } from "@nextui-org/tabs";

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

  // Custom cell for monthly/yearly value
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
      <Header/>
        <div className="flex w-full flex-col">
          <Tabs aria-label="Complete expenses table">
            <Tab title="Expenses">
              <Card>
                <CardBody>
                  <Table aria-label="Complete expenses table">
                    <TableHeader columns={columns}>
                      {columns.map((column) => (
                        <TableColumn key={column.key}>
                          {column.label}
                        </TableColumn>
                      ))}
                    </TableHeader>

                    <TableBody>
                      {allExpenses.map((row) => (
                        <TableRow key={row.id}>
                          {(columnKey) => (
                            <TableCell>{renderCell(row, columnKey)}</TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </Tab>
            <Tab title="Income">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>

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
