'use client'

import { Tab, TabList, TabPanel, Tabs } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Login, Register } from './components'
import { useSearchParams } from 'next/navigation'

function Auth() {
  const search = useSearchParams()
  const mode = search.get('mode') || 'login'

  return (
    <Card className="mx-auto my-10 max-w-md">
      <CardContent>
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
      </CardContent>
    </Card>
  )
}

export default Auth
