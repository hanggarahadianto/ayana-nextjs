"use client";
import {
  Badge,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  products: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  console.log("Product", products);

  const router = useRouter();

  const handleProductClick = (id: any) => {
    console.log("ID", id);
    router.push(`/product/${id}`);
  };

  const cards = products.map((home) => {
    return (
      <Carousel.Slide
        key={home.ID}
        onClick={() => handleProductClick(home.ID)}
        style={{ cursor: "pointer" }}
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image height={300} src={home.image} alt={home.title} />
          </Card.Section>
          <Flex justify="space-between">
            <Group gap={4} align="start" mt={20}>
              <Text>{home.address}</Text>
              <Divider orientation="vertical" />
              <Text>{home.square}</Text>
              <Divider orientation="vertical" />
              <Text>{home.bathroom}</Text>
              <Divider orientation="vertical" />
              <Text>{home.bedroom}</Text>
            </Group>

            {home.status !== "sold" && (
              <Text mt={20} c={"green"}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(home.price)}
              </Text>
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
  );
};

export default ProductCard;
