import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
    ignoreBuildErrors: true,
  },
  "compilerOptions": {
    "noImplicitAny": false
  }

  /* config options here */
};

export default nextConfig;
