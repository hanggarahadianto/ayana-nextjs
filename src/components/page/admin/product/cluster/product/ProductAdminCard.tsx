"use client";
import { Card, Group, SimpleGrid, Text, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { useDeleteDataProduct } from "@/api/products/deleteDataProduct";
import LoadingGlobal from "@/styles/loading/loading-global";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import CardComponentResponsive from "@/components/common/card/CardComponentResponsive";
import AddProductModal from "./AddProductModal";
import GetProductModal from "./GetProductModal";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { getDataProductByClusterId } from "@/api/products/getProductByClusterId";

interface Props {
  clusterId: string | null;
}

const ProductAdminCard = ({ clusterId }: Props) => {
  console.log("selectd cluster", clusterId);
  const {
    data: productDataByClusterId,
    refetch: refetchProductData,
    isLoading: isLoadingProductData,
  } = useQuery({
    queryKey: ["getProductDataByClusterId", clusterId],
    queryFn: () => {
      if (!clusterId) return Promise.resolve(null);
      return getDataProductByClusterId({ clusterId: clusterId });
    },
    enabled: !!clusterId,
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateDeleteDataProduct, isPending: isLoadingDeleteProduct } = useDeleteDataProduct(refetchProductData);
  const handleDeleteProduct = (idToDelete: string) => {
    mutateDeleteDataProduct(idToDelete);
  };

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <LoadingGlobal visible={isLoadingProductData || isLoadingDeleteProduct} />
        <Group justify="space-between" mb="lg">
          <Text fw={700} size="2rem">
            Daftar Produk
          </Text>
          <Stack gap={0}>
            <AddProductModal clusterId={clusterId} />
          </Stack>
        </Group>

        <SimpleGrid style={{ gap: "24px" }} spacing="lg" cols={4}>
          {productDataByClusterId?.data.map((product: IProduct) => (
            <SimpleGrid key={product.id}>
              <CardComponentResponsive title={product.title} status={product.status}>
                <Group justify="flex-end" wrap="nowrap">
                  <GetProductModal productData={product} />

                  <ButtonDeleteWithConfirmation
                    id={product.id}
                    onDelete={handleDeleteProduct}
                    description={`Apakah anda ingin menghapus ${product.title}?`}
                    size={2.5}
                  />
                </Group>
              </CardComponentResponsive>
            </SimpleGrid>
          ))}
        </SimpleGrid>
      </SimpleGridGlobal>
    </>
  );
};

export default ProductAdminCard;
