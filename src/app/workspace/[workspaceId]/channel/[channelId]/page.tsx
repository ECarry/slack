"use client";

import { useChanelId } from "@/app/hooks/use-cannel-id";
import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { Loader, TriangleAlert } from "lucide-react";
import Header from "./header";
import ChatInput from "./chat-input";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import MessageList from "@/components/message-list";

const ChannelPage = () => {
  const channelId = useChanelId();
  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  });
  const { results, status, loadMore } = useGetMessages({ channelId });

  if (channelLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">No channel found.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header title={channel.name} />
      <MessageList
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        data={results}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />
      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  );
};

export default ChannelPage;
