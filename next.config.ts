import { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.convex.cloud",
      },
    ],
  },
};

export default nextConfig;