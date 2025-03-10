import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
  images: { unoptimized: true },
  // images: {
  //   domains: ['images.unsplash.com'],
  // },
};

export default nextConfig;
