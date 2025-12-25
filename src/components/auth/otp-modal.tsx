'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { otpVerificationSchema, type OtpVerificationSchemaType } from '@/app/(guest)/auth/schema'
import { fetchClient } from '@/lib/api-config'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/providers/auth-provider'
import { Modal } from '@/components/ui/modal'
import { TextField } from '@/components/ui/text-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OtpModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export default function OtpModal({ isOpen, onClose, email }: OtpModalProps) {
  const { refreshProfile } = useAuth()
  const { toast } = useToast()
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
  } = useForm<OtpVerificationSchemaType>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      email,
      otp: '',
    },
  })

  const onSubmit = async (data: OtpVerificationSchemaType) => {
    setIsVerifying(true)
    try {
      await fetchClient('/v1/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      toast({
        title: 'Success!',
        description: 'Your email has been verified successfully.',
      })

      // Refresh profile to update verification status
      await refreshProfile()

      // Clear pending email from localStorage
      localStorage.removeItem('pending_verification_email')

      reset()
      onClose()
    } catch (error: any) {
      setError('otp', {
        message: error.message || 'Invalid OTP code. Please try again.',
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return

    setIsResending(true)
    try {
      await fetchClient('/v1/users/request-otp', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })

      toast({
        title: 'OTP Sent',
        description: `A new OTP code has been sent to ${email}.`,
      })

      // Start cooldown timer (60 seconds)
      setResendCooldown(60)
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to resend OTP code.',
        variant: 'destructive',
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Content className="sm:max-w-md">
        <Modal.Header>
          <Modal.Title>Verify Your Email</Modal.Title>
          <Modal.Description>
            Enter the 6-digit OTP code sent to <strong>{email}</strong>
          </Modal.Description>
        </Modal.Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="space-y-4">
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  isRequired
                  label="OTP Code"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  isInvalid={!!errors.otp}
                  errorMessage={errors.otp?.message}
                  className="text-center text-2xl tracking-widest"
                />
              )}
            />

            <div className="flex justify-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleResendOtp}
                disabled={isResending || resendCooldown > 0}
              >
                <RefreshCw className={cn('mr-2 h-4 w-4', isResending && 'animate-spin')} />
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : isResending
                    ? 'Sending...'
                    : 'Resend OTP'}
              </Button>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isVerifying}>
              {isVerifying ? 'Verifying...' : 'Verify'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
