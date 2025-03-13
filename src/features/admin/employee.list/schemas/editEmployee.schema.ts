import { z } from "zod";

export const editEmployeeSchema = z.object({
  fullName: z.string().nonempty({ message: "Must be filled" }),
  position: z.string().nonempty({ message: "Must be filled" }),
  department: z.string().nonempty({ message: "Must be filled" }),
  phoneNumber: z
    .string()
    .nonempty({ message: "Must be filled" })
    .min(10, { message: "Must be a valid number" })
    .regex(/^\d+$/, { message: "Must be a valid number" }),
});
