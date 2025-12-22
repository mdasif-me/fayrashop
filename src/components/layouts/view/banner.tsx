'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { TicketPercent, XIcon, Mail, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Timer from '../../ui/timer'
import { fetchClient } from '@/lib/api-config'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/providers/auth-provider'
import { cn } from '@/lib/utils'
import { isUserPending, isUserVerified } from '@/lib/auth-utils'

export default function Banner() {
  const { user, loading, refreshProfile } = useAuth()
  const [isVisible, setIsVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const [pendingEmail, setPendingEmail] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const urlEmail = searchParams.get('email')
    const urlRegistered = searchParams.get('registered') === 'true'
    const urlUnverified = searchParams.get('unverified') === 'true'

    if ((urlRegistered || urlUnverified) && urlEmail) {
      localStorage.setItem('pending_verification_email', urlEmail)
      setPendingEmail(urlEmail)
    } else {
      const storedEmail = localStorage.getItem('pending_verification_email')
      if (storedEmail) {
        setPendingEmail(storedEmail)
      }
    }
  }, [searchParams])

  // Determine if the current user is explicitly verified
  const isVerified = isUserVerified(user)

  // Clear pending email from storage if the user is verified
  useEffect(() => {
    if (isVerified && typeof window !== 'undefined') {
      localStorage.removeItem('pending_verification_email')
      setPendingEmail(null)
    }
  }, [isVerified])

  // Show verification message if user status is PENDING (logged in)
  // or if they just registered (not logged in yet)
  // or if the logged-in user's email matches the pending verification email in localStorage
  // BUT ONLY if they are not already verified
  const showVerificationMessage =
    !isVerified &&
    (isUserPending(user) || (!!user && !!pendingEmail && user.email === pendingEmail))

  const isRegistrationSuccess = !!pendingEmail && !user
  const isVerificationBanner = showVerificationMessage || isRegistrationSuccess
  const userEmail = user?.email || pendingEmail || ''

  useEffect(() => {
    if (!isVerificationBanner || !user) return

    // Poll for status updates every 30 seconds if the user is logged in but unverified
    const interval = setInterval(async () => {
      try {
        await refreshProfile()
      } catch (e) {
        console.error('Periodic profile refresh error:', e)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isVerificationBanner, user, refreshProfile])

  const handleResendVerification = async () => {
    if (!userEmail) {
      toast({
        title: 'Error',
        description: 'Email address not found. Please try registering again.',
        variant: 'destructive',
      })
      return
    }

    setIsResending(true)
    try {
      await fetchClient('/v1/auth/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email: userEmail }),
      })

      toast({
        title: 'Verification Email Sent',
        description: `A new verification link has been sent to ${userEmail}.`,
      })

      // Also trigger a profile refresh to check if they just verified
      if (user) {
        refreshProfile().catch(() => {})
      }
    } catch (error: any) {
      // Be extremely specific about clearing the banner.
      // Only clear if the backend explicitly says the user is already verified.
      const errorMessage = error.message?.toLowerCase() || ''
      const isAlreadyVerified =
        errorMessage.includes('already verified') ||
        errorMessage.includes('user is verified')

      if (isAlreadyVerified) {
        localStorage.removeItem('pending_verification_email')
        setPendingEmail(null)
        if (user) {
          refreshProfile()
        }
      }

      toast({
        title: isAlreadyVerified ? 'Notice' : 'Error',
        description: error.message || 'Failed to resend verification email',
        variant: isAlreadyVerified ? 'default' : 'destructive',
      })
    } finally {
      setIsResending(false)
    }
  }

  // If it's a verification message, we want it to be ALWAYS visible.
  // It ignores the isVisible state to ensure it cannot be closed or hidden.
  const shouldShow = isVerificationBanner || isVisible

  if (!mounted || !shouldShow) return null

  return (
    <div
      suppressHydrationWarning
      className={cn(
        'text-foreground px-4 py-3 transition-colors',
        isVerificationBanner
          ? 'bg-yellow-500/10 dark:bg-yellow-500/20 border-b border-yellow-500/20'
          : 'bg-muted/70 dark:bg-accent/70'
      )}
    >
      <div className="container mx-auto flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <div
            className={cn(
              'hidden size-9 shrink-0 items-center justify-center rounded-full max-md:mt-0.5 md:flex',
              isVerificationBanner ? 'bg-yellow-500/20' : 'bg-primary/15'
            )}
            aria-hidden="true"
          >
            {isVerificationBanner ? (
              <Mail className="text-yellow-600 opacity-80" size={16} />
            ) : (
              <TicketPercent className="opacity-80" size={16} />
            )}
          </div>

          <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="space-y-0.5">
              {isVerificationBanner ? (
                <>
                  <p className="text-sm font-medium">
                    {showVerificationMessage ? 'Email Verification Required' : 'Verification Required!'}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {showVerificationMessage
                      ? `Please check your email (${userEmail}) to verify your account. You won't be able to access all features until your email is verified.`
                      : `We've sent a verification link to ${userEmail}. Please verify your account before logging in.`}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium">Black Friday Sale!</p>
                  <p className="text-muted-foreground text-sm">
                    It kicks off today and is available for just 24 hours—don&lsquo;t miss out!
                  </p>
                </>
              )}
            </div>

            {isVerificationBanner ? (
              <Button
                size="sm"
                className="bg-yellow-600 text-white hover:bg-yellow-700 border-none text-sm"
                onClick={handleResendVerification}
                disabled={isResending}
              >
                <RefreshCw className={cn('mr-2 h-4 w-4', isResending && 'animate-spin')} />
                {isResending ? 'Sending...' : 'Resend Email'}
              </Button>
            ) : (
              <div className="flex gap-3 max-md:flex-wrap">
                <Timer />
                <Button size="sm" className="text-sm">
                  Buy now
                </Button>
              </div>
            )}
          </div>
        </div>

        {!isVerificationBanner && (
          <Button
            variant="ghost"
            size="sm"
            className="group -my-1.5 -me-2 size-9 shrink-0 p-0"
            onClick={() => setIsVisible(false)}
            aria-label="Close banner"
          >
            <XIcon
              size={20}
              className="opacity-60 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </Button>
        )}
      </div>
    </div>
  )
}
