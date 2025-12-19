'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { TextField } from '@/components/ui/text-field'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@intentui/icons'
import { loginSchema, type LoginSchemaType } from '../schema'
import Link from 'next/link'

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = (data: LoginSchemaType) => {
    // Do something with the form data
    console.log(data)
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
              label={'Password'}
              endLabel={
                <Link
                  href="/auth/forget-password"
                  className="text-primary text-sm underline-offset-2 hover:underline"
                >
                  Forgot Password?
                </Link>
              }
              type="password"
              placeholder="Enter your password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />
      </div>

      <Button type="submit" className={`w-full uppercase`}>
        Sign in
        <IconArrowRight className="shrink-0 !text-white" />
      </Button>
    </Form>
  )
}
export default Login
