import * as z from "zod";

const registerSchema = z.object({
  name: z
    .string({
      required_error: "First name is required!",
      invalid_type_error: "First name must be text not number or ...",
    })
    .trim()
    .min(3, "First name must be minium contain 3 charactors")
    .max(30, "First name must be maxium contain 30 charactors")
    .regex(
      /^[a-zA-Z\s]+$/,
      "First name must not have number or special charactors",
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
      "Last name must not have number or special charactors",
    ),

  username: z
    .string({
      required_error: "username is required!",
      invalid_type_error: "username must be text not number or ...",
    })
    .trim()
    .min(3, "username must be minium contain 3 charactor")
    .max(20, "username must be maxium contain 20 charactor")
    .regex(/^[a-zA-Z0-9_]+$/, "username can contain charactors, numbers and underline"),

  birthday: z.iso.date("Please enter a valid date").nullable(),

  phone: z
    .string()
    .trim()
    .regex(/^0\d{10}$/, "Please enter valid phone")
    .nullable(),

  email: z
    .email("Please enter valid email")
    .regex(/[a-zA-Z]{3,50}/, "Email must be maxium 50 charactors"),

  password: z
    .string({
      required_error: "Password is required!",
      invalid_type_error: "Password is required",
    })
    .trim()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      /(?=.*?[a-z])/,
      "Password must contains at least one lowercase letter",
    )
    .regex(
      /(?=.*?[A-Z])/,
      "Password must contain at least one uppercase letter",
    )
    .regex(/(?=.*?[0-9])/, "Password must contain at least one digit")
    .regex(
      /(?=.*?[#?!@$%^&*-])/,
      "Password must contain at least one special charactor from a predefined set (#?!@$%^&*-)",
    )
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Please enter strong password",
    ),
});

const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required!"),
  password: z.string().trim().min(1, "Password is required!"),
});

const editUserSchema = z.object({
  name: z
    .string({
      required_error: "First name is required!",
      invalid_type_error: "First name must be text not number or ...",
    })
    .trim()
    .min(3, "First name must be minium contain 3 charactors")
    .max(30, "First name must be maxium contain 30 charactors")
    .regex(
      /^[a-zA-Z\s]+$/,
      "First name must not have number or special charactors",
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
      "Last name must not have number or special charactors",
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
    .regex(/^0\d{10}$/, "Please enter valid phone")
    .nullable(),

  email: z
    .email("Please enter valid email")
    .regex(/[a-zA-Z]{3,50}/, "Email must be maxium 50 charactors"),

  password: z
    .string({
      required_error: "Password is required!",
      invalid_type_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      /(?=.*?[a-z])/,
      "Password must contains at least one lowercase letter",
    )
    .regex(
      /(?=.*?[A-Z])/,
      "Password must contain at least one uppercase letter",
    )
    .regex(/(?=.*?[0-9])/, "Password must contain at least one digit")
    .regex(
      /(?=.*?[#?!@$%^&*-])/,
      "Password must contain at least one special charactor from a predefined set (#?!@$%^&*-)",
    )
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Please enter strong password",
    )
    .nullable(),
});

export { registerSchema, loginSchema, editUserSchema };
