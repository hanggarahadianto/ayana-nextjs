"use client";

import { Card, Group, SimpleGrid, Text, Stack, ActionIcon } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";
import { useDeleteDataProject } from "@/src/api/project/deleteDataProject";
import ButtonDeleteWithConfirmation from "@/src/components/button/buttonDeleteConfirmation";
import AddProductModal from "./AddProductModal";
import { getDataProduct } from "@/src/api/products/getDataProduct";
import EditProductModal from "./EditProductModa";
import { useState } from "react";
import GetProductModal from "./GetProductModal";
import { useDeleteDataProduct } from "@/src/api/products/deleteDataProduct";

const ProjectPage = () => {
  const {
    data: productData,
    isLoading: isLoadingGetProductData,
    refetch: refetchProductData,
  } = useQuery({
    queryKey: ["getProductData"],
    queryFn: () => getDataProduct(),
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateDeleteDataProduct, isPending: isLoadingDeleteDataProject } = useDeleteDataProduct(refetchProductData);

  console.log("Project Data", productData?.data);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined);

  const handleSelectProduct = (product: IProduct) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (idToDelete: string) => {
    mutateDeleteDataProduct(idToDelete); // Pass only the string, not an object
  };

  return (
    <>
      <Group justify="space-between">
        <Text fw={900} size="2rem">
          Daftar Produk
        </Text>
        <Stack mr={40}>
          <AddProductModal refetchProductData={refetchProductData} />
        </Stack>
      </Group>

      <SimpleGrid mt={40} cols={3} p={40}>
        {productData?.data.map((product: IProduct) => (
          <Card
            mt={20}
            key={product.id}
            w={420}
            h={180}
            style={{
              background: "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
              backdropFilter: "blur(8px)",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              position: "relative", // Ensures delete button positioning works
              cursor: "pointer",
            }}
            onClick={() => handleSelectProduct(product)}
          >
            <Group justify="space-between">
              <Stack gap={4} align="start">
                <Group justify="space-between" w="100%">
                  <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
                    {product.title}
                  </Text>
                </Group>

                <Text fw={500} mt={16} size="lg" style={{ color: "#ffffff" }}>
                  {product.address}
                </Text>
              </Stack>
            </Group>

            <Group justify="flex-end" mt={20}>
              <Stack>
                {" "}
                <GetProductModal productData={selectedProduct} />
              </Stack>
              <Stack mr={20}>
                <EditProductModal initialData={selectedProduct} refetchProductData={refetchProductData} />
              </Stack>

              <Stack>
                <ButtonDeleteWithConfirmation
                  id={product.id}
                  onDelete={handleDeleteProduct}
                  description={`Apakah anda ingin menghapus proyek ${product?.title} ?`}
                />
              </Stack>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProjectPage;
