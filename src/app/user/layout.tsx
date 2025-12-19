'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Settings, Shield, User, LogOut, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

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
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full flex-shrink-0 lg:w-64">
          <div className="bg-card text-card-foreground sticky top-24 rounded-lg border shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold tracking-tight">Account</h2>
              <p className="text-muted-foreground text-sm">Manage your account settings</p>
            </div>
            <Separator />
            <div className="p-4">
              <nav className="flex flex-col gap-2">
                {sidebarItems.map((item) => {
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
                })}
              </nav>
            </div>
            <Separator />
            <div className="p-4">
              <Button
                intent="plain"
                className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
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
