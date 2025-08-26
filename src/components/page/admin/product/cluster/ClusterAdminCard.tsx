"use client";

import { Card, Text, Stack, Flex, Group, Badge, Grid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import LoadingGlobal from "@/styles/loading/loading-global";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import SelectCluster from "@/components/common/select/SelectCluster";
import { getDataClusterById } from "@/api/cluster/getClusterById";
import AddClusterModal from "./AddClusterModal";
import { useDeleteDataCluster } from "@/api/cluster/deleteCluster";
import { getDataCluster } from "@/api/cluster/getCluster";
import EditClusterModal from "./UpdateClusterModal";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { IconPencil } from "@tabler/icons-react";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";

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
  const { user } = useLoggedInUser();

  const [defaultClusterId, setDefaultClusterId] = useState<string | null>(null);
  const [selectedClusterData, setSelectedClusterData] = useState<IClusterUpdate | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const queryEnabled = !!user;

  const {
    data: allClusters,
    isLoading: isLoadingAllClusters,
    refetch: refetchAllClusters,
  } = useQuery({
    queryKey: ["getAllClusters"],
    queryFn: getDataCluster,
    enabled: queryEnabled,
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
  // const { mutate: mutateDeleteDataCluster, isPending: isLoadingDeleteProduct } = useDeleteDataCluster();

  const handleDeleteCluster = (idToDelete: string) => {
    mutateDeleteDataCluster(idToDelete, {
      onSuccess: () => {
        refetchAllClusters();
        setSelectedClusterId(null);
        setSelectedClusterName?.("");
        setDefaultClusterId(null);
      },
    });
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

  const getBadgeColor = (status: string | undefined) => {
    switch (status) {
      case "available":
        return { bg: "green" };
      case "booking":
        return { bg: "yellow" };
      case "sold":
        return { bg: "red" };
      default:
        return { bg: "gray" };
    }
  };

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

          <Group mt={"20px"}>
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
                isLoading={false}
                onDelete={() => handleDeleteCluster(selectedClusterId)}
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
        {clusterData &&
          (() => {
            const { bg } = getBadgeColor(clusterData.status);

            return (
              <Card p="md" radius="md" shadow="sm" withBorder mt="xl">
                <Stack gap="md">
                  <Group justify="space-between" align="flex-start">
                    <div>
                      <Text fw={600} size="lg">
                        {clusterData.name}
                      </Text>
                      <Text size="sm" c="dimmed" mt={4}>
                        Lokasi: {clusterData.location}
                      </Text>
                    </div>
                    <Badge bg={bg} radius="sm" size="md" variant="filled">
                      {clusterData.status}
                    </Badge>
                  </Group>

                  <Grid>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Text size="sm" c="dimmed">
                        Luas Lahan:
                      </Text>
                      <Text fw={500}>{clusterData.square} m²</Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Text size="sm" c="dimmed">
                        Unit Tersedia:
                      </Text>
                      <Text fw={500}>{clusterData.quantity}</Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Text size="sm" c="dimmed">
                        Harga per Unit:
                      </Text>
                      <Text fw={500}>Rp {clusterData.price.toLocaleString("id-ID")}</Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Text size="sm" c="dimmed">
                        Urutan:
                      </Text>
                      <Text fw={500}>{clusterData.sequence}</Text>
                    </Grid.Col>
                  </Grid>
                </Stack>
              </Card>
            );
          })()}
      </SimpleGridGlobal>
      {selectedClusterData && (
        <EditClusterModal opened={editModalOpen} onClose={() => setEditModalOpen(false)} initialData={selectedClusterData} />
      )}
    </>
  );
};

export default ClusterAdminCard;
