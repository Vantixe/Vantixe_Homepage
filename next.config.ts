import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/services/digital-procurement',
        destination: '/services/ai-enabled-solutions',
        permanent: true,
      },
      {
        source: '/technology/negotiation-agent',
        destination: '/technology/sourcing-agent',
        permanent: true,
      },
      {
        source: '/negotiation-agent',
        destination: '/sourcing-agent',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
