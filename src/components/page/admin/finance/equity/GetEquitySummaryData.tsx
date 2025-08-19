import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Box, Group, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatCurrency } from "@/helper/formatCurrency";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import { useModalStore } from "@/store/modalStore";
import UpdateJournalEntryModal from "../journalEntry/UpdateJournalEntryModal";
import SearchTable from "@/components/common/table/SearchTableComponent";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { useDebounce } from "use-debounce";
import { getEquitySummary } from "@/api/finance/getEquitySummary";
import { columnsBaseEquity } from "./EquityColumn";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";

interface GetEquityDataProps {
  companyId: string;
  companyName?: string;
  equityType?: string;
  title: string;
}
export const GetEquitySummaryData = ({ companyId, companyName, equityType, title }: GetEquityDataProps) => {
  const { user } = useLoggedInUser();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const [debouncedSearch] = useDebounce(searchTerm, 500); // delay 500ms

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "date_inputed";

  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const queryEnabled = !!user && !!companyId;

  const {
    data: equityData,
    isLoading: isLoadingEquity,
    refetch: isRefetchEquityData,
    isFetching: isFetchingEquityData, // untuk setiap refetch
  } = useQuery({
    queryKey: [
      "getEquitySummaryData",
      companyId,
      page,
      limit,
      equityType,
      debouncedSearch,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      companyId
        ? getEquitySummary({
            companyId,
            page,
            limit,
            equityType: equityType ?? "",
            search: debouncedSearch,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            sortBy,
            sortOrder,
          })
        : null,
    enabled: queryEnabled,
    refetchOnWindowFocus: false,
  });

  const equityList = equityData?.data.equityList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, equityData?.data.total || 0);

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteEquity } = useDeleteDataJournalEntry(title);
  const openEditModal = (equityData: IEquitySummaryItem) => {
    useModalStore.getState().openModal("editEquityData", equityData);
  };

  const deleteJournalWithIdsOnly = (ids: string[]) => {
    mutateDeleteDataJournal({ ids });
  };

  const columns = columnsBaseEquity(deleteJournalWithIdsOnly, openEditModal, isLoadingDeleteEquity);

  const textColor = equityType === "setor" ? "teal" : equityType === "tarik" ? "red" : "gray";

  return (
    <SimpleGridGlobal cols={1}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between">
          <Stack>
            <Text size="xl" fw={600}>
              Modal {title} {""}
              {companyName}
            </Text>
          </Stack>
          <Text size="xl" fw={800} c={textColor} mt={20}>
            {formatCurrency(equityData?.data.total_equity ?? 0)}
          </Text>
        </Group>
        <SearchTable
          label={"Cari Data Transaksi"}
          companyId={companyId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={"Modal"}
          setSelectedCategory={setSelectedCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          readonly={true}
          transactionType={null}
          debitAccountType={null}
          creditAccountType={"Equity"}
          useCategory={true}
          onRefresh={isRefetchEquityData}
          isFetching={isFetchingEquityData}
        />

        <Box style={{ position: "relative" }}>
          {isLoadingEquity ? (
            <Skeleton height={limit * 60} />
          ) : (
            <TableComponent
              startIndex={startIndex}
              data={equityList}
              totalAmount={equityData?.data.total_equity}
              height={"580"}
              columns={columns}
            />
          )}

          <LoadingGlobal visible={isLoadingEquity} />
        </Box>
        <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType="payout" />

        {!isLoadingEquity && (
          <PaginationWithLimit
            total={equityData?.data.total ?? 0}
            page={page}
            limit={limit}
            startIndex={startIndex}
            endIndex={endIndex}
            onPageChange={setPage}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
        )}
      </Card>
    </SimpleGridGlobal>
  );
};
