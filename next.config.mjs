/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Ignore type errors during builds
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'test.snd.in',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'staranddaisy.in',
        port: '',
      },
    ],
  },
};

export default nextConfig;