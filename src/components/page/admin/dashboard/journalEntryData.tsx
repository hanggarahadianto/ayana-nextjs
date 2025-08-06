import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Box, Group, Button, Checkbox, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import SearchTable from "@/components/common/table/SearchTableComponent";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { useDebounce } from "use-debounce";
import { columnsBaseJournalEntry } from "./journalEntryColumn";
import { getJournalEntryData } from "@/api/finance/getJournalEntryData";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import { useListState, randomId } from "@mantine/hooks";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";

interface GetJournalEntryDataProps {
  companyId: string;
  companyName?: string;
  title: string;
}

export const GetJournalEntryData = ({ companyId, companyName, title }: GetJournalEntryDataProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const {
    data: journalEntryData,
    isLoading: isLoadingJournalEntry,
    refetch: isRefetchJournalEntry,
    isFetching: isFetchingJournalEntry,
  } = useQuery({
    queryKey: [
      "getJournalEntryData",
      companyId,
      page,
      limit,
      debouncedSearch,
      selectedCategory,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
    ],
    queryFn: () =>
      getJournalEntryData({
        companyId,
        page,
        limit,
        search: debouncedSearch,
        selectedCategory: selectedCategory ?? undefined,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const journalList = journalEntryData?.data.journalEntryList ?? [];
  const totalItems = journalEntryData?.data?.total ?? 0;

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalItems);

  const [checkboxStates, checkboxHandlers] = useListState<{ id: string; checked: boolean; key: string }>([]);
  const total = checkboxStates.length;
  const selectedCount = checkboxStates.filter((c) => c.checked).length;
  const allChecked = selectedCount === total && total > 0;
  const indeterminate = selectedCount > 0 && selectedCount < total;

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteJournalEntry } = useDeleteDataJournalEntry(title);

  useEffect(() => {
    if (journalList.length > 0) {
      checkboxHandlers.setState(
        journalList.map((item) => ({
          id: item.id,
          checked: false,
          key: randomId(),
        }))
      );
    }
  }, [journalList]);

  // Hapus & refresh dashboard
  const deleteJournalForDashboard = (ids: string[]) => {
    mutateDeleteDataJournal({
      ids,
      forDashboard: true,
    });
  };
  const columns = columnsBaseJournalEntry(deleteJournalForDashboard, checkboxStates, checkboxHandlers, isLoadingDeleteJournalEntry);

  return (
    <SimpleGridGlobal cols={1}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between">
          <Stack>
            <Text size="xl" fw={600}>
              {title} {companyName}
            </Text>
          </Stack>
        </Group>

        <SearchTable
          label={"Cari Data Transaksi"}
          companyId={companyId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          readonly={true}
          transactionType={null}
          debitAccountType={null}
          creditAccountType={null}
          useCategory={false}
          onRefresh={isRefetchJournalEntry}
          isFetching={isFetchingJournalEntry}
        />

        <Stack mt={"16px"} p={10}>
          <Group justify="space-between">
            <Checkbox
              checked={allChecked}
              indeterminate={indeterminate}
              label="Pilih semua transaksi"
              mb="sm"
              onChange={() =>
                checkboxHandlers.setState((current) =>
                  current.map((value) => ({
                    ...value,
                    checked: !allChecked,
                  }))
                )
              }
            />
            {selectedCount > 0 && (
              <ButtonDeleteWithConfirmation
                size={2.5}
                description="Hapus yang ditandai"
                onDelete={async () => {
                  const selectedIds = checkboxStates.filter((c) => c.checked).map((c) => c.id);
                  mutateDeleteDataJournal({ ids: selectedIds }); // ✅ dibungkus dalam objek
                }}
                isLoading={isLoadingDeleteJournalEntry}
              />
            )}
          </Group>
        </Stack>

        <Box style={{ position: "relative" }}>
          {isLoadingJournalEntry ? (
            <Skeleton height={limit * 60} />
          ) : (
            <TableComponent startIndex={startIndex} data={journalList} height="400" columns={columns} />
          )}
          <LoadingGlobal visible={isLoadingJournalEntry} />
        </Box>

        <PaginationWithLimit
          total={isLoadingJournalEntry ? limit : totalItems}
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
    </SimpleGridGlobal>
  );
};
