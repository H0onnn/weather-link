import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  allowedDevOrigins: ['192.168.45.56'],
};

export default nextConfig;
