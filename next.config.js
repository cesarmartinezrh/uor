/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  experimental: {
    workerThreads: 4,
    cpus: 4
  }
}

module.exports = nextConfig
