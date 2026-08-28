import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The parent folder is another Next app; pin the root so Turbopack does not
  // walk up and pick up its middleware.
  turbopack: { root: import.meta.dirname },
  // Lets the dev server serve its chunks when the site is opened from a phone
  // on the LAN; without this the JS is blocked and GSAP never reveals content.
  allowedDevOrigins: ['192.168.1.47', '*.local'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};

export default nextConfig;
