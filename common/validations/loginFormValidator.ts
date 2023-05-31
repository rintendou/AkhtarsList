import { z } from "zod"

const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must contain at least 3 characters" })
    .trim()
    .toLowerCase(),
  password: z.string().min(8).regex(strongPasswordRegex, {
    message:
      "Passwords must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be a minimum of 8 characters long.",
  }),
})

export type loginFormType = z.infer<typeof loginFormSchema>
