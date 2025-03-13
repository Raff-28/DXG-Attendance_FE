import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GetEmployeeResponseData } from "@/data/employee/employee.api";
import { EditEmployeeForm } from "./EditEmployee.Form";

interface EditEmployeeDialogProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  prevData: GetEmployeeResponseData;
  onSuccessEdit: () => void;
}

export const EditEmployeeDialog = ({
  open,
  onOpenChange,
  prevData,
  onSuccessEdit,
}: EditEmployeeDialogProps) => {
  const handleModalChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
  };
  return (
    <Dialog open={open} onOpenChange={handleModalChange}>
      <DialogContent className="sm:max-w-[800px] p-0 [&>button]:hidden">
        <DialogHeader>
          <DialogClose asChild></DialogClose>
          <DialogTitle className="text-2xl mt-5 mx-5">
            Edit Employee Data
          </DialogTitle>
        </DialogHeader>
        <hr />
        <div className="max-h-[75vh] overflow-y-scroll">
          <EditEmployeeForm prevData={prevData} onSuccessEdit={onSuccessEdit} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
