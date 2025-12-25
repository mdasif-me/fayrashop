/**
 * Centralized utility for checking user verification status.
 */

export function isUserPending(user: any): boolean {
  if (!user) return false

  const status = user.status?.toUpperCase()
  const emailVerified = user.emailVerified ?? user.email_verified

  // If emailVerified is explicitly false, it's pending
  if (emailVerified === false || String(emailVerified) === 'false') {
    return true
  }

  // If emailVerified is explicitly true, it's NOT pending
  if (emailVerified === true || String(emailVerified) === 'true') {
    return false
  }

  // Fallback to status if emailVerified is missing
  return status !== 'ACTIVE'
}

export function isUserVerified(user: any): boolean {
  if (!user) return false

  const status = user.status?.toUpperCase()
  const emailVerified = user.emailVerified ?? user.email_verified

  // If emailVerified is explicitly true, it's verified
  if (emailVerified === true || String(emailVerified) === 'true') {
    return true
  }

  // If emailVerified is explicitly false, it's NOT verified
  if (emailVerified === false || String(emailVerified) === 'false') {
    return false
  }

  // Fallback to status if emailVerified is missing
  return status === 'ACTIVE'
}
