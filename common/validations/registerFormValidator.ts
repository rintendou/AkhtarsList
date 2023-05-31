import { z } from "zod"

const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const registerFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required!" }),
  email: z.string().email("Email address is invalid!"),
  username: z
    .string({ required_error: "Username is required!" })
    .min(3, { message: "Username is too short!" })
    .max(15, { message: "Username is too long!" }),
  password: z
    .string({ required_error: "Password is required!" })
    .regex(strongPasswordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be a minimum of 8 characters long!",
    }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required!" }),
  securityQuestion: z
    .string()
    .min(1, { message: "Security Question is required!" }),
  securityAnswer: z
    .string()
    .min(1, { message: "Security Question Answer is required!" }),
  address: z.object({
    streetAddress: z
      .string()
      .min(1, { message: "Street address is required!" }),
    state: z.string().min(1, { message: "State is required!" }),
    city: z.string().min(1, { message: "City is required!" }),
    zipcode: z
      .number()
      .min(5, { message: "Invalid zip code" })
      .max(5, { message: "Invalid zip code" }),
  }),
})

export type registerFormType = z.infer<typeof registerFormSchema>
