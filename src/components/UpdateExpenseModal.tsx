import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { Frequency, Expense, MockExpenseService } from "../models/Expense";
import { Button } from "@nextui-org/react";
interface UpdateExpenseModalProps {
  isOpen: boolean;
  onOpenChange: ((isOpen: boolean) => void) | undefined;
  onClose: () => void;
  expenseSvc: MockExpenseService;
  setAllExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  columnItem: Expense | undefined
}

const UpdateExpenseModal = ({columnItem, isOpen, onOpenChange, onClose, expenseSvc, setAllExpenses}: UpdateExpenseModalProps) => {

// const item = allExpenses[itemId]
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Update Expense</ModalHeader>
            <ModalBody>
                <form>
                {columnItem.label}
                
                <Button fullWidth onPress={onClose}>
                    Cancel
                  </Button>
                </form>
                
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateExpenseModal;
