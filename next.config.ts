import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.URL,
  },

  webpack: (config: { resolve: { alias: any } }, { isServer }: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(process.cwd(), "src"), // __dirname tidak tersedia di ESM, gunakan process.cwd()
    };
    console.log(`🔧 Webpack is running on ${isServer ? "server" : "client"}`);
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.ayanagroup99.com/:path*",
      },
    ];
  },
};

export default nextConfig;
