export const API_BASE_URL =
  typeof window !== 'undefined'
    ? '/api/proxy'
    : process.env.NEXT_PUBLIC_API_URL || 'https://fayrashop-ssr.vercel.app'

export function getStoredToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

export function getStoredRefreshToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('refresh_token')
}

export function setStoredToken(token: string, refreshToken?: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem('token', token)
  document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax; Secure`

  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken)
    document.cookie = `refresh_token=${refreshToken}; path=/; max-age=604800; SameSite=Lax; Secure`
  }
}

export function clearStoredAuth() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user')
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
  document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
}

export async function refreshAuthToken() {
  const url = `${API_BASE_URL}/v1/auth/refresh`
  const refreshToken = getStoredRefreshToken()

  if (!refreshToken) {
    return null
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  let data
  try {
    data = await response.json()
  } catch (error) {
    data = null
  }

  if (!response.ok) {
    throw new Error(
      data?.message || data?.error || `API Error: ${response.status} ${response.statusText}`
    )
  }

  const token =
    data?.data?.tokens?.access_token ||
    data?.tokens?.access_token ||
    data?.data?.access_token ||
    data?.access_token ||
    data?.data?.token ||
    data?.token

  const newRefreshToken =
    data?.data?.tokens?.refresh_token || data?.tokens?.refresh_token || data?.refresh_token

  if (!token) {
    throw new Error('No token received from refresh endpoint')
  }

  setStoredToken(token, newRefreshToken)
  return token
}

export async function fetchClient(endpoint: string, options: RequestInit = {}, _retried = false) {
  const url = `${API_BASE_URL}${endpoint}`
  const token = getStoredToken()

  const method = options.method?.toUpperCase() || 'GET'
  const isAuthRoute =
    endpoint.includes('/auth/login') ||
    endpoint.includes('/auth/register') ||
    endpoint.includes('/auth/verify-otp') ||
    endpoint.includes('/users/request-otp') ||
    endpoint.includes('/users/verify-otp') ||
    endpoint.includes('/users/forgot-password')

  const headers: HeadersInit = {
    ...(token && !isAuthRoute && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  if (options.body || ['POST', 'PUT', 'PATCH'].includes(method)) {
    const isFormData = options.body instanceof FormData
    if (!isFormData && !(headers as any)['Content-Type']) {
      ;(headers as any)['Content-Type'] = 'application/json'
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  let data
  try {
    data = await response.json()
  } catch (error) {
    data = null
  }

  console.log(`[API] ${method} ${endpoint} - Status: ${response.status}`, data)

  if (!response.ok) {
    if (!_retried && (response.status === 401 || response.status === 403) && !isAuthRoute) {
      try {
        const newToken = await refreshAuthToken()
        if (!newToken) {
          throw new Error('Session expired')
        }
        return fetchClient(endpoint, options, true)
      } catch (refreshError) {
        clearStoredAuth()
        throw refreshError
      }
    }

    throw new Error(
      data?.message || data?.error || `API Error: ${response.status} ${response.statusText}`
    )
  }

  return data
}

export async function logoutClient() {
  const token = getStoredToken()
  try {
    if (token) {
      await fetch(`${API_BASE_URL}/v1/auth/logout?token=${token}`, {
        method: 'GET',
      })
    }
  } catch (error) {
    console.error('API Logout failed', error)
  } finally {
    clearStoredAuth()
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }
}
