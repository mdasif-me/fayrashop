'use client'

<<<<<<< HEAD
import { Form } from 'react-aria-components'
=======
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
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { registerSchema } from '../schema'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { LoaderCircleIcon } from 'lucide-react'
import { Checkbox } from '../../../../components/ui/checkbox'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function Register() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  })

<<<<<<< HEAD
  function onSubmit(data: z.infer<typeof registerSchema>) {
    void data
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
      toast.success('Registered (design-only)')
      router.push('/auth?mode=verify', { scroll: false })
    }, 500)
=======
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
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
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
        <Controller
          name="confirm_password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              isRevealable
              isRequired
              label="Confirm Password"
              type="password"
              placeholder="8+ characters, mix of letters, numbers & symbols"
              isInvalid={!!errors.confirm_password}
              errorMessage={errors.confirm_password?.message}
            />
          )}
        />
        <Controller
          name="is_agree"
          control={control}
          render={({ field }) => (
            <Checkbox
              isSelected={field.value}
              onChange={field.onChange}
              value="updates"
              label="Are you agree to the terms and conditions?"
            />
          )}
        />
        <p className="text-muted-foreground text-sm">
          By registering, you agree to our{' '}
          <Link href="/terms-condition" className="text-primary">
            Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link href="/privacy-policy" className="text-primary">
            Privacy Policy
          </Link>
          .
        </p>
        <Button type="submit" className={`w-full text-white! uppercase`} disabled={isPending}>
          {isPending ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}{' '}
          {isPending ? 'Registering...' : 'Register'}
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
            Registering...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Register
            <IconArrowRight className="shrink-0 text-white!" />
          </span>
        )}
      </Button>
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
    </Form>
  )
}
