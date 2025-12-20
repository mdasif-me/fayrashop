export const API_BASE_URL =
  typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : '/api/proxy'

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
  const url = `${API_BASE_URL}/auth/refresh`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  let data
  try {
    data = await response.json()
  } catch (error) {
    data = null
  }

  console.log(`[API] POST /auth/refresh - Status: ${response.status}`, data)

  if (!response.ok) {
    throw new Error(
      data?.message || data?.error || `API Error: ${response.status} ${response.statusText}`
    )
  }

  const token = data?.token || data?.data?.token
  if (!token) {
    throw new Error('No token received from refresh endpoint')
  }

  setStoredToken(token)
  return token
}

export async function fetchClient(endpoint: string, options: RequestInit = {}, _retried = false) {
  const url = `${API_BASE_URL}${endpoint}`

  const token = getStoredToken()

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
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
        // fall through to throw original error
      }
    }

    throw new Error(
      data?.message || data?.error || `API Error: ${response.status} ${response.statusText}`
    )
  }

  return data
}
