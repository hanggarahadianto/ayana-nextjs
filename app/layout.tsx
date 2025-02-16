"use client";
import "@mantine/core/styles.css";

import React, { ReactNode, useEffect, useState } from "react";
import { mantineHtmlProps, MantineProvider, ColorSchemeScript } from "@mantine/core";

import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";

import { Notifications } from "@mantine/notifications";

import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "@/theme";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme} defaultColorScheme="auto" withCssVariables>
            <ModalsProvider>
              <Notifications />
              {children}
            </ModalsProvider>
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
