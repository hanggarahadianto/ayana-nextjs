"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button, NextUIProvider } from "@nextui-org/react";
import ProductsPage from "./product/page";
import { Container, Paper, Text } from "@mantine/core";

const queryClient = new QueryClient();

function MyApp() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Container mt={30}></Container>
        <ProductsPage />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
