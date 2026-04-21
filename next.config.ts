// import { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* other config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**.convex.cloud",
//       },
//     ],
//   },
// };

// export default nextConfig;

import { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
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
