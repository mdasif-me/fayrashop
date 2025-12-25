import z from 'zod'
import { loginSchema } from '.'

export const verifySchema = loginSchema.extend({
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d+$/, 'OTP must only contain numbers'),
})

export type VerifySchemaType = z.infer<typeof verifySchema>
