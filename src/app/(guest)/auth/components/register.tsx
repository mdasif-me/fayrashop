'use client'

import { Form } from 'react-aria-components'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { registerSchema } from '../schema'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { LoaderCircleIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
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

  function onSubmit(data: z.infer<typeof registerSchema>) {
    void data
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
      toast.success('Registered (design-only)')
      router.push('/auth?mode=verify', { scroll: false })
    }, 500)
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
    </Form>
  )
}
