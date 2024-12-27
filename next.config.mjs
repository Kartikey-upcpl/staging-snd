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

  // Webpack Configuration to prevent EvalError
  webpack: (config, { dev }) => {
    if (dev) {
      // Allow eval() in development for debugging
      config.devtool = 'eval-source-map';
    }

    // Ensure module filenames are correctly mapped
    config.output = {
      ...config.output,
      devtoolModuleFilenameTemplate: (info) => {
        return `webpack:///${info.resourcePath.replace('./', '')}`;
      },
    };

    return config;
  },
};

export default nextConfig;
