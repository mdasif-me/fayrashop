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
    domains: ['placehold.co', 'images.unsplash.com'],
    remotePatterns: [],
  },
}

export default nextConfig
