/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/H5Game',
  assetPrefix: '/H5Game/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;