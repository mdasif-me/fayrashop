'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Invalid verification link.')
      return
    }

    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setMessage('Your email has been successfully verified! (design-only)')
    }, 600)
  }, [token])

  return (
    <Card className="mx-auto my-10 max-w-md text-center">
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {status === 'loading' && (
          <>
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
            <p>Verifying your email...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <p className="text-green-600">
              {message || 'Your email has been successfully verified!'}
            </p>
            <Button asChild>
              <Link href="/auth?mode=login">Go to Login</Link>
            </Button>
          </>
        )}
        {status === 'error' && (
          <>
            <p className="text-red-500">{message}</p>
            <Button asChild variant="outline">
              <Link href="/auth?mode=login">Back to Login</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
