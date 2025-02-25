"use client";
import { Box, Button, Center, Container, Divider, Flex, Grid, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBath, FaBed, FaLandmark } from "react-icons/fa";
import { useMediaQuery } from "@mantine/hooks";
import { useParams } from "next/navigation";
import Link from "next/link";

import { getDataProductDetail } from "@/src/api/products/getDataProductDetail";
import { getDataAdditionalInfo } from "@/src/api/additional-info/getDataAdditionalInfo";

import MyGallery from "@/src/components/product/image-galery";
import ReservationForm from "@/src/components/reservation/ReservationForm";
import AdditionalInfoProduct from "@/src/components/product/additional-info-product";
import AdditionalInfoMaps from "@/src/components/product/maps";

const ProductDetailComponent = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { productId } = useParams() as { productId: string };

  const { data: productDataDetail } = useQuery({
    queryKey: ["getProductDetailData", productId],
    queryFn: () => (productId ? getDataProductDetail(productId) : Promise.reject("No product ID")),
    enabled: !!productId,
    refetchOnWindowFocus: false,
  });

  const { data: additionalInfo } = useQuery({
    queryKey: ["getAdditionalInfoData"],
    queryFn: () => getDataAdditionalInfo(productId),
    refetchOnWindowFocus: false,
  });

  return (
    <SimpleGrid pt={80} pr={80} pl={80} pb={40}>
      <Stack>
        <MyGallery />
      </Stack>

      <Stack p={isMobile ? 20 : 80} mt={12}>
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
            <AdditionalInfoMaps maps={additionalInfo?.maps} />
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
              <AdditionalInfoProduct maps={additionalInfo?.maps} nearBy={additionalInfo?.near_by || []} />
              <AdditionalInfoMaps maps={additionalInfo?.maps} />
            </Grid>
            <Divider mt={20} />

            <Stack mt={20}>
              <ReservationForm id={productId} start_price={additionalInfo?.start_price} />
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
    </SimpleGrid>
  );
};

export default ProductDetailComponent;
