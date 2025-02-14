"use client";

import { Button, Card, Group, SimpleGrid, Text, Stack, ActionIcon } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";
import { getDataProject } from "@/src/api/project/getDataProject";

import Link from "next/link";
import { useDeleteDataProject } from "@/src/api/project/deleteDataProject";
import ButtonDeleteWithConfirmation from "@/src/components/button/buttonDeleteConfirmation";
import AddProductModal from "./AddProductModal";
import { getDataProduct } from "@/src/api/products/getDataProduct";

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

  const { mutate: mutateDeleteDataProject, isPending: isLoadingDeleteDataProject } = useDeleteDataProject(refetchProductData);

  const handleDeleteProject = (idToDelete: string) => {
    mutateDeleteDataProject(idToDelete); // Pass only the string, not an object
  };

  console.log("Project Data", productData?.data);

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

      <SimpleGrid mt={40} cols={4} p={40}>
        {productData?.data.map((product) => (
          <Card
            key={product.id}
            w={320}
            h={160}
            style={{
              background: "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
              backdropFilter: "blur(8px)",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              position: "relative", // Ensures delete button positioning works
              cursor: "pointer",
            }}
          >
            <Link href={`/internal/sidebar/project/${product.id}`} passHref legacyBehavior>
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
            </Link>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProjectPage;
