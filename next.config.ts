import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
    images: {
    domains: ['axra.sgp1.digitaloceanspaces.com'],
  },
};

export default nextConfig;
