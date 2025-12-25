import z from 'zod'

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(50, { message: 'Name must be less than 50 characters' }),
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
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

export type RegisterSchemaType = z.infer<typeof registerSchema>
