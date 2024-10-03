import { Expense } from "../models/Expense";
import { useCallback } from "react";
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

interface ItemsTableProps {
  allExpenses: Expense[];
}

const ItemsTable = ({ allExpenses }: ItemsTableProps) => {
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
    <div className="flex w-full flex-col">
      <Tabs aria-label="Complete expenses table">
        <Tab title="Expenses">
          <Card>
            <CardBody>
              <Table aria-label="Complete expenses table">
                <TableHeader columns={columns}>
                  {columns.map((column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
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
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        
      </Tabs>
    </div>
  );
};

export default ItemsTable;
