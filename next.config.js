// const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require("next/constants");
// const path = require("path");

// /** @type {import("next").NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ["res.cloudinary.com"], // Tambahkan domain gambar yang diperlukan
//   },
//   env: {
//     NEXT_PUBLIC_API_URL: process.env.URL, // Gunakan variable environment
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: "https://api.ayanagroup99.com/:path*", // Proxy API agar lebih clean
//       },
//     ];
//   },
//   webpack: (config: { resolve: { alias: any } }, { isServer }: any) => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       "@": path.resolve(process.cwd(), "src"), // Alias untuk import lebih singkat
//     };
//     console.log(`🔧 Webpack running on ${isServer ? "server" : "client"}`);
//     return config;
//   },
// };

// module.exports = (phase: any) => {
//   if (phase === PHASE_PRODUCTION_BUILD) {
//     const withPWA = require("@ducanh2912/next-pwa").default({
//       dest: "public",
//       register: true,
//       skipWaiting: true,
//       disable: phase === PHASE_DEVELOPMENT_SERVER, // PWA hanya aktif di production
//     });
//     return withPWA(nextConfig);
//   }
//   return nextConfig;
// };

const nextConfig = {
  reactStrictMode: true,
};

const { default: createPWA } = require("@ducanh2912/next-pwa");

const withPWA = createPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(nextConfig);
