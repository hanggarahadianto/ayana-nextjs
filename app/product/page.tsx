"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import {
  Card,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Flex,
  Group,
  Badge,
} from "@mantine/core";

import { getDataProduct } from "@/src/api/products/getDataProduct";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";

const ProductsPage = () => {
  const {
    data: productData,
    isLoading: isLoadingGetProductData,
    refetch: refetchProductData,
  } = useQuery({
    queryKey: ["getProductData"],
    queryFn: () => getDataProduct(),
    // enabled: !!token,
    refetchOnWindowFocus: false,
  });

  console.log("product data", productData);

  const products = productData;

  const cards = products?.data.map((home) => {
    return (
      <Carousel.Slide key={home.id}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Link href={`/product/${home.id}`} passHref>
            <Card.Section>
              <Image height={300} src={home.image} alt={home.title} />
            </Card.Section>
          </Link>

          <Flex justify="space-between">
            <Group gap={4} align="start" mt={40}>
              <Text>{home.address}</Text>
            </Group>

            {home.status !== "sold" && (
              <Flex mt={40}>
                <Text mr={12} fw={600} mt={3}>
                  Start from
                </Text>
                <Text size="lg" c={"green"}>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(home.price)}
                </Text>
              </Flex>
            )}
          </Flex>

          <Flex justify="space-between" mt="md" mb="xs">
            <Text w={500} size="xl">
              {home.title}
            </Text>
            <Badge
              mr={12}
              w={80}
              color={home.status === "sale" ? "green" : "pink"}
            >
              {home.status === "sale" ? "On Sale" : "Sold"}
            </Badge>
          </Flex>

          <Text size="sm" c="dimmed">
            {home.content}
          </Text>
          <Stack justify="end" align="end" mt={20}>
            {home.quantity > 0 ? (
              <Text fw={900} size="xl" c="dimmed">
                Tersedia {home.quantity} unit
              </Text>
            ) : (
              <Text size="xl" c="dimmed">
                Terjual Habis
              </Text>
            )}
          </Stack>
        </Card>
      </Carousel.Slide>
    );
  });

  return (
    <>
      <SimpleGrid cols={1} bg={"#a48060"} h={"130vh"}>
        <Stack align="center" justify="center">
          <Text
            size="xl"
            fw={900}
            c={"white"}
            style={{ fontFamily: "Lora", fontSize: "5rem" }}
          >
            AYANA HOUSES
          </Text>
        </Stack>
        <Stack align="center" justify="center">
          <Text
            mt={-40}
            fw={900}
            style={{ fontFamily: "Lora", color: "#e7a17a", fontSize: "3rem" }}
          >
            ON SALE PROJECT
          </Text>
        </Stack>

        <>
          <Carousel
            p={60}
            withIndicators
            slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
            slideGap={{ base: 0, sm: "md" }}
            loop
            height={600}
            align="start"
          >
            {cards}
          </Carousel>
        </>
      </SimpleGrid>
    </>
  );
};

export default ProductsPage;
