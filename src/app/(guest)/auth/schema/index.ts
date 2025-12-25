import { z } from 'zod'
import { ERole } from '../enum'

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
  otp: z
    .string()
    .regex(/^\d{6}$/, 'OTP must be 6 digits')
    .optional(),
})

export type LoginSchemaType = z.infer<typeof loginSchema>

export const otpVerificationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(6, { message: 'Email is required' }),
  otp: z
    .string()
    .regex(/^\d{6}$/, 'OTP must be 6 digits')
    .min(6, { message: 'OTP must be 6 digits' })
    .max(6, { message: 'OTP must be 6 digits' }),
})

export type OtpVerificationSchemaType = z.infer<typeof otpVerificationSchema>

export const requestOtpSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(6, { message: 'Email is required' }),
})

export type RequestOtpSchemaType = z.infer<typeof requestOtpSchema>

// register schema
/**
 * name
 * email
 * password
 * confirm password
 * role
 */
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
    confirmPassword: z.string(),
    role: z.enum(Object.values(ERole) as [string, ...string[]], {
      message: 'Role must be either CUSTOMER, ADMIN, or MODERATOR',
    }),
    is_agree: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterType = z.infer<typeof registerSchema>

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password must not exceed 16 characters')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(6, { message: 'Email is required' })
    .max(100, { message: 'Email must be less than 100 characters' }),
})

export type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>
