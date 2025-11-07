// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/Marina-Martin/buscaLarAPI/refs/heads/main/fotos/**',
      },
    ],
  },
};

export default nextConfig;