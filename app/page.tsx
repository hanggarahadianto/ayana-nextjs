import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import "../styles/globals.css";

const queryClient = new QueryClient();

import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
