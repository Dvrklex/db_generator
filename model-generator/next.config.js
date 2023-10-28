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
        source: '/Login',
        destination: '/Login',
      },
      {
        source: '/Model',
        destination: '/Model',
      },
      {
        source: '/CreateModel',
        destination: '/CreateModel',
      },
      {
        source: '/Home',
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig;

