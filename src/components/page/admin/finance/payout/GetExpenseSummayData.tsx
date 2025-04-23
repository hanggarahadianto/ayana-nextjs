import { Card, Text, Group, Stack, Loader, Pagination, Select, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useEffect, useMemo, useState } from "react";
import ExpenseSummaryTable from "./ExpenseSummaryTable";
import { getExpenseSummary } from "@/api/finance/getExpenseSummary";
import LoadingGlobal from "@/styles/loading/loading-global";
import CreateJournalEntryModal from "../journalEntry/CreateJournalEntryModal";

interface ExpenseSummaryCardProps {
  companyId?: string;
  companyName?: string;
  // refetchOutstandingDebtData: () => void;
}

export const GetExpenseSummaryData = ({ companyId, companyName }: ExpenseSummaryCardProps) => {
  const [pageExpense, setPageExpense] = useState(1);
  const limit = 10;
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const {
    data: expenseSummaryData,
    isLoading: isLoadingExpenseSummaryData,
    refetch: refetchExpenseSummaryData,
  } = useQuery({
    queryKey: ["getExpenseSummaryData", companyId, pageExpense, limit],
    queryFn: () => (companyId ? getExpenseSummary({ companyId: companyId, page: pageExpense, limit }) : Promise.resolve(null)),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  // Debug selectedType
  useEffect(() => {
    console.log("selectedType updated:", selectedType);
  }, [selectedType]);

  const totalPages = useMemo(() => {
    return expenseSummaryData?.data.total ? Math.ceil(expenseSummaryData?.data.total / limit) : 1;
  }, [expenseSummaryData]);

  // Reset page when filter changes
  // useEffect(() => {
  //   setPage(1);
  // }, [selectedType]);

  const startIndex = (pageExpense - 1) * limit + 1;
  const endIndex = Math.min(pageExpense * limit, expenseSummaryData?.data.total || 0);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingExpenseSummaryData} />

      <Stack gap="md">
        <Group justify="space-between" align="space-between">
          <Text size="lg" fw={600}>
            Pengeluaran {companyName}
          </Text>
          <CreateJournalEntryModal companyId={companyId} transactionType="payout" />
        </Group>

        {/* <Group justify="space-between">
              <Text size="lg" fw={600}>
                Ringkasan Kas {companyName}
              </Text>
              <Stack p={20}>
                <CreateJournalEntryModal
                  transactionType={"payin"}
                  companyId={companyId}
                  refetchData={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </Stack>
            </Group> */}

        {/* <Select
              label="Filter berdasarkan Type"
              placeholder="Pilih Type"
              data={ExpenseSummaryTypeOptions}
              value={selectedType}
              onChange={(value) => {
                console.log("Select onChange:", value); // Debug
                setSelectedType(value);
              }}
              clearable
              style={{ width: 250 }}
            /> */}

        {/* <Select
              label="Test Select"
              placeholder="Pilih Type"
              data={[
                { value: "test1", label: "Test 1" },
                { value: "test2", label: "Test 2" },
              ]}
              onChange={(value) => {
                console.log("TEST Select onChange:", value);
                setSelectedType(value);
              }}
              clearable
            /> */}

        {/* <AddExpenseSummaryModal companyId={companyId} refetchExpenseSummaryData={refetchExpenseSummaryData} /> */}

        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "50vh", // Pastikan container mengisi tinggi layar
            justifyContent: "space-between", // Paginasi akan tetap di bawah
          }}
        >
          {/* Bagian Tabel */}
          <Box style={{ flex: 1 }}>
            <ExpenseSummaryTable data={expenseSummaryData?.data.expenseList || []} />
          </Box>

          {totalPages > 0 && (
            <Stack gap="xs" mt="md" style={{ paddingBottom: "16px" }}>
              <Pagination total={totalPages} value={pageExpense} onChange={setPageExpense} />
              <Text size="sm" c="dimmed">
                Menampilkan {startIndex} sampai {endIndex} dari {expenseSummaryData?.data.total} data
              </Text>
            </Stack>
          )}
        </Box>
      </Stack>
    </Card>
  );
};
