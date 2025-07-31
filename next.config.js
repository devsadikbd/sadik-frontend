module.exports = {
  // Disable TypeScript checking during build to speed up the process
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint checking during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optimize webpack
  webpack: (config) => {
    // Reduce memory usage and optimize build
    config.optimization.minimize = true;
    return config;
  },
};
