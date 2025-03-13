"use client";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@mantine/hooks";
import { Card, SimpleGrid, Stack, Text, Image, Flex, Group, Badge } from "@mantine/core";

import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import { getDataProduct } from "@/api/products/getDataProduct";

const ProductPage = () => {
  // Media Queries for responsive adjustments
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Fetch products data
  const {
    data: productData,
    isLoading: isLoadingGetProductData,
    refetch: refetchProductData,
  } = useQuery({
    queryKey: ["getProductData"],
    queryFn: () => getDataProduct(),
    refetchOnWindowFocus: false,
  });

  const products = productData;

  const cards = products?.data.map((home: IProduct) => {
    console.log("ID", home?.id);
    const formattedPrice = isMobile
      ? `${(home?.price / 1_000_000).toFixed(0)} Juta`
      : new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(home?.price);
    return (
      <Carousel.Slide key={home.id}>
        <Link href={{ pathname: `/product/${home.id}` }} passHref style={{ textDecoration: "none", cursor: "pointer" }}>
          <Card
            shadow="sm"
            padding={isMobile ? "40px" : "40px"}
            radius="md"
            withBorder
            style={{ height: isMobile ? 400 : 540, cursor: "pointer" }}
          >
            <Card.Section>
              <Image src={home.image} alt={home.title} height={isMobile ? 180 : 280} fit="cover" />
            </Card.Section>

            <Group justify="space-between" mt={30}>
              <Group gap={4} align="start">
                <Text size={isMobile ? "sm" : "md"}>{home.address}</Text>
              </Group>
              <Flex>
                {!isMobile && (
                  <Stack align="end" gap={0}>
                    <Text fw={900} size="">
                      Start from
                    </Text>
                    <Text size="xl" fw={900} c="green">
                      {formattedPrice}
                    </Text>
                  </Stack>
                )}
              </Flex>
            </Group>

            {!isMobile && (
              <Flex justify="space-between" align="center" mt={12}>
                <Text w="100%" size="md" fw={700}>
                  {home.title}
                </Text>
              </Flex>
            )}

            <Text size={isMobile ? "xs" : "sm"} c="dimmed" mt={8}>
              {home.content}
            </Text>

            {isMobile && (
              <Stack align="flex-end" mt={12}>
                <Flex gap={8}>
                  <Text fw={600} size={isMobile ? "xs" : "lg"} mt={2}>
                    Start from
                  </Text>
                  <Text fw={800} size="sm" c="green">
                    {formattedPrice}
                  </Text>
                </Flex>
              </Stack>
            )}

            <Flex justify="space-between" align="center" mt={16} w="100%">
              <Badge w={isMobile ? 70 : 80} color={home.status === "sale" ? "green" : "pink"}>
                {home.status === "sale" ? "On Sale" : "Sold"}
              </Badge>
              <Text fw={900} size={isMobile ? "xs" : "lg"} c="dimmed">
                {home.quantity > 0 ? `Tersedia ${home.quantity} unit` : "Terjual Habis"}
              </Text>
            </Flex>
          </Card>
        </Link>
      </Carousel.Slide>
    );
  });
  const getFontSize = (mobileSize: string, tabletSize: string, desktopSize: string) => {
    return isMobile ? mobileSize : isTablet ? tabletSize : desktopSize;
  };
  return (
    <SimpleGrid cols={1} bg="#a48060" h="100vh" p={isMobile ? 12 : isTablet ? 24 : 60}>
      <Stack align="center" justify="center" gap={0} px={getFontSize("1rem", "2rem", "3rem")}>
        <Text size={getFontSize("2rem", "3rem", "3.5rem")} fw={900} c="white" style={{ fontFamily: "Lora", textAlign: "center" }}>
          AYANA HOUSES
        </Text>
        <Text
          size={getFontSize("1.8rem", "2.5rem", "3.5rem")}
          fw={900}
          style={{ fontFamily: "Lora", color: "#e7a17a", textAlign: "center" }}
        >
          ON SALE PROJECT
        </Text>
      </Stack>

      <Carousel
        p={isMobile ? 20 : isTablet ? 60 : 80}
        withIndicators
        slideSize={isMobile ? "60%" : isTablet ? "50%" : "33.33%"}
        slideGap={isMobile ? "xs" : isTablet ? "sm" : "md"}
        loop
        height={isMobile ? 350 : isTablet ? 600 : 800}
        align="start"
      >
        {cards}
      </Carousel>
    </SimpleGrid>
  );
};

export default ProductPage;
