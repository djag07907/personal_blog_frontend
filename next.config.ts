import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'sincere-wisdom-8c843dc61b.strapiapp.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
