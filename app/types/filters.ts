import { z } from "zod";

export const SortOptionSchema = z.enum(["price_asc", "price_desc", "rarity"]);
export type SortOption = z.infer<typeof SortOptionSchema>;

export const FilterSchema = z.object({
  rarity: z.number().optional(),
  search: z.string().optional(),
  sort: SortOptionSchema.optional(),
});

export type Filters = z.infer<typeof FilterSchema>;
