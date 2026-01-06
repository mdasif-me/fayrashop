'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, Globe } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

export default function SettingsPage() {
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

      <div className="flex justify-end gap-3 pt-6">
        <Button variant="outline">Back to Dashboard</Button>
        <Button className="px-8">Save Changes</Button>
      </div>
    </div>
  )
}
