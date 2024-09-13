"use client";

import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { useJoin } from "@/features/workspaces/api/use-join";
import { cn } from "@/lib/utils";
import { HashIcon, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import VerificationInput from "react-verification-input";
import { toast } from "sonner";

const JoinPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useJoin();
  const { data, isLoading } = useGetWorkspaceInfo({
    id: workspaceId,
  });

  const isMember = useMemo(() => data?.isMember, [data]);

  useEffect(() => {
    if (isMember) {
      router.replace(`/workspace/${workspaceId}`);
    }
  }, [isMember, router, workspaceId]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleComplete = (value: string) => {
    mutate(
      {
        workspaceId,
        joinCode: value,
      },
      {
        onSuccess: () => {
          router.replace(`/workspace/${workspaceId}`);
          toast.success("You have joined the workspace");
        },
        onError: () => {
          toast.error("Invalid code");
        },
      }
    );
  };

  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8">
      <HashIcon className="size-20 text-rose-500" />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join {data?.name}</h1>
          <p className="text-md text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>
        <VerificationInput
          length={6}
          onComplete={handleComplete}
          autoFocus
          classNames={{
            container: cn(
              "flex gap-x-2",
              isPending && "opacity-50 cursor-not-allowed"
            ),
            character:
              "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
        />
      </div>
      <div className="flex gap-x-4">
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
