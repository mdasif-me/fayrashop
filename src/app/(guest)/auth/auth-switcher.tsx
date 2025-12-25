'use client'

import { Tab, TabList, TabPanel, Tabs } from '@/components/ui/tabs'
import { Login, Register, VerifyOTP } from './components'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function AuthSwitcher() {
  const search = useSearchParams()
  const router = useRouter()
  const mode = search.get('mode') || 'login'
  const [selectedKey, setSelectedKey] = useState<string>(mode)

  useEffect(() => {
    setSelectedKey(mode)
  }, [mode])

  const handleTabChange = (key: React.Key) => {
    const tabKey = String(key)
    setSelectedKey(tabKey)
    if (tabKey !== 'login') {
      router.push(`/auth?mode=${tabKey}`, { scroll: false })
    } else {
      router.push('/auth', { scroll: false })
    }
  }

  return (
    <Tabs
      key={mode}
      aria-label="authentication tabs"
      selectedKey={selectedKey}
      onSelectionChange={handleTabChange}
    >
      <TabList>
        <Tab id="login" className={'w-full justify-center'}>
          Login
        </Tab>
        <Tab id="register" className={'w-full justify-center'}>
          Register
        </Tab>
        {mode === 'verify' && (
          <Tab id="verify" className={'w-full justify-center'}>
            Verify
          </Tab>
        )}
      </TabList>
      <TabPanel id="login">
        <Login />
      </TabPanel>
      <TabPanel id="register">
        <Register />
      </TabPanel>
      {mode === 'verify' && (
        <TabPanel id="verify">
          <VerifyOTP />
        </TabPanel>
      )}
    </Tabs>
  )
}
