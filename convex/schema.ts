import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  numbers: defineTable({
    value: v.number(),
  }),
  scans: defineTable({
    userId: v.string(),
    fileName: v.string(),
    content: v.any(), // Array of messages with hallucination flags
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
