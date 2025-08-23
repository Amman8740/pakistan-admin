import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains:['res.cloudinary.com'],
  }

  /* config options here */
};

export default nextConfig;
