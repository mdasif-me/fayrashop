'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { fetchClient, logoutClient } from '@/lib/api-config'

interface User {
  id: string
  name: string
  email: string
  role: string
  image?: string
  [key: string]: any
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const response = await fetchClient('/v1/auth/profile')
      const userData = response?.data?.user || response?.user || response?.data || response

      if (userData) {
        console.log(
          'User profile refreshed. ID:',
          userData.id || userData._id,
          'Full Data:',
          userData
        )
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        console.warn('Profile refresh returned no user data:', response)
      }
    } catch (error) {
      console.error('Failed to refresh profile', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if (storedUser && token) {
          console.log('Initializing auth from localStorage')
          setUser(JSON.parse(storedUser))
        }

        if (token) {
          await refreshProfile()
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error('Auth initialization failed', error)
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`
    setUser(userData)
    setLoading(false)
  }

  const logout = async () => {
    await logoutClient()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
