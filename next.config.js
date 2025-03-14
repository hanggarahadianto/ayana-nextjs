const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === "production" ? false : true,
  trailingSlash: true,
  swcMinify: true,

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
        permanent: true, // Redirect 301 (SEO friendly)
      },
    ];
  },

  images: {
    domains: ["yourdomain.com"], // Sesuaikan dengan domain gambar Anda
  },
};

// Hapus i18n agar tidak ada /en/
module.exports = nextConfig;
