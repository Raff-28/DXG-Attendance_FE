import { Dialog, DialogContent } from "../ui/dialog";

interface FullScreenImageDialogProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string;
}

export const FullScreenImageDialog = ({
  open,
  onOpenChange,
  imageUrl,
}: FullScreenImageDialogProps) => {
  const handleModalChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
  };
  return (
    <Dialog open={open} onOpenChange={handleModalChange}>
      <DialogContent className="[&>button]:hidden sm:max-w-6xl">
        <img
          src={imageUrl}
          className="w-full max-h-[80vh] object-contain"
          alt="attendance-img"
        />
      </DialogContent>
    </Dialog>
  );
};
