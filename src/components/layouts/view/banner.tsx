'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TicketPercent, XIcon, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Timer from '../../ui/timer'

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true)
  const [userStatus, setUserStatus] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isHome = pathname === '/'
  const isRegistrationSuccess = isHome && searchParams.get('registered') === 'true'

  useEffect(() => {
    // Check if user is logged in and has PENDING status
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setUserStatus(user.status)
        setUserEmail(user.email)
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  // Show verification message if user status is PENDING
  const showVerificationMessage = userStatus === 'PENDING'

  if (!isVisible) return null

  return (
    <div className="bg-muted/70 dark:bg-accent/70 text-foreground px-4 py-3">
      <div className="container mx-auto flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <div
            className="bg-primary/15 hidden size-9 shrink-0 items-center justify-center rounded-full max-md:mt-0.5 md:flex"
            aria-hidden="true"
          >
            {showVerificationMessage ? (
              <Mail className="opacity-80" size={16} />
            ) : (
              <TicketPercent className="opacity-80" size={16} />
            )}
          </div>
          <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="space-y-0.5">
              {showVerificationMessage ? (
                <>
                  <p className="text-sm font-medium">Email Verification Required</p>
                  <p className="text-muted-foreground text-sm">
                    Please check your email ({userEmail}) to verify your account. You won't be able
                    to access all features until your email is verified.
                  </p>
                </>
              ) : isRegistrationSuccess ? (
                <>
                  <p className="text-sm font-medium">Registration Complete!</p>
                  <p className="text-muted-foreground text-sm">
                    Please check your email to verify your account.
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
            {!isRegistrationSuccess && !showVerificationMessage && (
              <div className="flex gap-3 max-md:flex-wrap">
                <Timer />
                <Button size="sm" className="text-sm">
                  Buy now
                </Button>
              </div>
            )}
          </div>
        </div>
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
      </div>
    </div>
  )
}
