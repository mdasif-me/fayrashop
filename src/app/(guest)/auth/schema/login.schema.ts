import z from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(6, { message: 'Email is required' })
    .max(100, { message: 'Email must be less than 100 characters' }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must not exceed 16 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  otp: z.string().optional(),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
