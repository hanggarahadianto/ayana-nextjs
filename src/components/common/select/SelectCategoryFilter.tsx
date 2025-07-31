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
  // console.log("transaction type di select category", transactionType);

  const { data: transactionCategoryData, isLoading } = useQuery({
    queryKey: ["getTransactionCategoryByCategoryOnly", companyId, , transactionType || "payin", , debitAccountType, creditAccountType],
    queryFn: () => getTransactionCategoryByCategoryOnly(companyId, transactionType || "payin", debitAccountType, creditAccountType),
    enabled: !!companyId,
  });

  const options =
    transactionCategoryData?.data?.map((category: string) => ({
      label: category,
      value: category,
    })) || [];

  console.log("readonly", readonly);
  console.log("value", value);
  console.log(
    "options",
    options.map((opt) => opt.value)
  );

  return (
    <Select
      clearable={!readonly}
      disabled={isLoading || readonly}
      label="Kategori Transaksi"
      placeholder={isLoading ? "Memuat..." : "Pilih Kategori"}
      data={options}
      value={value}
      onChange={onChange}
      searchable
      styles={{
        input: { cursor: "pointer" },
        dropdown: { cursor: "pointer" },
      }}
    />
  );
};

export default SelectCategoryFilter;
