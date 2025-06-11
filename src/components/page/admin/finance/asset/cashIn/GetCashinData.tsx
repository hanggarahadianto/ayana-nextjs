import { Card, Text, Group, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/helper/formatCurrency";
import CreateJournalEntryModal from "../../journalEntry/CreateJournalEntryModal";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import TableComponent from "@/components/common/table/TableComponent";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import { useModalStore } from "@/store/modalStore";
import UpdateJournalEntryModal from "../../journalEntry/UpdateJournalEntryModal";
import SearchTable from "@/components/common/table/SearchTableComponent";
import { columnsBaseCashIn } from "./CashInColumn";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { useDebounce } from "use-debounce";

interface CashSummaryCardProps {
  companyId: string;
  companyName?: string;
  assetType?: string;
  transactionType: string;
}

export const GetCashinData = ({ companyId, companyName, assetType, transactionType }: CashSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500); // delay 500ms
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { data: cashinSummaryData, isPending: isLoadingCashinData } = useQuery({
    queryKey: ["getCashinData", companyId, page, limit, assetType, selectedCategory, debouncedSearch],
    queryFn: () =>
      getAssetSummary({
        companyId,
        page,
        limit,
        assetType,
        // category: "Kas & Bank", // Hardcoded for Cash In
        search: debouncedSearch, // 🔍
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });
  const cashInList = cashinSummaryData?.data.assetList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, cashinSummaryData?.data.total || 0);

  const openEditModal = (cashInAsset: IAssetSummaryItem) => {
    useModalStore.getState().openModal("editCashInData", cashInAsset);
  };

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteCashIn } = useDeleteDataJournalEntry();
  const handleDeleteAccount = (idToDelete: string) => {
    console.log("idToDelete", idToDelete);
    mutateDeleteDataJournal(idToDelete);
  };

  const columns = columnsBaseCashIn(openEditModal, handleDeleteAccount);

  return (
    <Card shadow="sm" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingCashinData || isLoadingDeleteCashIn} />
      <Stack>
        <Group justify="space-between">
          <Stack>
            <Text size="xl" fw={600}>
              Uang Masuk {companyName}
            </Text>
          </Stack>
          <Stack align="flex-end">
            <CreateJournalEntryModal companyId={companyId} transactionType={"payin"} />
            <Text size="xl" fw={800} c={"teal"} mt={20}>
              {formatCurrency(cashinSummaryData?.data.total_asset ?? 0)}
            </Text>
          </Stack>
        </Group>
        <Stack mb={12}>
          <SearchTable
            companyId={companyId}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            readonly={false}
            transactionType={null}
            debitAccountType={"Asset"}
            creditAccountType={null}
          />
        </Stack>
      </Stack>

      <TableComponent
        startIndex={startIndex}
        data={cashInList}
        totalAmount={cashinSummaryData?.data.total_asset}
        transactionType={transactionType}
        height={"580"}
        columns={columns}
      />

      <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType="payin" />

      <PaginationWithLimit
        total={cashinSummaryData?.data.total ?? 0}
        page={page}
        limit={limit}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </Card>
  );
};
