'use client'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { TextField } from '@/components/ui/text-field'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@intentui/icons'
import { loginSchema, type LoginSchemaType } from '../schema'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { fetchClient } from '@/lib/api-config'
import { useAuth } from '@/providers/auth-provider'

import { isUserPending, isUserVerified } from '@/lib/auth-utils'

const Login = () => {
  const { login, refreshProfile } = useAuth()
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      otp: '',
    },
  })
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const result = await fetchClient('/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      // Extract tokens and user data
      const token = result?.data?.tokens?.access_token || result?.tokens?.access_token ||
                    result?.data?.access_token || result?.access_token ||
                    result?.data?.token || result?.token
      const refreshToken = result?.data?.tokens?.refresh_token || result?.tokens?.refresh_token ||
                           result?.data?.refresh_token || result?.refresh_token
      const userData = result?.data?.user || result?.user

      if (token && userData?.email) {
        const isPending = isUserPending(userData)

        // If user provided OTP, verify it
        if (data.otp && data.otp.trim()) {
          try {
            await fetchClient('/v1/users/verify-otp', {
              method: 'POST',
              body: JSON.stringify({ email: userData.email, otp: data.otp }),
            })

            // Clear pending email after successful OTP verification
            localStorage.removeItem('pending_verification_email')

            toast({
              title: 'Email Verified!',
              description: 'Your email has been verified successfully.',
            })
          } catch (otpError: any) {
            toast({
              title: 'OTP Verification Failed',
              description: otpError.message || 'Invalid OTP code.',
              variant: 'destructive',
            })
            // Still allow login but keep pending status
            localStorage.setItem('pending_verification_email', userData.email)
          }
        } else if (isPending) {
          // User logged in without OTP and is unverified
          localStorage.setItem('pending_verification_email', userData.email)
          toast({
            title: 'Verification Required',
            description: 'Please verify your email using the OTP code sent to your email.'
          })
        }

        // Clear or set pending email based on verification status
        if (isUserVerified(userData)) {
          localStorage.removeItem('pending_verification_email')
        } else if (!data.otp) {
          localStorage.setItem('pending_verification_email', userData.email)
        }

        // Save initial login data
        login(token, userData, refreshToken)

        // Immediately fetch full profile to ensure assets/image are synchronized
        refreshProfile().catch((e) => console.error('Profile refresh error:', e))

        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
        })
        router.push('/user')
      } else {
        console.error('Login parsing failed. Result:', result)
        throw new Error('Invalid response from server: Missing token or user data')
      }
    } catch (error: unknown) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Invalid email or password',
      })
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-6 space-y-3">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              isRequired
              label="Email"
              type="email"
              placeholder="Enter your email"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              isRevealable
              isRequired
              label={'Password'}
              endLabel={
                <Link
                  href="/auth/forget-password"
                  className="text-primary text-sm underline-offset-2 hover:underline"
                >
                  Forgot Password?
                </Link>
              }
              type="password"
              placeholder="Enter your password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="OTP Code (Optional)"
              placeholder="Enter 6-digit OTP if you have one"
              maxLength={6}
              isInvalid={!!errors.otp}
              errorMessage={errors.otp?.message}
              description="If you received an OTP code, enter it here to verify your email during login."
            />
          )}
        />
      </div>

      {errors.root && (
        <div className="text-destructive mb-4 text-center text-sm font-medium">
          {errors.root.message}
        </div>
      )}

      <Button type="submit" className={`w-full text-white! uppercase`}>
        Sign in
        <IconArrowRight className="shrink-0 text-white!" />
      </Button>
    </Form>
  )
}
export default Login
