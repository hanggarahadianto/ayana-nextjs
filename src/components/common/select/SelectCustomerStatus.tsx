import { getDataCustomer } from "@/api/customer/getDataCustomer";
import { houseSaleStatuses } from "@/constants/dictionary";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface SelectCustomerFilterProps {
  companyId: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

const SelectCustomerFilter: React.FC<SelectCustomerFilterProps> = ({ companyId, value, onChange }) => {
  const selectStatus = true;

  const { data: statusData, isLoading } = useQuery({
    queryKey: ["getCustomerStatusOptions", companyId, selectStatus],
    queryFn: () =>
      getDataCustomer({
        companyId,
        selectStatus,
      }),
    enabled: !!companyId,
  });

  // 🔁 Cocokkan hasil dari DB (statusData.data) dengan daftar statis, dan urutkan sesuai static list
  const statusList = statusData?.data as string[] | undefined;

  const options = statusList
    ? houseSaleStatuses
        .filter((item) => statusList.includes(item.value))
        .map((item) => ({
          label: item.label,
          value: item.value,
        }))
    : [];

  return (
    <Select
      disabled={isLoading}
      label="Status Customer"
      placeholder={isLoading ? "Memuat..." : "Pilih Status"}
      data={options}
      value={value}
      onChange={onChange}
      searchable
      clearable
      styles={{
        input: { cursor: "pointer" },
        dropdown: { cursor: "pointer" },
      }}
    />
  );
};

export default SelectCustomerFilter;
