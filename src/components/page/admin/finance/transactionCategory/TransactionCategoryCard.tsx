import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Group, Stack, Pagination, Select, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useMemo, useState } from "react";
import { accountTypeOptions } from "@/constants/dictionary";
import { getDataTranasctionCategory } from "@/api/transaction-category/getDataTransactionCategory";
import AddTransactionCategoryModal from "./AddTransactionCategoryModal";
import TableComponent from "@/components/common/table/TableComponent";

interface AccountCardProps {
  companyId: string;
  companyName?: string;
}

export const TransactionCategoryCard = ({ companyId, companyName }: AccountCardProps) => {
  const [page, setPage] = useState(1);

  const limit = 10;

  const [selectedType, setSelectedType] = useState<string | null>(null);

  const {
    data: transactionCategoryData,
    isPending: isLoadingGetTransactionCategory,
    refetch: refetchTrabsactionCategoryData,
  } = useQuery({
    queryKey: ["geTransactionCategory", companyId, page],
    queryFn: () => getDataTranasctionCategory(companyId, page, limit, selectedType),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  console.log("transactionc ategory", transactionCategoryData);

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
          <Select
            label="Filter berdasarkan Type"
            placeholder="Pilih Type"
            data={accountTypeOptions}
            value={selectedType}
            onChange={setSelectedType}
            clearable
          />

          <Group mt="md"></Group>
        </Stack>
        <Stack>
          <AddTransactionCategoryModal companyId={companyId} refetchTransactionCategoryData={refetchTrabsactionCategoryData} />
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
              data={transactionCategoryData?.data || []}
              columns={[
                { key: "name", title: "Nama", width: 100, minWidth: 100 },
                { key: "category", title: "Kategori", width: 160, minWidth: 160 },
                { key: "debit_account_type", title: "Debit", width: 140, minWidth: 140 },
                { key: "credit_account_type", title: "Kredit", width: 180, minWidth: 180 },
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
