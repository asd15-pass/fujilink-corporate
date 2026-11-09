import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 is used for the hero's pre-rendered layers, where line art shows compression early.
    qualities: [75, 90],
  },
};

export default nextConfig;
