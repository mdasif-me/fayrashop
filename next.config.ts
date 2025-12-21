import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,

  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },

  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    if (!apiUrl) {
      console.warn('WARNING: NEXT_PUBLIC_API_URL is not defined in .env')
    }

    return [
      {
        source: '/api/proxy/:path*',
        destination: `${apiUrl || 'https://fayrashop-ssr.vercel.app'}/:path*`,
      },
    ]
  },
}

export default nextConfig
