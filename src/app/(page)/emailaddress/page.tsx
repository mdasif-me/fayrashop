'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input, Label } from '../../../components/ui/field'

const ForgetPassword = () => {
  return (
    <section className="bg-muted flex h-screen items-center justify-center transition-all duration-500 ease-in-out">
      <div className="flex w-full max-w-sm min-w-sm flex-col gap-y-4 rounded border px-6 py-8 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="pb-3 text-xl font-semibold text-gray-700">Verify Your Email Address</h1>
          <p className="text-sm font-normal text-gray-600">
            Nam ultricies lectus a risus blandit elementum. Quisque arcu arcu, tristique a eu in
            diam.
          </p>
        </div>
        <div className="relative mb-4 flex w-full flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label>Verification Code</Label>
            <a href="#" className="text-primary text-sm hover:underline">
              Resend Code
            </a>
          </div>
          <Input type="email" className="h-11 rounded px-3 text-base" required />
        </div>

        <Button type="submit" className="bg-primary h-11 w-full font-semibold">
          Verify me →
        </Button>
      </div>
    </section>
  )
}

export default ForgetPassword
