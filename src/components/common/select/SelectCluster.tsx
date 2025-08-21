import { getDataCluster } from "@/api/cluster/getCluster";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

interface ClusterOption {
  id: string;
  name: string;
}

interface SelectClusterProps {
  value?: ClusterOption | null;
}

interface SelectClusterProps {
  value?: ClusterOption | null;
  onChange: (value: ClusterOption | null) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

import { useEffect } from "react"; // pastikan ini di-import
const SelectCluster = ({
  value,
  onChange,
  label = "Pilih Cluster",
  placeholder = "Pilih salah satu",
  required = false,
}: SelectClusterProps) => {
  const { data: clusterData, isPending: isLoadingClusterData } = useQuery({
    queryKey: ["getClusterData"],
    queryFn: getDataCluster,
    refetchOnWindowFocus: false,
  });

  // Memastikan clusterData dan clusterData.data ada
  const options =
    clusterData?.data?.map((cluster: ClusterOption) => ({
      value: cluster.id,
      label: cluster.name,
    })) ?? [];

  // Menangani kemungkinan clusterData.data undefined
  const selected = clusterData?.data?.find((c: ClusterOption) => c.id === value?.id);

  useEffect(() => {
    // Memastikan clusterData dan clusterData.data ada sebelum mengambil default
    if (!value && clusterData?.data?.length) {
      const firstCluster = clusterData.data[0];
      onChange(firstCluster);
    }
  }, [value, clusterData, onChange]);

  return (
    <Select
      w="100%"
      styles={{
        option: {
          fontSize: "14px",
          padding: "6px 10px",
        },
        input: {
          cursor: "pointer",
        },
      }}
      label={label}
      placeholder={placeholder}
      data={options}
      value={selected?.id ?? null}
      onChange={(selectedId) => {
        const selectedCluster = clusterData?.data?.find((cluster: ClusterOption) => cluster.id === selectedId);
        onChange(selectedCluster ?? null);
      }}
      required={required}
      searchable
      clearable
      nothingFoundMessage="Tidak ada cluster"
      disabled={isLoadingClusterData}
    />
  );
};

export default SelectCluster;
