import { getDataTransactionCategory } from "@/api/transaction-category/getDataTransactionCategory";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface SelectCategoryFilterProps {
  companyId: string;

  value: string | null;
  onChange: (value: string | null) => void;
}

const SelectCategoryFilter: React.FC<SelectCategoryFilterProps> = ({ companyId, value, onChange }) => {
  const { data: TransactionCategoryData, isLoading } = useQuery({
    queryKey: ["getTransactionCategorySelect", companyId],
    queryFn: () =>
      getDataTransactionCategory({
        companyId,
        selectByCategory: true,
      }),
    enabled: !!companyId,
  });

  const options =
    TransactionCategoryData?.data?.map((category: ITransactionCategory) => ({
      label: category.name,
      value: category.id,
    })) || [];

  return (
    <Select
      label="Kategori Transaksi"
      placeholder={isLoading ? "Memuat..." : "Pilih kategori"}
      data={options}
      value={value}
      onChange={onChange}
      searchable
      clearable
      disabled={isLoading}
    />
  );
};

export default SelectCategoryFilter;
