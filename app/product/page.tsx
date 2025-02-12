"use client";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@mantine/hooks";
import { Card, SimpleGrid, Stack, Text, Image, Flex, Group, Badge } from "@mantine/core";

import { getDataProduct } from "@/src/api/products/getDataProduct";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";

const ProductsPage = () => {
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
    return (
      <Carousel.Slide key={home.id}>
        <Card
          shadow="sm"
          padding={isMobile ? "md" : "lg"}
          radius="md"
          withBorder
          style={{ height: isMobile ? 400 : 500 }} // Ensure consistent card height
        >
          <Link href={`/product/${home.id}`} passHref>
            <Card.Section>
              <Image src={home.image} alt={home.title} height={isMobile ? 180 : 280} fit="cover" />
            </Card.Section>
          </Link>

          {/* Address & Price */}
          <Flex justify="space-between" mt={30}>
            <Group gap={4} align="start">
              <Text size={isMobile ? "sm" : "md"}>{home.address}</Text>
            </Group>

            {home.status !== "sold" &&
              (isMobile ? (
                <Stack align="end" gap={0}>
                  <Text fw={600} size="sm">
                    Start from
                  </Text>
                  <Text size="sm" c="green">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(home.price)}
                  </Text>
                </Stack>
              ) : (
                <Flex>
                  <Text mr={8} fw={600} size="md">
                    Start from
                  </Text>
                  <Text size="lg" c="green">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(home.price)}
                  </Text>
                </Flex>
              ))}
          </Flex>

          {/* Title & Status Badge */}

          {!isMobile && (
            <Flex justify="space-between" align="center" mt={12}>
              <Text w="100%" size="md" fw={700}>
                {home.title}
              </Text>
              <Badge mr={12} w={60} color={home.status === "sale" ? "green" : "pink"}>
                {home.status === "sale" ? "On Sale" : "Sold"}
              </Badge>
            </Flex>
          )}

          {/* Content */}
          <Text size={isMobile ? "xs" : "sm"} c="dimmed" mt={8}>
            {home.content}
          </Text>

          {/* Availability and Status (Mobile Alignment Fix) */}
          <Flex justify="space-between" align="center" mt={16} w="100%">
            <Badge w={isMobile ? 60 : 80} color={home.status === "sale" ? "green" : "pink"}>
              {home.status === "sale" ? "On Sale" : "Sold"}
            </Badge>
            <Text fw={900} size={isMobile ? "md" : "lg"} c="dimmed">
              {home.quantity > 0 ? `Tersedia ${home.quantity} unit` : "Terjual Habis"}
            </Text>
          </Flex>
        </Card>
      </Carousel.Slide>
    );
  });

  return (
    <SimpleGrid cols={1} bg={"#a48060"} h={"100vh"}>
      {/* Header */}
      <Stack align="center" justify="center">
        <Text
          size={isMobile ? "xl" : "5xl"}
          fw={900}
          c={"white"}
          style={{
            fontFamily: "Lora",
            textAlign: "center",
          }}
        >
          AYANA HOUSES
        </Text>
      </Stack>

      <Stack align="center" justify="center">
        <Text
          mt={-40}
          fw={900}
          style={{
            fontFamily: "Lora",
            color: "#e7a17a",
            fontSize: isMobile ? "2rem" : "3rem",
            textAlign: "center",
          }}
        >
          ON SALE PROJECT
        </Text>
      </Stack>

      {/* Responsive Carousel */}
      <Carousel
        p={isMobile ? 12 : 60}
        withIndicators
        slideSize={isMobile ? "50%" : isTablet ? "33.33%" : "33.33%"}
        slideGap={isMobile ? "sm" : "md"}
        loop
        height={isMobile ? 420 : 600}
        align="start"
      >
        {cards}
      </Carousel>
    </SimpleGrid>
  );
};

export default ProductsPage;
