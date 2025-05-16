"use client";
import { Box, Button, Card, Center, Container, Divider, Flex, Grid, SimpleGrid, Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBath, FaBed, FaLandmark } from "react-icons/fa";
import { useMediaQuery } from "@mantine/hooks";
import { getDataProductDetail } from "@/api/products/getDataProductDetail";
import { getImages } from "@/api/products/getImagesProduct";
import { ProductImageGallery } from "./ImageGallery";
import AdditionalInfoProduct from "./AdditionalInfo";
import ReservationForm from "../reservation/ReservationForm";
import AdditionalInfoMaps from "./AdditionalMaps";
import Link from "next/link";
import LoadingGlobal from "@/styles/loading/loading-global";

interface ProductDetailProps {
  productId: string;
}
interface GalleryImage {
  original: string;
  thumbnail: string;
}
const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [lastMapUrl, setLastMapUrl] = useState<string | null>(null);

  const { data: productDataDetail, isLoading: isProductLoading } = useQuery({
    queryKey: ["getProductDetailData", productId],
    queryFn: () => getDataProductDetail(productId!),
    enabled: !!productId,
    refetchOnWindowFocus: false,
  });

  const { data: productDetailImage, isLoading: isLoadingProductDetailImage } = useQuery({
    queryKey: ["getImagesByProductId", productDataDetail?.id],
    queryFn: () => getImages(productDataDetail?.id),
    enabled: !!productDataDetail?.id,
  });

  // console.log("isloading image", isLoadingProductDetailImage);

  useEffect(() => {
    if (productDataDetail?.maps && productDataDetail.maps !== lastMapUrl) {
      setLastMapUrl(productDataDetail.maps);
    }
  }, [productDataDetail?.maps, lastMapUrl]);

  if (!productId || isProductLoading) return <LoadingGlobal visible={true} />;

  const thumbnail = productDetailImage?.thumbnail || "";

  const galleryImages: GalleryImage[] =
    productDetailImage?.images?.map((img) => ({
      original: img.url,
      thumbnail: img.url, // Gunakan gambar itu sendiri sebagai thumbnail
    })) || [];

  return (
    <SimpleGrid cols={1} style={{ cursor: "default" }}>
      <LoadingGlobal visible={isLoadingProductDetailImage} />
      <Container
        style={{
          width: "100%",
          maxWidth: "100%",
          minHeight: "500px",
          padding: "0",
          cursor: "default", // Juga di container
        }}
      >
        <Stack
          align="center"
          style={{
            minHeight: "500px",
            margin: "0 auto",
            padding: "20px",
            cursor: "default",
          }}
        >
          <Box
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              margin: "0 auto",
              padding: "0",
              cursor: "default",
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
            {/* {productDataDetail?.status !== "sold" && ( */}
            <Stack justify="flex-end" align={isMobile ? "start" : "flex-end"} mt={isMobile ? 10 : 0}>
              <Text fw={900} size={isMobile ? "md" : "2rem"} c="green" style={{ textAlign: isMobile ? "left" : "right" }}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(productDataDetail?.price || 0)}
              </Text>
            </Stack>
            {/* )} */}
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

                  <Grid.Col span={2}>
                    <Stack gap={15}></Stack>
                  </Grid.Col>
                </Grid>

                <AdditionalInfoProduct nearBy={productDataDetail?.near_bies || []} location={productDataDetail?.location} />
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
