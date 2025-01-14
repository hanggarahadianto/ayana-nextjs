"use client";

import { MantineProvider } from "@mantine/core";
import { ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "@/theme";

const queryClient = new QueryClient(); // Create a QueryClient instance directly

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider>
          <QueryClientProvider client={queryClient}>
            <Notifications position="bottom-right" zIndex={1000} />
            {children}
          </QueryClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
