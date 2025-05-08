"use client";
import { Box, Button, Card, Center, Container, Divider, Flex, Grid, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBath, FaBed, FaLandmark } from "react-icons/fa";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { getDataProductDetail } from "@/api/products/getDataProductDetail";
import MyGallery from "./ImageGallery";
import AdditionalInfoProduct from "./AdditionalInfo";
import ReservationForm from "../reservation/ReservationForm";
import AdditionalInfoMaps from "./AdditionalMaps";

interface ProductDetailProps {
  productId: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  if (!productId) return <p>Loading...</p>;

  const { data: productDataDetail } = useQuery({
    queryKey: ["getProductDetailData", productId],
    queryFn: () => getDataProductDetail(productId),
    enabled: !!productId,
    refetchOnWindowFocus: false,
  });

  // console.log(additionalInfo);

  return (
    <SimpleGrid mt={40} cols={1} px="10vw">
      <Stack align="center">
        <MyGallery />
      </Stack>

      <Stack p={isMobile ? 20 : 20} mt={12}>
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
                {/* <AdditionalInfoProduct maps={additionalInfo?.maps} nearBy={additionalInfo?.near_by || []} /> */}
                <Divider mt={20} />
              </Stack>
            </Grid.Col>
            {/* <Grid.Col span={6}>
              <Stack mt={20}>
                <ReservationForm id={productId} start_price={additionalInfo?.start_price} />
              </Stack>
            </Grid.Col>
            {additionalInfo?.maps && <AdditionalInfoMaps mapsUrl={additionalInfo.maps} />} */}
          </Grid>
        )}

        {isMobile && (
          <Stack p={{ base: 10, sm: 20 }}>
            <Text mt={{ base: 20, sm: 40 }} size="xl" fw={800} style={{ fontFamily: "Lora" }}>
              Spesifikasi Unit
            </Text>
            <Grid mt={20} align="center">
              <Grid.Col span={4}>
                <Stack align="center">
                  <FaLandmark size={22} />
                  <FaBed size={22} />
                  <FaBath size={22} />
                </Stack>
              </Grid.Col>
              <Grid.Col span={4}>
                <Stack>
                  <Text size="lg">Land Area</Text>
                  <Text size="lg">Bedroom</Text>
                  <Text size="lg">Bathroom</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={4}>
                <Stack>
                  <Text>{productDataDetail?.square}</Text>
                  <Text>{productDataDetail?.bedroom}</Text>
                  <Text>{productDataDetail?.bathroom}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={12}>
                {/* <AdditionalInfoProduct maps={additionalInfo?.maps} nearBy={additionalInfo?.near_by || []} /> */}
              </Grid.Col>
            </Grid>
            <Divider mt={20} />
            <Stack mt={20}>{/* <ReservationForm id={productId} start_price={additionalInfo?.start_price} /> */}</Stack>
          </Stack>
        )}

        <Link href="/banking-partners" passHref>
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
      <Card
        shadow="md"
        radius="xl"
        p="xl"
        style={{
          background: "linear-gradient(135deg, #2D4872 0%, #1E3557 100%)",
          marginBottom: "80px",
          borderRadius: "20px",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Patterns */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "5%",
            width: "300px",
            height: "300px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            right: "-10%",
            width: "250px",
            height: "250px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            filter: "blur(90px)",
          }}
        />

        {/* Content */}
        <Stack gap="sm">
          <Text size="lg" fw={600}>
            Let's connect!
          </Text>
          <Text size="xl" fw={800} style={{ fontSize: "28px" }}>
            Siap Miliki Rumah Idaman?
          </Text>
          <Text size="md" style={{ opacity: 0.8 }}>
            Dapatkan informasi lengkap dan penawaran menarik seputar hunian idaman yang Anda inginkan.
          </Text>

          <Center mt="md">
            <Button radius="md" size="md" variant="white" color="dark">
              Hubungi Kami
            </Button>
          </Center>
        </Stack>
      </Card>
    </SimpleGrid>
  );
};

export default ProductDetail;
