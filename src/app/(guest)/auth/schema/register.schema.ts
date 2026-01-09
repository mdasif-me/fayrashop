import z from 'zod'
import { loginSchema } from './login.schema'

export const registerSchema = loginSchema
  .pick({ email: true, password: true })
  .extend({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(50, { message: 'Name must be less than 50 characters' }),
    confirm_password: z.string(),
    is_agree: z
      .boolean()
      .refine((val) => val === true, { message: 'You must agree to the terms and conditions' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

export type RegisterSchemaType = z.infer<typeof registerSchema>
