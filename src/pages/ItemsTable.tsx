import { Button} from "@nextui-org/react";
import { Card, CardBody} from "@nextui-org/card";
import { DeleteIcon } from "../data/DeleteIcon";
import { EditIcon } from "../data/EditIcon";
import expenseColumns from "../data/ExpenseColumns";
import { Expense, MockExpenseService } from "../models/Expense";
// import { Input } from "@nextui-org/input";
// import { RadioGroup, Radio } from "@nextui-org/radio";
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
import { PlusIcon } from "../data/PlusIcon";
import { useDisclosure } from "@nextui-org/react";
import NewExpenseModal from "../components/NewExpenseModal";
import UpdateExpenseModal from "../components/UpdateExpenseModal";
import { useState} from "react";

interface ItemsTableProps {
  allExpenses: Expense[];
  expenseSvc: MockExpenseService;
  setAllExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const ItemsTable = ({ allExpenses, expenseSvc, setAllExpenses,}: ItemsTableProps) => {
  const updateDisclosure = useDisclosure()
  const newDisclosure = useDisclosure()

  const handleDelete = (item: Expense) => {
    expenseSvc.deleteExpense(item);
    const data = expenseSvc.getExpenses();
    setAllExpenses([...data]);
  };
  
  const [columnItem, setColumnItem] = useState<Expense | undefined>(undefined)
  
  const openUpdateModal = (item: Expense) => {
    setColumnItem(item)
    updateDisclosure.onOpen()
  }

  // useEffect(() => {
  //   console.log(columnItem); // This will log the updated state
  // }, [columnItem]);

  // Custom cell for properties, monthly/yearly value, and actions
  const renderCell = useCallback((item: Expense, columnKey: string | number)  => {
    const cellValue = item[columnKey as keyof Expense];
    //console.log(cellValue)
    switch (columnKey) {
      case "frequency":
        if (cellValue === 12) {
          return "Yearly";
        } else {
          return "Monthly";
        }
        break;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon data-testid="edit-icon" onClick={() => openUpdateModal(item)}/>
            </span>
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon data-testid="delete-icon" onClick={() => handleDelete(item)} />
            </span>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const newExpenseModal = (
      <>
      <Button data-testid='add-new-button' onPress={newDisclosure.onOpen} className="bg-foreground text-background bg-emerald-500	" endContent={<PlusIcon />} size="sm">
        Add New
      </Button>
      <NewExpenseModal isOpen={newDisclosure.isOpen} onOpenChange={newDisclosure.onOpenChange} onClose={newDisclosure.onClose} expenseSvc={expenseSvc} setAllExpenses={setAllExpenses}/>
      </>
    )

  return (
    <div className="flex w-full flex-col md:w-3/5">
      {/* Expenses Tab */}
      <UpdateExpenseModal columnItem={columnItem} isOpen={updateDisclosure.isOpen} onOpenChange={updateDisclosure.onOpenChange} onClose={updateDisclosure.onClose} expenseSvc={expenseSvc} setAllExpenses={setAllExpenses}/>

      <h4 className="text-left my-4 tracking-wide font-semibold">Expenses</h4>
      <Tabs aria-label="Complete expenses table">
        <Tab title="Expenses">
              <Table aria-label="Expenses Table content" topContent={newExpenseModal}>
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
                        <TableCell >{renderCell(row, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  ))}
                  
                </TableBody>
              </Table>
        </Tab>

        {/* Income Tab */}
        <Tab title="Income">
          <Card aria-label="Income card content">
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
