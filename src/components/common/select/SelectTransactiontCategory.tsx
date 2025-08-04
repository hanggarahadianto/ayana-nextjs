import { getDataTransactionCategory } from "@/api/transaction-category/getDataTransactionCategory";
import { accountTypeOptions, transactionLabel } from "@/constants/dictionary";
import { Grid, Select, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

declare module "@mantine/core" {
  interface ComboboxItem {
    rawTransactionCategory?: {
      id: string;
      name: string;
      status: string;
      transaction_label: string;
      debit_account_type: string;
      credit_account_id: string;
      debit_account_id: string;
      description: string;
    };
  }
}

interface ISelectFinanceTransactionCategoryProps {
  companyId?: string;
  onSelect: (selected: { id: string; debit_account_id: string; credit_account_id: string; name: string; description: string }) => void;
  label: string;
  transactionType?: string;
  transactionCategoryTerm?: string;
  status?: string;
  error?: string | null;
}

export default function SelectFinanceTransactionCategory({
  companyId,
  onSelect,
  label,
  transactionType,
  transactionCategoryTerm,
  status,
  error,
}: ISelectFinanceTransactionCategoryProps) {
  const { data, isLoading } = useQuery({
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
    const selected = value ? data?.data.find((item) => item.id === value) : null;
    if (selected) {
      onSelect({
        id: selected.id,
        debit_account_id: selected.debit_account_id,
        credit_account_id: selected.credit_account_id,
        name: selected.name,
        description: selected.description,
      });
    }
  };

  const accountTypeLabelMap = accountTypeOptions.reduce<Record<string, string>>((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});

  const filteredData = data?.data.filter((item) => item.description.toLowerCase().includes((transactionCategoryTerm ?? "").toLowerCase()));

  const transactionLabelOrder = transactionLabel.map((item) => item.value);
  const sortedTransactionData = filteredData?.slice().sort((a, b) => {
    return transactionLabelOrder.indexOf(a.transaction_label) - transactionLabelOrder.indexOf(b.transaction_label);
  });
  const selectOptions = sortedTransactionData?.map((item) => ({
    value: item.id,
    label: item.description,
    rawTransactionCategory: item,
  }));

  return (
    <Select
      label={label}
      placeholder={`Pilih ${label}`}
      data={selectOptions}
      searchable
      clearable
      onChange={handleSelect}
      error={error}
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
        const raw = option.rawTransactionCategory;
        if (!raw) return null;

        const statusLabel = raw.status === "paid" ? "Tunai" : raw.status === "unpaid" ? "Tenor" : raw.status?.toUpperCase() || "-";

        return (
          <Grid w="100%">
            <Grid.Col span={2}>
              <Text size="sm" fw={500}>
                {raw.transaction_label}
              </Text>
            </Grid.Col>
            <Grid.Col span={5}>
              <Text size="sm" c="dimmed">
                {raw.name || "-"}
              </Text>
            </Grid.Col>
            <Grid.Col span={3}>
              <Text size="sm" c="dimmed">
                {accountTypeLabelMap[raw.debit_account_type] || "-"}
              </Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Text size="sm">{statusLabel}</Text>
            </Grid.Col>
          </Grid>
        );
      }}
    />
  );
}
