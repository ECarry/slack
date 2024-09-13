import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import { cn } from "@/lib/utils";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  joinCode: string;
  name: string;
}

const InviteModal = ({ open, setOpen, joinCode, name }: Props) => {
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useNewJoinCode();

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;

    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("Invite link copied to clipboard");
    });
  };

  const handleRefresh = () => {
    mutate({
      workspaceId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to your workspace</DialogTitle>
          <DialogDescription>
            Use the code blow to invite people to your workspace.
          </DialogDescription>
          <div className="flex flex-col gap-y-4 items-center justify-center py-10">
            <p className="text-4xl font-bold tracking-widest uppercase">
              {joinCode}
            </p>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              Copy link
              <CopyIcon className="size-4 ml-2" />
            </Button>
          </div>

          <div className="flex items-center justify-between w-full">
            <Button
              onClick={handleRefresh}
              disabled={isPending}
              variant="outline"
            >
              New code{" "}
              <RefreshCcw
                className={cn("size-4 ml-2", isPending && "animate-spin")}
              />
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
