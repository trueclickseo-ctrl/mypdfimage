import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    cpus: 1,
  },
  webpack: (config, { isServer }) => {
    // Ignore node-canvas issues in server environment
    if (isServer) {
      config.resolve.alias.canvas = false;
    }
    return config;
  },
};

export default nextConfig;
