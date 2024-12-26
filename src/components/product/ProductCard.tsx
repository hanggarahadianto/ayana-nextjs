import React from "react";

import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { AspectRatio, Card, Container, SimpleGrid, Text } from "@mantine/core";

const ProductCard: React.FC<> = () => {
  const cards = product.map(
    (article: {
      title: React.Key | null | undefined;
      image: string | StaticImport;
      date: any;
    }) => (
      <Card key={article.title} p="md" radius="md" component="a" href="#">
        <AspectRatio ratio={1920 / 1080}>
          <Image src={article.image} alt={""} />
        </AspectRatio>
        <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
          {article.date}
        </Text>
        <Text mt={5}>{article.title}</Text>
      </Card>
    )
  );

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
};

export default ProductCard;
