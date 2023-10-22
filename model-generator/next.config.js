/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactServerComponents: false,
    swcMinify: true,
  },
  // Agrega las rutas que necesitas
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/login',
      },
      {
        source: '/model',
        destination: '/model',
      },
      {
        source: '/create_model',
        destination: '/create_model',
      },
      {
        source: '/home',
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig;

