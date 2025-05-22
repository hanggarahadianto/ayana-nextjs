import { getTransactionCategoryByCategoryOnly } from "@/api/transaction-category/getDataTransactionCategoryFilter";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface SelectCategoryFilterProps {
  companyId: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

const SelectCategoryFilter: React.FC<SelectCategoryFilterProps> = ({ companyId, value, onChange }) => {
  const { data: transactionCategoryData, isLoading } = useQuery({
    queryKey: ["getTransactionCategoryByCategoryOnly", companyId],
    queryFn: () => getTransactionCategoryByCategoryOnly(companyId),
    enabled: !!companyId,
  });

  // data structure: { data: string[]; status: string }
  const options =
    transactionCategoryData?.data?.map((category: string) => ({
      label: category,
      value: category,
    })) || [];

  return (
    <Select
      label="Kategori Transaksi"
      placeholder={isLoading ? "Memuat..." : "Pilih Kategori"}
      data={options}
      value={value}
      onChange={onChange}
      searchable
      clearable
      disabled={isLoading}
      styles={{
        input: { cursor: "pointer" },
        dropdown: { cursor: "pointer" },
      }}
    />
  );
};

export default SelectCategoryFilter;
