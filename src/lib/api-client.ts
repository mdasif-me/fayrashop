'use client'

class ApiClient {
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

  setTempAuth(data: unknown) {
    // Store temporary auth data for OTP verification
    const dataString = JSON.stringify(data)
    document.cookie = `tempAuth=${encodeURIComponent(dataString)}; path=/; max-age=3600` // 1 hour
  }

  getTempAuth(): unknown | null {
    const match = document.cookie.match(new RegExp('(^| )tempAuth=([^;]+)'))
    if (match) {
      try {
        return JSON.parse(decodeURIComponent(match[2]))
      } catch {
        return null
      }
    }
    return null
  }

  removeTempAuth() {
    document.cookie = 'tempAuth=; path=/; max-age=0'
  }

  get<T>(_endpoint: string, _options?: RequestInit): Promise<T> {
    void _endpoint
    void _options
    return Promise.reject(new Error('API disabled (design-only mode)'))
  }

  post<T>(_endpoint: string, _body: unknown, _options?: RequestInit): Promise<T> {
    void _endpoint
    void _body
    void _options
    return Promise.reject(new Error('API disabled (design-only mode)'))
  }

  put<T>(_endpoint: string, _body: unknown, _options?: RequestInit): Promise<T> {
    void _endpoint
    void _body
    void _options
    return Promise.reject(new Error('API disabled (design-only mode)'))
  }

  patch<T>(_endpoint: string, _body: unknown, _options?: RequestInit): Promise<T> {
    void _endpoint
    void _body
    void _options
    return Promise.reject(new Error('API disabled (design-only mode)'))
  }

  delete<T>(_endpoint: string, _options?: RequestInit): Promise<T> {
    void _endpoint
    void _options
    return Promise.reject(new Error('API disabled (design-only mode)'))
  }
}

export const apiClient = new ApiClient()
