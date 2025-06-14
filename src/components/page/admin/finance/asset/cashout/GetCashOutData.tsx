import { Card, Text, Group, Box, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/helper/formatCurrency";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import CreateJournalEntryModal from "../../journalEntry/CreateJournalEntryModal";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import { useModalStore } from "@/store/modalStore";
import UpdateJournalEntryModal from "../../journalEntry/UpdateJournalEntryModal";
import SearchTable from "@/components/common/table/SearchTableComponent";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { useDebounce } from "use-debounce";
import { columnsBaseCashout } from "./CashOutColumn";

interface CashSummaryCardProps {
  companyId: string;
  companyName?: string;
  assetType?: string;
  transactionType: string;
  title: string;
}

export const GetCashOutData = ({ companyId, companyName, assetType, transactionType, title }: CashSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const { data: cashOutSummaryData, isPending: isLoadingcashOutData } = useQuery({
    queryKey: [
      "getCashOutData",
      companyId,
      page,
      limit,
      assetType,
      selectedCategory,
      debouncedSearch,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
    ],
    queryFn: () =>
      getAssetSummary({
        companyId,
        page,
        limit,
        assetType,
        selectedCategory: selectedCategory ?? "",
        search: debouncedSearch,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });
  const assetList = cashOutSummaryData?.data.assetList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, cashOutSummaryData?.data.total || 0);

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteCashout } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    mutateDeleteDataJournal([idToDelete]); // <-- bungkus dalam array
  };

  const openEditModal = (cashOutAsset: IAssetSummaryItem) => {
    useModalStore.getState().openModal("editCashOutData", cashOutAsset);
  };

  const columns = columnsBaseCashout(openEditModal, handleDeleteDataJournal);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingcashOutData || isLoadingDeleteCashout} />
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            {title} {companyName}
          </Text>
        </Stack>

        <Stack align="flex-end">
          <CreateJournalEntryModal companyId={companyId} transactionType={"payout"} />
          <Text size="xl" fw={800} c={"red"} mt={20}>
            {formatCurrency(cashOutSummaryData?.data.total_asset ?? 0)}
          </Text>
        </Stack>
      </Group>
      <Stack mb={12}>
        <SearchTable
          companyId={companyId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={"Kas & Bank"}
          setSelectedCategory={setSelectedCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          readonly={true}
          transactionType={transactionType}
          debitAccountType={null}
          creditAccountType={"Asset"}
          useCategory={true}
        />
      </Stack>

      <Box style={{ flex: 1 }}>
        <TableComponent
          startIndex={startIndex}
          data={assetList}
          totalAmount={cashOutSummaryData?.data.total_asset}
          transactionType={transactionType}
          height={"580"}
          columns={columns}
        />
      </Box>

      <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType="payout" />

      <PaginationWithLimit
        total={cashOutSummaryData?.data.total ?? 0}
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
