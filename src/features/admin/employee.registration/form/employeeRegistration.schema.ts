import { z } from "zod";

export const employeeRegistrationSchema = z.object({
  fullName: z.string().nonempty({ message: "Must be filled" }),
  position: z.string().nonempty({ message: "Must be filled" }),
  department: z.string().nonempty({ message: "Must be filled" }),
  phoneNumber: z
    .string()
    .nonempty({ message: "Must be filled" })
    .min(10, { message: "Must be a valid number" })
    .regex(/^\d+$/, { message: "Must be a valid number" }),
  email: z
    .string()
    .nonempty({ message: "Must be filled" })
    .email({ message: "Not a valid email" }),
  password: z
    .string()
    .nonempty({ message: "Must be filled" })
    .min(7, { message: "Password must be at least 7 characters long" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least one number",
    })
    .refine((value) => /[!-/:-@[-`{-~]/.test(value), {
      message: "Password must contain at least one special character",
    }),
});
