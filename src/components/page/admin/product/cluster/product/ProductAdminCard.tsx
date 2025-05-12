"use client";

import { Group, SimpleGrid, Text, Stack, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useDeleteDataProduct } from "@/api/products/deleteDataProduct";
import LoadingGlobal from "@/styles/loading/loading-global";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import CardComponentResponsive from "@/components/common/card/CardComponentResponsive";
import AddProductModal from "./AddProductModal";
import GetProductModal from "./GetProductModal";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { getDataProductByClusterId } from "@/api/products/getProductByClusterId";
import { useState } from "react";
import { getDataProductDetail } from "@/api/products/getDataProductDetail";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { IconEye } from "@tabler/icons-react";

interface Props {
  clusterId: string | null;
}

const ProductAdminCard = ({ clusterId }: Props) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const [openedModal, setOpenedModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

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

  const { data: selectedProductDetail, isLoading: isLoadingDetail } = useQuery({
    queryKey: ["getProductDetailById", selectedProductId],
    queryFn: () => (selectedProductId ? getDataProductDetail(selectedProductId) : null),
    enabled: !!selectedProductId && openedModal,
  });

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <LoadingGlobal visible={isLoadingProductData} />
        <LoadingGlobal visible={isLoadingDeleteProduct} />

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
                  {/* <LoadingGlobal visible={isLoadingDeleteProduct} /> */}

                  <BreathingActionIcon
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setOpenedModal(true);
                    }}
                    size="2.5rem"
                    icon={<IconEye size="1rem" />}
                    gradient="linear-gradient(135deg, #D8B4FE, #E9D5FF)"
                  />

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
      {productDataByClusterId?.total > limit && (
        <Group justify="center" mt="xl">
          <Pagination value={page} onChange={setPage} total={Math.ceil(productDataByClusterId.total / limit)} />
        </Group>
      )}
      <GetProductModal
        opened={openedModal}
        onClose={() => {
          setOpenedModal(false);
          setSelectedProductId(null);
        }}
        productData={selectedProductDetail ?? undefined}
        isLoadingDetail={isLoadingDetail}
      />
    </>
  );
};

export default ProductAdminCard;
