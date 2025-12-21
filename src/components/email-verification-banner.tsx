'use client'

import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { IconMail, IconX } from '@intentui/icons'

export function EmailVerificationBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // Check if user is logged in and has PENDING status
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        if (user.status === 'PENDING') {
          setShowBanner(true)
          setUserEmail(user.email)
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  if (!showBanner) return null

  return (
    <div className="fixed top-0 right-0 left-0 z-50 p-4">
      <Alert className="mx-auto max-w-4xl border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
        <IconMail className="h-5 w-5 text-yellow-600" />
        <AlertTitle className="text-yellow-800 dark:text-yellow-200">
          Email Verification Required
        </AlertTitle>
        <AlertDescription className="text-yellow-700 dark:text-yellow-300">
          Please check your email ({userEmail}) to verify your account. You won't be able to access
          all features until your email is verified.
        </AlertDescription>
        <button
          onClick={() => setShowBanner(false)}
          className="ring-offset-background absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
          aria-label="Close"
        >
          <IconX className="h-4 w-4" />
        </button>
      </Alert>
    </div>
  )
}
