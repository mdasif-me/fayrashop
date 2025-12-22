export const API_BASE_URL = '/api/proxy'

function getStoredToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

function setStoredToken(token: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem('token', token)
  document.cookie = `token=${token}; path=/; max-age=86400`
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

  console.log(`[API] POST /v1/auth/refresh - Status: ${response.status}`, data)

  if (!response.ok) {
    throw new Error(
      data?.message || data?.error || `API Error: ${response.status} ${response.statusText}`
    )
  }

  // Handle the actual API response structure
  const token = data?.data?.access_token || data?.access_token || data?.token || data?.data?.token

  if (!token) {
    throw new Error('No token received from refresh endpoint')
  }

  setStoredToken(token)
  return token
}

export async function fetchClient(endpoint: string, options: RequestInit = {}, _retried = false) {
  if (!API_BASE_URL) {
    throw new Error(
      'Missing API base URL. Set API_URL (recommended) or NEXT_PUBLIC_API_URL in the environment.'
    )
  }
  const url = `${API_BASE_URL}${endpoint}`
  console.log(`[API] Requesting: ${url}`)

  const token = getStoredToken()

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
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

  const method = options.method || 'GET'
  console.log(`[API] ${method} ${endpoint} - Status: ${response.status}`, data)

  if (!response.ok) {
    if (!_retried && (response.status === 401 || response.status === 403)) {
      try {
        await refreshAuthToken()
        return fetchClient(endpoint, options, true)
      } catch (refreshError) {
        // Clear session on refresh failure
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
      // The user specifically mentioned ?token=... for logout
      await fetchClient(`/v1/auth/logout?token=${token}`, {
        method: 'GET', // Or POST, trying GET first based on user's query param example
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
