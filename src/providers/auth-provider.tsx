'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { fetchClient, logoutClient, refreshAuthToken, setStoredToken, getStoredToken, getStoredRefreshToken } from '@/lib/api-config'

interface User {
  id: string
  name: string
  email: string
  role: string
  image?: string
  assets?: Array<{ secure_url: string; [key: string]: any }>
  [key: string]: any
}

function processUserData(userData: any): User | null {
  if (!userData || (!userData.id && !userData._id && !userData.email)) return null

  const assets = userData.assets || userData.Assets
  if (Array.isArray(assets) && assets.length > 0) {
    const latest = [...assets].sort((a, b) =>
      new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    )[0]
    if (latest?.secure_url) {
      userData.image = `${latest.secure_url}${latest.secure_url.includes('?') ? '&' : '?'}t=${Date.now()}`
    }
  }
  userData.image = userData.image || userData.image_url
  return userData
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (token: string, user: User, refreshToken?: string) => void
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const logout = async () => {
    await logoutClient()
    setUser(null)
  }

  const refreshProfile = async () => {
    if (!getStoredToken()) return setUser(null), setLoading(false)

    try {
      let response
      try {
        response = await fetchClient('/v1/users/profile')
      } catch {
        response = await fetchClient('/v1/auth/profile')
      }

      const userData = processUserData(response?.data?.user || response?.data || response?.user || response)
      if (userData) {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        logout()
      }
    } catch (error: any) {
      if (error.message === 'Session expired') {
        logout()
      } else {
        console.error('Profile refresh failed', error)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        let token = getStoredToken()
        const refreshToken = getStoredRefreshToken()
        const storedUser = localStorage.getItem('user')

        if (!token && refreshToken) {
          try { token = await refreshAuthToken() } catch {}
        }

        if (token && storedUser) {
          const parsed = JSON.parse(storedUser)
          if (parsed?.email) setUser(parsed)
        }

        if (token) await refreshProfile()
        else setLoading(false)
      } catch {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const login = (token: string, rawData: User, refreshToken?: string) => {
    const userData = processUserData(rawData)
    if (!userData) return

    setStoredToken(token, refreshToken)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
