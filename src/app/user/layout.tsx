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
    title: 'User Management',
    href: '/user/management',
    icon: User,
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
  }, [])

  if (!mounted) return null

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-64">
          <div className="bg-card text-card-foreground sticky top-24 overflow-hidden rounded-lg border shadow-sm">
            {isAuthenticated && user ? (
              <>
                <div className="bg-muted/30 flex flex-col items-center px-6 py-8 text-center">
                  <div className="relative mb-3">
                    <Avatar
                      src={user.image || ''}
                      alt={user.name || 'User'}
                      size="xl"
                      className="ring-primary/10 h-20 w-20 ring-2 ring-offset-2"
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
              </>
            ) : (
              <div className="flex flex-col items-center p-8 text-center">
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                  <User className="text-primary h-6 w-6" />
                </div>
                <h2 className="mb-2 text-lg font-bold">Welcome!</h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Sign in to access your dashboard settings.
                </p>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 w-full text-white shadow-md"
                >
                  <Link href="/auth">Sign In</Link>
                </Button>
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1">
          {isAuthenticated ? (
            children
          ) : (
            <Card className="flex h-[450px] flex-col items-center justify-center border-none p-8 text-center shadow-none ring-0">
              <div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <Shield className="text-primary h-8 w-8" />
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight">Dashboard Access</h1>
              <p className="text-muted-foreground mb-8 max-w-md text-lg">
                Please sign in to view your orders, manage your profile, and access exclusive
                features.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 px-12 text-lg text-white transition-all hover:scale-105"
              >
                <Link href="/auth">Sign In Now</Link>
              </Button>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
