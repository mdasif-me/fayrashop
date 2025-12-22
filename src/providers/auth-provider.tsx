'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { fetchClient, logoutClient } from '@/lib/api-config'

interface User {
  id: string
  name: string
  email: string
  role: string
  image?: string
  assets?: Array<{ secure_url: string; [key: string]: any }>
  [key: string]: any
}

function processUserData(userData: any): User {
  if (!userData) return userData

  // Log keys for debugging
  console.log('Processing user data. Keys:', Object.keys(userData))

  // If there are assets, we prefer the latest asset as the profile image
  const assets = userData.assets || userData.Assets
  if (assets && Array.isArray(assets) && assets.length > 0) {
    const sortedAssets = [...assets].sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0
      return timeB - timeA
    })

    const latestAsset = sortedAssets[0]

    if (latestAsset?.secure_url) {
      // Add a timestamp to the URL to bypass any potential browser/CDN caching
      // when the image is newly updated
      const sep = latestAsset.secure_url.includes('?') ? '&' : '?'
      userData.image = `${latestAsset.secure_url}${sep}t=${new Date().getTime()}`

      console.log('Processed user image from assets:', userData.image)
    }
  }

  // Fallback to direct image field if still missing
  if (!userData.image && userData.image_url) {
    userData.image = userData.image_url
  }

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

  const refreshProfile = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      // Try both endpoints to get the most complete data
      // /v1/users/profile often includes assets/relationships while /v1/auth/profile might only be auth status
      let response
      try {
        response = await fetchClient('/v1/users/profile')
      } catch (e) {
        console.warn('Failed to fetch from /v1/users/profile, falling back to /v1/auth/profile')
        response = await fetchClient('/v1/auth/profile')
      }

      const rawData = response?.data?.user || response?.data || response?.user || response

      if (rawData) {
        const userData = processUserData(rawData)
        console.log('User profile synchronized. Image:', userData.image)
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

  const login = (token: string, rawData: User, refreshToken?: string) => {
    const userData = processUserData(rawData)
    localStorage.setItem('token', token)
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken)
    }
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
