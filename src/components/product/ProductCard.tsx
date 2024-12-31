import React, { useCallback, useEffect, useState } from "react";

import {
  AspectRatio,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";

interface ProductCardProps {
  products: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  const cards = products.map((home) => (
    <Carousel.Slide key={home.ID}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image height={300} src={home.image} alt={home.title} />
        </Card.Section>
        <Group p={12} gap={4}>
          <Text>{home.address}</Text>
          <Divider orientation="vertical" />
          <Text>{home.square}</Text>
          <Divider orientation="vertical" />
          <Text>{home.bathroom}</Text>
          <Divider orientation="vertical" />
          <Text>{home.bedroom}</Text>
        </Group>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{home.title}</Text>
          <Badge color="pink">On Sale</Badge>
        </Group>

        <Text size="sm" c="dimmed">
          {home.content}
        </Text>

        {/* <Button color="blue" fullWidth mt="md" radius="md">
          Book classic tour now
        </Button> */}
      </Card>
    </Carousel.Slide>
  ));

  return (
    <>
      <Carousel
        p={60}
        withIndicators
        height={600}
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap={{ base: 2, sm: "md" }}
        loop
        align="start"
      >
        {cards}
      </Carousel>
    </>
  );
};

export default ProductCard;
