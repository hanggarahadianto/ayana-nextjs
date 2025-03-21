"use client";

import React, { ReactNode, useRef } from "react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "theme";

export default function Providers({ children }: { children: ReactNode }) {
  const queryClientRef = useRef(new QueryClient()); // ✅ Gunakan useRef agar tidak berubah setiap render

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <MantineProvider theme={theme} defaultColorScheme="auto" withCssVariables>
        <ModalsProvider>
          <Notifications />
          {children}
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
