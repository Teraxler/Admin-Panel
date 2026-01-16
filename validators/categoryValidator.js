import * as z from "zod";

export const categorySchema = z.object({
  categoryName: z.string().min(3, "Category must be minimum 3 charactors"),
});
