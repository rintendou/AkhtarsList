import { z } from "zod"

const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const registerFormSchema = z.object({
  fullName: z.string({ required_error: "Full name is required!" }),
  email: z
    .string({ required_error: "Email address is required!" })
    .email("Email address is invalid!"),
  username: z
    .string({ required_error: "Username is required!" })
    .min(3)
    .max(15),
  password: z
    .string({ required_error: "Password is required!" })
    .min(8)
    .regex(strongPasswordRegex),
  confirmPassword: z
    .string({
      required_error: "Confirm Password is required!",
    })
    .min(8),
  securityQuestion: z.string({
    required_error: "Security Question is required!",
  }),
  securityAnswer: z.string({
    required_error: "Security Answer is required!",
  }),
  streetAddress: z.string({
    required_error: "Street Address is required!",
  }),
  state: z.string({
    required_error: "Street Address is required!",
  }),
  city: z.string({
    required_error: "Street Address is required!",
  }),
  zipcode: z.number({
    required_error: "Street Address is required!",
  }),
})

export type registerFormType = z.infer<typeof registerFormSchema>
