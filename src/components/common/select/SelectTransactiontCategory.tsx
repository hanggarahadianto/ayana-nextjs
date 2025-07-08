import { getDataTransactionCategory } from "@/api/transaction-category/getDataTransactionCategory";
import { Grid, Select, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

declare module "@mantine/core" {
  interface ComboboxItem {
    rawTransactionCategory?: {
      name: string;
      status: string;
      transaction_label: string;
    };
  }
}

interface ISelectFinanceTransactionCategoryProps {
  companyId?: string;
  onSelect: (selected: { id: string; debit_account_id: string; credit_account_id: string; name: string; description: string }) => void;
  label: string;
  transactionType?: string;
  status?: string;
  error?: string | null;
}

export default function SelectFinanceTransactionCategory({
  companyId,
  onSelect,
  label,
  transactionType,
  status,
  error,
}: ISelectFinanceTransactionCategoryProps) {
  const { data: TransactionCategoryData, isLoading } = useQuery({
    queryKey: ["getTransactionCategorySelect", companyId, transactionType, status],
    queryFn: () =>
      getDataTransactionCategory({
        companyId: companyId as string,
        transactionType,
        status,
        select: true,
      }),
    enabled: !!companyId && !!transactionType,
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

  const TransactionCategoryOptions = TransactionCategoryData?.data?.map((item) => ({
    value: item.id,
    label: ` ${item.description}`,
    rawTransactionCategory: item, // <== Gunakan key unik
  }));

  return (
    <Select
      error={error}
      searchable
      clearable
      label={label}
      placeholder={`Pilih ${label}`}
      onChange={handleSelect}
      data={TransactionCategoryOptions}
      styles={{
        option: {
          fontSize: "14px",
          padding: "6px 10px",
        },
        input: {
          cursor: "pointer",
        },
      }}
      renderOption={({ option }) => {
        const { name, status, transaction_label } = option.rawTransactionCategory || {}; // <== Sesuai key

        const statusLabel = status === "paid" ? "Tunai" : status === "unpaid" ? "Tenor" : (status || "").toUpperCase();

        return (
          <Grid w={"100%"}>
            <Grid.Col span={4}>
              <Text size="sm" fw={500}>
                {transaction_label}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">
                {name || "-"}
              </Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Text size="sm">{statusLabel || "-"}</Text>
            </Grid.Col>
          </Grid>
        );
      }}
    />
  );
}
