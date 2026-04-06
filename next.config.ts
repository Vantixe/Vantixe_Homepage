import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/services/digital-procurement',
        destination: '/services/ai-enabled-solutions',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
