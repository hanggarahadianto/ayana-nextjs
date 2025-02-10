"use client";

import {
  Button,
  Center,
  Container,
  Divider,
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
import { useQuery } from "@tanstack/react-query";
import { Box, Grid } from "@mantine/core";
import { FaBath, FaBed, FaLandmark } from "react-icons/fa";
import ReservationForm from "@/src/components/reservation/ReservationForm";
import Footer from "@/src/components/landing/footer";
import Navbar from "@/src/components/landing/navbar";
import AdditionalInfoProduct from "@/src/components/product/additional-info-product";
import { getDataAdditionalInfo } from "@/src/api/additional-info/getDataAdditionalInfo";
import Link from "next/link";

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

    // enabled: !!token,
    refetchOnWindowFocus: false,
  });

  const {
    data: additionalInfo,
    isLoading: isLoadingGetAdditionalInfoData,
    refetch: refetchAdditionalInfoData,
  } = useQuery({
    queryKey: ["getAdditionalInfoData"],
    queryFn: () => getDataAdditionalInfo(productId),

    // enabled: !!token,
    refetchOnWindowFocus: false,
  });

  return (
    <SimpleGrid>
      <Navbar />
      <Grid bg={"#fafafa"} w={"full"} p={90}>
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
      <Stack p={120} mt={-150}>
        <Grid gutter="md">
          <Grid.Col span={7}>
            <Text
              w={900}
              style={{ fontFamily: "Lora", fontSize: "3.5rem" }}
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
                <>
                  <Text ml={40} mt={24} c={"green"}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(productDataDetail?.price || 0)}
                  </Text>
                </>
              )}
            </Flex>

            <Text style={{ fontFamily: "Poppins" }} mt={20}>
              {productDataDetail?.content}
            </Text>

            <Divider mt={20} />

            <Stack>
              <Text mt={40} size="xl" fw={800} style={{ fontFamily: "Lora" }}>
                Spesifikasi Unit
              </Text>
              <Grid>
                <Grid.Col span={1} ml={12}>
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
                <Grid.Col span={2}>
                  <Stack gap={12} mb={2}>
                    <Text>{productDataDetail?.square}</Text>
                    <Text mt={2}>{productDataDetail?.bedroom}</Text>
                    <Text mt={2}>{productDataDetail?.bathroom}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
              <Divider mt={20} />
            </Stack>
          </Grid.Col>

          <Grid.Col span={4}>
            <ReservationForm
              id={productId}
              start_price={additionalInfo?.start_price}
            />
          </Grid.Col>
        </Grid>

        <AdditionalInfoProduct
          maps={additionalInfo?.maps}
          nearBy={additionalInfo?.nearBy || []}
        />
        <Link
          href="/banking-partners"
          passHref
          style={{ textDecoration: "none" }}
        >
          <Button bg={"orange"} mt={40} h={40}>
            <Text
              fw={900}
              style={{ fontFamily: "GalanoGrotesque", fontSize: "1.25rem" }}
              variant="gradient"
              gradient={{ from: "white", to: "white", deg: 90 }}
            >
              Temukan Bank Partners
            </Text>
          </Button>
        </Link>
      </Stack>

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

export default ProductDetailPage;
