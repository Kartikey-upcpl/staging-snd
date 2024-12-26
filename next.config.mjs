/** @type {import('next').NextConfig} */
const nextConfig = {
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