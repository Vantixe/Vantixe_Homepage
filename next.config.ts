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
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/services.html',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/insights.html',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
