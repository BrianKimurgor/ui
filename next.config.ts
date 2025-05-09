import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['postimg.cc', 'github.com', 'i.postimg.cc'], // No protocols, just hostnames
  },
};

export default nextConfig;
