'use client'
import { Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import AuthSwitcher from './auth-switcher'

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <Card className="mx-auto my-10 max-w-md">
        <CardContent>
          <AuthSwitcher />
        </CardContent>
      </Card>
    </Suspense>
  )
}
