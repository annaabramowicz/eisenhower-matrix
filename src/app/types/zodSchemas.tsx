import { z } from "zod";

export const quarterTitleSchema = z.union([
  z.literal("DO FIRST"),
  z.literal("SCHEDULE"),
  z.literal("DELEGATE"),
  z.literal("DELETE"),
]);
