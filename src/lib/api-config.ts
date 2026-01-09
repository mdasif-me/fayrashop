export const API_BASE_URL =
  typeof window !== 'undefined'
    ? '/api/proxy'
    : process.env.NEXT_PUBLIC_API_URL || 'https://fayrashop-ssr.vercel.app'

export function getStoredToken() {
  return null
}

export function getStoredRefreshToken() {
  return null
}

export function setStoredToken(token: string, refreshToken?: string) {
  void token
  void refreshToken
  return
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
  return null
}

export async function fetchClient(endpoint: string, options: RequestInit = {}, _retried = false) {
  void endpoint
  void options
  void _retried
  throw new Error('API disabled (design-only mode)')
}

export async function logoutClient() {
  try {
  } catch (error) {
    console.error('API Logout failed', error)
  } finally {
    clearStoredAuth()
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }
}
