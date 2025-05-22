import { getDataTranasctionCategory } from "@/api/transaction-category/getDataTransactionCategory";
import { Grid, Group, Select, Text, ComboboxItem } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

declare module "@mantine/core" {
  interface ComboboxItem {
    raw?: {
      name: string;
      description: string;
      status: string;
    };
  }
}

interface ISelectFinanceTransactionCategoryProps {
  companyId?: string;
  onSelect: (selected: { id: string; debit_account_id: string; credit_account_id: string; name: string; description: string }) => void;
  label: string;
  transactionType?: string;
  status?: string;
}

export default function SelectFinanceTransactionCategory({
  companyId,
  onSelect,
  label,
  transactionType,
  status,
}: ISelectFinanceTransactionCategoryProps) {
  const { data: TransactionCategoryData, isLoading } = useQuery({
    queryKey: ["getTransactionCategoryData", companyId, transactionType, status],
    queryFn: () => getDataTranasctionCategory(companyId as string, 1, 1000, transactionType, undefined, status),
    refetchOnWindowFocus: false,
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
    label: `${item.name} ${item.description}`,
    raw: item, // simpan data asli untuk render custom
  }));

  return (
    <Select
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
        const { name, description, status } = option.raw || {};
        const statusLabel = status === "paid" ? "Tunai" : status === "unpaid" ? "Tenor" : (status || "").toUpperCase();

        return (
          <Grid w={"100%"}>
            <Grid.Col span={4}>
              <Text size="sm" fw={500}>
                {name}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">
                {description || "-"}
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
