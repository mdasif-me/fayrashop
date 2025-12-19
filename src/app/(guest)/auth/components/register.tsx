'use client'

import { Controller, useForm } from 'react-hook-form'
import { registerSchema, RegisterType } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ERole } from '../enum'
import { Form } from '@/components/ui/form'
import { TextField } from '@/components/ui/text-field'
import { Checkbox } from '@/components/ui/checkbox'
import { Description } from '@/components/ui/field'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@intentui/icons'

const Register = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: ERole.USER,
    },
  })
  const onSubmit = (data: RegisterType) => {
    // Do something with the form data
    console.log(data)
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
              label="Password"
              type="password"
              placeholder="8+ characters, mix of letters, numbers & symbols"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
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
              placeholder="Confirm your password"
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />
        <div>
          <Checkbox isRequired>Are you agree to FayraShop</Checkbox>
          <Description className="[&>strong]:text-fg mt-2 block">
            <article>
              By registering, you agree to our{' '}
              <Link href="/terms-condition" className="text-primary hover:underline">
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </article>
          </Description>
        </div>
      </div>
      <Button type="submit" className={`w-full uppercase`}>
        Register
        <IconArrowRight className="shrink-0 !text-white" />
      </Button>
    </Form>
  )
}
export default Register
