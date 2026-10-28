import * as z from "zod";

const createUserSchema = z.object({
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
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "username can contain characters, numbers and underline",
    ),

  birthday: z.iso.date("Please enter a valid date").nullable(),

  phone: z
    .string()
    .trim()
    .regex(/^0\d{10}$/, "Please enter valid phone")
    .nullable(),

  email: z
    .email("Please enter valid email")
    .regex(/[a-zA-Z]{3,50}/, "Email must be maximum 50 characters"),

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
      "Password must contain at least one special character from a predefined set (#?!@$%^&*-)",
    )
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Please enter strong password",
    ),
});

const editUserSchema = z
  .object({
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
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "username can contain characters, numbers and _",
      ),

    birthday: z.iso.date("Please enter a valid date").nullable(),

    phone: z
      .string()
      .trim()
      .regex(/^0\d{10}$/, "Please enter valid phone")
      .nullable(),

    email: z
      .email("Please enter valid email")
      .regex(/[a-zA-Z]{3,50}/, "Email must be maximum 50 characters"),

    password: z
      .string({
        required_error: "Password is required!",
        invalid_type_error: "Password is required",
      })
      .regex(/^[a-zA-Z0-9!@#$%^&*-]{1,}$/, "Password is not valid")
      .nullable(),

    newPassword: z
      .string({
        required_error: "New password is required!",
        invalid_type_error: "New password is required",
      })
      .min(8, "New password must be at least 8 characters long.")
      .regex(
        /(?=.*?[a-z])/,
        "New password must contains at least one lowercase letter",
      )
      .regex(
        /(?=.*?[A-Z])/,
        "New password must contain at least one uppercase letter",
      )
      .regex(/(?=.*?[0-9])/, "New password must contain at least one digit")
      .regex(
        /(?=.*?[#?!@$%^&*-])/,
        "New password must contain at least one special character from a predefined set (#?!@$%^&*-)",
      )
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "New password is not strong",
      )
      .nullable(),
  })
  .refine(
    (user) =>
      user.newPassword != null && user.password == null ? false : true,
    {
      error: "Password is required!",
    },
  );

export { createUserSchema, editUserSchema };
