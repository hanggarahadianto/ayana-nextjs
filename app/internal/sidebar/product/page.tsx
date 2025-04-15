"use client";

import { Card, Group, SimpleGrid, Text, Stack, Container, Box, LoadingOverlay } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import GetProductModal from "../../../../src/components/page/admin/product/GetProductModal";
import { getDataProduct } from "@/api/products/getDataProduct";
import { useDeleteDataProduct } from "@/api/products/deleteDataProduct";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import EditProductModal from "@/components/page/admin/product/EditProductModal";
import AddProductModal from "@/components/page/admin/product/AddProductModal";
import LoadingGlobal from "@/helper/styles/loading/loading-global";
import { getDataInfo } from "@/api/info/getDataInfo";

const ProjectPage = () => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");
  const isLargeScreen = useMediaQuery("(max-width: 1280px)");

  const {
    data: productData,
    refetch: refetchProductData,
    isPending: isLoadingProductData,
  } = useQuery({
    queryKey: ["getProductData"],
    queryFn: getDataProduct,
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateDeleteDataProduct, isPending: isLoadingDeleteProduct } = useDeleteDataProduct(refetchProductData);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined);

  const {
    data: selectedInfoProduct,
    refetch: refetchSelectedInfoProduct,
    isPending: isLoadingInfoData,
  } = useQuery({
    queryKey: ["getInfoData"],
    queryFn: () => getDataInfo(selectedProduct?.id), // Provide an empty string or appropriate ID
    refetchOnWindowFocus: false,
  });

  const handleSelectProduct = (product: IProduct) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (idToDelete: string) => {
    mutateDeleteDataProduct(idToDelete);
  };

  return (
    <Container size="xl" px={isSmallScreen ? 20 : 40}>
      <LoadingGlobal visible={isLoadingProductData || isLoadingDeleteProduct} />

      <Group justify="space-between" align="center" mt={20}>
        <Text fw={900} size={isSmallScreen ? "1.5rem" : "2rem"}>
          Daftar Produk
        </Text>
        <AddProductModal refetchProductData={refetchProductData} />
      </Group>

      <Box mt={40} pos="relative" mih={300}>
        <SimpleGrid mt={40} cols={isSmallScreen ? 1 : isMediumScreen ? 2 : isLargeScreen ? 3 : 4} spacing={isSmallScreen ? "md" : "lg"}>
          {productData?.data
            ?.sort((a: IProduct, b: IProduct) => a.sequence - b.sequence)
            .map((product: IProduct) => (
              <Card
                key={product.id}
                w="100%"
                h={300} // Menyesuaikan tinggi untuk menjaga konsistensi
                maw={420}
                style={{
                  background: "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
                  backdropFilter: "blur(8px)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                  position: "relative",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column", // Susunan elemen vertikal
                  justifyContent: "space-between", // Menjaga jarak antara elemen atas dan bawah
                }}
                onClick={() => handleSelectProduct(product)}
              >
                <Stack w="100%" mih={120} style={{ flexGrow: 1 }}>
                  <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
                    {product.title}
                  </Text>
                  <Text fw={500} mt={8} size="lg" style={{ color: "#ffffff" }}>
                    {product.address}
                  </Text>
                </Stack>

                <Group justify="flex-end" wrap="nowrap">
                  <GetProductModal productData={selectedProduct} />
                  <EditProductModal
                    initialProductData={selectedProduct}
                    initialInfoData={selectedInfoProduct || undefined}
                    refetchProductData={refetchProductData}
                  />
                  <ButtonDeleteWithConfirmation
                    id={product.id}
                    onDelete={handleDeleteProduct}
                    description={`Apakah anda ingin menghapus produk ${product?.title} ?`}
                    size={2.5}
                  />
                </Group>
              </Card>
            ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default ProjectPage;
