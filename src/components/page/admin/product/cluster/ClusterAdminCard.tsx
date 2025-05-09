"use client";
import { Card, Group, SimpleGrid, Text, Stack, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDeleteDataProduct } from "@/api/products/deleteDataProduct";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import LoadingGlobal from "@/styles/loading/loading-global";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { getDataCluster } from "@/api/cluster/getCluster";
import SelectCluster from "@/components/common/select/SelectCluster";
import { getDataClusterById } from "@/api/cluster/getClusterById";
import AddClusterModal from "./AddClusterModal";

interface Props {
  setSelectedClusterId: (id: string | null) => void;
  selectedClusterId: string;
}

const ClusterAdminCard = ({ setSelectedClusterId, selectedClusterId }: Props) => {
  const {
    data: clusterData,
    refetch: refetchClusterData,
    isLoading: isLoadingClusterData,
    error,
  } = useQuery({
    queryKey: ["getClusterById", selectedClusterId],
    queryFn: () => getDataClusterById(selectedClusterId),
    enabled: !!selectedClusterId, // hanya fetch jika ada ID
  });

  const { mutate: mutateDeleteDataCluster, isPending: isLoadingDeleteProduct } = useDeleteDataProduct(refetchClusterData);
  const [selectedProduct, setSelectedProduct] = useState<ICluster | undefined>(undefined);

  const handleDeleteCluster = (idToDelete: string) => {
    mutateDeleteDataCluster(idToDelete);
  };

  console.log("data cluster", clusterData);

  return (
    <>
      <SimpleGridGlobal cols={1}>
        {/* <Card p="md" radius="md" shadow="sm" withBorder> */}
        <Flex w="100%" gap="40px">
          <Stack w="400px">
            <SelectCluster
              value={selectedClusterId || null}
              onChange={(value: string | null) => {
                console.log("Cluster selected:", value);
                setSelectedClusterId(value);
              }}
              placeholder="Pilih Cluster"
            />
          </Stack>

          <Stack mt={20}>
            <ButtonDeleteWithConfirmation
              id={""}
              onDelete={function (id: string): void {
                throw new Error("Function not implemented.");
              }}
              description={"Hapus"}
              size={2.5}
            />
          </Stack>

          <Stack justify="flex-end" ml="auto">
            <AddClusterModal />
          </Stack>
        </Flex>
        <LoadingGlobal visible={isLoadingClusterData || isLoadingDeleteProduct} />

        <Card p="sm" radius="sm" shadow="xs" withBorder mt={"40px"}>
          <Text fw={600} size="lg">
            {clusterData?.name}
          </Text>

          <Text size="sm" c="dimmed">
            Lokasi: {clusterData?.location}
          </Text>
        </Card>
        {/* </Card> */}
      </SimpleGridGlobal>
    </>
  );
};

export default ClusterAdminCard;
