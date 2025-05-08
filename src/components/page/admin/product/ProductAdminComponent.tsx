"use client";
import { Card, Group, SimpleGrid, Text, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { getDataProduct } from "@/api/products/getDataProduct";
import { useDeleteDataProduct } from "@/api/products/deleteDataProduct";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import AddProductModal from "@/components/page/admin/product/AddProductModal";
import LoadingGlobal from "@/styles/loading/loading-global";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";

const ProductAdminComponent = () => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)"); // Mobile
  const isMediumScreen = useMediaQuery("(min-width: 768px) and (max-width: 1023px)"); // Tablet
  const isLaptopScreen = useMediaQuery("(min-width: 1024px) and (max-width: 1439px)"); // Laptop 12-14 inch
  const isWideScreen = useMediaQuery("(min-width: 1440px)");
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

  const handleSelectProduct = (product: IProduct) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (idToDelete: string) => {
    mutateDeleteDataProduct(idToDelete);
  };

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <Group justify="space-between" mb={20}>
          <Text fw={900} size="2rem">
            Daftar Produk
          </Text>
          <Stack>
            <AddProductModal refetchProductData={refetchProductData} />
          </Stack>
        </Group>
        <LoadingGlobal visible={isLoadingProductData || isLoadingDeleteProduct} />

        <SimpleGrid
          style={{ gap: "24px" }}
          spacing="lg"
          cols={isSmallScreen ? 1 : isMediumScreen ? 2 : isLaptopScreen ? 3 : isWideScreen ? 5 : 5}
        >
          {productData?.data
            ?.sort((a: IProduct, b: IProduct) => a.sequence - b.sequence)
            .map((product: IProduct) => (
              <Card
                key={product.id}
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
                  transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out", // Added transition
                  transform: "scale(1)", // Initial scale value
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} // Scale up on hover
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onClick={() => handleSelectProduct(product)}
              >
                <Stack w="100%" mih={120} style={{ flexGrow: 1 }}>
                  <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
                    {product.title}
                  </Text>
                  <Text fw={200} mt={0} size="sm" style={{ color: "#ffffff" }}>
                    {product.address}
                  </Text>
                </Stack>

                <Group justify="flex-end" wrap="nowrap" mt={12}>
                  {/* <GetProductModal productData={selectedProduct} infoData={selectedInfoData[0] ?? undefined} />
                  <EditProductModal
                    initialProductData={selectedProduct}
                    initialInfoData={selectedInfoProduct || undefined}
                    refetchProductData={refetchProductData}
                  /> */}
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
      </SimpleGridGlobal>
    </>
  );
};

export default ProductAdminComponent;
