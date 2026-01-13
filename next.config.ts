// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;




/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',  // Allows any path under this hostname
      },
      // Optional: Add more if you plan to use other sources (e.g. Unsplash, your own CDN)
      // {
      //   protocol: 'https',
      //   hostname: '**.unsplash.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
};

module.exports = nextConfig;