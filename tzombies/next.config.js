/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false }
    }
    return config
  },
  rewrites: async () => [
    {
      source: '/sandbox/:path*',
      destination: 'http://localhost:20000/:path*',
    },
  ],
}

module.exports = nextConfig
