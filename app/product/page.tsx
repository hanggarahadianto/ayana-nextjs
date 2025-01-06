"use client";
import { useQuery } from "@tanstack/react-query";

import { SimpleGrid, Stack, Text } from "@mantine/core";
import ProductCard from "@/src/components/product/ProductCard";
import { getDataProduct } from "@/src/api/products/getDataProduct";

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

  if (isLoadingGetProductData) {
    return <div>Loading...</div>;
  }

  console.log("productdata", productData);

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

        <ProductCard products={productData?.data || []} />
      </SimpleGrid>
    </>
  );
};

export default ProductsPage;
