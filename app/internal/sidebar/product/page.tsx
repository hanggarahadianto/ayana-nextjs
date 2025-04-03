"use client";

import { Card, Group, SimpleGrid, Text, Stack, Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import AddProductModal from "../../../../src/components/internal/sidebar/product/AddProductModal";
import GetProductModal from "../../../../src/components/internal/sidebar/product/GetProductModal";
import { getDataProduct } from "@/api/products/getDataProduct";
import { useDeleteDataProduct } from "@/api/products/deleteDataProduct";
import ButtonDeleteWithConfirmation from "@/components/button/buttonDeleteConfirmation";
import EditProductModal from "@/components/internal/sidebar/product/EditProductModal";

const ProjectPage = () => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");
  const isLargeScreen = useMediaQuery("(max-width: 1280px)");

  const { data: productData, refetch: refetchProductData } = useQuery({
    queryKey: ["getProductData"],
    queryFn: getDataProduct,
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateDeleteDataProduct } = useDeleteDataProduct(refetchProductData);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined);

  const handleSelectProduct = (product: IProduct) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (idToDelete: string) => {
    mutateDeleteDataProduct(idToDelete);
  };

  return (
    <Container size="xl" px={isSmallScreen ? 20 : 40}>
      <Group justify="space-between" align="center" mt={20}>
        <Text fw={900} size={isSmallScreen ? "1.5rem" : "2rem"}>
          Daftar Produk
        </Text>
        <AddProductModal refetchProductData={refetchProductData} />
      </Group>

      <SimpleGrid mt={40} cols={isSmallScreen ? 1 : isMediumScreen ? 2 : isLargeScreen ? 3 : 4} spacing={isSmallScreen ? "md" : "lg"}>
        {productData?.data.map((product: IProduct) => (
          <Card
            key={product.id}
            w="100%"
            h={210}
            maw={420}
            mah={300}
            style={{
              background: "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
              backdropFilter: "blur(8px)",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => handleSelectProduct(product)}
          >
            <Stack gap={4} align="start">
              <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
                {product.title}
              </Text>
              <Text fw={500} mt={16} size="lg" style={{ color: "#ffffff" }}>
                {product.address}
              </Text>
            </Stack>

            <Group justify="flex-end" mt={20} wrap="nowrap">
              <GetProductModal productData={selectedProduct} />
              <EditProductModal initialData={selectedProduct} refetchProductData={refetchProductData} />
              <ButtonDeleteWithConfirmation
                id={product.id}
                onDelete={handleDeleteProduct}
                description={`Apakah anda ingin menghapus proyek ${product?.title} ?`}
                size={2.5}
              />
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ProjectPage;
