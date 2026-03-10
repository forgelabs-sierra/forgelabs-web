import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
    ],
  },
  transpilePackages: ['react-markdown', 'remark-gfm', 'remark-parse', 'unified', 'vfile', 'unist-util-visit'],
};

export default nextConfig;
