'use client'

import { Suspense } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { TextField } from '@/components/ui/text-field'
import { Button } from '@/components/ui/button'
import { forgetPasswordSchema, ForgetPasswordSchemaType, ResetPasswordSchemaType } from '../schema'
import { IconArrowRight } from '@intentui/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { fetchClient } from '@/lib/api-config'

function ForgetPasswordContent() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgetPasswordSchemaType>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const { toast } = useToast()

  const onSubmit = async (data: ForgetPasswordSchemaType) => {
    try {
      await fetchClient('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      toast({
        title: 'Success',
        description: 'If an account exists, a reset link has been sent.',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to request password reset',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="mx-auto my-10 max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-xl leading-7 font-semibold">
          Forget Password
        </CardTitle>
        <CardDescription className="text-muted-fg text-center text-sm leading-5">
          Please enter your registered email address below to receive a code to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />
          </div>
          <Button type="submit" className={`w-full text-white! uppercase`}>
            Send Code
            <IconArrowRight className="shrink-0 text-white!" />
          </Button>
          <article className="mt-4 space-y-1">
            <p className="text-muted-fg text-sm">
              Remember your password?{' '}
              <Link
                href="/auth"
                className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
            <p className="text-muted-fg text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth?mode=register"
                className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
              >
                Sign Up
              </Link>
            </p>
          </article>
        </Form>
      </CardContent>
    </Card>
  )
}

export default function ForgetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgetPasswordContent />
    </Suspense>
  )
}
