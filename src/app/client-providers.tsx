'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '../components/theme-provider'
import { Toaster } from 'sonner'
import { useMemo } from 'react'

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
  // Create QueryClient once per component instance to avoid re-creating on every render
  // Using useMemo ensures the same instance is used throughout the component lifecycle
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes (was cacheTime)
            retry: 1,
          },
        },
      }),
    []
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Toaster position="top-right" richColors closeButton />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
