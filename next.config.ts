import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'github.githubassets.com'
        },
        {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com'
        }
    ]
  }
};

export default nextConfig;
