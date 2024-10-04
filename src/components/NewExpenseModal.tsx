import { Button, ModalHeader } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Radio, RadioGroup } from "@nextui-org/react";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
//import { useDisclosure } from "@nextui-org/react";

interface NewExpenseModalProps {
  isOpen: boolean
  onOpenChange: ((isOpen: boolean) => void) | undefined
}

const NewExpenseModal = ({isOpen, onOpenChange}: NewExpenseModalProps) => {
//  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Create a New Expense</ModalHeader>
        <ModalBody>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewExpenseModal;
