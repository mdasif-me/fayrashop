'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { TextField } from '@/components/ui/text-field'
import { Button } from '@/components/ui/button'
import { resetPasswordSchema, ResetPasswordSchemaType } from '../schema'
import { IconArrowRight } from '@intentui/icons'
import { useSearchParams, useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { fetchClient } from '@/lib/api-config'

export default function ResetPasswordForm() {
  const search = useSearchParams()
  const token = search.get('token') || ''

  const { toast } = useToast()
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token as string,
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    try {
      const payload = {
        token: data.token,
        password: data.newPassword,
        confirmPassword: data.confirmPassword,
      }

      const result = await fetchClient('/v1/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      // If backend returns a token after reset, store it
      const token =
        result?.tokens?.access_token ||
        result?.token ||
        result?.data?.token ||
        result?.accessToken ||
        result?.data?.accessToken ||
        result?.access_token ||
        result?.data?.access_token

      if (token) {
        localStorage.setItem('token', token)
        document.cookie = `token=${token}; path=/; max-age=86400`
      }

      if (result?.user || result?.data?.user) {
        localStorage.setItem('user', JSON.stringify(result?.user || result?.data?.user))
      }

      toast({
        title: 'Success',
        description: result?.message || 'Password reset successful',
      })

      // If we got a token, go to home; otherwise go to login
      router.push(token ? '/' : '/auth?mode=login')
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to reset password',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
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
          <IconArrowRight className="shrink-0 text-white" />
        </Button>
      </Form>
    </>
  )
}
