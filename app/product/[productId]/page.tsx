"use client";

import {
  Button,
  Center,
  Container,
  Flex,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { FC, use } from "react";

import { getDataProductDetail } from "@/src/api/products/getDataProductDetail";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Box, Grid } from "@mantine/core";
import { FaBath, FaBed, FaLandmark } from "react-icons/fa";
import ReservationForm from "@/src/components/reservation/ReservationForm";
import Footer from "@/app/landing/footer";
import { useSearchParams } from "next/navigation";

interface ProductProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductDetailPage: FC<ProductProps> = ({ params }) => {
  const unwrappedParams = use(params);
  const productId = unwrappedParams.productId;
  console.log(productId);

  const {
    data: productDataDetail,
    isLoading: isLoadingGetProductData,
    refetch: refetchProductData,
  } = useQuery({
    queryKey: ["getProducDetailtData"],
    queryFn: () => getDataProductDetail(productId),
    // queryFn: () => getDataProductDetail(unwrappedParams.id),
    // enabled: !!token,
    refetchOnWindowFocus: false,
  });

  console.log("product detail", productDataDetail);

  return (
    <SimpleGrid>
      <Stack
        bg="#beab96"
        p="md"
        style={{ position: "sticky", top: 0, zIndex: 1000 }}
      >
        <Flex justify="space-between" align="center">
          <Image
            className="rounded-tl-3xl"
            src="/images/ayana.png"
            height={60}
            width={60}
            alt=""
            style={{ borderRadius: "15px" }}
          />
        </Flex>
      </Stack>
      <Container fluid h="160vh" p={120}>
        <Grid gutter="md">
          <Grid.Col span={6}>
            <Image
              height={400}
              src={productDataDetail?.image}
              style={{ borderRadius: "15px" }}
              alt="Large Preview"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Image
              height={400}
              src={productDataDetail?.image}
              style={{ borderRadius: "15px" }}
              alt="Large Preview"
            />
          </Grid.Col>
        </Grid>

        <Grid gutter="md">
          <Grid.Col span={7} mr={80}>
            <Text
              w={900}
              style={{ fontFamily: "Lora", fontSize: "4rem" }}
              mt={20}
            >
              {productDataDetail?.title}
            </Text>
            <Flex>
              <Group gap={4} align="start" mt={20}>
                <Text size="xl" fw={800}>
                  {productDataDetail?.address}
                </Text>
              </Group>

              {productDataDetail?.status !== "sold" && (
                <Text ml={40} mt={24} c={"green"}>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(productDataDetail?.price || 0)}
                </Text>
              )}
            </Flex>

            <Text style={{ fontFamily: "Poppins" }} mt={20}>
              {productDataDetail?.content}
            </Text>

            <Stack>
              <Text mt={40} size="xl" fw={800} style={{ fontFamily: "Lora" }}>
                Spesifikasi Unit
              </Text>
              <Grid>
                <Grid.Col span={1}>
                  <Stack>
                    <FaLandmark size={22}></FaLandmark>
                    <FaBed size={22}></FaBed>
                    <FaBath size={22}></FaBath>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Stack gap={12} mt={-5}>
                    <Text size="lg">Land Area</Text>
                    <Text size="lg">Bedroom</Text>
                    <Text size="lg">Bathroom</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Stack gap={12} mb={2}>
                    <Text>{productDataDetail?.square}</Text>
                    <Text mt={2}>{productDataDetail?.bedroom}</Text>
                    <Text mt={2}>{productDataDetail?.bathroom}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Grid.Col>
          <Grid.Col span={4}>
            <ReservationForm id={productId} />
          </Grid.Col>
        </Grid>
      </Container>
      <Box
        style={{
          backgroundColor: "#1C7ED6", // Mantine blue[7]
          padding: "40px 0",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container size="lg" mt={0}>
          <Center>
            <div style={{ textAlign: "center", color: "white" }}>
              <Text size="lg" style={{ marginBottom: "10px" }}>
                Let&apos;s connect!
              </Text>
              <Title order={2} style={{ marginBottom: "20px" }}>
                Siap Miliki Rumah Impian Anda?
              </Title>
              <Text size="sm" style={{ marginBottom: "30px" }}>
                Dapatkan informasi lengkap dan penawaran menarik seputar hunian
                idaman yang Anda inginkan.
              </Text>
              <Button variant="white" size="md">
                Hubungi Kami
              </Button>
            </div>
          </Center>
        </Container>
      </Box>
      <Footer />
    </SimpleGrid>
  );
};

const queryClient = new QueryClient();
interface ProductDetailWrapperProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductDetailWrapper: FC<ProductDetailWrapperProps> = ({ params }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductDetailPage params={params} />
    </QueryClientProvider>
  );
};

export default ProductDetailWrapper;
