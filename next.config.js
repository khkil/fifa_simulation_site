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
};

module.exports = nextConfig;
