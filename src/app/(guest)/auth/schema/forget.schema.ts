import z from 'zod'
import { loginSchema } from './login.schema'

export const forgetPasswordSchema = loginSchema.pick({ email: true })

export type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>
