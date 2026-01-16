/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.trankimphuong.id.vn',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
