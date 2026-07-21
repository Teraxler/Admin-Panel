import * as z from "zod";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required!"),
  password: z.string().trim().min(1, "Password is required!"),
});

export { loginSchema };
