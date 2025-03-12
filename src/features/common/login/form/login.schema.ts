import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Must be filled" })
    .email({ message: "Not a valid email" }),
  password: z.string().nonempty({ message: "Must be filled" }),
});
