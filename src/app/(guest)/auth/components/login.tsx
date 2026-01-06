'use client'

<<<<<<< HEAD
import { Form } from 'react-aria-components'
=======
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { TextField } from '@/components/ui/text-field'
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { loginSchema } from '../schema'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { LoaderCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function Login() {
  const router = useRouter()
<<<<<<< HEAD
  const [isPending, setIsPending] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  function onSubmit(data: z.infer<typeof loginSchema>) {
    void data
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
      toast.success('Logged in (design-only)')
      router.push('/user')
    }, 400)
=======
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: LoginSchemaType) => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
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
              type="email"
              label="Email"
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
              label="Password"
              type="password"
              placeholder="8+ characters, mix of letters, numbers & symbols"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Button type="submit" className={`w-full text-white! uppercase`} disabled={isPending}>
          {isPending ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}{' '}
          {isPending ? 'Logging in...' : 'Login'}
        </Button>
      </div>
<<<<<<< HEAD
=======

      {errors.root && (
        <div className="text-destructive mb-4 text-center text-sm font-medium">
          {errors.root.message}
        </div>
      )}

      <Button type="submit" disabled={isLoading} className={`w-full text-white! uppercase`}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Signing in...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Sign in
            <IconArrowRight className="shrink-0 text-white!" />
          </span>
        )}
      </Button>
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
    </Form>
  )
}
