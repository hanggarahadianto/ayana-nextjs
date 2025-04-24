const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === "production" ? false : true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(self), microphone=()" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },

  images: {
    domains: ["yourdomain.com"],
  },

  // ✅ Tambahkan ini
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.plugins.push(new CaseSensitivePathsPlugin());
    }
    return config;
  },
};

module.exports = nextConfig;
