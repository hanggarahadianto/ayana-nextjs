import { getOutstandingDebt } from "@/api/finance/getOutstandingDebt";
import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Pagination, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatCurrency } from "@/helper/formatCurrency";
import TableComponent from "@/components/common/table/TableComponent";
import ReversedJournalEntryModal from "../journalEntry/ReversedJournalEntryModal";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import { useModalStore } from "@/store/modalStore";
import SearchTable from "@/components/common/table/SearchTableComponent";
import { columnsBaseDebt } from "./OutstandingDebtColumn";

interface GetOutStandingDebtDataProps {
  companyId: string;
  companyName?: string;
  title: string;
  status: string;
  transactionType: string;
}

export const GetOutstandingDebtData = ({ companyId, companyName, title, status, transactionType }: GetOutStandingDebtDataProps) => {
  const limit = 10;
  const [pageOutstandingDebt, setPageOutstandingDebt] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [selectedDebt, setSelectedDebt] = useState<IDebtSummaryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: outstandingDebtData,
    isLoading: isLoadingOutstandingDebt,
    refetch: refetchOutstandingDebtData,
  } = useQuery({
    queryKey: ["getOutstandingDebtByCompanyId", companyId, pageOutstandingDebt, limit, status, searchTerm],
    queryFn: async () => {
      if (!companyId) return null;

      return await getOutstandingDebt({
        companyId,
        page: pageOutstandingDebt,
        status,
        limit,
        search: searchTerm,
      });
    },
    enabled: Boolean(companyId),
    refetchOnWindowFocus: false,
  });

  const totalData = outstandingDebtData?.data?.total ?? 0;
  const totalPages = Math.ceil(totalData / limit);

  const debtList = outstandingDebtData?.data.debtList ?? [];

  const startIndex = (pageOutstandingDebt - 1) * limit + 1;
  const endIndex = Math.min(pageOutstandingDebt * limit, outstandingDebtData?.data.total || 0);

  const handleSendClick = (debt: IDebtSummaryItem) => {
    setSelectedDebt(debt);
    setIsModalOpen(true);
  };

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteDebt } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    mutateDeleteDataJournal(idToDelete);
  };

  // console.log("debitList", debtList);
  const shouldShowPaymentStatus = debtList.some((item) => item.status === "done" || item.status === "paid");

  const openEditModal = (expenseData: IExpenseSummaryItem) => {
    useModalStore.getState().openModal("editExpenseData", expenseData);
  };

  const columns = columnsBaseDebt(handleSendClick, openEditModal, handleDeleteDataJournal, shouldShowPaymentStatus);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingOutstandingDebt || isLoadingDeleteDebt} />
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            {title} {companyName}
          </Text>
        </Stack>
        <Text size="xl" fw={800} c={"red"} mt={20}>
          -{formatCurrency(outstandingDebtData?.data.total_debt ?? 0)}
        </Text>
      </Group>
      <SearchTable
        companyId={companyId}
        category=""
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        readonly={false}
      />
      <TableComponent
        startIndex={startIndex}
        data={debtList}
        totalAmount={outstandingDebtData?.data.total_debt}
        transactionType={transactionType}
        height={"580"}
        columns={columns}
      />

      {totalPages > 0 && (
        <Stack gap="xs" mt={"md"} style={{ paddingBottom: "16px" }}>
          <Pagination total={totalPages} value={pageOutstandingDebt} onChange={setPageOutstandingDebt} />
          <Text size="sm" c="dimmed">
            Menampilkan {startIndex} sampai {endIndex} dari {outstandingDebtData?.data.total} data
          </Text>
        </Stack>
      )}

      {selectedDebt && companyId && (
        <ReversedJournalEntryModal
          companyId={companyId}
          transactionType="payout"
          initialData={selectedDebt}
          opened={isModalOpen}
          close={() => setIsModalOpen(false)}
        />
      )}
    </Card>
  );
};
