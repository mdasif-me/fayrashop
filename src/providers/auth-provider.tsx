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
      const userData = response?.data || response
      if (userData) {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
      }
    } catch (error) {
      console.error('Failed to refresh profile', error)
      // If profile fetch fails specifically with 401/403, fetchClient will try to refresh
      // If it still fails, user might need to login again
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      await refreshProfile()
    }
    initAuth()
  }, [])

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    document.cookie = `token=${token}; path=/; max-age=86400`
    setUser(userData)
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
