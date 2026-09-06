import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // scripts/serve-tagged.mjs builds and serves a tagged copy (port 4001) from
  // its own directory so the normal build and dev server are untouched. Unset
  // everywhere else, so builds and the normal dev server use .next as before.
  distDir: process.env.NEXT_DIST_DIR || '.next',
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
