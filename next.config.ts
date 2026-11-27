import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 for project screenshots, whose small UI text blurs at the default 75.
    qualities: [75, 90],
  },
};

export default nextConfig;
