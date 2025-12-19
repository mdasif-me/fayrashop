import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ResetPasswordForm from './reset-password.form'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
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
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </Suspense>
  )
}
