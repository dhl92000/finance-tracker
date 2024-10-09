import { Button, ModalHeader } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Radio, RadioGroup } from "@nextui-org/react";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useState } from "react";
import { Frequency, Expense, MockExpenseService } from "../models/Expense";

interface NewExpenseModalProps {
  isOpen: boolean;
  onOpenChange: ((isOpen: boolean) => void) | undefined;
  onClose: () => void;
  expenseSvc: MockExpenseService;
  setAllExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const NewExpenseModal = ({
  isOpen,
  onOpenChange,
  onClose,
  expenseSvc,
  setAllExpenses,
}: NewExpenseModalProps) => {
  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 100),
    label: "",
    amount: "",
    owner: "User",
    frequency: Frequency.Monthly,
    category: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isValidNumber, setIsValidNumber] = useState(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const toNumber = parseInt(formData.amount);
      formData.amount = toNumber;
      expenseSvc.createExpense(formData);
      const data = expenseSvc.getExpenses();
      setAllExpenses([...data]);
      setIsValidNumber(true);
      onClose();
      reset();
    } catch (err) {
      setIsValidNumber(false);
    }
  };

  const reset = () => {
    setFormData({
      id: 0,
      label: "",
      amount: "",
      owner: "User",
      frequency: Frequency.Monthly,
      category: "",
    });
  };
  const [selected, setSelected] = useState('Monthly');

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Create a New Expense</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                  isRequired
                  label="Item Name"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                />

                {!isValidNumber && (
                  <div>Must enter a valid number higher than 0.</div>
                )}
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
                  isRequired
                  label="Frequency"
                  name="frequency"
                  onChange={handleChange}
                  value={selected}
                  onValueChange={setSelected}
                >
                  <Radio
                    value={Frequency.Monthly.toString()}
                  >
                    Monthly
                  </Radio>
                  <Radio
                    value={Frequency.Yearly.toString()}
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
