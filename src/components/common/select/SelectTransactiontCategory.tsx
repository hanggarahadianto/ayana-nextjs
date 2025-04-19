import { getDataTranasctionCategory } from "@/api/transaction-category/getDataTransactionCategory";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

interface ISelectFinanceTransactionCategoryProps {
  companyId: string;
  onSelect: (selected: { id: string; debit_account_id: string; credit_account_id: string; name: string; description: string }) => void;
  label: string;
}

export default function SelectFinanceTransactionCategory({ companyId, onSelect, label }: ISelectFinanceTransactionCategoryProps) {
  //   console.log("company id", companyId);
  const { data: TransactionCategoryData, isLoading } = useQuery({
    queryKey: ["getTransactionCategoryData", companyId],
    queryFn: () => getDataTranasctionCategory(companyId, 1, 1000),
    refetchOnWindowFocus: false,
    enabled: !!companyId,
  });

  // const TransactionCategorys = useMemo(() => {
  //   return Array.isArray(TransactionCategoryData?.data)
  //     ? [...TransactionCategoryData.data].sort((a, b) => a.code - b.code) // sort descending by code
  //     : [];
  // }, [TransactionCategoryData]);

  const handleSelect = (value: string | null) => {
    const TransactionCategory = value ? TransactionCategoryData?.data.find((acc) => acc.id === value) : null;
    if (TransactionCategory) {
      onSelect({
        id: TransactionCategory.id,
        debit_account_id: TransactionCategory.debit_account_id,
        credit_account_id: TransactionCategory.credit_account_id,
        name: TransactionCategory.name,
        description: TransactionCategory.description,
      });
    }
  };

  // Create the options for the Select component
  const TransactionCategoryOptions = TransactionCategoryData?.data.map((TransactionCategory) => ({
    value: TransactionCategory.id,
    label: `${TransactionCategory.name} - ${TransactionCategory.description}`,
  }));

  return (
    <>
      <Select
        searchable
        styles={{
          option: {
            fontSize: "14px",
            padding: "6px 10px",
          },
          input: {
            cursor: "pointer",
          },
        }}
        clearable
        label={label}
        placeholder={`Pilih ${label ?? ""}`}
        onChange={handleSelect}
        data={TransactionCategoryOptions}
      />
    </>
  );
}
