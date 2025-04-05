import "@mantine/core/styles.css";

import React, { ReactNode } from "react";
import { ColorSchemeScript } from "@mantine/core";

import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

import dayjs from "dayjs";
import "dayjs/locale/id";
import Providers from "./provider";

dayjs.locale("id");

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* ✅ Hapus {...mantineHtmlProps} */}
      <head>
        <ColorSchemeScript forceColorScheme="light" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </head>
      <body>
        <Providers children={children} />
      </body>
    </html>
  );
}
