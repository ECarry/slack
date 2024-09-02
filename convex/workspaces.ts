import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // TODO: Create a proper method later
    const joinCode = "12345";

    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      joinCode,
      userId,
    });

    return workspaceId;
  },
});

export const getWorkspaces = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});

export const getWorkspaceById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.get(args.id);
  },
});
