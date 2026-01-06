'use client'

import { Suspense } from 'react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { TextField } from '@/components/ui/text-field'
import { Button } from '@/components/ui/button'
import { forgetPasswordSchema, ForgetPasswordSchemaType } from '../schema'
import { IconArrowRight } from '@intentui/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

function ForgetPasswordContent() {
  const [isPending, setIsPending] = useState(false)
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

  const onSubmit = (data: ForgetPasswordSchemaType) => {
    void data
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
      toast.success('Code sent (design-only)')
    }, 500)
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
          <Button type="submit" className="w-full uppercase" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Code
            <IconArrowRight className="ml-2 shrink-0" />
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
