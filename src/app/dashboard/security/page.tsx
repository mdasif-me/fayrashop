'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label, Input } from '@/components/ui/field'
import { Shield, Key, Smartphone, History, AlertTriangle } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security</h1>
        <p className="text-muted-foreground">Manage your account security and password.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" /> Change Password
          </CardTitle>
          <CardDescription>
            Ensure your account is secure by using a strong password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <input
              id="current-password"
              type="password"
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <input
              id="new-password"
              type="password"
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <input
              id="confirm-password"
              type="password"
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>{' '}
          {/* Fixed missing closing div tag for the last input group locally before writing */}
          <div className="mt-4 flex justify-end">
            <Button>Update Password</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" /> Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium">
              Two-factor authentication is currently{' '}
              <span className="font-bold text-red-500">OFF</span>
            </p>
            <p className="text-muted-foreground text-sm">
              We recommend enabling 2FA for better security.
            </p>
          </div>
          <Button intent="outline">Enable 2FA</Button>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600 dark:text-red-400" />
          <div>
            <h4 className="font-medium text-red-900 dark:text-red-300">Delete Account</h4>
            <p className="mt-1 text-sm text-red-700 dark:text-red-400">
              Permanently delete your account and all of your content. This action cannot be undone.
            </p>
            <Button intent="danger" className="mt-4 bg-red-600 text-white hover:bg-red-700">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
