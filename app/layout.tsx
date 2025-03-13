"use client";
import "@mantine/core/styles.css";

import React, { ReactNode, useEffect, useState } from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import dayjs from "dayjs";
import "dayjs/locale/id";
import { DefaultSeo } from "next-seo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "theme";

dayjs.locale("id");

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  console.log("Children in RootLayout:", children); // ✅ Debugging

  return (
    <html lang="en">
      {/* ✅ Hapus {...mantineHtmlProps} */}
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </head>
      <body>
        {typeof window !== "undefined" && ( // ✅ Pastikan DefaultSeo hanya dirender di client-side
          <DefaultSeo
            title="Perumahan Purbalingga - Ayana Group 99"
            description="Cari perumahan terbaik di Purbalingga? Ayana Group 99 menawarkan hunian nyaman dan strategis dengan harga terbaik."
            canonical="https://ayanagroup99.com"
            openGraph={{
              type: "website",
              locale: "id_ID",
              url: "https://ayanagroup99.com",
              siteName: "Ayana Group 99",
              title: "Perumahan Purbalingga - Ayana Group 99",
              description: "Cari perumahan terbaik di Purbalingga? Kami menawarkan berbagai pilihan rumah dengan fasilitas terbaik.",
              images: [
                {
                  url: "https://ayanagroup99.com/images/thumbnail.jpg",
                  alt: "Perumahan Purbalingga",
                },
              ],
            }}
          />
        )}
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme} defaultColorScheme="auto" withCssVariables>
            <ModalsProvider>
              <Notifications />
              {children} {/* ✅ Pastikan ini tidak berupa object */}
            </ModalsProvider>
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
