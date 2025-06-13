import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Box, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import SearchTable from "@/components/common/table/SearchTableComponent";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { useDebounce } from "use-debounce";
import { columnsBaseJournalEntry } from "./journalEntryColumn";
import { getJournalEntryData } from "@/api/finance/getJournalEntryData";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";

interface GetJournalEntryDataProps {
  companyId: string;
  companyName?: string;
  title?: string;
}

export const GetJournalEntryData = ({ companyId, companyName, title }: GetJournalEntryDataProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const { data: journalEntryData, isLoading: isLoadingJournalEntry } = useQuery({
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

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteRecivableAsset } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    mutateDeleteDataJournal(idToDelete);
  };

  const columns = columnsBaseJournalEntry(handleDeleteDataJournal);

  return (
    <SimpleGridGlobal cols={1}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <LoadingGlobal visible={isLoadingJournalEntry} />
        <Group justify="space-between">
          <Stack>
            <Text size="xl" fw={600}>
              Transaksi {title} {companyName}
            </Text>
          </Stack>
        </Group>

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
          readonly={true}
          transactionType={null}
          debitAccountType={null}
          creditAccountType={null}
          useCategory={false}
        />

        <Box style={{ flex: 1 }}>
          <TableComponent startIndex={startIndex} data={journalList} height="400" columns={columns} />
        </Box>

        <PaginationWithLimit
          total={totalItems}
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
