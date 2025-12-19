'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { TextField } from '@/components/ui/text-field'
import { Button } from '@/components/ui/button'
import { resetPasswordSchema, ResetPasswordSchemaType } from '../schema'
import { IconArrowRight } from '@intentui/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'

const ResetPassword = () => {
  const search = useSearchParams()
  const token = search.get('token') || ''

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: (token as string) || '',
      newPassword: '',
      confirmPassword: '',
    },
  })
  const onSubmit = (data: ResetPasswordSchemaType) => {
    // Do something with the form data
    console.log('data:', data)
  }

  return (
    <Card className="mx-auto my-10 max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-xl leading-7 font-semibold">
          Reset Password
        </CardTitle>
        <CardDescription className="text-muted-fg text-center text-sm leading-5">
          Please enter your new password below to reset your account. Make sure to choose a strong
          password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-6 space-y-3">
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  isRevealable
                  isRequired
                  label="Password"
                  type="password"
                  placeholder="8+ characters, mix of letters, numbers & symbols"
                  isInvalid={!!errors.newPassword}
                  errorMessage={errors.newPassword?.message}
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
                  placeholder="Re-enter your new password"
                  isInvalid={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
          </div>
          <Button type="submit" className={`w-full uppercase`}>
            Reset Password
            <IconArrowRight className="shrink-0 !text-white" />
          </Button>
        </Form>
      </CardContent>
    </Card>
  )
}
export default ResetPassword
