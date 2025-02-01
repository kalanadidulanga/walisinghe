import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  crossOrigin: 'anonymous',
  reactStrictMode: true,
};

export default nextConfig;
