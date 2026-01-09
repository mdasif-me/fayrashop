'use client'

import { useEffect, useState } from 'react'
import {
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
import {
  Menu,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuLabel,
  MenuSection,
  MenuSubmenu,
  MenuTrigger,
} from '@/components/ui/menu'
import { useTheme } from 'next-themes'

export function UserMenu() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const user = {
    name: 'Demo User',
    email: 'demo@fayrashop.com',
    image: '',
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="size-8" />

  return (
    <Menu>
      <MenuTrigger
        aria-label="Open Menu"
        className="hover:bg-muted flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
      >
        <Avatar alt={user?.name || 'User'} size="md" isSquare src={(user as any).image || ''} />
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
          <MenuContent placement="left top">
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
        <MenuItem href="/auth">
          <IconLogout />
          Log out
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
