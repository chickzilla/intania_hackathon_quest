/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  reactStrictMode: true,
  output: 'standalone',
};

export default nextConfig;
