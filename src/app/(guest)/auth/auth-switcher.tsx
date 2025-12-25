'use client'

import { Tab, TabList, TabPanel, Tabs } from '@/components/ui/tabs'
import { Login, Register } from './components'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuthSwitcher() {
  const search = useSearchParams()
  const mode = search.get('mode') || 'login'

  return (
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
  )
}
