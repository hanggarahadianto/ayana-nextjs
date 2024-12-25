import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Container, Grid, SimpleGrid, Stack, Text } from "@mantine/core";
import ProductCard from "@/src/components/product/ProductCard";

const ProductsPage = () => {
  //   const { data, error, isLoading } = useQuery(["products"], fetchProducts);
  const dummyProducts = [
    {
      id: "1",
      name: "Product 1",
      description: "Description for Product 1",
      price: 10,
      image: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Product 2",
      description: "Description for Product 2",
      price: 20,
      image: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Product 3",
      description: "Description for Product 3",
      price: 30,
      image: "https://via.placeholder.com/150",
    },
    {
      id: "4",
      name: "Product 4",
      description: "Description for Product 4",
      price: 40,
      image: "https://via.placeholder.com/150",
    },
    {
      id: "5",
      name: "Product 5",
      description: "Description for Product 5",
      price: 50,
      image: "https://via.placeholder.com/150",
    },
  ];
  return (
    <>
      <Text mt={30} ml={30}>
        Fluid container has 100% max-width
      </Text>
      <SimpleGrid cols={1}>
        {dummyProducts.map(
          (product: { id: string; name: string; image: string }) => (
            <Stack key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                image={product.image}
              />
            </Stack>
          )
        )}
      </SimpleGrid>
    </>
  );
};

export default ProductsPage;
