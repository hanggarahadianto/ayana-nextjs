import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Group, Stack, Pagination, Select, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useMemo, useState } from "react";
import { accountTypeOptions } from "@/constants/dictionary";
import TableComponent from "@/components/common/table/TableComponent";
import AddTransactionCategoryModal from "./AddTransactionCategoryModal";
import { getDataTranasctionCategory } from "@/api/transaction-category/getDataTransactionCategory";

interface AccountCardProps {
  companyId: string;
  companyName?: string;
}

export const TransactionCategoryCard = ({ companyId, companyName }: AccountCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>("");

  const {
    data: transactionCategoryData,
    isPending: isLoadingGetTransactionCategory,
    refetch: refetchTransactionCategoryData,
  } = useQuery({
    queryKey: ["getTransactionCategory", companyId, page, selectedType, selectedCategory, true],
    queryFn: () =>
      getDataTranasctionCategory(
        companyId,
        page,
        limit,
        selectedType,
        selectedCategory,
        null, // status
        true // all
      ),

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
      <Stack align="flex-end" mb={16}>
        <AddTransactionCategoryModal companyId={companyId} refetchTransactionCategoryData={refetchTransactionCategoryData} />
      </Stack>

      <TableComponent
        companyName={companyName}
        startIndex={startIndex}
        data={(transactionCategoryData?.data || []).map((item) => ({
          ...item,
          transaction_type: item.transaction_type?.toUpperCase() || "",
        }))}
        title="Kategori Transaksi"
        columns={[
          { key: "name", title: "Nama", width: 240, minWidth: 240 },
          { key: "category", title: "Kategori", width: 160, minWidth: 160 },
          { key: "transaction_type", title: "Tipe Transaksi", width: 100, minWidth: 10 },
          { key: "debit_account_type", title: "Debit", width: 100, minWidth: 100 },
          { key: "credit_account_type", title: "Kredit", width: 100, minWidth: 100 },
          { key: "description", title: "Deskripsi", width: 420, minWidth: 420 },
        ]}
      />

      {totalPages > 0 && (
        <>
          <Pagination mt={10} total={totalPages} value={page} onChange={setPage} />
          <Text mt={8} size="sm" c="dimmed">
            Show from {startIndex} to {endIndex} of {transactionCategoryData?.total} data
          </Text>
        </>
      )}
    </Card>
  );
};
