/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.URL,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://api.ayanagroup99.com:8080/:path*", // Your Golang backend URL
      },
    ];
  },
};

module.exports = nextConfig;
