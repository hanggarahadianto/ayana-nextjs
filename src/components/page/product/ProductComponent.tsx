"use client";

import { useQuery, useQueries } from "@tanstack/react-query";
import { useMediaQuery } from "@mantine/hooks";
import { Badge, Card, Flex, Image, SimpleGrid, Stack, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import { generateSlug } from "@/utils/slug";
import { getDataProduct } from "@/api/products/getDataProduct";
import { getImages } from "@/api/products/getImagesProduct";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/helper/formatCurrency";

const ProductComponent = () => {
  // Responsive breakpoints
  const isMobile = useMediaQuery("(max-width: 768px)") ?? false;
  const isTablet = useMediaQuery("(max-width: 1024px)") ?? false;
  const isTabletOrMobile = isMobile || isTablet;

  const status = "available";

  // Product data fetch
  const page = 1;
  const limit = 10;
  const { data: productData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["getProductData", page, limit],
    queryFn: () => getDataProduct({ status, page, limit }),
    refetchOnWindowFocus: false,
  });

  const products = productData?.data || [];

  // Fetch thumbnails for products
  const imageQueries = useQueries({
    queries: products.map((product) => ({
      queryKey: ["getImagesByProductId", product.id],
      queryFn: () => getImages(product.id),
      enabled: !!product.id,
    })),
  });

  // console.log("imageq", imageQueries);

  const productsWithThumbnails = products.map((product, i) => ({
    ...product,
    thumbnail: imageQueries[i]?.data?.thumbnail ?? "/placeholder.jpg",
  }));

  // Responsive values
  const responsive = {
    padding: isMobile ? 40 : isTablet ? 80 : 100,
    slideSize: isMobile ? "60%" : isTablet ? "50%" : "33.33%",
    slideGap: isMobile ? "xs" : isTablet ? "sm" : "md",
    imageHeight: isMobile ? 110 : isTablet ? 180 : 300,
    carouselHeight: isMobile ? 350 : isTablet ? 500 : 650,
    titleSize: isMobile ? "2rem" : "4rem",
    cardMinHeight: isMobile ? 300 : 480,
  };

  return (
    <SimpleGrid>
      <LoadingGlobal visible={isLoadingProducts} />

      {/* Title */}
      <Stack align="center" justify="center" mt="60px">
        <Text size={responsive.titleSize} fw={900} c="#e7a17a" ta="center" style={{ fontFamily: "Lora" }}>
          AYANA HOUSES
        </Text>
        <Text size={responsive.titleSize} fw={900} c="#e7a17a" ta="center" mt="2px" style={{ fontFamily: "Lora" }}>
          ON SALE PROJECT
        </Text>
      </Stack>

      {/* Product Carousel */}
      <Carousel
        px={responsive.padding}
        mb={isTablet ? "120px" : "100px"}
        withIndicators
        withControls={!isTabletOrMobile}
        slideSize={responsive.slideSize}
        slideGap={responsive.slideGap}
        loop
        height={responsive.carouselHeight}
        align="start"
        controlSize={40}
        styles={{
          control: {
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            borderRadius: 999,
            width: 40,
            height: 40,
            transform: "translateY(-50%)",
          },
          controls: {
            top: isMobile ? "null" : "50%",
            left: 0,
            right: 0,
            justifyContent: "space-between",
            transform: "translateY(-50%)",
            position: "absolute",
            padding: "0 16px",
            pointerEvents: "none",
          },
        }}
      >
        {productsWithThumbnails.map((product) => {
          // console.log("PRODUL", product);
          return (
            <Carousel.Slide key={product.id} mt={isMobile ? "40px" : "120px"}>
              <Link
                href={{
                  pathname: `/product/${generateSlug(product.title)}`,
                  query: { id: product.id },
                }}
                passHref
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Card
                  shadow="sm"
                  padding={isMobile ? "md" : "lg"}
                  radius="md"
                  withBorder
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: isMobile ? 12 : 16,
                  }}
                >
                  <Card.Section>
                    <Image src={product.thumbnail} alt={product.title} height={responsive.imageHeight} fit="cover" radius="sm" />
                  </Card.Section>

                  <Stack gap={isMobile ? 4 : 8} mt="sm">
                    <Text size={isMobile ? "md" : "lg"} fw={700}>
                      {product.title}
                    </Text>

                    <Text size={isMobile ? "xs" : "sm"} c="dimmed" lineClamp={2}>
                      {product.content}
                    </Text>
                  </Stack>

                  <Flex justify="space-between" align="center" mt="sm">
                    <Badge color={product.status === "available" ? "green" : "pink"}>
                      {product.status === "available" ? "Tersedia" : "Terjual"}
                    </Badge>

                    <Text fw={700} size={isMobile ? "xs" : "sm"} c="dimmed">
                      {product.quantity > 0 ? `Tersedia ${product.quantity} unit` : "Terjual Habis"}
                    </Text>
                  </Flex>

                  <Flex justify="flex-end" mt="xs">
                    <Flex gap={6}>
                      <Text fw={500} size={isMobile ? "xs" : "sm"} mt={"2.7px"}>
                        Mulai dari
                      </Text>
                      <Text fw={800} size={isMobile ? "sm" : "md"} c="green">
                        {formatCurrency(product?.start_price)}
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              </Link>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </SimpleGrid>
  );
};

export default ProductComponent;
