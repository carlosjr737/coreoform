/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable if needed for future features
  },
  // Optimize for production
  swcMinify: true,
  // Enable if you plan to use images
  images: {
    domains: [],
  },
};

module.exports = nextConfig;