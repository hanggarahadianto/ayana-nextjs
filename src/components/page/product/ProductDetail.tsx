"use client";
import { Box, Button, Card, Center, Container, Divider, Flex, Grid, GridCol, SimpleGrid, Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBath, FaBed, FaLandmark } from "react-icons/fa";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { getDataProductDetail } from "@/api/products/getDataProductDetail";
import AdditionalInfoProduct from "./AdditionalInfo";
import ReservationForm from "../reservation/ReservationForm";
import AdditionalInfoMaps from "./AdditionalMaps";
import { getImages } from "@/api/products/getImagesProduct";
import { ProductImageGallery } from "./ImageGallery";

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

  const [lastMapUrl, setLastMapUrl] = useState<string | null>(null);

  const productDetailImage = useQuery({
    queryKey: ["getImagesByProductId", productDataDetail?.id],
    queryFn: () => getImages(productDataDetail?.id),
    enabled: !!productDataDetail?.id,
  });

  // console.log("gambar", productDetailImage.data?.thumbnail);
  const thumbnail = productDetailImage?.data?.thumbnail;

  useEffect(() => {
    if (productDataDetail?.maps && productDataDetail.maps !== lastMapUrl) {
      setLastMapUrl(productDataDetail.maps);
    }
  }, [productDataDetail]);

  console.log("product detail", productDataDetail);

  const galleryImages =
    productDetailImage.data?.images?.map((imageUrl: string) => ({
      original: imageUrl, // Gambar asli
      thumbnail: productDetailImage.data.thumbnail, // Gambar thumbnail
    })) || [];

  return (
    <SimpleGrid cols={1}>
      <Container
        style={{
          width: "100%", // Mengatur lebar container menjadi 100%
          maxWidth: "100%", // Pastikan lebar maksimal container juga 100%
          minHeight: "500px", // Menetapkan tinggi minimum
          padding: "0", // Menghilangkan padding default
        }}
      >
        <Stack
          align="center"
          style={{
            minHeight: "500px", // Minimum height untuk memastikan galeri terlihat jelas
            margin: "0 auto", // Agar konten terpusat
            padding: "20px", // Padding untuk ruang
          }}
        >
          <Box
            style={{
              width: "100%", // Menyesuaikan lebar kontainer 100%
              height: "100%", // Menyesuaikan tinggi Box dengan kontainer
              maxWidth: "100%", // Agar tidak ada batasan lebar lebih dari 100%
              margin: "0 auto", // Menjaga kontainer agar tetap terpusat
              padding: "0", // Menghilangkan padding default
            }}
          >
            <ProductImageGallery items={galleryImages} />
          </Box>
        </Stack>
      </Container>

      <Stack p={isMobile ? 20 : 20} px="10vw">
        <Grid>
          <Grid.Col span={12}>
            <Text
              fw={900}
              style={{
                fontFamily: "Lora",
                fontSize: isMobile ? "1.5rem" : "3.5rem",
              }}
            >
              {productDataDetail?.title}
            </Text>
          </Grid.Col>

          <Grid.Col span={12}>
            {productDataDetail?.status !== "sold" && (
              <Stack justify="flex-end" align={isMobile ? "start" : "flex-end"} mt={isMobile ? 10 : 0}>
                <Text fw={900} size={isMobile ? "md" : "2rem"} c="green" style={{ textAlign: isMobile ? "left" : "right" }}>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(productDataDetail?.price || 0)}
                </Text>
              </Stack>
            )}
          </Grid.Col>
        </Grid>

        <Flex justify="space-between" wrap="wrap">
          <Stack gap={4} align="start" mt={8} />
        </Flex>

        <Text size="xl" style={{ fontFamily: "Poppins" }} mt={20}>
          {productDataDetail?.content}
        </Text>

        <Divider mt={20} />
        {!isMobile && (
          <Grid align="start" justify="space-between" gutter={40}>
            {/* Kiri: Spesifikasi Unit */}
            <Grid.Col span={6}>
              <Stack gap="md">
                <Text mt={40} size="xl" fw={800} style={{ fontFamily: "Lora" }}>
                  Spesifikasi Unit
                </Text>

                <Grid mt={10} align="center">
                  <Grid.Col span={1}>
                    <Stack gap={15}>
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

                  <Grid.Col span={4}>
                    <Stack gap={15}>
                      <Text>{productDataDetail?.square ?? "-"}</Text>
                      <Text>{productDataDetail?.bedroom ?? "-"}</Text>
                      <Text>{productDataDetail?.bathroom ?? "-"}</Text>
                    </Stack>
                  </Grid.Col>
                </Grid>

                <AdditionalInfoProduct nearBy={productDataDetail?.near_bies || []} />
                <Divider mt={10} />
              </Stack>
            </Grid.Col>

            {/* Kanan: Form Reservasi */}
            <Grid.Col span={6}>
              <Stack mt={40}>
                <ReservationForm id={productId} start_price={productDataDetail?.start_price} />
              </Stack>
            </Grid.Col>

            {/* Maps */}
            {productDataDetail?.maps && (
              <Grid.Col span={12}>
                <AdditionalInfoMaps
                  productThumbnail={thumbnail ?? ""}
                  productName={productDataDetail?.title ?? ""}
                  mapsUrl={productDataDetail?.maps ?? ""}
                />
              </Grid.Col>
            )}
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
                <AdditionalInfoProduct nearBy={productDataDetail?.near_bies || []} />
              </Grid.Col>
            </Grid>
            <Divider mt={20} />
            <Stack mt={20}>
              <ReservationForm id={productId} start_price={productDataDetail?.start_price} />
            </Stack>
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
        p="xl"
        style={{
          background: "linear-gradient(135deg, #2D4872 0%, #1E3557 100%)",
          marginBottom: "80px",
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
