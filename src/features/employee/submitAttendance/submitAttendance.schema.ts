import { z } from "zod";

export const submitAttendanceSchema = z.object({
  workDescription: z
    .string()
    .nonempty({ message: "Must be filled" })
    .min(10, { message: "Must be at least 10 characters long" }),
  reasonForWfh: z
    .string()
    .nonempty({ message: "Must be filled" })
    .min(10, { message: "Must be at least 10 characters long" }),
});
