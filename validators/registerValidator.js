import * as z from "zod";

const registerSchema = z.object({
  name: z
    .string({
      required_error: "First name is required!",
      invalid_type_error: "First name must be text not number or ...",
    })
    .trim()
    .min(3, "First name must be minium contain 3 charactor")
    .max(30, "First name must be maxium contain 30 charactor")
    .regex(
      /^[a-zA-Z\s]+$/,
      "First name must not have number or special charactors"
    ),

  family: z
    .string({
      required_error: "Last name is required!",
      invalid_type_error: "Last name must be text not number or ...",
    })
    .trim()
    .min(3, "Last name must be minium contain 3 charactor")
    .max(30, "Last name must be maxium contain 30 charactor")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Last name must not have number or special charactors"
    ),

  username: z
    .string({
      required_error: "username is required!",
      invalid_type_error: "username must be text not number or ...",
    })
    .trim()
    .min(3, "username must be minium contain 3 charactor")
    .max(20, "username must be maxium contain 20 charactor")
    .regex(/^[a-zA-Z0-9_]+$/, "username can contain charactors, numbers and _"),

  birthday: z.iso.date("Please enter a valid date").nullable(),

  phone: z
    .string()
    .trim()
    .regex(/^0\d{10}/, "Please enter valid phone")
    .nullable(),

  email: z
    .email("Please enter valid email")
    .max(50, "Email must be maxium 50 charactors"),
});

export { registerSchema };
