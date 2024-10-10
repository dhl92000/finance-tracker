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
    amount: '',
    owner: 'User',
    frequency: '',
    category: '',
  });

  // columnItem is just Expense in raw form 
 // number console.log(typeof columnItem?.frequency)

 // in my edit form, if fields are prepopulated, they are all strings
  // when submit is pressed, its also all strings 
  // so my state for the radio group has to take the number and make into a string
  // and my radio inputs all have to be to string 

  // I need to use formData, after I get columnItem and write it into FORMDATA
  // and not use props directly(?) 
  useEffect(() => {
    if (columnItem) {
      setFormData({
        id: columnItem.id,
        label: columnItem.label,
        amount: columnItem.amount.toString(),
        owner: 'User',
        frequency: columnItem.frequency.toString(),
        category: columnItem.category,
      });
      setSelected(columnItem.frequency.toString())
    }
  }, [columnItem]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
        const toNumber = parseInt(formData["amount"]);
        const expense: Expense = {
            ...formData,
            amount: toNumber,
            frequency: parseInt(formData.frequency) as Frequency
        }
        expenseSvc.updateExpense(expense);
        const data = expenseSvc.getExpenses();
        setAllExpenses([...data]);
        //reset()
        onClose()
    } catch (err) {
        console.log(err)
    }
  };
  
  const [selected, setSelected] = useState(formData.frequency.toString());

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
                  value={formData.amount.toString()}
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
