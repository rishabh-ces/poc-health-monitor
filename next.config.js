// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/seed/picsum/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ prevents build failure due to lint config mismatch
  },
}

module.exports = nextConfig
