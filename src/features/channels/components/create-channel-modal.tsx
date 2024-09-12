import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { useCreateChannel } from "../api/use-create-channel";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";

const CreateChannelModal = () => {
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const [open, setOpen] = useCreateChannelModal();
  const { mutate, isPending } = useCreateChannel();
  const workspaceId = useWorkspaceId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value);
  };

  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { name, workspaceId },
      {
        onSuccess: (data) => {
          toast.success("Channel has been created.");
          //router.push(`/workspace/${data}`);
          handleClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a channel</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            disabled={isPending}
            value={name}
            onChange={handleChange}
            autoFocus
            minLength={3}
            required
            placeholder="e.g. 'plan-budget'"
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
