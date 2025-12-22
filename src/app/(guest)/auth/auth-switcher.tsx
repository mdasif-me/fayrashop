'use client'

import { Tab, TabList, TabPanel, Tabs } from '@/components/ui/tabs'
import { Login, Register } from './components'
import { useSearchParams } from 'next/navigation'

export default function AuthSwitcher() {
  const search = useSearchParams()
  const mode = search.get('mode') || 'login'

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
