/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  basePath: isProd ? '/H5game' : '',
  assetPrefix: isProd ? '/H5game' : '',
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 添加公共资源路径配置
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/H5game' : '',
    NEXT_PUBLIC_SITE_URL: isProd ? 'https://suiyecc.github.io' : 'http://localhost:3000'
  }
};

export default nextConfig;