/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
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
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
