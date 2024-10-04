import { Button } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { DeleteIcon } from "../data/DeleteIcon";
import { EditIcon } from "../data/EditIcon";
import expenseColumns from "../data/ExpenseColumns";
import { Expense, MockExpenseService } from "../models/Expense";
import { Input } from "@nextui-org/input";
import { RadioGroup, Radio } from "@nextui-org/radio";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useCallback } from "react";
import ItemsDiv from "./ItemsDiv";
import { PlusIcon } from "../data/PlusIcon";
import { useDisclosure } from "@nextui-org/react";
import NewExpenseModal from "../components/NewExpenseModal";
interface ItemsTableProps {
  allExpenses: Expense[];
  expenseSvc: MockExpenseService;
  setAllExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const ItemsTable = ({
  allExpenses,
  expenseSvc,
  setAllExpenses,
}: ItemsTableProps) => {
  const handleDelete = (item: Expense) => {
    expenseSvc.deleteExpense(item);
    const data = expenseSvc.getExpenses();
    setAllExpenses([...data]);
  };

  const handleUpdate = (item: Expense) => {
    return;
  };

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
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon onClick={() => handleDelete(item)} />
            </span>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const newExpenseModal = (
    <>
    
    <Button
      onPress={onOpen}
      className="bg-foreground text-background"
      endContent={<PlusIcon />}
      size="sm"
    >
      Add New
    </Button>
    <NewExpenseModal isOpen={isOpen} onOpenChange={onOpenChange}/>
    </>
  );

  return (
    <div className="flex w-full flex-col">
      {/* Expenses Tab */}
      <Tabs aria-label="Complete expenses table">
        <Tab title="Expenses">
          <Card>
            <CardBody>
              <Table
                aria-label="Complete expenses table"
                topContent={newExpenseModal}
              >
                <TableHeader columns={expenseColumns}>
                  <>
                    {expenseColumns.map((column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    ))}
                  </>
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

        {/* Income Tab */}
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

        {/* <Tab title="Add New" aria-label="Add new item">
          <Card>
            <CardBody>
              <form className="flex flex-col gap-4">
                <Input isRequired label="Item Name" />
                <Input isRequired label="Amount" />
                <Input isRequired label="Owner" />
                <Input isRequired label="Frequency" />
                <RadioGroup label="Frequency">
                  <Radio value="monthly">Monthly</Radio>
                  <Radio value="yearly">Yearly</Radio>
                </RadioGroup>
                <Input isRequired label="Category" />

                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Add New Item
                  </Button>
                  <Button fullWidth color="danger">
                    Reset
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Tab> */}
      </Tabs>
    </div>
  );
};

export default ItemsTable;
