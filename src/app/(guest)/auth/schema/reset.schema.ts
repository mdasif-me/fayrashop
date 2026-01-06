import z from 'zod'
import { loginSchema } from './login.schema'

export const resetPasswordSchema = loginSchema
  .pick({ password: true })
  .extend({
    token: z.string().min(1, 'Token is required'),
    newPassword: loginSchema.shape.password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>
