import { getDataTranasctionCategory } from "@/api/transaction-category/getDataTransactionCategory";
import LoadingGlobal from "@/styles/loading/loading-global";
import { Grid, GridCol, Group, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

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
    label: `${item.name} ${item.description ? `(${item.description})` : ""}`, // Combine name & description
  }));

  return (
    <>
      {/* <LoadingGlobal visible={isLoading} /> */}
      <Select
        searchable
        clearable
        label={label}
        placeholder={`Pilih ${label ?? ""}`}
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
          console.log("options", option);

          // Match label to separate parts and capture the status between parentheses
          const match = option.label.match(/^(.*?)\s+(.*?)\s+\((.*?)\)$/);

          // Bagian sebelum tanda kurung (misalnya Pengeluaran Wifi Internet)
          const bagianAwal = match?.[1] ?? option.label;

          // Bagian setelah bagian pertama dan sebelum tanda kurung (misalnya Wifi Internet)
          const sisa = match?.[2] ?? "";

          // Status yang ada di dalam tanda kurung (TUNAI, Tempo, etc.)
          const statusMatch = match?.[3]?.toUpperCase() ?? "";

          // Extracting the status between TUNAI and TEMPO
          const status = statusMatch.match(/(TUNAI|TEMPO)/)?.[0] ?? "";

          // Console log untuk memeriksa nilai status
          console.log("Extracted Status:", status);

          return (
            <SimpleGrid h={22}>
              <Group>
                <Stack w={200} maw={200}>
                  <Text>{bagianAwal}</Text>
                </Stack>
                <Stack w={400} maw={400}>
                  <Text>{sisa}</Text>
                </Stack>
                <Stack w={100} maw={100}>
                  <Text w={80} c="dimmed" ta="right">
                    {status ? status : ""} {/* Menampilkan status dalam huruf besar */}
                  </Text>
                </Stack>
              </Group>
            </SimpleGrid>
          );
        }}
      />
    </>
  );
}
