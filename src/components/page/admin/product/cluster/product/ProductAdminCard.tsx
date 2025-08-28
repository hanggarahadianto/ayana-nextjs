"use client";

import { Group, SimpleGrid, Text, Stack, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useDeleteDataProduct } from "@/api/products/deleteDataProduct";
import LoadingGlobal from "@/styles/loading/loading-global";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import CardComponentResponsive from "@/components/common/card/CardComponentResponsive";
import AddProductModal from "./AddProductModal";
import GetProductModal from "./GetProductModal";
import { getDataProductByClusterId } from "@/api/products/getProductByClusterId";
import { useState } from "react";
import { getDataProductDetail } from "@/api/products/getDataProductDetail";
import { IconEye, IconPencil } from "@tabler/icons-react";
import UpdateProductModal from "./EditProductModal";
import ButtonDeleteWithConfirmation from "@/components/common/button/ButtonDeleteWithConfirmation";
import BreathingActionIcon from "@/components/common/button/ButtonActionGo";

interface Props {
  clusterId: string | null;
}

const ProductAdminCard = ({ clusterId }: Props) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const [openedModal, setOpenedModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"view" | "edit" | null>(null);

  const handleClickProductAction = (id: string, type: "view" | "edit") => {
    setSelectedProductId(id);
    setModalType(type);
    setOpenedModal(true);
  };

  // console.log("Selected Product ID:", selectedProductId);

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
          {productDataByClusterId?.data?.map((product: IProduct) => {
            const getBadgeBg = (status?: string) => {
              switch ((status || "").toLowerCase()) {
                case "available":
                  return "#38A169"; // green.500
                case "booked":
                  return "#D69E2E"; // yellow.500
                case "sold":
                  return "#E53E3E"; // red.500
                default:
                  return "#718096"; // gray.500
              }
            };
            return (
              <SimpleGrid key={product.id}>
                <CardComponentResponsive
                  title={product.title}
                  subTitle={product.type}
                  status={product.status}
                  badgeColor={getBadgeBg(product.status)}
                >
                  <Group justify="flex-end" wrap="nowrap">
                    <BreathingActionIcon
                      onClick={() => handleClickProductAction(product.id, "view")}
                      size="2.5rem"
                      icon={<IconEye size="1rem" />}
                      gradient="linear-gradient(135deg, #D8B4FE, #E9D5FF)"
                    />

                    <BreathingActionIcon
                      onClick={() => handleClickProductAction(product.id, "edit")}
                      size="2.5rem"
                      icon={<IconPencil size="1rem" />}
                      gradient="linear-gradient(135deg, #60A5FA, #3B82F6)"
                    />

                    <ButtonDeleteWithConfirmation
                      isLoading={false}
                      onDelete={() => handleDeleteProduct(product.id)}
                      description={`Apakah anda ingin menghapus ${product.title}?`}
                      size={2.5}
                    />
                  </Group>
                </CardComponentResponsive>
              </SimpleGrid>
            );
          })}
        </SimpleGrid>
      </SimpleGridGlobal>
      {(productDataByClusterId?.total ?? 0) > limit && (
        <Group justify="center" mt="xl">
          <Pagination value={page} onChange={setPage} total={Math.ceil((productDataByClusterId?.total ?? 0) / limit)} />
        </Group>
      )}

      {modalType === "view" && (
        <GetProductModal
          opened={openedModal}
          onClose={() => {
            setOpenedModal(false);
            setSelectedProductId(null);
            setModalType(null);
          }}
          productData={selectedProductDetail ?? undefined}
          isLoadingDetail={isLoadingDetail}
        />
      )}

      {modalType === "edit" && (
        <UpdateProductModal
          clusterId={clusterId ?? undefined}
          refetchProductDataByCluster={refetchProductData}
          opened={openedModal}
          onClose={() => {
            setOpenedModal(false);
            setSelectedProductId(null);
            setModalType(null);
          }}
          productData={selectedProductDetail ?? undefined}
        />
      )}
    </>
  );
};

export default ProductAdminCard;
