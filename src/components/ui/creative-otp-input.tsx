'use client'

import React, { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CreativeOTPInputProps {
  length?: number
  variant?: 'default' | 'outlined' | 'underlined'
  status?: 'idle' | 'success' | 'error'
  onComplete?: (otp: string) => void
  onChange?: (otp: string) => void
  disabled?: boolean
}

export default function CreativeOTPInput({
  disabled = false,
  length = 6,
  variant = 'default',
  status = 'idle',
  onComplete,
  onChange,
}: CreativeOTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    const otpString = newOtp.join('')
    onChange?.(otpString)

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    if (otpString.length === length) {
      onComplete?.(otpString)
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, i) => {
      if (i < length) newOtp[i] = char
    })
    setOtp(newOtp)

    const otpString = newOtp.join('')
    onChange?.(otpString)

    if (pastedData.length === length) {
      onComplete?.(otpString)
      inputRefs.current[length - 1]?.focus()
    } else {
      inputRefs.current[pastedData.length]?.focus()
    }
  }

  const getInputStyles = () => {
    const baseStyles =
      'w-12 h-14 text-center text-2xl font-semibold transition-all duration-200 focus:outline-none'

    const variantStyles = {
      default: 'border-2 rounded-lg',
      outlined: 'border-2 rounded-lg bg-transparent',
      underlined: 'border-b-2 border-t-0 border-x-0 rounded-none',
    }

    const statusStyles = {
      idle: 'border-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary',
      success: 'border-green-500 dark:border-green-400',
      error: 'border-red-500 dark:border-red-400',
    }

    return cn(baseStyles, variantStyles[variant], statusStyles[status])
  }

  return (
    <div className="flex justify-center gap-2">
      {otp.map((digit, index) => (
        <motion.input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          disabled={disabled}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={getInputStyles()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          whileFocus={{ scale: 1.05 }}
        />
      ))}
    </div>
  )
}
