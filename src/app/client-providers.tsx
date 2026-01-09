'use client'

import { ThemeProvider } from '../components/theme-provider'
import { Toaster } from 'sonner'

/**
 * Client-side providers component
 * Handles all client-side state and context providers
 * Keeps them isolated from server components for better SEO
 *
 * This component is marked as 'use client' to:
 * 1. Isolate non-serializable class instances (QueryClient)
 * 2. Keep the root layout as a Server Component for SSR/SEO benefits
 * 3. Avoid passing class instances through server->client boundaries
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Toaster position="top-right" richColors closeButton />
      {children}
    </ThemeProvider>
  )
}
