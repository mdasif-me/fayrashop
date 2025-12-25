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
import { CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { fetchClient } from '@/lib/api-config'
import { motion, AnimatePresence } from 'framer-motion'

function ForgetPasswordContent() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    try {
      await fetchClient('/v1/users/forgot-password', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      setIsSubmitted(true)
      toast({
        title: 'Success',
        description: 'A reset link has been sent to your email address.',
      })
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to request password reset',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mx-auto my-10 max-w-md border-none shadow-xl">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-2xl font-bold">Forget Password</CardTitle>
              <CardDescription className="text-muted-foreground text-center text-sm">
                Enter your registered email address below to receive a reset link.
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
                        placeholder="e.g. user@example.com"
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                      />
                    )}
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full text-white uppercase font-bold py-6">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Reset Link
                      <IconArrowRight className="shrink-0" />
                    </span>
                  )}
                </Button>
                <div className="mt-6 text-center">
                  <Link href="/auth" className="text-primary hover:text-primary/80 text-sm font-semibold underline decoration-2 underline-offset-4">
                    Back to Sign In
                  </Link>
                </div>
              </Form>
            </CardContent>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 text-center"
          >
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <CheckCircle className="h-12 w-12" />
              </div>
            </div>
            <CardTitle className="mb-2 text-2xl font-bold">Check your email</CardTitle>
            <CardDescription className="mb-6 text-base text-muted-foreground leading-relaxed">
              We&apos;ve sent a password reset link to your email address. Please follow the instructions to reset your password.
            </CardDescription>
            <Button asChild className="w-full text-white font-bold py-6">
              <Link href="/auth">Return to Login</Link>
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <button onClick={() => setIsSubmitted(false)} className="text-primary font-semibold hover:underline">
                try again
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
