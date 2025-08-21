import { getTransactionCategoryByCategoryOnly } from "@/api/transaction-category/getDataTransactionCategoryFilter";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface SelectCategoryFilterProps {
  companyId: string;
  value: string | null;
  transactionType: string | null;
  debitAccountType: string | null;
  creditAccountType: string | null;
  onChange: (value: string | null) => void;
  readonly?: boolean;
}

const SelectCategoryFilter: React.FC<SelectCategoryFilterProps> = ({
  companyId,
  value,
  transactionType,
  debitAccountType,
  creditAccountType,
  onChange,
  readonly = false,
}) => {
  const { data: transactionCategoryData, isLoading } = useQuery({
    queryKey: ["getTransactionCategoryByCategoryOnly", companyId, transactionType, debitAccountType, creditAccountType],
    queryFn: () => getTransactionCategoryByCategoryOnly(companyId, transactionType, debitAccountType, creditAccountType),
    enabled: !!companyId,
  });

  const options =
    transactionCategoryData?.data?.map((category: string) => ({
      label: category,
      value: category, // karena BE kasih string, jadi langsung pakai string itu
    })) || [];

  // kalau data kosong return null
  if (!isLoading && options.length === 0) {
    return null;
  }

  return (
    <>
      <Select
        clearable={!readonly}
        disabled={isLoading || readonly}
        label="Kategori Transaksi"
        placeholder={isLoading ? "Memuat..." : "Pilih Kategori"}
        data={options}
        value={value ?? null}
        onChange={onChange}
        searchable
        styles={{
          input: { cursor: "pointer" },
          dropdown: { cursor: "pointer" },
        }}
      />
    </>
  );
};

export default SelectCategoryFilter;
