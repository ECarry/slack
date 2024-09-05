import { v } from "convex/values";
import { query } from "./_generated/server";
import { auth } from "./auth";

export const getCurrentMember = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      return null;
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_user_id_and_workspace_id", (q) =>
        q.eq("userId", userId).eq("workspaceId", args.workspaceId)
      )
      .unique();

    if (!member) {
      return null;
    }

    return member;
  },
});
