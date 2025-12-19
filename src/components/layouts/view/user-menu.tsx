'use client'

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

export function UserMenu() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Menu>
      <MenuTrigger aria-label="Open Menu">
        <Avatar
          alt="cobain"
          size="md"
          isSquare
          src="https://intentui.com/images/avatar/cobain.jpg"
        />
      </MenuTrigger>
      <MenuContent placement="bottom right" className="min-w-60 sm:min-w-56">
        <MenuSection>
          <MenuHeader separator>
            <span className="block">Kurt Cobain</span>
            <span className="text-muted-fg font-normal">@cobain</span>
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
        <MenuItem href="#logout">
          <IconLogout />
          Log out
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
