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
        <Container mt={30}>
          <Paper p={40}>
            <Text
              mt={5}
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: "teal", to: "cyan", deg: 90 }}
            >
              Gradient Text
            </Text>
            <Button color="primary">Button</Button>
          </Paper>
        </Container>
        <ProductsPage />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
