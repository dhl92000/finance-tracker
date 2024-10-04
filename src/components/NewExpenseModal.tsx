import { Button, ModalHeader } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Radio, RadioGroup } from "@nextui-org/react";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
//import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { Frequency, Expense, MockExpenseService } from "../models/Expense";

interface NewExpenseModalProps {
  isOpen: boolean;
  onOpenChange: ((isOpen: boolean) => void) | undefined;
  expenseSvc: MockExpenseService;
  setAllExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const NewExpenseModal = ({
  isOpen,
  onOpenChange,
  expenseSvc,
  setAllExpenses,
}: NewExpenseModalProps) => {
  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 10),
    label: "",
    amount: 0,
    owner: "User",
    frequency: Frequency.Monthly,
    category: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseInt(value) : value,
    }));
  };

  const handlesubmit = (event: React.FormEvent) => {
    event.preventDefault();
    expenseSvc.createExpense(formData);
    const data = expenseSvc.getExpenses();
    console.log(data);
    setAllExpenses([...data]);
    reset();
    // turn off modal with onClose modal Event
  };

  const reset = () => {
    setFormData({
      id: 0,
      label: "",
      amount: 0,
      owner: "User",
      frequency: Frequency.Monthly,
      category: "",
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Create a New Expense</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
                <Input
                  isRequired
                  label="Item Name"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                />
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
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    onClick={handlesubmit}
                    onPress={onClose}
                  >
                    Add New Item
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

export default NewExpenseModal;
