import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all scans for a specific user
export const getUserScans = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const scans = await ctx.db
      .query("scans")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
    
    return scans;
  },
});

// Create a new scan
export const createScan = mutation({
  args: {
    userId: v.string(),
    fileName: v.string(),
    content: v.any(),
  },
  handler: async (ctx, args) => {
    const scanId = await ctx.db.insert("scans", {
      userId: args.userId,
      fileName: args.fileName,
      content: args.content,
      createdAt: Date.now(),
    });
    
    return scanId;
  },
});

// Get a single scan by ID
export const getScanById = query({
  args: {
    scanId: v.id("scans"),
  },
  handler: async (ctx, args) => {
    const scan = await ctx.db.get(args.scanId);
    return scan;
  },
});

// Delete a scan
export const deleteScan = mutation({
  args: {
    scanId: v.id("scans"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.scanId);
  },
});
