"use client";
import { Card, Group, SimpleGrid, Text, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getDataProductByClusterId } from "@/api/products/getDataProduct";
import { useDeleteDataProduct } from "@/api/products/deleteDataProduct";
import LoadingGlobal from "@/styles/loading/loading-global";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import CardComponentResponsive from "@/components/common/card/CardComponentResponsive";

interface Props {
  selectedClusterId: string | null;
}

const ProductAdminCard = ({ selectedClusterId }: Props) => {
  const {
    data: productDataByClusterId,
    refetch: refetchProductData,
    isLoading: isLoadingProductData,
  } = useQuery({
    queryKey: ["getProductDataByClusterId", selectedClusterId],
    queryFn: () => {
      if (!selectedClusterId) return Promise.resolve(null);
      return getDataProductByClusterId({ clusterId: selectedClusterId });
    },
    enabled: !!selectedClusterId, // hanya fetch jika ada clusterId
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
        <LoadingGlobal visible={isLoadingProductData || isLoadingDeleteProduct} />

        <SimpleGrid
          style={{ gap: "24px" }}
          spacing="lg"
          cols={4} // Atur jumlah kolom tetap di sini
        >
          {productDataByClusterId?.data.map((product: IProduct) => (
            <CardComponentResponsive
              key={product?.id}
              id={product?.id}
              title={product?.title}
              status={product?.status}
              onDelete={(id) => handleDeleteProduct(id)}
              onSelect={() => handleSelectProduct(product)}
            />
          ))}
        </SimpleGrid>
      </SimpleGridGlobal>
    </>
  );
};

export default ProductAdminCard;
