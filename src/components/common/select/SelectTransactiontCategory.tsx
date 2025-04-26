import { getDataTranasctionCategory } from "@/api/transaction-category/getDataTransactionCategory";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

interface ISelectFinanceTransactionCategoryProps {
  companyId?: string;
  onSelect: (selected: { id: string; debit_account_id: string; credit_account_id: string; name: string; description: string }) => void;
  label: string;
  transactionType?: string;
}

export default function SelectFinanceTransactionCategory({
  companyId,
  onSelect,
  label,
  transactionType,
}: ISelectFinanceTransactionCategoryProps) {
  //   console.log("company id", companyId);
  const { data: TransactionCategoryData, isLoading } = useQuery({
    queryKey: ["getTransactionCategoryData", companyId],
    queryFn: () => getDataTranasctionCategory(companyId as string, 1, 1000, transactionType),
    refetchOnWindowFocus: false,
    enabled: !!companyId,
  });

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
