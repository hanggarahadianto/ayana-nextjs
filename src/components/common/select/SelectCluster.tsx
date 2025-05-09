"use client";

import { getDataCluster } from "@/api/cluster/getCluster";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

interface SelectClusterProps {
  value: string | null;
  onChange: (value: string | null) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

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

  const options =
    clusterData?.data?.map((cluster: ICluster) => ({
      value: cluster.id,
      label: cluster.name, // perbaikan di sini
    })) ?? [];

  return (
    <Select
      w="100%" // atau style={{ flex: 1 }}
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
      value={value}
      onChange={onChange}
      required={required}
      searchable
      clearable
      nothingFoundMessage="Tidak ada cluster"
      disabled={isLoadingClusterData}
    />
  );
};

export default SelectCluster;
