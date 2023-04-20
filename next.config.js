/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: 'localhost:3000',
        destination: '/',
        basePath: false,
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
