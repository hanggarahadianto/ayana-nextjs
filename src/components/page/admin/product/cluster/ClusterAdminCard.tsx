"use client";

import { Card, Text, Stack, Flex, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import LoadingGlobal from "@/styles/loading/loading-global";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import SelectCluster from "@/components/common/select/SelectCluster";
import { getDataClusterById } from "@/api/cluster/getClusterById";
import AddClusterModal from "./AddClusterModal";
import { useDeleteDataCluster } from "@/api/cluster/deleteCluster";
import { getDataCluster } from "@/api/cluster/getCluster";
import Cookies from "js-cookie";
import EditClusterModal from "./UpdateClusterModal";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { IconPencil } from "@tabler/icons-react";

interface ClusterOption {
  id: string;
  name: string;
}

interface Props {
  setSelectedClusterId: (id: string | null) => void;
  setSelectedClusterName?: (name: string) => void;
  selectedClusterId: string;
  selectedClusterName: string;
}

const ClusterAdminCard = ({ setSelectedClusterId, setSelectedClusterName, selectedClusterId, selectedClusterName }: Props) => {
  const [defaultClusterId, setDefaultClusterId] = useState<string | null>(null);
  const [selectedClusterData, setSelectedClusterData] = useState<IClusterUpdate | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // console.log("Edit modal open:", editModalOpen);
  // console.log("Selected cluster data:", selectedClusterData);

  const {
    data: allClusters,
    isLoading: isLoadingAllClusters,
    refetch: refetchAllClusters,
  } = useQuery({
    queryKey: ["getAllClusters"],
    queryFn: getDataCluster,
    enabled: !!Cookies.get("token"),
  });

  const clusterList = allClusters?.data ?? [];

  const effectiveClusterId = selectedClusterId || defaultClusterId;

  const {
    data: clusterData,
    refetch: refetchClusterData,
    isLoading: isLoadingClusterData,
  } = useQuery({
    queryKey: ["getClusterById", effectiveClusterId],
    queryFn: () => getDataClusterById(effectiveClusterId!),
    enabled: !!effectiveClusterId,
  });

  const { mutate: mutateDeleteDataCluster, isPending: isLoadingDeleteProduct } = useDeleteDataCluster(refetchClusterData);

  const handleDeleteCluster = (idToDelete: string) => {
    mutateDeleteDataCluster(idToDelete);
  };

  useEffect(() => {
    if (clusterList.length > 0 && !selectedClusterId) {
      const first = clusterList[0];
      setDefaultClusterId(first.id);
      setSelectedClusterId(first.id);
      setSelectedClusterName?.(first.name);
    }
  }, [clusterList]);

  const selectedCluster: ClusterOption | null = clusterList.find((c) => c.id === (selectedClusterId || defaultClusterId)) ?? null;

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <Flex w="100%" gap="40px">
          <Stack w="400px">
            <SelectCluster
              value={selectedCluster}
              onChange={(value) => {
                setSelectedClusterId(value?.id || null);
                setSelectedClusterName?.(value?.name || "");
              }}
              placeholder="Pilih Cluster"
            />
          </Stack>

          <Group mt={22}>
            <BreathingActionIcon
              onClick={() => {
                // contoh sederhana: ambil data dari SelectCluster jika value-nya sudah lengkap
                const selected = clusterList.find((item) => item.id === selectedClusterId);
                if (selected) {
                  setSelectedClusterData(selected);
                  setEditModalOpen(true);
                }
              }}
              size="2.5rem"
              icon={<IconPencil size="1rem" />}
              gradient="linear-gradient(135deg, #60A5FA, #3B82F6)"
            />

            {selectedClusterId && (
              <ButtonDeleteWithConfirmation
                id={selectedClusterId}
                onDelete={handleDeleteCluster}
                description={`Hapus ${selectedClusterName}`}
                size={2.5}
              />
            )}
          </Group>

          <Stack justify="flex-end" ml="auto">
            <AddClusterModal />
          </Stack>
        </Flex>

        <LoadingGlobal visible={isLoadingClusterData || isLoadingDeleteProduct} />

        {clusterData && (
          <Card p="sm" radius="sm" shadow="xs" withBorder mt={"40px"}>
            <Text fw={600} size="lg">
              {clusterData.name}
            </Text>
            <Text size="sm" c="dimmed">
              Lokasi: {clusterData.location}
            </Text>
          </Card>
        )}
      </SimpleGridGlobal>
      {selectedClusterData && (
        <EditClusterModal opened={editModalOpen} onClose={() => setEditModalOpen(false)} initialData={selectedClusterData} />
      )}
    </>
  );
};

export default ClusterAdminCard;
