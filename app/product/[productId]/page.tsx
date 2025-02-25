"use client";
import { Box, Button, Center, Container, Divider, Flex, Grid, Group, Image, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import React, { FC, use } from "react";
import { getDataProductDetail } from "@/src/api/products/getDataProductDetail";
import { useQuery } from "@tanstack/react-query";
import { FaBath, FaBed, FaLandmark } from "react-icons/fa";
import ReservationForm from "@/src/components/reservation/ReservationForm";
import Footer from "@/src/components/landing/footer";
import Navbar from "@/src/components/landing/navbar";
import FloatingWhatsApp from "@/src/components/product/floating-whatsapp";
import { getDataAdditionalInfo } from "@/src/api/additional-info/getDataAdditionalInfo";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { useParams } from "next/navigation";
import AdditionalInfoProduct from "@/src/components/product/additional-info-product";
import AdditionalInfoMaps from "@/src/components/product/maps";
import MyGallery from "@/src/components/product/image-galery";

const ProductDetailPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { productId } = useParams() as { productId: string };

  const { data: productDataDetail } = useQuery({
    queryKey: ["getProductDetailData", productId],
    queryFn: () => (productId ? getDataProductDetail(productId) : Promise.reject("No product ID")),
    enabled: !!productId, // Only fetch if productId exists
    refetchOnWindowFocus: false,
  });

  const { data: additionalInfo } = useQuery({
    queryKey: ["getAdditionalInfoData"],
    queryFn: () => getDataAdditionalInfo(productId),
    refetchOnWindowFocus: false,
  });

  // Register Service Worker inline

  console.log(additionalInfo);

  return (
    <>
      <Navbar />
      <SimpleGrid pt={80} pr={80} pl={80} pb={40}>
        {/* <FloatingWhatsApp /> */}
        <Stack>
          <MyGallery />
        </Stack>

        <Stack p={isMobile ? 20 : 80} mt={isMobile ? 12 : 12}>
          <Text fw={900} style={{ fontFamily: "Lora", fontSize: isMobile ? "1.5rem" : "3.5rem" }}>
            {productDataDetail?.title}
          </Text>

          <Flex justify={"space-between"}>
            <Stack gap={4} align="start" mt={8}>
              <Text size={isMobile ? "sm" : "1.5rem"} fw={isMobile ? 500 : 12}>
                {productDataDetail?.address}
              </Text>
            </Stack>

            {productDataDetail?.status !== "sold" && (
              <Stack>
                <Text fw={900} size={isMobile ? "md" : "2rem"} c={"green"}>
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(productDataDetail?.price || 0)}
                </Text>
              </Stack>
            )}
          </Flex>

          <Text style={{ fontFamily: "Poppins" }} mt={20}>
            {productDataDetail?.content}
          </Text>

          <Divider mt={20} />

          {!isMobile && (
            <Grid>
              <Grid.Col span={6}>
                <Stack>
                  <Text mt={40} size="xl" fw={800} style={{ fontFamily: "Lora" }}>
                    Spesifikasi Unit
                  </Text>
                  <Grid mt={20}>
                    <Grid.Col span={1}>
                      <Stack>
                        <FaLandmark size={22} />
                        <FaBed size={22} />
                        <FaBath size={22} />
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Stack>
                        <Text size="lg">Land Area</Text>
                        <Text size="lg">Bedroom</Text>
                        <Text size="lg">Bathroom</Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Stack>
                        <Text>{productDataDetail?.square}</Text>
                        <Text>{productDataDetail?.bedroom}</Text>
                        <Text>{productDataDetail?.bathroom}</Text>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                  <AdditionalInfoProduct maps={additionalInfo?.maps} nearBy={additionalInfo?.near_by || []} />
                  <Divider mt={20} />
                </Stack>
              </Grid.Col>
              <Grid.Col span={6}>
                <Stack mt={20}>
                  <ReservationForm id={productId} start_price={additionalInfo?.start_price} />
                </Stack>
              </Grid.Col>
              {/* <Stack mt={20}> */}
              <AdditionalInfoMaps maps={additionalInfo?.maps} />
              {/* </Stack> */}
            </Grid>
          )}

          {isMobile && (
            <Stack p={20}>
              <Text mt={40} size="xl" fw={800} style={{ fontFamily: "Lora" }}>
                Spesifikasi Unit
              </Text>
              <Grid mt={20}>
                <Grid.Col span={1}>
                  <Stack>
                    <FaLandmark size={22} />
                    <FaBed size={22} />
                    <FaBath size={22} />
                  </Stack>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Stack>
                    <Text size="lg">Land Area</Text>
                    <Text size="lg">Bedroom</Text>
                    <Text size="lg">Bathroom</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Stack>
                    <Text>{productDataDetail?.square}</Text>
                    <Text>{productDataDetail?.bedroom}</Text>
                    <Text>{productDataDetail?.bathroom}</Text>
                  </Stack>
                </Grid.Col>
                <Stack m={4}>
                  <AdditionalInfoProduct maps={additionalInfo?.maps} nearBy={additionalInfo?.near_by || []} />
                </Stack>
                <AdditionalInfoMaps maps={additionalInfo?.maps} />
              </Grid>
              <Divider mt={20} />

              <Stack mt={20}>
                <ReservationForm id={productId} start_price={additionalInfo?.start_price} />
              </Stack>
            </Stack>
          )}

          <Link href="/banking-partners" passHref style={{ textDecoration: "none" }}>
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
                  Dapatkan informasi lengkap dan penawaran menarik seputar hunian idaman yang Anda inginkan.
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
    </>
  );
};

export default ProductDetailPage;
