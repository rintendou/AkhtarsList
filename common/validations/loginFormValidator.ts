import { z } from "zod"

const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .trim()
    .toLowerCase(),
  password: z.string().min(1, { message: "Password is required" }),
})

export type loginFormType = z.infer<typeof loginFormSchema>
