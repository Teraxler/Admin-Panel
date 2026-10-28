import * as z from "zod";

const MB = 1000 ** 2;

export const productSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be text",
    })
    .min(3, "Name must be minimum contain 3 characters")
    .regex(/[a-zA-Z]{3,30}/, "Name must be maximum contain 30 characters"),

  description: z.string().min(3, "Description is required"),

  price: z.preprocess(
    (val) => Number(val),
    z.number("Price must be number").positive("Price must be positive number"),
  ),

  inventory: z.preprocess(
    (val) => Number(val),
    z.number("Inventory must be number").positive("Inventory must be positive"),
  ),

  cover: z
    .file()
    .max(5 * MB, "Product cover must be less than 5MB.")
    .mime(
      ["image/webp", "image/jpeg", "image/png"],
      "Product cover format must be one of (png, jpg/jpeg, webp).",
    )
    .optional()
    .nullable(),
});
