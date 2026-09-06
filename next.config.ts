import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // scripts/serve-tagged.mjs builds and serves a tagged copy (port 4001) from
  // its own directory so the normal build and dev server are untouched. Unset
  // everywhere else, so builds and the normal dev server use .next as before.
  distDir: process.env.NEXT_DIST_DIR || '.next',

  images: {
    // Self-hosted, the optimizer's output cache lives in the build directory and
    // is lost on every deploy, because Railway containers are ephemeral. A longer
    // floor keeps browsers and the CDN from asking for a re-encode after each
    // release. One day, not a year: these are stable filenames, so a replaced
    // picture must still reach visitors within a day.
    minimumCacheTTL: 86400,
  },

  async headers() {
    // Files under public/ are served by the Node server with `max-age=0`, which
    // was invisible on Vercel because its edge cached them regardless. Off
    // Vercel there is no such layer, so state the intent here rather than in a
    // CDN dashboard: this holds whether or not anything is proxying us.
    // Deliberately not `immutable` for the same reason as minimumCacheTTL above.
    const mediaCache = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=86400, stale-while-revalidate=604800',
      },
    ]
    return [
      { source: '/videos/:path*', headers: mediaCache },
      { source: '/images/:path*', headers: mediaCache },
      { source: '/logos/:path*', headers: mediaCache },
    ]
  },

  async redirects() {
    return [
      // Apex and www normalisation. Vercel did this at the domain layer, in its
      // dashboard, so nothing in this repo reproduced it; off Vercel these have
      // to exist or one spelling of each domain serves nothing. The canonicals
      // are asymmetric on purpose: consulting canonicalises to www.vantixe.com,
      // technology to the bare vantixe.ai.
      // `has.value` is compiled as `^<value>$`, so these cannot match a
      // subdomain and cannot loop. Dots are escaped because the value is a
      // regular expression.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'vantixe\\.com' }],
        destination: 'https://www.vantixe.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www\\.vantixe\\.ai' }],
        destination: 'https://vantixe.ai/:path*',
        permanent: true,
      },
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
