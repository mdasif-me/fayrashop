export const API_BASE_URL =
  typeof window !== 'undefined'
    ? '/api/proxy'
    : process.env.NEXT_PUBLIC_API_URL || 'https://fayrashop-ssr.vercel.app'

function getStoredToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

function setStoredToken(token: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem('token', token)
  document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`
}

async function refreshAuthToken() {
  const url = `${API_BASE_URL}/v1/auth/refresh`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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

  const token = data?.data?.access_token || data?.access_token || data?.token || data?.data?.token

  if (!token) {
    throw new Error('No token received from refresh endpoint')
  }

  setStoredToken(token)
  return token
}

export async function fetchClient(endpoint: string, options: RequestInit = {}, _retried = false) {
  const url = `${API_BASE_URL}${endpoint}`
  const token = getStoredToken()

  const method = options.method?.toUpperCase() || 'GET'
  const isAuthRoute = endpoint.includes('/auth/login') || endpoint.includes('/auth/register')

  const headers: HeadersInit = {
    ...(token && !isAuthRoute && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  // Only add Content-Type if there's a body or it's a mutation method
  // and it's NOT a FormData object (fetch handles FormData automatically)
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
        await refreshAuthToken()
        return fetchClient(endpoint, options, true)
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
        }
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
      // The user specifically requested /auth/logout?token=...
      // We'll try it via our proxy which adds /v1 if needed, or hit the absolute path
      await fetch(`${API_BASE_URL}/v1/auth/logout?token=${token}`, {
        method: 'GET',
      })
    }
  } catch (error) {
    console.error('API Logout failed', error)
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
      window.location.href = '/'
    }
  }
}
