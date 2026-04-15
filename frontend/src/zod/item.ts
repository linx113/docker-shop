import * as z from "zod";

export const ItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price is required and must be a positive number"),
  description: z.string().min(1, "Description is required"),
  catalogue: z.enum(["Electronics", "Clothing", "Home"], "Invalid catalogue"),
  image: z.instanceof(File),
});

export type Item = z.infer<typeof ItemSchema>;
