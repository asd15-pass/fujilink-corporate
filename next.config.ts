import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 is used for the hero's pre-rendered layers, where line art shows compression early.
    qualities: [75, 90],
  },
  experimental: {
    // A stale dev cache made Turbopack spawn PostCSS workers without end on Windows (2,000+ processes, all RAM).
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
