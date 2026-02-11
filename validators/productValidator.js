import * as z from "zod";

export const productSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be text",
    })
    .min(3, "Name must be minium contain 3 charactor")
    .regex(/[a-zA-Z]{3,30}/, "Name must be maxium contain 30 charactor"),

  description: z.string().min(3, "Description is required"),

  price: z.preprocess(
    (val) => Number(val),
    z.number("Price must be number").positive("Price must be positive number"),
  ),

  inventory: z.preprocess(
    (val) => Number(val),
    z.number("Inventory must be number").positive("Inventory must be positive"),
  ),
});
