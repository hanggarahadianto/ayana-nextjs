"use client";
import { Card, Text, Stack, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import LoadingGlobal from "@/styles/loading/loading-global";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import SelectCluster from "@/components/common/select/SelectCluster";
import { getDataClusterById } from "@/api/cluster/getClusterById";
import AddClusterModal from "./AddClusterModal";
import { useDeleteDataCluster } from "@/api/cluster/deleteCluster";

interface Props {
  setSelectedClusterId: (id: string | null) => void;
  setSelectedClusterName?: (name: string) => void;
  selectedClusterId: string;
  selectedClusterName: string;
}

const ClusterAdminCard = ({ setSelectedClusterId, setSelectedClusterName, selectedClusterId, selectedClusterName }: Props) => {
  const {
    data: clusterData,
    refetch: refetchClusterData,
    isLoading: isLoadingClusterData,
  } = useQuery({
    queryKey: ["getClusterById", selectedClusterId],
    queryFn: () => getDataClusterById(selectedClusterId),
    enabled: !!selectedClusterId, // hanya fetch jika ada ID
  });

  const { mutate: mutateDeleteDataCluster, isPending: isLoadingDeleteProduct } = useDeleteDataCluster(refetchClusterData);

  const handleDeleteCluster = (idToDelete: string) => {
    mutateDeleteDataCluster(idToDelete);
  };

  return (
    <>
      <SimpleGridGlobal cols={1}>
        {/* <Card p="md" radius="md" shadow="sm" withBorder> */}
        <Flex w="100%" gap="40px">
          <Stack w="400px">
            <SelectCluster
              value={selectedClusterId ? { id: selectedClusterId, name: selectedClusterName } : null}
              onChange={(value) => {
                setSelectedClusterId(value?.id || null);
                if (setSelectedClusterName) {
                  setSelectedClusterName(value?.name || "");
                }
              }}
              placeholder="Pilih Cluster"
            />
          </Stack>
          <Stack mt={22}>
            {selectedClusterId && (
              <ButtonDeleteWithConfirmation
                id={selectedClusterId}
                onDelete={handleDeleteCluster}
                description={`Hapus ${selectedClusterName}`}
                size={2.5}
              />
            )}
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
