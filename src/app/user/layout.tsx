'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Settings,
  Shield,
  User,
  LogOut,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { IconHeadphones } from '@intentui/icons'
import { useAuth } from '@/providers/auth-provider'

const sidebarItems = [
  {
    title: 'Overview',
    href: '/user',
    icon: LayoutDashboard,
  },
  {
    title: 'Profile',
    href: '/user/profile',
    icon: User,
  },
  {
    title: 'Settings',
    href: '/user/settings',
    icon: Settings,
  },
  {
    title: 'Security',
    href: '/user/security',
    icon: Shield,
  },
  {
    title: 'Customer Support',
    href: '/user/support',
    icon: IconHeadphones,
  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, loading, isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (mounted && !loading && (!isAuthenticated || !user)) {
      router.push('/auth')
    }
  }, [mounted, loading, isAuthenticated, user, router])

  if (!mounted || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Strictly hide if not authenticated
  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-64">
          <div className="bg-card text-card-foreground sticky top-24 overflow-hidden rounded-lg border shadow-sm">
            <div className="bg-muted/30 flex flex-col items-center px-6 py-8 text-center">
              <div className="border-background ring-primary/10 relative mb-3 h-20 w-20 overflow-hidden rounded-full border-2 shadow-sm ring-2">
                <Avatar
                  src={user.image || ''}
                  alt={user.name || 'User'}
                  className="size-full object-cover *:size-full"
                />
              </div>
              <h2 className="text-lg font-bold tracking-tight">{user.name || 'User'}</h2>
              <p className="text-muted-foreground text-xs break-all">{user.email}</p>
            </div>
            <Separator />
            <div className="p-4">
              <nav className="flex flex-col gap-1.5">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      href={item.href as any}
                      className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all',
                        isActive
                          ? 'bg-primary text-white shadow-sm'
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.title}</span>
                      {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-70" />}
                    </Link>
                  )
                })}
              </nav>
            </div>
            <Separator />
            <div className="p-4">
              <Button
                variant="outline"
                className="w-full justify-start border-red-100 text-red-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-900/30 dark:hover:bg-red-950/20"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
