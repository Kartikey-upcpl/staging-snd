/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Handle TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Allow loading external images
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

  // Explicitly set Node.js runtime for compatibility
  experimental: {
    runtime: 'nodejs', // Use Node.js runtime instead of Edge
  },

  webpack: (config) => {
    // Remove 'eval' and use 'source-map' for better compatibility
    config.devtool = 'source-map'; // Safe for both dev and production

    // Ensure module filenames are correctly mapped
    config.output = {
      ...config.output,
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    };

    return config;
  },
};

export default nextConfig;
