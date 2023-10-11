/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:8085/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL,
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_NEXON_IMAGE_SEVER_URL,
      },
    ],
  },
};

module.exports = nextConfig;
