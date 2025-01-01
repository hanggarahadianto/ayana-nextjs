import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Container,
  Grid,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import ProductCard from "@/src/components/product/ProductCard";
import { getDataProduct } from "@/src/api/products/getDataProduct";
import { Carousel, Embla } from "@mantine/carousel";

const ProductsPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);

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

  if (isLoadingGetProductData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SimpleGrid cols={1} bg={"#a48060"} h={"100vh"}>
        <Stack align="center" justify="center">
          <Text
            mt={0}
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
            mt={-50}
            fw={900}
            style={{ fontFamily: "Lora", color: "#e7a17a", fontSize: "3rem" }}
          >
            ON SALE PROJECT
          </Text>
        </Stack>

        <ProductCard products={productData?.data || []} />
      </SimpleGrid>
    </>
  );
};

export default ProductsPage;
