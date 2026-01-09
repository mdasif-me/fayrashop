// Application constants

export const APP_CONFIG = {
  name: 'FayraShop',
  description: 'Premium Ecommerce Experience',
  version: '1.2.0',
  author: 'MD Asif',
  url: process.env.NEXT_PUBLIC_APP_URL,
  email: 'support@fayrashop.com',
} as const

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forget-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  CONTACT: '/contact',
  ABOUT: '/about',
  BLOG: '/blog',
  DOCS: '/docs',
} as const

export const API_ROUTES = {
  AUTH: {
    SIGN_IN: '/v1/auth/login',
    SIGN_UP: '/v1/auth/register',
    SIGN_OUT: '/v1/auth/logout',
    REFRESH: '/v1/auth/refresh',
    FORGOT_PASSWORD: '/v1/auth/forgot-password',
    RESET_PASSWORD: '/v1/auth/reset-password',
    PROFILE: '/v1/auth/profile',
  },
  USER: {
    PROFILE: '/v1/users/profile',
    UPDATE: '/v1/users', // usually /v1/users/:id
    DELETE: '/v1/users', // usually /v1/users/:id
    CHANGE_PASSWORD: '/v1/users/change-password',
    REQUEST_OTP: '/v1/users/request-otp',
    VERIFY_OTP: '/v1/users/verify-otp',
    FORGOT_PASSWORD: '/v1/users/forgot-password',
    PHOTO: '/v1/users/photo',
  },
  EMAIL: {
    SEND: '/v1/email/send',
  },
  UPLOAD: {
    IMAGE: '/api/upload/image',
    FILE: '/api/upload/file',
  },
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  NAME_MAX_LENGTH: 50,
  BIO_MAX_LENGTH: 500,
  MESSAGE_MAX_LENGTH: 1000,
  FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
} as const

export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const

export const SUPPORTED_FILE_TYPES = [
  ...SUPPORTED_IMAGE_TYPES,
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/yourusername',
  GITHUB: 'https://github.com/yourusername',
  LINKEDIN: 'https://linkedin.com/in/yourusername',
  DISCORD: 'https://discord.gg/yourinvite',
} as const

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

export const LOCALES = {
  EN: 'en',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
} as const

export const DEFAULT_LOCALE = LOCALES.EN

export const COOKIE_NAMES = {
  THEME: 'theme',
  LOCALE: 'locale',
  CONSENT: 'cookie-consent',
} as const

export const LOCAL_STORAGE_KEYS = {
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebar-state',
  RECENT_SEARCHES: 'recent-searches',
} as const

export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  SERVER: 'Server error. Please try again later.',
} as const

export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  EMAIL_SENT: 'Email sent successfully!',
  FILE_UPLOADED: 'File uploaded successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
} as const
