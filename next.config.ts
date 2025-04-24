import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  allowedDevOrigins: ['192.168.45.56'],
  images: {
    remotePatterns: [
      {
        hostname: 'weatherlink-profile.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
