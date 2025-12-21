import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { Suspense } from 'react'
import './styles/globals.css'
import { rootMetadata } from '@/config/root-metadata.config'
import { RootWrapper } from './root-wrapper'
import { AppNavbar, Banner, Footer } from '@/components/layouts'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased`} suppressHydrationWarning>
        <RootWrapper>
          <Suspense fallback={<div></div>}>
            <Banner />
          </Suspense>
          <AppNavbar />
          {children}
          <Footer />
        </RootWrapper>
      </body>
    </html>
  )
}
export const metadata: Metadata = { ...rootMetadata }
