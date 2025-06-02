import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Pagination, Box, Group, Flex, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { getExpenseSummary } from "@/api/finance/getExpenseSummary";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import SelectCategoryFilter from "@/components/common/select/SelectCategoryFilter";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import { useModalStore } from "@/store/modalStore";
import UpdateJournalEntryModal from "../journalEntry/UpdateJournalEntryModal";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { IconPencil } from "@tabler/icons-react";

interface GetExpenseDataProps {
  companyId: string;
  companyName?: string;
}
export const GetExpenseSummaryData = ({ companyId, companyName }: GetExpenseDataProps) => {
  const limit = 10;
  const [pageExpense, setPageExpense] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const status = "base";
  const {
    data: expenseData,
    isLoading: isLoadingExpense,
    refetch: refetchExpenseData,
  } = useQuery({
    queryKey: ["getExpenseSummaryData", companyId, pageExpense, limit, status, searchTerm],
    queryFn: async () => {
      if (!companyId) return null;

      return await getExpenseSummary({
        companyId,
        page: pageExpense,
        status,
        limit,
        search: searchTerm,
      });
    },
    enabled: Boolean(companyId),
    refetchOnWindowFocus: false,
  });

  const expenseList = expenseData?.data.expenseList ?? [];

  const totalPages = Math.ceil((expenseData?.data?.total ?? 0) / limit);

  const startIndex = (pageExpense - 1) * limit + 1;
  const endIndex = Math.min(pageExpense * limit, expenseData?.data.total || 0);

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteExpense } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    console.log("idToDelete", idToDelete);
    mutateDeleteDataJournal(idToDelete);
  };

  const openEditModal = (expenseData: IExpenseSummaryItem) => {
    useModalStore.getState().openModal("editExpenseData", expenseData);
  };

  return (
    <SimpleGridGlobal cols={1}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <LoadingGlobal visible={isLoadingExpense || isLoadingDeleteExpense} />
        <Group justify="space-between">
          <Stack>
            <Text size="xl" fw={600}>
              Pengeluaran {companyName}
            </Text>
            <Group>
              <SelectCategoryFilter
                companyId={companyId}
                value={selectedCategory}
                onChange={(value) => {
                  setSelectedCategory(value);
                }}
              />
              <TextInput
                w={400}
                label="Cari Data Asset"
                placeholder="Cari data asset..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Group>
          </Stack>
          <Text size="xl" fw={800} c={"red"} mt={20}>
            -{formatCurrency(expenseData?.data.total_expense ?? 0)}
          </Text>
        </Group>

        <Box style={{ flex: 1 }}>
          <TableComponent
            startIndex={startIndex}
            data={expenseList}
            totalAmount={expenseData?.data?.total_expense ?? 0}
            height={"580"}
            columns={[
              { key: "transaction_id", title: "Transaction ID", width: 40, minWidth: 40 },
              { key: "invoice", title: "Invoice", width: 100, minWidth: 100 },
              { key: "partner", title: "Partner", width: 120, minWidth: 120 },
              {
                key: "amount",
                title: "Nominal",
                width: 120,
                minWidth: 120,
                render: (item) => formatCurrency(item.amount),
              },
              {
                key: "date_inputed",
                title: "Tanggal Transaksi",
                width: 120,
                minWidth: 120,
                render: (item) => formatDateIndonesia(item.date_inputed),
              },
              { key: "note", title: "Keterangan", width: 220, minWidth: 220 },

              {
                key: "aksi",
                title: "Aksi",
                width: 10,
                minWidth: 10,
                render: (row: IExpenseSummaryItem) => {
                  // console.log("row", row);
                  return (
                    <Flex gap="lg" justify="center">
                      <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="2rem" />} size={"2.2rem"} />

                      <ButtonDeleteWithConfirmation
                        id={row.id} // Gunakan id customer
                        onDelete={() => handleDeleteDataJournal(row.id)}
                        description={`Hapus Transaksi ${row.description}?`}
                        size={2.2}
                      />
                    </Flex>
                  );
                },
              },
            ]}
          />
        </Box>

        <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType="payout" />

        {/* Bagian Paginasi */}
        {totalPages > 0 && (
          <Stack gap="xs" style={{ paddingBottom: "16px" }}>
            <Pagination total={totalPages} value={pageExpense} onChange={setPageExpense} />
            <Text size="sm" c="dimmed">
              Menampilkan {startIndex} sampai {endIndex} dari {expenseData?.data.total} data
            </Text>
          </Stack>
        )}
      </Card>
    </SimpleGridGlobal>
  );
};
