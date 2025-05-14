"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@mantine/hooks";
import { Card, Stack, Text, Image, Flex, Badge, SimpleGrid } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import { generateSlug } from "@/utils/slug";
import { getDataProduct } from "@/api/products/getDataProduct";
import { getImages } from "@/api/products/getImagesProduct";
import LoadingGlobal from "@/styles/loading/loading-global";

const ProductComponent = () => {
  const isMobile = useMediaQuery("(max-width: 768px)") ?? false;
  const isTablet = useMediaQuery("(max-width: 1024px)") ?? false;

  const page = 1;
  const limit = 10;

  const { data: productData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["getProductData", page, limit],
    queryFn: () => getDataProduct({ page, limit }),
    refetchOnWindowFocus: false,
  });

  const products = productData?.data || [];

  const imageQueries = useQueries({
    queries: products.map((product) => ({
      queryKey: ["getImagesByProductId", product.id],
      queryFn: () => getImages(product.id),
      enabled: !!product.id,
    })),
  });

  const productsWithThumbnails = products.map((product, index) => {
    const imageData = imageQueries[index]?.data;
    const thumbnail = imageData?.thumbnail ?? "/placeholder.jpg";

    return {
      ...product,
      thumbnail,
    };
  });

  const padding = isMobile ? 12 : isTablet ? 24 : 120;
  const slideSize = isMobile ? "60%" : isTablet ? "50%" : "33.33%";
  const slideGap = isMobile ? "xs" : isTablet ? "sm" : "md";
  const imageHeight = isMobile ? 180 : isTablet ? 280 : 300;
  const carouselHeight = isMobile ? 350 : isTablet ? 300 : 600;
  const titleSize = isMobile ? "2rem" : isTablet ? "3rem" : "3.5rem";

  return (
    <SimpleGrid>
      <LoadingGlobal visible={isLoadingProducts} />
      <Stack align="center" justify="center">
        <Text size={titleSize} fw={900} c="#e7a17a" ta="center" style={{ fontFamily: "Lora" }} mt={"60px"}>
          AYANA HOUSES
        </Text>
        <Text size={titleSize} fw={900} c="#e7a17a" ta="center" style={{ fontFamily: "Lora" }} mt={"2px"}>
          ON SALE PROJECT
        </Text>
      </Stack>

      <Carousel
        p={padding}
        withIndicators
        slideSize={slideSize}
        slideGap={slideGap}
        loop
        height={carouselHeight}
        align="start"
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
            top: "50%",
            left: 0,
            right: 0,
            justifyContent: "space-between",
            transform: "translateY(-50%)",
            position: "absolute",
            padding: "0 16px",
            pointerEvents: "none", // agar slide bisa diklik walaupun panah ada di atas
          },
        }}
        controlSize={40}
      >
        {productsWithThumbnails.map((product) => (
          <Carousel.Slide key={product.id} mt={"120px"}>
            <Link
              href={{
                pathname: `/product/${generateSlug(product.title)}`,
                query: { id: product.id },
              }}
              passHref
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image src={product.thumbnail} alt={product.title} height={imageHeight} fit="cover" />
                </Card.Section>

                {!isMobile && (
                  <Text size="lg" fw={700} mt={12}>
                    {product.title}
                  </Text>
                )}

                <Text size="sm" c="dimmed" mt={8} lineClamp={2}>
                  {product.content}
                </Text>

                {isMobile && (
                  <Flex justify="flex-end" mt={12}>
                    <Flex gap={8}>
                      <Text fw={600} size="sm">
                        Start from
                      </Text>
                      <Text fw={800} size="sm" c="green">
                        {(product.price / 1_000_000).toFixed(0)} Juta
                      </Text>
                    </Flex>
                  </Flex>
                )}

                <Flex justify="space-between" align="center" mt={16}>
                  <Badge color={product.status === "sale" ? "green" : "pink"}>{product.status === "sale" ? "On Sale" : "Sold"}</Badge>
                  <Text fw={900} size="sm" c="dimmed">
                    {product.quantity > 0 ? `Tersedia ${product.quantity} unit` : "Terjual Habis"}
                  </Text>
                </Flex>
              </Card>
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>
    </SimpleGrid>
  );
};

export default ProductComponent;
