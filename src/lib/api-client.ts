'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private getToken(): string | null {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'))
    if (match) return match[2]
    return null
  }

  setToken(token: string) {
    // secure; samesite=strict; should be used in production
    document.cookie = `token=${token}; path=/; max-age=86400` // 1 day
  }

  removeToken() {
    document.cookie = 'token=; path=/; max-age=0'
  }

  setUser(userData: unknown) {
    const userString = JSON.stringify(userData)
    document.cookie = `user=${encodeURIComponent(userString)}; path=/; max-age=86400` // 1 day
  }

  getUser(): unknown | null {
    const match = document.cookie.match(new RegExp('(^| )user=([^;]+)'))
    if (match) {
      try {
        return JSON.parse(decodeURIComponent(match[2]))
      } catch {
        return null
      }
    }
    return null
  }

  removeUser() {
    document.cookie = 'user=; path=/; max-age=0'
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const token = this.getToken()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (token) {
      // @ts-ignore
      headers['Authorization'] = `Bearer ${token}`
    }

    const config: RequestInit = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(url, config)

      if (response.status === 401) {
        this.removeToken()
        this.removeUser()
        if (window.location.pathname !== '/auth/login') {
          window.location.href = '/auth/login'
        }
        throw new Error('Unauthorized')
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'API Error' }))
        throw new Error(error.message || 'Something went wrong')
      }

      return response.json()
    } catch (error) {
      console.error('API Request Failed:', error)
      throw error
    }
  }

  get<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  post<T>(endpoint: string, body: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  put<T>(endpoint: string, body: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
