'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { TextField } from '@/components/ui/text-field'
import { Button } from '@/components/ui/button'
import { resetPasswordSchema, ResetPasswordSchemaType } from '../schema'
import { IconArrowRight } from '@intentui/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ResetPasswordForm() {
  const router = useRouter()
  const search = useSearchParams()
  const token = search.get('token') || ''

  const [isPending, setIsPending] = useState(false)

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

  const onSubmit = (data: ResetPasswordSchemaType) => {
    void data
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
      toast.success('Password reset (design-only)')
      router.push('/auth?mode=login', { scroll: false })
    }, 500)
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
        <Button type="submit" className="w-full uppercase" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Reset Password
          <IconArrowRight className="ml-2 shrink-0" />
        </Button>
      </Form>
    </>
  )
}
