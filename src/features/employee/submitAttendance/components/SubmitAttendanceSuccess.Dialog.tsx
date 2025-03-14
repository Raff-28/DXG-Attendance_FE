import { AppButton } from "@/components/appButton/AppButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { PostAttendanceResponseData } from "@/data/attendance/attendance.api";
import { DialogTitle } from "@radix-ui/react-dialog";

interface SubmitAttendanceSuccessDialogProps {
  data: PostAttendanceResponseData;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onExit: () => void;
}

export const SubmitAttendanceSuccessDialog = ({
  data,
  open,
  onOpenChange,
  onExit,
}: SubmitAttendanceSuccessDialogProps) => {
  const handleModalChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      onExit();
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleModalChange}>
      <DialogContent className="sm:max-w-2xl [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-5">
            Attendance for {data.timestamp.split("T")[0]} has been recorded!
          </DialogTitle>
          <p>
            <span className="font-semibold">Timestamp:</span>{" "}
            {data.timestamp.split("T")[1].split(".")[0]}
          </p>
          <p>
            <span className="font-semibold">Work Description:</span>{" "}
            {data.work_description}
          </p>
          <p>
            <span className="font-semibold">Reason for WFH:</span>{" "}
            {data.reason_for_wfh}
          </p>
          <p className="font-semibold">Image Proof:</p>
          <img
            src={data.photo_url}
            className="max-h-72 object-cover"
            alt="proof-img"
          />
          <DialogClose asChild>
            <AppButton
              className="cursor-pointer w-1/3 min-w-10 mt-5 ms-auto"
              state="Active"
            >
              Done
            </AppButton>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
