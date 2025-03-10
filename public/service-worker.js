importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js");

if (workbox) {
  console.log("✅ Workbox berhasil dimuat!");

  workbox.setConfig({ debug: false });

  // Paksa update service worker tanpa perlu reload manual
  self.skipWaiting();
  workbox.core.clientsClaim();

  // 📌 Cache halaman utama ("/") dengan strategi NetworkFirst
  workbox.routing.registerRoute(
    ({ request }) => request.mode === "navigate",
    new workbox.strategies.NetworkFirst({
      cacheName: "start-url",
    })
  );

  // 📌 Cache CSS, JS, dan Worker dengan strategi StaleWhileRevalidate
  workbox.routing.registerRoute(
    ({ request }) => request.destination === "style" || request.destination === "script" || request.destination === "worker",
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "static-resources",
    })
  );

  // 📌 Cache gambar dengan strategi CacheFirst (mengurangi permintaan ke server)
  workbox.routing.registerRoute(
    ({ request }) => request.destination === "image",
    new workbox.strategies.CacheFirst({
      cacheName: "images",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50, // Maksimum 50 gambar
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        }),
      ],
    })
  );
} else {
  console.error("❌ Workbox gagal dimuat!");
}

// 📌 Cache CSS dengan strategi StaleWhileRevalidate
workbox.routing.registerRoute(
  ({ request }) => request.destination === "style",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "stylesheets",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 20, // Simpan maksimal 20 file CSS
        maxAgeSeconds: 7 * 24 * 60 * 60, // Simpan selama 7 hari
      }),
    ],
  })
);
