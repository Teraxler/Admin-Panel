const z = require("zod");

exports.registerSchema = z.object({
  name: z
    .string({
      required_error: "First name is required!",
      invalid_type_error: "First name must be text not number or ...",
    })
    .trim()
    .min(3, "First name must be minimum contain 3 characters")
    .max(30, "First name must be maximum contain 30 characters")
    .regex(
      /^[a-zA-Z\s]+$/,
      "First name must not have number or special characters",
    ),

  family: z
    .string({
      required_error: "Last name is required!",
      invalid_type_error: "Last name must be text not number or ...",
    })
    .trim()
    .min(3, "Last name must be minimum contain 3 characters")
    .max(30, "Last name must be maximum contain 30 characters")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Last name must not have number or special characters",
    ),

  username: z
    .string({
      required_error: "username is required!",
      invalid_type_error: "username must be text not number or ...",
    })
    .trim()
    .min(3, "username must be minimum contain 3 characters")
    .max(20, "username must be maximum contain 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "username can contain characters, numbers and _"),

  birthday: z.iso.date("Please enter a valid date").nullable(),
    
  phone: z
    .string()
    .trim()
    .regex(/^0\d{10}$/, "Please enter valid phone")
    .nullable(),

  email: z
    .email("Please enter valid email")
    .max(50, "Email must be maximum 50 characters"),
});
