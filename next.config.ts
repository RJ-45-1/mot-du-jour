import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=120", // Cache for 1 hour
          },
        ],
      },
    ];
  },
};

export default nextConfig;
