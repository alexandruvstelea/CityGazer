/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d13k13wj6adfdf.cloudfront.net",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
