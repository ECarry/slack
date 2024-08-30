import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";

const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const { mutate } = useCreateWorkspace();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    mutate(
      {
        name: "Workspace 1",
      },
      {
        onSuccess(data) {},
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input
            disabled={false}
            value={""}
            onChange={() => {}}
            autoFocus
            minLength={3}
            required
            placeholder="Workspace name e.g. 'Work', 'Personal' 'Home'"
          />
          <div className="flex justify-end">
            <Button>Add</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
