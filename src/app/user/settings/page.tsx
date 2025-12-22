'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, Moon, Globe, Trash2, AlertTriangle, Loader2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/providers/auth-provider'
import { fetchClient } from '@/lib/api-config'
import { useToast } from '@/hooks/use-toast'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    if (!user) return

    if (
      !confirm(
        'Are you sure you want to delete your account? This action is permanent and cannot be undone.'
      )
    ) {
      return
    }

    setIsDeleting(true)
    try {
      await fetchClient(`/v1/users/${user.id}`, {
        method: 'DELETE',
      })

      toast({
        title: 'Account Deleted',
        description: 'Your account has been successfully removed.',
      })

      // Standard logout procedure after deletion
      await logout()
    } catch (error: any) {
      console.error('Failed to delete account', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete account. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your app preferences and notifications.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Bell className="text-primary h-5 w-5" /> Notifications
          </CardTitle>
          <CardDescription>Configure how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-base font-semibold">Email Notifications</label>
              <p className="text-muted-foreground text-sm">
                Receive emails about your order status.
              </p>
            </div>
            <Checkbox defaultSelected />
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <div className="space-y-1">
              <label className="text-base font-semibold">Promotional Emails</label>
              <p className="text-muted-foreground text-sm">
                Receive emails about new products including discounts.
              </p>
            </div>
            <Checkbox />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Globe className="text-primary h-5 w-5" /> Language & Region
          </CardTitle>
          <CardDescription>Set your preferred language and region.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Language</label>
            <select className="border-input bg-background focus:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none">
              <option>English (United States)</option>
              <option>Bengali</option>
              <option>Spanish</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-100 bg-red-50/30 dark:border-red-900/30 dark:bg-red-950/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" /> Danger Zone
          </CardTitle>
          <CardDescription>Irreversible actions for your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <label className="text-base font-semibold text-red-700 dark:text-red-300">
                Delete Account
              </label>
              <p className="text-sm text-red-600/70 dark:text-red-400/70">
                Once you delete your account, all your data will be permanently removed.
              </p>
            </div>
            <Button
              variant="destructive"
              className="px-6"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Delete My Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pt-6">
        <Button variant="outline">Back to Dashboard</Button>
        <Button className="px-8">Save Changes</Button>
      </div>
    </div>
  )
}
