'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Settings, Shield, User, LogOut, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { IconHeadphones } from '@intentui/icons'
import { fetchClient } from '@/lib/api-config'

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
  const [user, setUser] = useState<any>(null)
  const [authorized, setAuthorized] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const loadData = async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (token) {
          try {
            // First set from storage for immediate feel
            if (storedUser) {
              setAuthorized(true)
              setUser(JSON.parse(storedUser))
            }

            // Then fetch fresh data
            const response = await fetchClient('/v1/auth/profile')
            const userData = response?.data || response
            if (userData) {
              setAuthorized(true)
              setUser(userData)
              localStorage.setItem('user', JSON.stringify(userData))
            }
          } catch (error) {
            console.error('Failed to authorize', error)
            setAuthorized(false)
          }
        }
      }
    }
    loadData()
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full flex-shrink-0 lg:w-64">
          <div className="bg-card text-card-foreground sticky top-24 rounded-lg border shadow-sm">
            <div className="flex flex-col items-center p-6 text-center">
              {authorized && user ? (
                <>
                  <div className="relative mb-3">
                    <Avatar
                      src={user.image || ''}
                      alt={user.name || 'User'}
                      size="xl"
                      className="h-20 w-20"
                    />
                  </div>
                  <h2 className="text-lg font-bold tracking-tight">{user.name || 'User'}</h2>
                  <p className="text-muted-foreground text-xs break-all">{user.email}</p>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 py-4">
                  <Button asChild className="bg-primary hover:bg-primary/90 w-full text-white">
                    <Link href="/auth">Login to Account</Link>
                  </Button>
                </div>
              )}
            </div>
            <Separator />
            <div className="p-4">
              <nav className="flex flex-col gap-2">
                {authorized ? (
                  sidebarItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href as any}
                        className={cn(
                          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-primary text-white'
                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                        {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                      </Link>
                    )
                  })
                ) : (
                  <p className="text-muted-foreground py-4 text-center text-sm italic">
                    Navigation disabled
                  </p>
                )}
              </nav>
            </div>
            <Separator />
            {authorized && (
              <div className="p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
                  onClick={async () => {
                    try {
                      await fetchClient('/v1/auth/logout')
                    } catch (error) {
                      console.error('Logout failed', error)
                    } finally {
                      localStorage.removeItem('token')
                      localStorage.removeItem('user')
                      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
                      window.location.href = '/'
                    }
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1">
          {authorized ? (
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
