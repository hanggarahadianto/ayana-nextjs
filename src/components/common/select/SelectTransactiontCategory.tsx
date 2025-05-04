import { getDataTranasctionCategory } from "@/api/transaction-category/getDataTransactionCategory";
import LoadingGlobal from "@/styles/loading/loading-global";
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
  const { data: TransactionCategoryData, isLoading } = useQuery({
    queryKey: ["getTransactionCategoryData", companyId, transactionType, status],
    queryFn: () => getDataTranasctionCategory(companyId as string, 1, 1000, transactionType), // Tambahkan status ke API call
    refetchOnWindowFocus: false,
    enabled: !!companyId && !!transactionType, // Query jalan jika semua tersedia
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

  const TransactionCategoryOptions = TransactionCategoryData?.data?.map((TransactionCategory) => ({
    value: TransactionCategory.id,
    label: `${TransactionCategory.name} - ${TransactionCategory.description}`,
  }));

  return (
    <>
      {/* <LoadingGlobal visible={isLoading} /> */}
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
