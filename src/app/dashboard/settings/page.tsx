'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, Moon, Globe, Smartphone } from 'lucide-react'
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
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" /> Notifications
          </CardTitle>
          <CardDescription>Configure how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-base font-medium">Email Notifications</label>
              <p className="text-muted-foreground text-sm">
                Receive emails about your order status.
              </p>
            </div>
            {/* Mock Switch */}
            {/* Checkbox instead of Switch */}
            <Checkbox defaultSelected />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-base font-medium">Promotional Emails</label>
              <p className="text-muted-foreground text-sm">
                Receive emails about new products including discounts.
              </p>
            </div>
            <Checkbox />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-base font-medium">Push Notifications</label>
              <p className="text-muted-foreground text-sm">
                Receive push notifications on your device.
              </p>
            </div>
            <Checkbox defaultSelected />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" /> Language & Region
          </CardTitle>
          <CardDescription>Set your preferred language and region.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Language</label>
            <select className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
              <option>English (United States)</option>
              <option>Bengali</option>
              <option>Spanish</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Currency</label>
            <select className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
              <option>USD ($)</option>
              <option>BDT (৳)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  )
}
