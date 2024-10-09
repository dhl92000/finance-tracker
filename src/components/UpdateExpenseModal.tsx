import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { Frequency, Expense, MockExpenseService } from "../models/Expense";
import { Input, Button } from "@nextui-org/react";
import { Radio, RadioGroup } from "@nextui-org/react";
interface UpdateExpenseModalProps {
  isOpen: boolean;
  onOpenChange: ((isOpen: boolean) => void) | undefined;
  onClose: () => void;
  expenseSvc: MockExpenseService;
  setAllExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  columnItem: Expense | undefined;
}
import { useEffect, useState } from "react";

const UpdateExpenseModal = ({columnItem,isOpen,onOpenChange, onClose, expenseSvc, setAllExpenses}: UpdateExpenseModalProps) => {

  const [formData, setFormData] = useState({
    id: 0,
    label: '',
    amount: 0,
    owner: 'User',
    frequency: Frequency.Monthly,
    category: '',
  });

  useEffect(() => {
    if (columnItem) {
      setFormData({
        id: columnItem.id,
        label: columnItem.label,
        amount: columnItem.amount,
        owner: 'User',
        frequency: columnItem.frequency,
        category: columnItem.category,
      });
    }
  }, [columnItem]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const toNumber = parseInt(formData["amount"]);
      formData["amount"] = toNumber;
      expenseSvc.updateExpense(formData);
      const data = expenseSvc.getExpenses();
      setAllExpenses([...data]);
    

    onClose()
  };
  // const item = allExpenses[itemId]
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Update Expense</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                  isRequired
                  label="Item Name"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                />

                {/* {!isValidNumber && (
                    <div>Must enter a valid number higher than 0.</div>
                  )} */}
                <Input
                  isRequired
                  label="Amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />

                <Input
                  isRequired
                  label="Owner"
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                />

                <RadioGroup
                  label="Frequency"
                  defaultValue={Frequency.Monthly.toString()}
                >
                  <Radio
                    name="frequency"
                    value={Frequency.Monthly.toString()}
                    onChange={handleChange}
                  >
                    Monthly
                  </Radio>
                  <Radio
                    name="frequency"
                    value={Frequency.Yearly.toString()}
                    onChange={handleChange}
                  >
                    Yearly
                  </Radio>
                </RadioGroup>

                <Input
                  isRequired
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
                  <div className="flex gap-2 justify-end">

                <Button fullWidth onPress={onClose}>
                  Cancel
                </Button>
                <Button fullWidth color="primary" type="submit">
                      Confirm
                    </Button>
                    </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateExpenseModal;
