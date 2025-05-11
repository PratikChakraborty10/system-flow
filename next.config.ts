import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Ignore lint errors temp
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore type errors temp
  },git
};

export default nextConfig;
