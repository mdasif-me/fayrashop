'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  IconCommandRegular,
  IconDashboard,
  IconDeviceDesktop,
  IconHeadphones,
  IconLogout,
  IconMoon,
  IconSettings,
  IconShield,
  IconSun,
} from '@intentui/icons'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Menu,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuLabel,
  MenuSection,
  MenuSeparator,
  MenuSubmenu,
  MenuTrigger,
} from '@/components/ui/menu'
import { useTheme } from 'next-themes'
import { fetchClient } from '@/lib/api-config'

export function UserMenu() {
  const { resolvedTheme, setTheme } = useTheme()
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const loadUser = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
      const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null

      if (token) {
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }

        try {
          const response = await fetchClient('/v1/auth/profile')
          const userData = response?.data || response
          if (userData) {
            setUser(userData)
            localStorage.setItem('user', JSON.stringify(userData))
          }
        } catch (error) {
          console.error('Failed to load profile in menu', error)
        }
      }
    }
    loadUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    window.location.href = '/'
  }

  if (!mounted) return <div className="size-8" /> // Use a placeholder to keep navbar height consistent

  if (!user) {
    return (
      <Button
        asChild
        variant="default"
        size="sm"
        className="bg-primary hover:bg-primary/90 text-white"
      >
        <Link href="/auth">Login</Link>
      </Button>
    )
  }

  return (
    <Menu>
      <MenuTrigger
        aria-label="Open Menu"
        className="hover:bg-muted flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
      >
        <Avatar alt={user.name || 'User'} size="md" isSquare src={user.image || ''} />
        <div className="flex flex-col text-left max-md:hidden">
          <span className="text-sm leading-none font-semibold">{user.name || 'User'}</span>
          <span className="text-muted-foreground text-xs">{user.email}</span>
        </div>
      </MenuTrigger>
      <MenuContent placement="bottom right" className="min-w-60 sm:min-w-56">
        <MenuSection>
          <MenuHeader separator>
            <span className="block">{user.name || 'User'}</span>
            <span className="text-muted-fg font-normal">{user.email}</span>
          </MenuHeader>
        </MenuSection>
        <MenuSubmenu>
          <MenuItem>
            {resolvedTheme === 'light' ? (
              <IconSun />
            ) : resolvedTheme === 'dark' ? (
              <IconMoon />
            ) : (
              <IconDeviceDesktop />
            )}
            <MenuLabel>Switch theme</MenuLabel>
          </MenuItem>
          <MenuContent>
            <MenuItem onAction={() => setTheme('system')}>
              <IconDeviceDesktop /> System
            </MenuItem>
            <MenuItem onAction={() => setTheme('dark')}>
              <IconMoon /> Dark
            </MenuItem>
            <MenuItem onAction={() => setTheme('light')}>
              <IconSun /> Light
            </MenuItem>
          </MenuContent>
        </MenuSubmenu>

        <MenuItem href="/user">
          <IconDashboard />
          Dashboard
        </MenuItem>
        <MenuItem href="/user/settings">
          <IconSettings />
          Settings
        </MenuItem>
        <MenuItem href="/user/security">
          <IconShield />
          Security
        </MenuItem>
        <MenuItem href="/user/support">
          <IconHeadphones />
          Customer Support
        </MenuItem>
        <MenuItem onAction={handleLogout}>
          <IconLogout />
          Log out
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
