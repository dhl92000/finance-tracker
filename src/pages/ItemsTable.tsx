import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { DeleteIcon } from "../data/DeleteIcon";
import { EditIcon } from "../data/EditIcon";
import { Expense, MockExpenseService } from "../models/Expense";

// sortDescriptor add to table
// map of colours with {'category': '#hexcode'}
// if map has category, return colour
// if not, create a random colour (or pick from colours)
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
import { useDisclosure} from "@nextui-org/react";
import { CurrencyFormatter } from "../util/CurrencyFormatter";
import NewExpenseModal from "../components/NewExpenseModal";
import UpdateExpenseModal from "../components/UpdateExpenseModal";
import { useState } from "react";

interface ItemsTableProps {
  allExpenses: Expense[];
  expenseSvc: MockExpenseService;
  setAllExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  categoryColors: { [key: string]: string };
}

const ItemsTable = ({
  allExpenses,
  expenseSvc,
  setAllExpenses,
  categoryColors,
}: ItemsTableProps) => {
  const updateDisclosure = useDisclosure();
  const newDisclosure = useDisclosure();

  const [columnItem, setColumnItem] = useState<Expense | undefined>(undefined);



  // Custom cell for properties, monthly/yearly value, and actions
  const renderCell = useCallback(
    (item: Expense, colKey: string | number) => {
      const cellValue = item[colKey as keyof Expense];
      let color;
      const handleDelete = (item: Expense) => {
        expenseSvc.deleteExpense(item);
        const data = expenseSvc.getExpenses();
        setAllExpenses([...data]);
      };
    
      const openUpdateModal = (item: Expense) => {
        setColumnItem(item);
        updateDisclosure.onOpen();
      };
      // state passed as props in useCallback is showing undefined ()
      //this shows as undefined
      // console.log(color)
      //console.log(categoryColors[0])

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
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon
                  data-testid="edit-icon"
                  onClick={() => openUpdateModal(item)}
                />
              </span>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon
                  data-testid="delete-icon"
                  onClick={() => handleDelete(item)}
                />
              </span>
            </div>
          );
          break;
        case "category":
          color = categoryColors[item.category];
          return (
            <Chip variant="flat" className={color}>
              {item.category}
            </Chip>
          );
          break;
        default:
          return cellValue;
      }
    },
    [categoryColors, expenseSvc, setAllExpenses, updateDisclosure]
  );

  const newExpenseModal = (
    <>
      <Button
        data-testid="add-new-button"
        onPress={newDisclosure.onOpen}
        className="bg-foreground text-background bg-emerald-500	"
        endContent={<PlusIcon />}
        size="sm"
      >
        Add New
      </Button>
      <NewExpenseModal
        isOpen={newDisclosure.isOpen}
        onOpenChange={newDisclosure.onOpenChange}
        onClose={newDisclosure.onClose}
        expenseSvc={expenseSvc}
        setAllExpenses={setAllExpenses}
      />
    </>
  );

  const columns = [
    { key: "label", label: "ITEM", sortable: true },
    { key: "amount", label: "AMOUNT", sortable: true },
    { key: "frequency", label: "FREQUENCY", sortable: true },
    { key: "category", label: "CATEGORY", sortable: true },
    { key: "actions", label: "ACTIONS" },
  ];

  const [sortedExpenses, setSortedExpenses] = useState<{
    items: Expense[];
    sortDescriptor: { direction: "ascending" | "descending"; column: string };
  }>({
    items: allExpenses,
    sortDescriptor: { direction: "descending", column: "key" },
  });



  function sortAllExpenses() {
    const { items, sortDescriptor } = sortedExpenses;
    
    items.sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Expense];
      const second = b[sortDescriptor.column as keyof Expense];
      let cmp =
        (parseInt(first as string) || first) < (parseInt(second as string) || second) ? -1 : 1;
      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }
      return cmp;
    });

    setSortedExpenses({
      items,
      sortDescriptor:
        sortDescriptor.direction === "ascending"
          ? { direction: "descending", column: "key" }
          : { direction: "ascending", column: "key" },
    });
  }

  return (
    <div className="flex w-full flex-col mb-4 md:w-3/5">
      <UpdateExpenseModal
        columnItem={columnItem}
        isOpen={updateDisclosure.isOpen}
        onOpenChange={updateDisclosure.onOpenChange}
        onClose={updateDisclosure.onClose}
        expenseSvc={expenseSvc}
        setAllExpenses={setAllExpenses}
      />
      <Card className="md:p-4">
        <CardBody>
          <CardHeader className="text-4xl mb-4">Expenses</CardHeader>
          {/* <h4 className="text-left m-4 tracking-wide text-lg">Expenses</h4> */}
          <Tabs className="tabs">
            <Tab title="Expenses" data-testid='expensesTitle'>
              <Table
                aria-label="All Expense Items Table"
                removeWrapper
                topContent={newExpenseModal}
                onSortChange={sortAllExpenses}
                sortDescriptor={sortedExpenses.sortDescriptor}
              >
                <TableHeader columns={columns}>
                  {(col) => (
                    <TableColumn key={col.key} allowsSorting={col.sortable}>{col.label}</TableColumn>
                    //<TableColumn key={col.key}>{col.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={sortedExpenses.items}>
                  {/* <TableBody items={list.items}> */}
                  {/* <TableBody items={allExpenses}> */}
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
            {/* Income Tab */}
            <Tab title="Income">
              <Table aria-label="All Income Items Table">
                <TableHeader>
                  <TableColumn>Column 1</TableColumn>
                  <TableColumn>Column 2</TableColumn>
                  <TableColumn>Column 3</TableColumn>
                  <TableColumn>Column 4</TableColumn>
                  <TableColumn>Column 5</TableColumn>
                </TableHeader>

                <TableBody emptyContent={"No rows to display."}>
                  {/* Add children here if needed */}
                  {[]}
                </TableBody>
              </Table>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default ItemsTable;
