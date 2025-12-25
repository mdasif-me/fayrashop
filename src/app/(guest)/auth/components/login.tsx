'use client'

import { Form } from 'react-aria-components'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { loginSchema } from '../schema'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowRight } from '@intentui/icons'
import { useLogin } from '../hooks'
import { toast } from 'sonner'
import { LoaderCircleIcon } from 'lucide-react'

export function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const { mutate: login, isPending } = useLogin()

  function onSubmit(data: z.infer<typeof loginSchema>) {
    login(data, {
      onSuccess: (data) => {
        toast.success('Success', {
          description: data.message,
        })
      },
      onError: (error) => {
        toast.error('Error', {
          description: error.message,
        })
      },
    })
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
    </Form>
  )
}
