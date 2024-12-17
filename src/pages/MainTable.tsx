import { Expense, Frequency, MockExpenseService } from "../models/Expense";
import { CurrencyFormatter } from "../util/CurrencyFormatter";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { Tabs, Tab } from "@nextui-org/tabs";
import { render } from "@testing-library/react";
import { useCallback } from "react";

interface MainTableProps {
  allExpenses: Expense[];
  expenseSvc: MockExpenseService;
  setAllExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

//Inside my table body, 1 row for each item m
// i can map through all my expenses and create 1 row for each
// inside the row, I need:
// a key
// map through an expense, which is an object. all the keys or entries (?)
// use switch case to

const MainTable = ({
  allExpenses,
  expenseSvc,
  setAllExpenses,
}: MainTableProps) => {
  // console.log(allExpenses[0])

  // also need to assign a colour

  const actionsModal = <></>;

  const columns = [
    { key: "label", label: "ITEM" },
    { key: "amount", label: "AMOUNT" },
    { key: "frequency", label: "FREQUENCY" },
    { key: "category", label: "CATEGORY" },
    { key: "owner", label: "OWNER" },
  ];

  const renderCell = useCallback((item: Expense, colKey: string | number) => {
    const cellValue = item[colKey as keyof Expense];

    switch (colKey) {
      case "amount":
        return CurrencyFormatter.format(item.amount);
        break;
      case "frequency":
        if (cellValue === 12) {
          return "Yearly";
        } else {
          return "Monthly";
        }
        break;
      case "category":
        return (
          <Chip color="warning" variant="flat">
            {item.category}
          </Chip>
        );
        break;
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex w-full flex-col md:w-3/5">
      <Card className="md:p-4">
        <CardBody>
          <CardHeader className="text-4xl mb-4">Expenses</CardHeader>
          {/* <h4 className="text-left m-4 tracking-wide text-lg">Expenses</h4> */}
          <Tabs className='tabs'>
            <Tab title="Expenses">
              {/* can add topContent into table for modals */}

              <Table aria-label="All Expense Items Table" removeWrapper>
                <TableHeader columns={columns}>
                  {(col) => (
                    <TableColumn key={col.key}>{col.label}</TableColumn>
                  )}
                </TableHeader>

                <TableBody items={allExpenses}>
                  {(item) => (
                    <TableRow key={item.id}>
                      {(colKey) => (
                        <TableCell>{renderCell(item, colKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Tab>

            <Tab title="Income">
              <Table aria-label="All Expense Items Table">
                <TableHeader>
                  <TableColumn>Column 1</TableColumn>
                  <TableColumn>Column 2</TableColumn>
                  <TableColumn>Column 3</TableColumn>
                  <TableColumn>Column 4</TableColumn>
                  <TableColumn>Column 5</TableColumn>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell>Cell 1</TableCell>
                    <TableCell>Cell 2</TableCell>
                    <TableCell>Cell 3</TableCell>
                    <TableCell>Cell 4</TableCell>
                    <TableCell>Cell 5</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default MainTable;
