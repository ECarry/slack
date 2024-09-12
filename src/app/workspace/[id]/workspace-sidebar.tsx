import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-get-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import {
  AlertTriangle,
  Hash,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import WorkspaceHeader from "./workspace-header";
import SidebarItem from "./sidebar-item";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import WorkspaceSection from "./workspace-section";
import { useGetMembers } from "@/features/members/api/use-get-members";
import UserItem from "./user-item";
import { useCreateChannel } from "@/features/channels/api/use-create-channel";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberIsLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceIsLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsIsLoading } = useGetChannels({
    workspaceId,
  });
  const { data: members, isLoading: membersIsLoading } = useGetMembers({
    workspaceId,
  });

  if (memberIsLoading || workspaceIsLoading)
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );

  if (!workspace || !member)
    return (
      <div className="flex flex-col bg-[#5E2C5F] gap-y-2 h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="Drafts" />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New channels"
        onNew={member.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            label={item.name}
            icon={Hash}
            id={item.name}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="Invite people"
        onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item.user._id}
            image={item.user.image}
            label={item.user.name}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};

export default WorkspaceSidebar;
