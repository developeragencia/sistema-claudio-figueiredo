/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
  },
  distDir: '.next',
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig 