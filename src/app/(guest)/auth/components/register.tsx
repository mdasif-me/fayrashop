'use client'

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { registerSchema, RegisterType } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ERole } from '../enum'
import { Form } from '@/components/ui/form'
import { TextField } from '@/components/ui/text-field'
import { Checkbox } from '@/components/ui/checkbox'
import { Description } from '@/components/ui/field'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@intentui/icons'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { fetchClient } from '@/lib/api-config'
import { useAuth } from '@/providers/auth-provider'

const Register = () => {
  const { login } = useAuth()
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: ERole.USER,
      is_agree: false,
    },
  })

  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: RegisterType) => {
    setIsLoading(true)
    try {
      const { confirmPassword, ...payload } = data
      await fetchClient('/v1/auth/register', { method: 'POST', body: JSON.stringify(payload) })

      // Automatically request OTP after successful registration
      try {
        await fetchClient('/v1/users/request-otp', {
          method: 'POST',
          body: JSON.stringify({ email: data.email }),
        })
      } catch (otpError) {
        console.error('Failed to send OTP:', otpError)
        // Continue even if OTP request fails
      }

      toast({
        title: 'Welcome to FayraShop!',
        description: 'Registration successful. Please check your email for the OTP code to verify your account.',
      })

      localStorage.setItem('pending_verification_email', data.email)
      router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}`)
    } catch (error: any) {
      if (error.message?.toLowerCase().includes('user already exists')) return router.push('/')
      setError('root', { message: error.message || 'Something went wrong' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-6 space-y-3">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              isRequired
              label="Name"
              placeholder="Enter your name"
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
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
              label="Password"
              type="password"
              placeholder="8+ characters, mix of letters, numbers & symbols"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              isRevealable
              isRequired
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />
        <div>
          <Controller
            name="is_agree"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Checkbox
                {...field}
                isSelected={value}
                onChange={onChange}
                isInvalid={!!errors.is_agree}
              >
                Are you agree to FayraShop
              </Checkbox>
            )}
          />
          {errors.is_agree && (
            <p className="text-destructive mt-1 text-xs">{errors.is_agree.message}</p>
          )}
          <Description className="[&>strong]:text-fg mt-2 block">
            <article>
              By registering, you agree to our{' '}
              <Link href="/terms-condition" className="text-primary hover:underline">
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </article>
          </Description>
        </div>
      </div>

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
            Registering...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Register
            <IconArrowRight className="shrink-0 text-white!" />
          </span>
        )}
      </Button>
    </Form>
  )
}
export default Register
