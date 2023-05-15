import { z } from "zod"

export const loginFormSchema = z.object({
  username: z
    .string({ required_error: "Username is required!" })
    .toLowerCase()
    .min(3, "Username must contain at least 3 characters"),
  password: z.string({ required_error: "Password is required!" }),
})

export type loginFormType = z.infer<typeof loginFormSchema>
