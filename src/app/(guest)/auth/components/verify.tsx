'use client'

import React, { useState, useEffect } from 'react'
import CreativeOTPInput from '@/components/ui/creative-otp-input'
import { motion, AnimatePresence } from 'framer-motion'
import { useVerify, useResend } from '../hooks'
import { apiClient } from '@/lib/api-client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function VerifyOTP() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [email, setEmail] = useState<string>('')
  const router = useRouter()

  const { mutate: verify, isPending: isVerifying } = useVerify()
  const { mutate: resend, isPending: isResending } = useResend()

  useEffect(() => {
    const tempAuth = apiClient.getTempAuth() as any
    if (!tempAuth?.email) {
      toast.error('Error', {
        description: 'Please login or register first',
      })
      router.push('/auth')
      return
    }
    setEmail(tempAuth.email)
  }, [router])

  const handleComplete = (otp: string) => {
    setStatus('idle')
    const tempAuth = apiClient.getTempAuth() as any

    if (!tempAuth?.email) {
      setStatus('error')
      return
    }

    verify({
      email: tempAuth.email,
      password: tempAuth.userData?.password || '',
      otp,
    })
  }

  const handleResend = () => {
    const tempAuth = apiClient.getTempAuth() as any
    if (!tempAuth?.email) {
      toast.error('Error', {
        description: 'Email not found',
      })
      return
    }

    resend({
      email: tempAuth.email,
      password: tempAuth.userData?.password || '',
    })
  }

  return (
    <div className="z-20 flex flex-col items-center gap-y-10 p-8">
      <div className="space-y-2 text-center">
        <motion.h3
          className="text-xl font-semibold dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Enter Verification Code
        </motion.h3>
        <p className="text-muted-foreground dark:text-muted-foreground/80 text-sm">
          We&apos;ve sent a code to <strong>{email}</strong>
        </p>
      </div>

      <div className="relative">
        <CreativeOTPInput
          length={6}
          variant="default"
          status={status}
          onComplete={handleComplete}
          disabled={isVerifying}
        />
        <AnimatePresence>
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 -bottom-8 text-center text-sm font-medium text-red-500 dark:text-red-400"
            >
              Invalid code. Please try again.
            </motion.p>
          )}
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 -bottom-8 text-center text-sm font-medium text-green-500 dark:text-green-400"
            >
              Verification successful!
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.p
        className="text-muted-foreground dark:text-muted-foreground/80 mt-5 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Didn&apos;t receive the code?{' '}
        <motion.button
          className="text-primary dark:text-primary/90 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleResend}
          disabled={isResending}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isResending ? 'Sending...' : 'Resend'}
        </motion.button>
      </motion.p>
    </div>
  )
}
