'use client'

import { Tab, TabList, TabPanel, Tabs } from '@/components/ui/tabs'
import { Login, Register } from './components'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Trash2, Loader2 } from 'lucide-react'
import React, { useState } from 'react'

export default function AuthSwitcher() {
  const search = useSearchParams()
  const router = useRouter()
  const { isAuthenticated, logout, user } = useAuth()
  const [isDeleting, setIsDeleting] = useState(false)
  const mode = search.get('mode') || 'login'

  const handleDeleteAccount = async () => {
    if (!user?.id && !user?._id) return
    if (
      !confirm(
        'Are you sure you want to permanently delete your account? This action cannot be undone.'
      )
    )
      return

    setIsDeleting(true)
    try {
      const { fetchClient } = await import('@/lib/api-config')
      await fetchClient(`/v1/users/${user.id || user._id}`, {
        method: 'DELETE',
      })

      // Clear all local data immediately
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'

      alert('Your account has been deleted successfully.')
      window.location.href = '/'
    } catch (error: any) {
      alert(error.message || 'Failed to delete account.')
    } finally {
      setIsDeleting(false)
    }
  }

  if (isAuthenticated) {
    return (
      <div className="py-6 text-center">
        <div className="mb-4 flex flex-col items-center gap-2">
          <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold">You are already logged in</h2>
          <p className="text-muted-foreground text-sm">
            You cannot access login or registration while signed in.
          </p>
        </div>

        <div className="mt-8 space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-950/20">
          <p className="text-xs font-medium tracking-wider text-red-600 uppercase">Danger Zone</p>
          <p className="text-sm text-red-600/80">
            If you want to remove your account entirely, you can do so below.
          </p>
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            Permanently Delete My Account
          </Button>
        </div>

        <Button
          variant="ghost"
          className="mt-4 w-full"
          onClick={() => router.push('/user/profile')}
        >
          Go to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <Tabs aria-label="authentication tabs" defaultSelectedKey={mode}>
      <TabList>
        <Tab id="login" className={'w-full justify-center'}>
          Login
        </Tab>
        <Tab id="register" className={'w-full justify-center'}>
          Register
        </Tab>
      </TabList>
      <TabPanel id="login">
        <Login />
      </TabPanel>
      <TabPanel id="register">
        <Register />
      </TabPanel>
    </Tabs>
  )
}
