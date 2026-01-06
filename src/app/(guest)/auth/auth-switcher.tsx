'use client'

import { Tab, TabList, TabPanel, Tabs } from '@/components/ui/tabs'
<<<<<<< HEAD
import { Login, Register, VerifyOTP } from './components'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
=======
import { Login, Register } from './components'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f

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
<<<<<<< HEAD
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
=======
    <div className="relative overflow-hidden">
      <Tabs aria-label="authentication tabs" defaultSelectedKey={mode}>
        <TabList className="mb-6">
          <Tab id="login" className={'w-full justify-center'}>
            Login
          </Tab>
          <Tab id="register" className={'w-full justify-center'}>
            Register
          </Tab>
        </TabList>
        <div className="relative">
          <AnimatePresence mode="wait">
            <TabPanel id="login" key="login">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Login />
              </motion.div>
            </TabPanel>
            <TabPanel id="register" key="register">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Register />
              </motion.div>
            </TabPanel>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
  )
}
