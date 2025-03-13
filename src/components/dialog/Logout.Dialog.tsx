"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleAlert, X } from "lucide-react";
import { Button } from "../ui/button";

interface LogOutDialogProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmLogout: () => void;
}

export const LogOutDialog = (props: LogOutDialogProps) => {
  const handleModalChange = (isOpen: boolean) => {
    props.onOpenChange(isOpen);
  };

  return (
    <Dialog open={props.open} onOpenChange={handleModalChange}>
      <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
        <DialogHeader>
          <div className="flex place-content-center">
            <CircleAlert className="text-amber-400 size-28" />
          </div>
          <DialogClose asChild>
            <X
              type="button"
              className="size-8 absolute right-2 top-2 cursor-pointer transform hover:scale-110 transition-transform duration-200"
            >
              Close
            </X>
          </DialogClose>
          <DialogTitle className="flex justify-center font-semibold pt-6 text-2xl">
            Logout
          </DialogTitle>
          <DialogDescription className="flex justify-center text-xl text-black text-center">
            Are you sure want to logout?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full px-8 gap-4">
          <Button
            type="submit"
            className="flex-1 cursor-pointer border border-gray-400 text-black bg-transparent  hover:bg-transparent  transform hover:scale-110 transition-transform duration-200"
            onClick={() => props.onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 cursor-pointer transform hover:scale-110 transition-transform duration-200"
            onClick={props.onConfirmLogout}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
