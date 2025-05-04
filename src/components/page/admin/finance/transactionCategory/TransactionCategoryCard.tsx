import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Group, Stack, Pagination, Select, Box, InputWrapper } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useMemo, useState } from "react";
import { accountTypeOptions } from "@/constants/dictionary";
import { getDataTranasctionCategory } from "@/api/transaction-category/getDataTransactionCategory";
import AddTransactionCategoryModal from "./AddTransactionCategoryModal";
import TableComponent from "@/components/common/table/TableComponent";
import SelectFinanceAccount from "@/components/common/select/SelectAccountType";

interface AccountCardProps {
  companyId: string;
  companyName?: string;
}

export const TransactionCategoryCard = ({ companyId, companyName }: AccountCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const [selectedAccount, setSelectedAccount] = useState<{
    id: string;
    code: number;
    type: string;
    category: string;
    name: string;
  } | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>("");
  console.log("seected", selectedCategory);

  const {
    data: transactionCategoryData,
    isPending: isLoadingGetTransactionCategory,
    refetch: refetchTransactionCategoryData,
  } = useQuery({
    queryKey: ["getTransactionCategory", companyId, page, selectedType, selectedCategory],
    queryFn: () => getDataTranasctionCategory(companyId, page, limit, selectedType, selectedCategory),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return transactionCategoryData?.total ? Math.ceil(transactionCategoryData.total / limit) : 1;
  }, [transactionCategoryData]);

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, transactionCategoryData?.total || 0);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingGetTransactionCategory} />

      <Group justify="space-between" p={20}>
        <Stack>
          <Text size="lg" fw={600}>
            Kategori Transaksi {companyName}
          </Text>
          <Group>
            <SelectFinanceAccount
              companyId={companyId}
              category_only="true"
              label="Kategori Akun"
              onSelect={(selected) => {
                if (!selected) {
                  setSelectedCategory(null);
                  refetchTransactionCategoryData(); // Refetch data setelah kategori di-clear
                } else {
                  // Set kategori yang dipilih
                  setSelectedCategory(selected.category);
                }
              }}
              all={false}
            />
          </Group>

          <Group mt="md"></Group>
        </Stack>
        <Stack>
          <AddTransactionCategoryModal companyId={companyId} refetchTransactionCategoryData={refetchTransactionCategoryData} />
        </Stack>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "50vh",
            justifyContent: "space-between",
          }}
        >
          <Box style={{ flex: 1 }}>
            <TableComponent
              data={(transactionCategoryData?.data || []).map((item) => ({
                ...item,
                transaction_type: item.transaction_type?.toUpperCase() || "",
              }))}
              columns={[
                { key: "name", title: "Nama", width: 160, minWidth: 160 },
                { key: "category", title: "Kategori", width: 160, minWidth: 160 },
                { key: "transaction_type", title: "Tipe Transaksi", width: 100, minWidth: 10 },
                { key: "debit_account_type", title: "Debit", width: 100, minWidth: 100 },
                { key: "credit_account_type", title: "Kredit", width: 100, minWidth: 100 },
                { key: "description", title: "Deskripsi", width: 180, minWidth: 180 },
              ]}
              startIndex={startIndex}
            />
          </Box>
          {totalPages > 0 && (
            <>
              <Pagination mt={10} total={totalPages} value={page} onChange={setPage} />
              <Text mt={8} size="sm" c="dimmed">
                Show from {startIndex} to {endIndex} of {transactionCategoryData?.total} data
              </Text>
            </>
          )}
        </Box>
      </Group>
    </Card>
  );
};
